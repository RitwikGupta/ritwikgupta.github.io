import * as d3 from "d3";
import type {
    DegreeKey,
    FeeOutcomeRow,
    OptMark,
    OptStoryClientData,
    ProgramPoint,
    WorkSettingKey,
} from "../types/opt-story";
import { initializeMobileStory, type MobileStoryController } from "./opt-story-mobile";

type SceneKey =
    | "graduates"
    | "orientation"
    | "opt"
    | "composition"
    | "connections"
    | "workers"
    | "evidence"
    | "value"
    | "gate"
    | "student"
    | "threshold"
    | "impacts"
    | "settings"
    | "organizations"
    | "programs"
    | "alternatives"
    | "ending"
    | "conclusion";

type Classification = "continue" | "stop" | "unknown";
type SummaryDimension = "fields" | "occupationFamilies" | "workSettings";

interface DesktopStoryController {
    activate: () => void;
    deactivate: () => void;
    renderFee: (feeUsd: number) => void;
    renderScene: (scene: SceneKey, animate?: boolean) => void;
    destroy: () => void;
}

const initializeDesktopStory = (
    root: HTMLElement,
    data: OptStoryClientData,
    initialFeeUsd: number,
): DesktopStoryController => {
    const marks: OptMark[] = data.marks.map((row) => ({
        id: row[0],
        degree: row[1],
        field: row[2],
        workSetting: row[3],
        isExplicitPostdoc: row[4] === 1,
        occupationFamily: row[5],
        benchmarkCompensationUsd: row[6],
    }));
    const programs: ProgramPoint[] = data.programs.map((row) => ({
        school: row[0],
        degree: row[1],
        cip: row[2],
        major: row[3],
        expectedCompleters: row[4],
        optWithin60: row[5],
        share60Pct: row[6],
    }));
    const flows = data.flows.map((row) => ({ degree: row[0], workSetting: row[1], people: row[2] }));

    const circleLayer = d3.select<SVGGElement, unknown>(root.querySelector<SVGGElement>("[data-circle-layer]")!);
    const ribbonLayer = d3.select<SVGGElement, unknown>(root.querySelector<SVGGElement>("[data-ribbon-layer]")!);
    const orientationLayer = d3.select<SVGGElement, unknown>(root.querySelector<SVGGElement>("[data-orientation-layer]")!);
    const annotationLayer = d3.select<SVGGElement, unknown>(root.querySelector<SVGGElement>("[data-annotation-layer]")!);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const formatNumber = new Intl.NumberFormat("en-US");
    const formatMoney = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });
    const stage = root.querySelector<HTMLElement>("[data-story-stage]")!;

    const degreeY: Record<DegreeKey, number> = { bachelors: 155, masters: 350, doctorate: 545 };
    const settingY: Record<WorkSettingKey, number> = {
        "other-named-employer": 125,
        "university-research": 250,
        "nonprofit-health": 365,
        government: 475,
        "employer-not-reported": 590,
    };
    const fieldColors: Record<string, string> = {
        "computer-science": "var(--field-computer-science)",
        business: "var(--field-business)",
        engineering: "var(--field-engineering)",
        "social-science": "var(--field-social-science)",
        mathematics: "var(--field-mathematics)",
        "biological-science": "var(--field-biological-science)",
        "physical-science": "var(--field-physical-science)",
        other: "var(--field-other)",
    };

    const openingMarks = d3.range(data.openingPopulation.markCount).map((id) => ({
        id,
        opt: id < data.meta.optMarkCount ? marks[id] : null,
    }));
    const circles = circleLayer
        .selectAll<SVGCircleElement, (typeof openingMarks)[number]>("circle")
        .data(openingMarks)
        .join("circle");
    const characters = {
        asha: d3.select<SVGGElement, unknown>(root.querySelector<SVGGElement>('[data-character="asha"]')!),
        lin: d3.select<SVGGElement, unknown>(root.querySelector<SVGGElement>('[data-character="lin"]')!),
    };

    const degreeLocals = new Map<number, number>();
    (Object.keys(degreeY) as DegreeKey[]).forEach((degree) => {
        marks.filter((mark) => mark.degree === degree).forEach((mark, index) => degreeLocals.set(mark.id, index));
    });
    const flowKey = (mark: OptMark) => `${mark.degree}|${mark.workSetting}`;
    const flowLocals = new Map<number, number>();
    const flowCounts = new Map<string, number>();
    const stableHash = (id: number) => {
        let value = id + 0x9e3779b9;
        value = Math.imul(value ^ (value >>> 16), 0x85ebca6b);
        value = Math.imul(value ^ (value >>> 13), 0xc2b2ae35);
        return (value ^ (value >>> 16)) >>> 0;
    };
    d3.group(marks, flowKey).forEach((groupedMarks, key) => {
        const ordered = groupedMarks.slice().sort((a, b) => stableHash(a.id) - stableHash(b.id));
        flowCounts.set(key, ordered.length);
        ordered.forEach((mark, index) => flowLocals.set(mark.id, index));
    });

    const grid = (index: number, columns: number, x: number, y: number, gapX: number, gapY: number) => ({
        x: x + (index % columns) * gapX,
        y: y + Math.floor(index / columns) * gapY,
    });
    const openingPoint = (id: number) => grid(id, 59, 58, 105, 15.05, 12.3);
    const degreePoint = (mark: OptMark) => grid(
        degreeLocals.get(mark.id) || 0,
        54,
        105,
        degreeY[mark.degree] - 48,
        14.4,
        10.2,
    );
    const cubicPoint = (
        p0: [number, number],
        p1: [number, number],
        p2: [number, number],
        p3: [number, number],
        t: number,
    ) => {
        const mt = 1 - t;
        return {
            x: mt ** 3 * p0[0] + 3 * mt ** 2 * t * p1[0] + 3 * mt * t ** 2 * p2[0] + t ** 3 * p3[0],
            y: mt ** 3 * p0[1] + 3 * mt ** 2 * t * p1[1] + 3 * mt * t ** 2 * p2[1] + t ** 3 * p3[1],
        };
    };
    const cubicTangent = (
        p0: [number, number],
        p1: [number, number],
        p2: [number, number],
        p3: [number, number],
        t: number,
    ) => {
        const mt = 1 - t;
        return {
            x: 3 * mt ** 2 * (p1[0] - p0[0]) + 6 * mt * t * (p2[0] - p1[0]) + 3 * t ** 2 * (p3[0] - p2[0]),
            y: 3 * mt ** 2 * (p1[1] - p0[1]) + 6 * mt * t * (p2[1] - p1[1]) + 3 * t ** 2 * (p3[1] - p2[1]),
        };
    };
    const flowPoint = (mark: OptMark) => {
        const key = flowKey(mark);
        const count = flowCounts.get(key) || 1;
        const index = flowLocals.get(mark.id) || 0;
        const share = (index + 0.5) / count;
        const t = mark.workSetting === "government" ? 0.54 + 0.42 * share : 0.04 + 0.92 * share;
        const left: [[number, number], [number, number], [number, number], [number, number]] = [
            [160, degreeY[mark.degree]], [320, degreeY[mark.degree]], [390, 340], [500, 340],
        ];
        const right: [[number, number], [number, number], [number, number], [number, number]] = [
            [500, 340], [610, 340], [680, settingY[mark.workSetting]], [840, settingY[mark.workSetting]],
        ];
        const segment = t < 0.5 ? left : right;
        const u = t < 0.5 ? t * 2 : (t - 0.5) * 2;
        const point = cubicPoint(...segment, u);
        const tangent = cubicTangent(...segment, u);
        const length = Math.hypot(tangent.x, tangent.y) || 1;
        const offset = ((((mark.id * 17) % 9) - 4) / 4) * Math.min(5.5, 1.8 + Math.sqrt(count) / 5);
        return {
            x: point.x - tangent.y / length * offset,
            y: point.y + tangent.x / length * offset,
        };
    };

    const state: { scene: SceneKey; feeUsd: number } = {
        scene: "graduates",
        feeUsd: initialFeeUsd,
    };
    const feeScenario = () => data.feeScenarios.find((row) => row.feeUsd === state.feeUsd)!;
    const classification = (compensation: number | null): Classification => (
        compensation == null ? "unknown" : compensation >= state.feeUsd ? "continue" : "stop"
    );
    const markClassIndexes = () => {
        const indexes = {
            continue: new Map<number, number>(),
            stop: new Map<number, number>(),
            unknown: new Map<number, number>(),
        };
        const counts = { continue: 0, stop: 0, unknown: 0 };
        marks.forEach((mark) => {
            const key = classification(mark.benchmarkCompensationUsd);
            indexes[key].set(mark.id, counts[key]++);
        });
        return indexes;
    };
    const thresholdPoint = (mark: OptMark) => {
        const indexes = markClassIndexes();
        const key = classification(mark.benchmarkCompensationUsd);
        const index = indexes[key].get(mark.id) || 0;
        if (key === "continue") return { ...grid(index, 30, 605, 175, 11, 10.5), key };
        if (key === "stop") return { ...grid(index, 30, 65, 175, 11, 10.5), key };
        return { ...grid(index, 90, 62, 535, 9.7, 9.2), key };
    };

    const sceneText: Record<SceneKey, { eyebrow: string; title: string; description: string }> = {
        graduates: {
            eyebrow: "Nonresident degrees · 2021–22",
            title: `${formatNumber.format(data.openingPopulation.people)} degrees`,
            description: `About ${formatNumber.format(data.openingPopulation.markCount)} circles represent nonresident bachelor's, master's, and doctoral degrees.`,
        },
        orientation: {
            eyebrow: "From a U.S. degree to U.S. work",
            title: "How OPT works",
            description: "Post-completion OPT gives eligible F-1 students temporary permission to work in jobs related to their degree; this story examines initial OPT entry.",
        },
        opt: {
            eyebrow: `Initial post-completion OPT · FY${data.meta.fiscalYear}`,
            title: `${formatNumber.format(data.meta.totalEntrants)} entrants`,
            description: `One contiguous highlighted block represents the FY${data.meta.fiscalYear} initial OPT flow.`,
        },
        composition: { eyebrow: "Degree lanes · field color", title: "Who enters OPT", description: "The same cohort is arranged by degree and colored by broad field." },
        connections: { eyebrow: "Degree → initial OPT → work setting", title: "What OPT connects", description: "Particles follow faint proportional ribbons toward employer-name-inferred settings." },
        workers: { eyebrow: "American workers", title: "Does OPT displace American talent?", description: "An international graduate may compete with an American applicant for a particular job." },
        evidence: { eyebrow: "What research finds", title: "Effects in both directions", description: "Studies find modest costs for some workers alongside growth in domestic STEM employment and education." },
        value: { eyebrow: "Before the fee", title: "Two compensation tracks", description: "Software compensation and estimated postdoc compensation are shown on the same scale." },
        gate: { eyebrow: "A variable charge", title: "The fee at the crossing", description: "The entire cohort stops at the selected fee before the employer scenario is applied." },
        student: { eyebrow: "If the student pays", title: "The fee versus prior costs", description: "The selected fee is compared with reported master's tuition and one year of Form I-20 financial resources." },
        threshold: { eyebrow: "Employer decision", title: "Set the OPT fee", description: `The scenario covers ${formatNumber.format(data.meta.knownCompensationPeople)} entrants with an occupation or broader occupation-family benchmark.` },
        impacts: { eyebrow: "Who would continue", title: "Fields and occupations", description: "Among jobs with compensation estimates, different fee levels change the mix of fields and occupations that would continue." },
        settings: { eyebrow: "Who would continue", title: "Employer settings", description: "Among jobs with compensation estimates, the same fee has different consequences across workplace settings." },
        organizations: { eyebrow: "Observed FY2022 counts", title: "Schools and employers", description: "Static rankings show raw exposure counts only." },
        programs: { eyebrow: "SEVIS expected-completion records", title: "Program rate versus size", description: "School-program cohort size is plotted against first post-completion OPT within 60 days." },
        alternatives: { eyebrow: "Possible, not predicted", title: "Other pathways", description: "Potential alternatives are shown without substitution probabilities." },
        ending: { eyebrow: "Measured exposure · selected fee", title: "The line you drew", description: "The final split applies the selected fee to compensation benchmarks." },
        conclusion: { eyebrow: "The talent America keeps", title: "America has already invested in this talent", description: "American universities have welcomed and trained these graduates. Retaining them and developing American talent strengthen the same workforce." },
    };

    const addText = (
        x: number,
        y: number,
        text: string,
        className = "annotation",
        anchor: "start" | "middle" | "end" = "start",
    ) => annotationLayer.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("class", className)
        .attr("text-anchor", anchor)
        .text(text);

    const drawOrientation = () => {
        const mobile = window.innerWidth <= 700;
        orientationLayer.attr("class", mobile ? "orientation-layer orientation-layer--mobile" : "orientation-layer");
        const defs = orientationLayer.append("defs");
        defs.append("marker")
            .attr("id", "opt-orientation-arrow")
            .attr("viewBox", "0 -4 8 8")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-4L8,0L0,4Z")
            .attr("class", "orientation-arrow");
        defs.append("marker")
            .attr("id", "opt-orientation-arrow-secondary")
            .attr("viewBox", "0 -4 8 8")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-4L8,0L0,4Z")
            .attr("class", "orientation-arrow orientation-arrow--secondary");
        const link = (d: string, secondary = false) => orientationLayer.append("path")
            .attr("d", d)
            .attr("class", secondary ? "orientation-link orientation-link--secondary" : "orientation-link")
            .attr("marker-end", secondary ? "url(#opt-orientation-arrow-secondary)" : "url(#opt-orientation-arrow)");
        const box = (
            x: number,
            y: number,
            width: number,
            height: number,
            titleLines: string[],
            detailLines: string[],
            modifier = "",
        ) => {
            const group = orientationLayer.append("g")
                .attr("transform", `translate(${x},${y})`)
                .attr("class", `orientation-station ${modifier}`.trim());
            group.append("rect")
                .attr("x", -width / 2)
                .attr("y", -height / 2)
                .attr("width", width)
                .attr("height", height)
                .attr("rx", mobile ? 22 : 16)
                .attr("class", "orientation-box");
            const titleLineHeight = mobile ? 29 : 18;
            const detailLineHeight = mobile ? 24 : 15;
            const detailGap = mobile ? 8 : 7;
            const contentHeight = titleLines.length * titleLineHeight + (detailLines.length ? detailGap + detailLines.length * detailLineHeight : 0);
            const titleStart = mobile
                ? -contentHeight / 2 + titleLineHeight * 0.78
                : detailLines.length ? -17 - (titleLines.length - 1) * 9 : -(titleLines.length - 1) * 9;
            const title = group.append("text")
                .attr("x", 0)
                .attr("y", titleStart)
                .attr("text-anchor", "middle")
                .attr("class", "orientation-title");
            titleLines.forEach((line, index) => title.append("tspan").attr("x", 0).attr("dy", index ? titleLineHeight : 0).text(line));
            const detailStart = titleStart + titleLines.length * titleLineHeight + detailGap;
            const detail = group.append("text")
                .attr("x", 0)
                .attr("y", detailStart)
                .attr("text-anchor", "middle")
                .attr("class", "orientation-detail");
            detailLines.forEach((line, index) => detail.append("tspan").attr("x", 0).attr("dy", index ? detailLineHeight : 0).text(line));
        };

        if (mobile) {
            link("M500,110 L500,130");
            link("M500,220 L500,260");
            link("M500,380 L500,405");
            link("M500,505 L500,555", true);
            box(500, 65, 620, 90, ["F-1 student"], ["studying at a U.S. school"]);
            box(500, 175, 620, 90, ["U.S. degree"], ["program completed"]);
            box(500, 320, 620, 120, ["Initial post-completion OPT"], ["temporary work authorization", "up to 12 months"], "orientation-station--opt");
            box(500, 455, 620, 100, ["Job or research appointment"], ["work related to the degree"]);
            box(500, 615, 620, 120, ["STEM extension"], ["some graduates", "up to 24 additional months"], "orientation-station--secondary");
            orientationLayer.append("circle").attr("cx", 500).attr("cy", 120).attr("r", 12).attr("class", "orientation-dot");
        } else {
            link("M205,310 L255,310");
            link("M435,310 L545,310");
            link("M725,310 L795,310");
            link("M885,365 L885,460", true);
            box(115, 310, 180, 110, ["F-1 student"], ["studying at a", "U.S. school"]);
            box(345, 310, 180, 110, ["U.S. degree"], ["program completed"]);
            box(635, 310, 180, 110, ["Initial post-completion", "OPT"], ["temporary work authorization", "up to 12 months"], "orientation-station--opt");
            box(885, 310, 180, 110, ["Job or research", "appointment"], ["work related to the degree"]);
            box(885, 515, 220, 100, ["STEM extension"], ["some graduates", "up to 24 additional months"], "orientation-station--secondary");
            orientationLayer.append("circle").attr("cx", 480).attr("cy", 310).attr("r", 8).attr("class", "orientation-dot");
        }
    };

    const drawGate = () => {
        annotationLayer.append("line")
            .attr("x1", 500).attr("x2", 500).attr("y1", 95).attr("y2", 505)
            .attr("class", "fee-gate");
        addText(500, 74, `${formatMoney.format(state.feeUsd)} FEE`, "gate-label", "middle");
    };
    const drawDegreeLabels = () => data.degreeGroups.forEach((row) => {
        addText(36, degreeY[row.key] - 58, row.label.toUpperCase(), "lane-label");
        addText(965, degreeY[row.key] - 58, formatNumber.format(row.people), "lane-count", "end");
    });
    const drawConnectionLabels = () => {
        data.degreeGroups.forEach((row) => {
            addText(32, degreeY[row.key] - 10, row.label, "flow-label");
            addText(32, degreeY[row.key] + 12, formatNumber.format(row.people), "flow-count");
        });
        addText(500, 285, "INITIAL OPT", "gate-node", "middle");
        data.workSettings.forEach((row) => {
            addText(970, settingY[row.key] - 5, row.label, "flow-label", "end");
            addText(970, settingY[row.key] + 16, formatNumber.format(row.people), "flow-count", "end");
        });
    };
    const drawFeeLabels = () => {
        drawGate();
        addText(275, 120, "WOULD NOT CONTINUE", "side-label", "middle");
        addText(730, 120, "WOULD CONTINUE", "side-label", "middle");
        addText(500, 525, `${formatNumber.format(data.meta.knownCompensationPeople)} ENTRANTS WITH COMPENSATION ESTIMATES`, "chart-kicker", "middle");
    };

    const outcomeRows = (dimension: SummaryDimension): FeeOutcomeRow[] => feeScenario().outcomes[dimension];
    const summarize = (dimension: SummaryDimension) => outcomeRows(dimension)
        .filter((row) => row.matchedPeople > 0)
        .map((row) => ({
            key: row.key,
            continue: row.continuesPeople,
            stop: row.doesNotContinuePeople,
            total: row.matchedPeople,
        }))
        .sort((a, b) => b.total - a.total);
    const displayLabel = (key: string) => (
        data.fieldGroups.find((row) => row.key === key)?.label
        || data.workSettings.find((row) => row.key === key)?.label
        || (key === "other-occupation-families" ? "Other occupation families" : key)
    );
    const drawStackedRows = (
        rows: ReturnType<typeof summarize>,
        x: number,
        y: number,
        width: number,
        labelX: number,
        rowHeight: number,
        maxRows: number,
        title: string,
    ) => {
        addText(x, y - 25, title.toUpperCase(), "chart-kicker");
        addText(labelX, y - 25, "WOULD CONTINUE", "chart-kicker", "end");
        const visibleRows = rows.length > maxRows
            ? [
                ...rows.slice(0, maxRows - 1),
                rows.slice(maxRows - 1).reduce((other, row) => ({
                    key: "other-occupation-families",
                    continue: other.continue + row.continue,
                    stop: other.stop + row.stop,
                    total: other.total + row.total,
                }), { key: "other-occupation-families", continue: 0, stop: 0, total: 0 }),
            ]
            : rows;
        const scale = d3.scaleLinear()
            .domain([0, Math.max(...visibleRows.map((item) => item.total))])
            .range([0, width]);
        visibleRows.forEach((row, index) => {
            const yy = y + index * rowHeight;
            addText(x, yy, displayLabel(row.key), "bar-label");
            let cursor = x;
            (["continue", "stop"] as const).forEach((key) => {
                annotationLayer.append("rect")
                    .attr("x", cursor)
                    .attr("y", yy + 9)
                    .attr("width", scale(row[key]))
                    .attr("height", 12)
                    .attr("class", `stack stack--${key}`);
                cursor += scale(row[key]);
            });
            const label = addText(labelX, yy + 20, formatNumber.format(row.continue), "bar-count", "end");
            label.append("title").text(`${displayLabel(row.key)}: ${formatNumber.format(row.total)} job records with compensation estimates; ${formatNumber.format(row.continue)} would continue; ${formatNumber.format(row.stop)} would not continue.`);
        });
    };
    const drawOutcomeLegend = (x: number, y: number) => {
        annotationLayer.append("rect").attr("x", x).attr("y", y - 9).attr("width", 12).attr("height", 12).attr("rx", 2).attr("class", "stack--continue");
        addText(x + 19, y + 1, "Would continue", "legend-label");
        annotationLayer.append("rect").attr("x", x + 132).attr("y", y - 9).attr("width", 12).attr("height", 12).attr("rx", 2).attr("class", "stack--stop");
        addText(x + 151, y + 1, "Would not continue", "legend-label");
    };
    const drawImpacts = () => {
        drawStackedRows(summarize("fields"), 45, 105, 285, 465, 60, 8, "Major field");
        drawStackedRows(summarize("occupationFamilies"), 535, 105, 275, 955, 60, 8, "Occupation family");
        drawOutcomeLegend(365, 620);
    };
    const drawSettings = () => {
        drawStackedRows(summarize("workSettings"), 115, 155, 560, 885, 82, 5, "Employer-name-inferred setting");
        drawOutcomeLegend(365, 610);
    };

    const ribbonWidth = d3.scaleSqrt()
        .domain([0, d3.max(flows, (row) => row.people) || 1])
        .range([0.6, 25]);
    const ribbons = ribbonLayer
        .selectAll<SVGPathElement, (typeof flows)[number]>("path")
        .data(flows)
        .join("path")
        .attr("d", (row) => `M160,${degreeY[row.degree]} C320,${degreeY[row.degree]} 390,340 500,340 C610,340 680,${settingY[row.workSetting]} 840,${settingY[row.workSetting]}`)
        .attr("stroke-width", (row) => ribbonWidth(row.people))
        .attr("fill", "none")
        .attr("stroke", "var(--ribbon)")
        .attr("opacity", 0);

    let bindProgramScatter = () => {};
    let unbindProgramScatter = () => {};
    const scatter = d3.select<SVGSVGElement, unknown>(root.querySelector<SVGSVGElement>("[data-program-scatter]")!);
    if (!scatter.empty()) {
        const tooltip = root.querySelector<HTMLElement>("[data-program-tooltip]")!;
        const sx = d3.scaleSqrt()
            .domain([50, d3.max(programs, (row) => row.expectedCompleters) || 50])
            .range([55, 495]);
        const minShare = d3.min(programs, (row) => row.share60Pct) ?? 0;
        const sy = d3.scaleLinear().domain([minShare, 100]).range([305, 25]).clamp(true);
        const yTicks = Array.from(new Set([minShare, ...sy.ticks(5), 100]))
            .filter((value) => value >= minShare && value <= 100)
            .sort((a, b) => a - b);
        scatter.append("g")
            .attr("transform", "translate(0,305)")
            .call(d3.axisBottom(sx).ticks(4).tickFormat(d3.format("~s")))
            .attr("class", "scatter-axis");
        scatter.append("g")
            .attr("transform", "translate(55,0)")
            .call(d3.axisLeft(sy).tickValues(yTicks).tickFormat((value) => `${d3.format("~g")(Number(value))}%`))
            .attr("class", "scatter-axis");
        if (minShare > 0) {
            scatter.append("path")
                .attr("d", "M50,310 l10,-8 M50,302 l10,-8")
                .attr("class", "scatter-axis-break");
        }
        const showProgram = (dot: SVGCircleElement, row: ProgramPoint) => {
            const dotBox = dot.getBoundingClientRect();
            const hostBox = tooltip.parentElement!.getBoundingClientRect();
            tooltip.textContent = `${row.school}\n${row.degree} · ${row.major}\n${formatNumber.format(row.optWithin60)} of ${formatNumber.format(row.expectedCompleters)} entered OPT within 60 days (${row.share60Pct.toFixed(1)}%)`;
            tooltip.style.left = `${Math.max(100, Math.min(hostBox.width - 100, dotBox.left - hostBox.left + dotBox.width / 2))}px`;
            tooltip.style.top = `${Math.max(70, dotBox.top - hostBox.top - 8)}px`;
            tooltip.hidden = false;
        };
        const dots = scatter
            .selectAll<SVGCircleElement, ProgramPoint>(".program-dot")
            .data(programs)
            .join("circle")
            .attr("cx", (row) => sx(row.expectedCompleters))
            .attr("cy", (row) => sy(row.share60Pct))
            .attr("r", 3.1)
            .attr("class", (row) => `program-dot program-dot--${row.degree.toLowerCase().replace(/[^a-z]/g, "")}`)
            .attr("aria-hidden", "true");
        dots.append("title").text((row) => `${row.school} — ${row.degree}, ${row.major}: ${row.share60Pct.toFixed(1)}% (${formatNumber.format(row.optWithin60)} of ${formatNumber.format(row.expectedCompleters)})`);
        const eventDot = (event: PointerEvent) => (event.target as Element | null)?.closest<SVGCircleElement>(".program-dot");
        bindProgramScatter = () => {
            scatter
                .on("pointerover.story", (event: PointerEvent) => {
                    const dot = eventDot(event);
                    if (dot) showProgram(dot, d3.select<SVGCircleElement, ProgramPoint>(dot).datum());
                })
                .on("pointerdown.story", (event: PointerEvent) => {
                    const dot = eventDot(event);
                    if (!dot) return;
                    event.preventDefault();
                    showProgram(dot, d3.select<SVGCircleElement, ProgramPoint>(dot).datum());
                })
                .on("pointerout.story", (event: PointerEvent) => {
                    const dot = eventDot(event);
                    const related = event.relatedTarget as Node | null;
                    if (dot && (!related || !dot.contains(related))) tooltip.hidden = true;
                })
                .on("blur.story", () => { tooltip.hidden = true; });
        };
        unbindProgramScatter = () => {
            scatter.on(".story", null);
        };
        scatter.append("text").attr("x", 275).attr("y", 342).attr("text-anchor", "middle").attr("class", "scatter-label").text("Expected-completion records");
        scatter.append("text").attr("transform", "rotate(-90)").attr("x", -165).attr("y", 14).attr("text-anchor", "middle").attr("class", "scatter-label").text("Share entering OPT within 60 days");
    }

    const markTarget = (opening: (typeof openingMarks)[number], scene: SceneKey) => {
        const hidden = { x: 500, y: 650, r: 0, opacity: 0, fill: "var(--mark-neutral)" };
        if (scene === "graduates" || scene === "opt") {
            const point = openingPoint(opening.id);
            return {
                ...point,
                r: opening.opt ? 2.5 : 2.15,
                opacity: scene === "graduates" ? 0.72 : opening.opt ? 0.98 : 0.72,
                fill: scene === "opt" && opening.opt ? "var(--opt-highlight)" : "var(--mark-neutral)",
            };
        }
        if (!opening.opt) return hidden;
        if (scene === "composition") {
            return { ...degreePoint(opening.opt), r: 3.1, opacity: 0.94, fill: fieldColors[opening.opt.field] };
        }
        if (scene === "connections" || scene === "workers" || scene === "evidence") {
            return { ...flowPoint(opening.opt), r: 3, opacity: 0.9, fill: fieldColors[opening.opt.field] };
        }
        if (scene === "gate") {
            return { ...grid(opening.opt.id, 42, 68, 155, 9.7, 10.2), r: 2.5, opacity: 0.7, fill: "var(--mark-blocked)" };
        }
        if (scene === "threshold" || scene === "ending" || scene === "conclusion") {
            const point = thresholdPoint(opening.opt);
            if (point.key === "unknown") return hidden;
            return {
                ...point,
                r: 2.7,
                opacity: 0.9,
                fill: point.key === "continue" ? fieldColors[opening.opt.field] : "var(--mark-blocked)",
            };
        }
        return hidden;
    };

    const moveGroup = (
        selection: d3.Selection<SVGGElement, unknown, null, undefined>,
        target: { x: number; y: number; opacity: number },
        animate: boolean,
    ) => {
        selection.interrupt("story");
        if (animate && !reducedMotion.matches) {
            selection.transition("story")
                .duration(520)
                .ease(d3.easeCubicOut)
                .attr("transform", `translate(${target.x},${target.y})`)
                .attr("opacity", target.opacity);
        } else {
            selection.attr("transform", `translate(${target.x},${target.y})`).attr("opacity", target.opacity);
        }
    };
    const heroPositions = (scene: SceneKey) => {
        const hidden = { x: 500, y: 340, opacity: 0 };
        if (scene === "opt") return { asha: { x: 175, y: 82, opacity: 1 }, lin: { x: 225, y: 82, opacity: 1 } };
        if (scene === "composition") return { asha: { x: 925, y: 330, opacity: 1 }, lin: { x: 925, y: 525, opacity: 1 } };
        if (scene === "connections" || scene === "workers" || scene === "evidence") return { asha: { x: 795, y: 92, opacity: 1 }, lin: { x: 795, y: 220, opacity: 1 } };
        if (scene === "gate") return { asha: { x: 480, y: 260, opacity: 1 }, lin: { x: 480, y: 390, opacity: 1 } };
        if (scene === "threshold" || scene === "ending" || scene === "conclusion") {
            const ashaContinues = classification(data.comparisons.asha.totalCompensationUsd) === "continue";
            const linContinues = classification(data.comparisons.lin.totalCompensationUsd) === "continue";
            return {
                asha: { x: ashaContinues ? 730 : 470, y: 245, opacity: 1 },
                lin: { x: linContinues ? 730 : 470, y: 385, opacity: 1 },
            };
        }
        return { asha: hidden, lin: hidden };
    };
    const panelFor = (scene: SceneKey) => (
        ["value", "student", "organizations", "programs", "alternatives"].includes(scene) ? scene : ""
    );

    const render = (scene = state.scene, animate = true) => {
        state.scene = scene;
        const copy = sceneText[scene];
        const selectedFee = formatMoney.format(state.feeUsd);
        root.querySelector<HTMLElement>("[data-stage-eyebrow]")!.textContent = copy.eyebrow;
        root.querySelector<HTMLElement>("[data-stage-title]")!.textContent = scene === "gate"
            ? `A ${selectedFee} fee at the crossing`
            : scene === "student"
                ? `${selectedFee} versus prior costs`
                : scene === "threshold" || scene === "ending"
                    ? `${selectedFee} OPT fee`
                    : copy.title;
        root.querySelector<HTMLElement>("[data-stage-description]")!.textContent = scene === "ending"
            ? `Among benchmarked jobs, ${formatNumber.format(feeScenario().continuesPeople)} would continue and ${formatNumber.format(feeScenario().doesNotContinuePeople)} would not continue.`
            : copy.description;
        root.querySelectorAll<HTMLElement>(".story-step[data-scene]").forEach((step) => {
            step.classList.toggle("is-active", step.dataset.scene === scene);
        });
        stage.dataset.scene = scene;

        const interactive = ["threshold", "impacts", "settings"].includes(scene);
        root.querySelector<HTMLElement>("[data-fee-controls]")!.hidden = !interactive;
        root.querySelector<HTMLElement>("[data-threshold-metrics]")!.hidden = !interactive && scene !== "ending" && scene !== "conclusion";
        root.querySelector<HTMLElement>("[data-field-legend]")!.hidden = !["composition", "connections", "workers", "evidence", "threshold", "ending", "conclusion"].includes(scene);
        root.querySelector<HTMLElement>("[data-cohort-legend]")!.hidden = scene !== "opt";
        root.querySelectorAll<HTMLElement>("[data-panel]").forEach((panel) => {
            panel.hidden = panel.dataset.panel !== panelFor(scene);
        });

        orientationLayer.selectAll("*").remove();
        if (scene === "orientation") drawOrientation();

        const targets = openingMarks.map((mark) => markTarget(mark, scene));
        circles.interrupt("story").attr("fill", (_, index) => targets[index].fill);
        if (animate && !reducedMotion.matches) {
            circles.transition("story")
                .duration(560)
                .ease(d3.easeCubicOut)
                .attr("cx", (_, index) => targets[index].x)
                .attr("cy", (_, index) => targets[index].y)
                .attr("r", (_, index) => targets[index].r)
                .attr("opacity", (_, index) => targets[index].opacity);
        } else {
            circles
                .attr("cx", (_, index) => targets[index].x)
                .attr("cy", (_, index) => targets[index].y)
                .attr("r", (_, index) => targets[index].r)
                .attr("opacity", (_, index) => targets[index].opacity);
        }

        const ribbonOpacity = scene === "connections" || scene === "workers" || scene === "evidence" ? 0.18 : 0;
        ribbons.interrupt("story");
        if (animate && !reducedMotion.matches) {
            ribbons.transition("story").duration(420).attr("opacity", ribbonOpacity);
        } else {
            ribbons.attr("opacity", ribbonOpacity);
        }
        annotationLayer.selectAll("*").remove();
        if (scene === "composition") drawDegreeLabels();
        if (scene === "connections" || scene === "workers" || scene === "evidence") drawConnectionLabels();
        if (scene === "gate") drawGate();
        if (scene === "threshold" || scene === "ending" || scene === "conclusion") drawFeeLabels();
        if (scene === "impacts") drawImpacts();
        if (scene === "settings") drawSettings();

        const heroes = heroPositions(scene);
        moveGroup(characters.asha, heroes.asha, animate);
        moveGroup(characters.lin, heroes.lin, animate);
    };

    let activeScene: SceneKey = "graduates";
    let active = false;
    let scrollFrame = 0;
    const selectSceneFromScroll = (animate = true) => {
        const targetY = window.innerHeight * 0.46;
        const steps = Array.from(root.querySelectorAll<HTMLElement>(".story-step[data-scene]"));
        let nearest = steps[0];
        let distance = Number.POSITIVE_INFINITY;
        steps.forEach((step) => {
            const rect = step.getBoundingClientRect();
            const candidate = Math.abs((rect.top + rect.bottom) / 2 - targetY);
            if (candidate < distance) {
                distance = candidate;
                nearest = step;
            }
        });
        const scene = nearest.dataset.scene as SceneKey;
        if (scene !== activeScene) {
            activeScene = scene;
            render(scene, animate);
        }
    };
    const scheduleSceneSelection = () => {
        if (scrollFrame) return;
        scrollFrame = window.requestAnimationFrame(() => {
            scrollFrame = 0;
            if (active) selectSceneFromScroll(true);
        });
    };
    const handleResize = () => {
        render(state.scene, false);
        selectSceneFromScroll(false);
    };
    const handleReducedMotion = () => render(state.scene, false);
    const activate = () => {
        if (active) return;
        active = true;
        window.addEventListener("scroll", scheduleSceneSelection, { passive: true });
        window.addEventListener("resize", handleResize, { passive: true });
        reducedMotion.addEventListener("change", handleReducedMotion);
        bindProgramScatter();
        render(activeScene, false);
        selectSceneFromScroll(false);
    };
    const deactivate = () => {
        if (!active) return;
        active = false;
        window.removeEventListener("scroll", scheduleSceneSelection);
        window.removeEventListener("resize", handleResize);
        reducedMotion.removeEventListener("change", handleReducedMotion);
        unbindProgramScatter();
        if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
        scrollFrame = 0;
        circles.interrupt("story");
        ribbons.interrupt("story");
        characters.asha.interrupt("story");
        characters.lin.interrupt("story");
    };
    const renderFee = (feeUsd: number) => {
        state.feeUsd = feeUsd;
        if (active) render(state.scene, true);
    };
    const renderScene = (scene: SceneKey, animate = true) => {
        activeScene = scene;
        if (active) render(scene, animate);
    };

    return {
        activate,
        deactivate,
        renderFee,
        renderScene,
        destroy: deactivate,
    };
};

