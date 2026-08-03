import type {
    FeeScenario,
    FieldGroupRow,
    OutcomeParticle,
    OutcomeStatus,
} from "../types/opt-story";

export const OUTCOME_STATUSES: OutcomeStatus[] = ["stop", "continue", "unknown"];

const peopleFor = (scenario: FeeScenario, status: OutcomeStatus) => {
    if (status === "continue") return scenario.continuesPeople;
    if (status === "stop") return scenario.doesNotContinuePeople;
    return scenario.unknownPeople;
};

const rowPeopleFor = (
    row: FeeScenario["outcomes"]["fields"][number],
    status: OutcomeStatus,
) => {
    if (status === "continue") return row.continuesPeople;
    if (status === "stop") return row.doesNotContinuePeople;
    return row.unknownPeople;
};

const largestRemainder = (
    rows: Array<{ key: string; value: number }>,
    marks: number,
    total: number,
) => {
    const quotas = rows.map((row) => ({
        ...row,
        quota: total > 0 ? row.value * marks / total : 0,
    }));
    const allocated = new Map(quotas.map((row) => [row.key, Math.floor(row.quota)]));
    const shortfall = marks - Array.from(allocated.values()).reduce((sum, value) => sum + value, 0);
    quotas
        .slice()
        .sort((a, b) => (b.quota - Math.floor(b.quota)) - (a.quota - Math.floor(a.quota))
            || b.value - a.value
            || a.key.localeCompare(b.key))
        .slice(0, shortfall)
        .forEach((row) => allocated.set(row.key, (allocated.get(row.key) ?? 0) + 1));
    return { allocated, quotas: new Map(quotas.map((row) => [row.key, row.quota])) };
};

export const allocateOutcomeParticles = (
    scenario: FeeScenario,
    fields: FieldGroupRow[],
    markCount: number,
): OutcomeParticle[] => {
    const totalPeople = fields.reduce((sum, field) => sum + field.people, 0);
    const fieldAllocation = largestRemainder(
        fields.map((field) => ({ key: field.key, value: field.people })),
        markCount,
        totalPeople,
    ).allocated;
    const rows = new Map(scenario.outcomes.fields.map((row) => [row.key, row]));
    const cellMarks = new Map<string, number>();
    const cellQuotas = new Map<string, number>();

    fields.forEach((field) => {
        const row = rows.get(field.key);
        if (!row) throw new Error(`Missing outcome row for field ${field.key}`);
        const marks = fieldAllocation.get(field.key) ?? 0;
        const allocation = largestRemainder(
            OUTCOME_STATUSES.map((status) => ({ key: status, value: rowPeopleFor(row, status) })),
            marks,
            row.totalPeople,
        );
        OUTCOME_STATUSES.forEach((status) => {
            const key = `${field.key}|${status}`;
            cellMarks.set(key, allocation.allocated.get(status) ?? 0);
            cellQuotas.set(key, allocation.quotas.get(status) ?? 0);
        });
    });

    const statusTargets = largestRemainder(
        OUTCOME_STATUSES.map((status) => ({ key: status, value: peopleFor(scenario, status) })),
        markCount,
        totalPeople,
    ).allocated;
    const statusCount = (status: OutcomeStatus) => fields.reduce(
        (sum, field) => sum + (cellMarks.get(`${field.key}|${status}`) ?? 0),
        0,
    );

    while (OUTCOME_STATUSES.some((status) => statusCount(status) !== statusTargets.get(status))) {
        const deficits = OUTCOME_STATUSES.filter((status) => statusCount(status) < (statusTargets.get(status) ?? 0));
        const surpluses = OUTCOME_STATUSES.filter((status) => statusCount(status) > (statusTargets.get(status) ?? 0));
        const candidates = fields.flatMap((field, fieldIndex) => surpluses.flatMap((from) => {
            const fromKey = `${field.key}|${from}`;
            const fromMarks = cellMarks.get(fromKey) ?? 0;
            if (fromMarks <= 0) return [];
            return deficits.map((to) => {
                const toKey = `${field.key}|${to}`;
                const toMarks = cellMarks.get(toKey) ?? 0;
                const before = Math.abs(fromMarks - (cellQuotas.get(fromKey) ?? 0))
                    + Math.abs(toMarks - (cellQuotas.get(toKey) ?? 0));
                const after = Math.abs(fromMarks - 1 - (cellQuotas.get(fromKey) ?? 0))
                    + Math.abs(toMarks + 1 - (cellQuotas.get(toKey) ?? 0));
                return { field, fieldIndex, from, to, cost: after - before };
            });
        }));
        const move = candidates.sort((a, b) => a.cost - b.cost
            || a.fieldIndex - b.fieldIndex
            || OUTCOME_STATUSES.indexOf(a.from) - OUTCOME_STATUSES.indexOf(b.from)
            || OUTCOME_STATUSES.indexOf(a.to) - OUTCOME_STATUSES.indexOf(b.to))[0];
        if (!move) throw new Error("Unable to reconcile outcome particle totals");
        const fromKey = `${move.field.key}|${move.from}`;
        const toKey = `${move.field.key}|${move.to}`;
        cellMarks.set(fromKey, (cellMarks.get(fromKey) ?? 0) - 1);
        cellMarks.set(toKey, (cellMarks.get(toKey) ?? 0) + 1);
    }

    const particles: OutcomeParticle[] = [];
    fields.forEach((field) => {
        OUTCOME_STATUSES.forEach((status) => {
            const count = cellMarks.get(`${field.key}|${status}`) ?? 0;
            for (let index = 0; index < count; index += 1) {
                particles.push({ id: particles.length, field: field.key, status });
            }
        });
    });
    if (particles.length !== markCount) throw new Error(`Expected ${markCount} outcome particles`);
    return particles;
};

