export type DegreeKey = "bachelors" | "masters" | "doctorate";

export type WorkSettingKey =
    | "other-named-employer"
    | "university-research"
    | "nonprofit-health"
    | "government"
    | "employer-not-reported";

export interface GroupRow<Key extends string = string> {
    key: Key;
    label: string;
    people: number;
}

export interface FieldGroupRow extends GroupRow {
    shortLabel: string;
    color: string;
    includedFieldLabels: string[];
}

export type OutcomeStatus = "continue" | "stop" | "unknown";

export interface OutcomeParticle {
    id: number;
    field: string;
    status: OutcomeStatus;
}

export interface FeeOutcomeRow {
    key: string;
    totalPeople: number;
    matchedPeople: number;
    continuesPeople: number;
    doesNotContinuePeople: number;
    unknownPeople: number;
}

export interface FeeScenario {
    feeUsd: number;
    continuesPeople: number;
    doesNotContinuePeople: number;
    unknownPeople: number;
    feePaymentsUsd: number;
    representedCompensationUsd: number;
    outcomes: {
        fields: FeeOutcomeRow[];
        occupationFamilies: FeeOutcomeRow[];
        workSettings: FeeOutcomeRow[];
    };
}

export interface ProgramPoint {
    school: string;
    degree: string;
    cip: string;
    major: string;
    expectedCompleters: number;
    optWithin60: number;
    share60Pct: number;
}

export interface OptMark {
    id: number;
    degree: DegreeKey;
    field: string;
    workSetting: WorkSettingKey;
    isExplicitPostdoc: boolean;
    occupationFamily: string;
    benchmarkCompensationUsd: number | null;
}

export interface OptStoryData {
    schemaVersion: 7;
    meta: {
        fiscalYear: number;
        defaultFeeUsd: number;
        feeMinUsd: number;
        feeMaxUsd: number;
        feeStepUsd: number;
        totalEntrants: number;
        defaultGrossExposureUsd: number;
        optMarkCount: number;
        approximatePeoplePerOptMark: number;
        knownCompensationPeople: number;
        unknownCompensationPeople: number;
    };
    openingPopulation: {
        people: number;
        markCount: number;
        optMarkCount: number;
    };
    cohort: {
        degreeGroups: GroupRow<DegreeKey>[];
        fieldGroups: FieldGroupRow[];
        workSettings: GroupRow<WorkSettingKey>[];
        flows: Array<{
            degree: DegreeKey;
            field: string;
            workSetting: WorkSettingKey;
            isExplicitPostdoc: boolean;
            people: number;
        }>;
        marks: OptMark[];
        postdocsWithinDoctorate: number;
        initialPostdocPeople: number;
    };
    compensation: {
        feeScenarios: FeeScenario[];
        occupationFamilies: string[];
        comparisons: {
            asha: { wageUsd: number; totalCompensationUsd: number };
            lin: { salaryUsd: number; totalCompensationUsd: number };
        };
    };
    studentPaid: { tuitionUsd: number; reportedFundingUsd: number };
    postdocContext: {
        academicSehPostdocs: number;
        federalPrimarySupport: number;
        federalPrimarySupportPct: number;
    };
    organizations: {
        schoolsByEntrants: Array<{ name: string; people: number }>;
        employersByEntrants: Array<{ name: string; people: number }>;
        unknownEmployerPeople: number;
    };
    schoolPrograms: {
        scatter: ProgramPoint[];
        ranked: ProgramPoint[];
        sensitivity: { additionalAt90: number };
        definition: string;
    };
    methods: {
        sources: Array<{
            source_id: string;
            publisher: string;
            dataset: string;
            vintage: string;
            url: string;
            limitations: string;
        }>;
        compensationCoverage: Array<Record<string, unknown>>;
        [key: string]: unknown;
    };
}

export type CompactMark = [
    id: number,
    degree: DegreeKey,
    field: string,
    workSetting: WorkSettingKey,
    isPostdoc: 0 | 1,
    occupationFamily: string,
    benchmarkCompensationUsd: number | null,
];

export type CompactFlow = [DegreeKey, WorkSettingKey, number];

export type CompactProgramPoint = [
    school: string,
    degree: string,
    cip: string,
    major: string,
    expectedCompleters: number,
    optWithin60: number,
    share60Pct: number,
];

export interface OptStoryClientData {
    schemaVersion: 7;
    meta: OptStoryData["meta"];
    openingPopulation: OptStoryData["openingPopulation"];
    degreeGroups: GroupRow<DegreeKey>[];
    fieldGroups: FieldGroupRow[];
    workSettings: GroupRow<WorkSettingKey>[];
    marks: CompactMark[];
    flows: CompactFlow[];
    feeScenarios: FeeScenario[];
    comparisons: OptStoryData["compensation"]["comparisons"];
    programs: CompactProgramPoint[];
}

export interface OptStoryMobileViewModel {
    defaultScenario: FeeScenario;
    fieldKeys: string[];
    fieldLabels: Record<string, string>;
    degreeLabels: Record<string, string>;
    settingLabels: Record<string, string>;
    degreeFieldPeople: Record<string, number>;
    sankeyFlows: Array<{
        degree: string;
        setting: string;
        people: number;
        path: string;
        width: number;
    }>;
    sankeyMarks: Array<{
        field: string;
        workSetting: string;
        x: number;
        y: number;
    }>;
    comparisonScale: number;
    minProgramShare: number;
    organizationPanels: Array<{
        id: string;
        labelledby: string;
        rows: Array<{ name: string; people: number }>;
        maximum: number;
    }>;
}
