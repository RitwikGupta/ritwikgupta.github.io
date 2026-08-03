import type { OptStoryData, OptStoryMobileViewModel } from "../types/opt-story";

const degreeConnectionPoints: Record<string, { x: number; y: number }> = {
    bachelors: { x: 58, y: 48 },
    masters: { x: 180, y: 48 },
    doctorate: { x: 302, y: 48 },
};

const settingConnectionPoints: Record<string, { x: number; y: number }> = {
    "other-named-employer": { x: 48, y: 252 },
    "university-research": { x: 180, y: 252 },
    "nonprofit-health": { x: 312, y: 252 },
    government: { x: 100, y: 342 },
    "employer-not-reported": { x: 270, y: 342 },
};

const sankeyCenter = { x: 180, y: 164 };

const cubicPoint = (
    start: { x: number; y: number },
    control1: { x: number; y: number },
    control2: { x: number; y: number },
    end: { x: number; y: number },
    progress: number,
) => {
    const inverse = 1 - progress;
    return {
        x: inverse ** 3 * start.x + 3 * inverse ** 2 * progress * control1.x + 3 * inverse * progress ** 2 * control2.x + progress ** 3 * end.x,
        y: inverse ** 3 * start.y + 3 * inverse ** 2 * progress * control1.y + 3 * inverse * progress ** 2 * control2.y + progress ** 3 * end.y,
    };
};

const pointOnSankeyRoute = (degree: string, setting: string, progress: number) => {
    const start = degreeConnectionPoints[degree];
    const end = settingConnectionPoints[setting];
    if (progress <= 0.5) {
        return cubicPoint(start, { x: start.x, y: 98 }, { x: 150, y: 126 }, sankeyCenter, progress * 2);
    }
    return cubicPoint(sankeyCenter, { x: 210, y: 202 }, { x: end.x, y: end.y - 42 }, end, (progress - 0.5) * 2);
};

export const buildOptStoryMobileView = (storyData: OptStoryData): OptStoryMobileViewModel => {
    const defaultScenario = storyData.compensation.feeScenarios.find(
        (row) => row.feeUsd === storyData.meta.defaultFeeUsd,
    );
    if (!defaultScenario) throw new Error("Missing default OPT fee scenario");

    const degreeFieldPeople: Record<string, number> = {};
    const collapsedFlows = new Map<string, number>();
    for (const flow of storyData.cohort.flows) {
        const degreeFieldKey = `${flow.degree}|${flow.field}`;
        degreeFieldPeople[degreeFieldKey] = (degreeFieldPeople[degreeFieldKey] ?? 0) + flow.people;
        const flowKey = `${flow.degree}|${flow.workSetting}`;
        collapsedFlows.set(flowKey, (collapsedFlows.get(flowKey) ?? 0) + flow.people);
    }

    const flowRows = Array.from(collapsedFlows, ([key, people]) => {
        const [degree, setting] = key.split("|");
        return { degree, setting, people };
    });
    const maxFlow = Math.max(...flowRows.map((row) => row.people));
    const sankeyFlows = flowRows.map((row) => {
        const start = degreeConnectionPoints[row.degree];
        const end = settingConnectionPoints[row.setting];
        return {
            ...row,
            path: `M${start.x},${start.y} C${start.x},98 150,126 ${sankeyCenter.x},${sankeyCenter.y} C210,202 ${end.x},${end.y - 42} ${end.x},${end.y}`,
            width: Math.max(1, 16 * Math.sqrt(row.people / maxFlow)),
        };
    });

    const sankeyMarks = storyData.cohort.workSettings.flatMap((setting) => {
        const marks = storyData.cohort.marks.filter((mark) => mark.workSetting === setting.key);
        const sampleCount = setting.key === "government"
            ? marks.length
            : Math.min(marks.length, Math.max(2, Math.round(marks.length / 9)));
        return Array.from({ length: sampleCount }, (_, index) => {
            const mark = marks[Math.min(marks.length - 1, Math.floor((index + 0.5) * marks.length / sampleCount))];
            const progress = setting.key === "government"
                ? 0.56 + 0.38 * ((index + 0.5) / sampleCount)
                : 0.08 + 0.84 * ((index + 0.5) / sampleCount);
            return { field: mark.field, workSetting: mark.workSetting, ...pointOnSankeyRoute(mark.degree, mark.workSetting, progress) };
        });
    });

    const maxSchool = Math.max(...storyData.organizations.schoolsByEntrants.map((row) => row.people));
    const maxEmployer = Math.max(...storyData.organizations.employersByEntrants.map((row) => row.people));

    return {
        defaultScenario,
        fieldKeys: storyData.cohort.fieldGroups.map((row) => row.key),
        fieldLabels: Object.fromEntries(storyData.cohort.fieldGroups.map((row) => [row.key, row.label])),
        degreeLabels: Object.fromEntries(storyData.cohort.degreeGroups.map((row) => [row.key, row.label])),
        settingLabels: Object.fromEntries(storyData.cohort.workSettings.map((row) => [row.key, row.label])),
        degreeFieldPeople,
        sankeyFlows,
        sankeyMarks,
        comparisonScale: 200_000,
        minProgramShare: Math.min(...storyData.schoolPrograms.scatter.map((row) => row.share60Pct)),
        organizationPanels: [
            {
                id: "mobile-schools-panel",
                labelledby: "mobile-schools-tab",
                rows: storyData.organizations.schoolsByEntrants.slice(0, 7),
                maximum: maxSchool,
            },
            {
                id: "mobile-employers-panel",
                labelledby: "mobile-employers-tab",
                rows: storyData.organizations.employersByEntrants.slice(0, 7),
                maximum: maxEmployer,
            },
        ],
    };
};