const root = document.querySelector<HTMLElement>("[data-opt-story]");
const dataElement = root?.querySelector<HTMLScriptElement>("#opt-story-data");

if (root && dataElement) {
    const data = JSON.parse(dataElement.textContent || "{}") as OptStoryClientData;
    if (data.schemaVersion !== 6) throw new Error("Unexpected OPT story schema");

    const compactLayout = window.matchMedia("(max-width: 759px), (max-width: 999px) and (max-height: 599px)");
    const formatNumber = new Intl.NumberFormat("en-US");
    const formatMoney = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });
    const formatCompactMoney = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
    });
    let feeUsd = data.meta.defaultFeeUsd;
    let pendingFeeUsd: number | null = null;
    let feeFrame = 0;
    let mode: "desktop" | "mobile" | null = null;
    let desktopStory: DesktopStoryController | null = null;
    let mobileStory: MobileStoryController | null = null;

    const scenarioFor = (fee: number) => {
        const scenario = data.feeScenarios.find((row) => row.feeUsd === fee);
        if (!scenario) throw new Error(`Missing OPT fee scenario for ${fee}`);
        return scenario;
    };
    const setText = (selector: string, value: string) => {
        root.querySelectorAll<HTMLElement>(selector).forEach((element) => { element.textContent = value; });
    };
    const syncSharedFeeUi = () => {
        const scenario = scenarioFor(feeUsd);
        const selectedFee = formatMoney.format(feeUsd);
        root.querySelectorAll<HTMLInputElement>("[data-fee-input]").forEach((input) => {
            if (Number(input.value) !== feeUsd) input.value = String(feeUsd);
        });
        root.querySelectorAll<HTMLOutputElement>("[data-fee-output]").forEach((output) => {
            output.value = selectedFee;
            output.textContent = selectedFee;
        });
        setText("[data-continues]", formatNumber.format(scenario.continuesPeople));
        setText("[data-does-not-continue]", formatNumber.format(scenario.doesNotContinuePeople));
        setText("[data-payments]", formatCompactMoney.format(scenario.feePaymentsUsd));
        setText("[data-compensation]", formatCompactMoney.format(scenario.representedCompensationUsd));
        setText("[data-copy-fee]", selectedFee);
        setText("[data-copy-gross-exposure]", `$${(data.meta.totalEntrants * feeUsd / 1_000_000_000).toFixed(3).replace(/\.?0+$/, "")} billion`);
        setText("[data-copy-ending-outcome]", `${formatNumber.format(scenario.continuesPeople)} would continue and ${formatNumber.format(scenario.doesNotContinuePeople)} would not continue`);

        const biology = scenario.outcomes.fields.find((row) => row.key === "biological-science")!;
        const biologyPricedOutPct = 100 * biology.doesNotContinuePeople / biology.matchedPeople;
        const linContinues = data.comparisons.lin.totalCompensationUsd >= feeUsd;
        setText("[data-copy-lin-outcome]", linContinues
            ? "Dr. Lin's postdoc would remain in the modeled talent pool"
            : "Dr. Lin's postdoc would not continue under the model");
        setText("[data-copy-biology-outcome]", `${biologyPricedOutPct.toFixed(1)}% would not continue`);
        setText("[data-copy-ending-biology]", `Among biology graduates in that group, ${biologyPricedOutPct.toFixed(1)}% would not continue.`);

        const university = scenario.outcomes.workSettings.find((row) => row.key === "university-research")!;
        const industry = scenario.outcomes.workSettings.find((row) => row.key === "other-named-employer")!;
        const universityPricedOutPct = 100 * university.doesNotContinuePeople / university.matchedPeople;
        const industryPricedOutPct = 100 * industry.doesNotContinuePeople / industry.matchedPeople;
        setText("[data-copy-setting-outcome]", `At ${selectedFee}, ${universityPricedOutPct.toFixed(1)}% of university and research jobs with compensation estimates would not continue, compared with ${industryPricedOutPct.toFixed(1)}% of industry jobs with estimates.`);
        setText("[data-student-fee]", selectedFee);
        root.querySelectorAll<HTMLElement>("[data-student-fee-bar]").forEach((bar) => {
            bar.style.width = `${100 * feeUsd / data.meta.feeMaxUsd}%`;
        });
    };

    const renderActiveFee = () => {
        syncSharedFeeUi();
        if (mode === "mobile") mobileStory?.renderFee(feeUsd);
        else desktopStory?.renderFee(feeUsd);
    };
    const commitPendingFee = () => {
        feeFrame = 0;
        if (pendingFeeUsd == null) return;
        feeUsd = pendingFeeUsd;
        pendingFeeUsd = null;
        renderActiveFee();
    };
    const queueFee = (nextFeeUsd: number) => {
        pendingFeeUsd = nextFeeUsd;
        if (!feeFrame) feeFrame = window.requestAnimationFrame(commitPendingFee);
    };

    root.addEventListener("input", (event) => {
        const input = (event.target as Element | null)?.closest<HTMLInputElement>("[data-fee-input]");
        if (input) queueFee(Number(input.value));
    });

    const activateLayout = () => {
        if (pendingFeeUsd != null) {
            if (feeFrame) window.cancelAnimationFrame(feeFrame);
            commitPendingFee();
        }
        const nextMode = compactLayout.matches ? "mobile" : "desktop";
        if (nextMode === mode) return;
        if (nextMode === "mobile") {
            desktopStory?.deactivate();
            mobileStory ??= initializeMobileStory(root, data);
            mobileStory.renderFee(feeUsd);
            mobileStory.activate();
        } else {
            mobileStory?.deactivate();
            desktopStory ??= initializeDesktopStory(root, data, feeUsd);
            desktopStory.renderFee(feeUsd);
            desktopStory.activate();
        }
        mode = nextMode;
    };

    compactLayout.addEventListener("change", activateLayout);
    syncSharedFeeUi();
    activateLayout();
}
