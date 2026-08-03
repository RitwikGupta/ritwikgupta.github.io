import type { FeeOutcomeRow, FeeScenario, OptStoryClientData } from "../types/opt-story";

export interface MobileStoryController {
    activate: () => void;
    deactivate: () => void;
    renderFee: (feeUsd: number) => void;
    destroy: () => void;
}

interface CrossingPlot {
    plot: SVGSVGElement;
    colorMode: string;
    dots: SVGCircleElement[];
}

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

const setText = (root: HTMLElement, selector: string, value: string) => {
    root.querySelectorAll<HTMLElement>(selector).forEach((element) => { element.textContent = value; });
};

const bindTabs = (root: HTMLElement, signal: AbortSignal) => {
    root.querySelectorAll<HTMLElement>("[data-mobile-tabs]").forEach((tabs) => {
        const buttons = Array.from(tabs.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
        const panels = Array.from(tabs.querySelectorAll<HTMLElement>("[data-tab-panel]"));
        const activate = (button: HTMLButtonElement, moveFocus = false) => {
            buttons.forEach((item) => {
                const selected = item === button;
                item.setAttribute("aria-selected", String(selected));
                item.tabIndex = selected ? 0 : -1;
            });
            panels.forEach((panel) => { panel.hidden = panel.id !== button.getAttribute("aria-controls"); });
            if (moveFocus) button.focus();
        };
        buttons.forEach((button, index) => {
            button.addEventListener("click", () => activate(button), { signal });
            button.addEventListener("keydown", (event) => {
                let next = index;
                if (event.key === "ArrowRight") next = (index + 1) % buttons.length;
                else if (event.key === "ArrowLeft") next = (index - 1 + buttons.length) % buttons.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = buttons.length - 1;
                else return;
                event.preventDefault();
                activate(buttons[next], true);
            }, { signal });
        });
        const selected = buttons.find((button) => button.getAttribute("aria-selected") === "true") ?? buttons[0];
        if (selected) activate(selected);
        tabs.classList.add("is-ready");
    });
};

const ensureScatterDots = (root: HTMLElement, data: OptStoryClientData) => {
    const scatter = root.querySelector<SVGSVGElement>("[data-mobile-program-scatter]");
    const dotLayer = scatter?.querySelector<SVGGElement>("[data-mobile-program-dots]");
    if (!scatter || !dotLayer || dotLayer.childElementCount) return;
    const programs = data.programs.map((row) => ({
        school: row[0],
        degree: row[1],
        major: row[3],
        expectedCompleters: row[4],
        optWithin60: row[5],
        share60Pct: row[6],
    }));
    const shares = programs.map((row) => row.share60Pct);
    const sizes = programs.map((row) => row.expectedCompleters);
    const minShare = Math.min(...shares);
    const minSizeRoot = Math.sqrt(Math.min(...sizes));
    const maxSizeRoot = Math.sqrt(Math.max(...sizes));
    const pointX = (value: number) => 50 + (Math.sqrt(value) - minSizeRoot) / (maxSizeRoot - minSizeRoot || 1) * 270;
    const pointY = (value: number) => 224 - (value - minShare) / (100 - minShare || 1) * 184;
    const svgNamespace = "http://www.w3.org/2000/svg";
    const fragment = document.createDocumentFragment();
    programs.forEach((program) => {
        const dot = document.createElementNS(svgNamespace, "circle");
        dot.setAttribute("cx", String(pointX(program.expectedCompleters)));
        dot.setAttribute("cy", String(pointY(program.share60Pct)));
        dot.setAttribute("r", "3.8");
        dot.setAttribute("class", `mobile-program-dot mobile-program-dot--${program.degree.toLowerCase().replace(/[^a-z]/g, "")}`);
        dot.dataset.school = program.school;
        dot.dataset.degree = program.degree;
        dot.dataset.major = program.major;
        dot.dataset.expected = String(program.expectedCompleters);
        dot.dataset.opt = String(program.optWithin60);
        dot.dataset.share = String(program.share60Pct);
        const title = document.createElementNS(svgNamespace, "title");
        title.textContent = `${program.school} — ${program.degree}, ${program.major}: ${program.share60Pct.toFixed(1)}%`;
        dot.append(title);
        fragment.append(dot);
    });
    dotLayer.append(fragment);
};

const bindScatter = (root: HTMLElement, signal: AbortSignal) => {
    const scatter = root.querySelector<SVGSVGElement>("[data-mobile-program-scatter]");
    const tooltip = root.querySelector<HTMLElement>("[data-mobile-program-tooltip]");
    if (!scatter || !tooltip) return;
    const dotFromEvent = (event: Event) => (event.target as Element | null)?.closest<SVGCircleElement>(".mobile-program-dot");
    const show = (dot: SVGCircleElement) => {
        const { school, degree, major, expected, opt, share } = dot.dataset;
        tooltip.textContent = `${school}\n${degree} · ${major}\n${formatNumber.format(Number(opt))} of ${formatNumber.format(Number(expected))} entered OPT within 60 days (${Number(share).toFixed(1)}%)`;
        tooltip.hidden = false;
    };
    scatter.addEventListener("pointerover", (event) => {
        const dot = dotFromEvent(event);
        if (dot) show(dot);
    }, { signal, passive: true });
    scatter.addEventListener("pointerdown", (event) => {
        const dot = dotFromEvent(event);
        if (!dot) return;
        event.preventDefault();
        show(dot);
    }, { signal });
    scatter.addEventListener("pointerout", (event) => {
        const dot = dotFromEvent(event);
        const related = event.relatedTarget as Node | null;
        if (dot && (!related || !dot.contains(related))) tooltip.hidden = true;
    }, { signal, passive: true });
    scatter.addEventListener("blur", () => { tooltip.hidden = true; }, { signal });
};

const bindTableEdges = (root: HTMLElement, signal: AbortSignal) => {
    const scrollers = Array.from(root.querySelectorAll<HTMLElement>("[data-table-scroll]"));
    const update = (scroller: HTMLElement) => {
        const overflow = scroller.scrollWidth > scroller.clientWidth + 2;
        scroller.classList.toggle("has-overflow", overflow);
        scroller.classList.toggle("is-at-start", scroller.scrollLeft <= 2);
        scroller.classList.toggle("is-at-end", scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2);
    };
    scrollers.forEach((scroller) => {
        scroller.addEventListener("scroll", () => update(scroller), { passive: true, signal });
        update(scroller);
    });
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver((entries) => {
        entries.forEach((entry) => update(entry.target as HTMLElement));
    });
    scrollers.forEach((scroller) => observer?.observe(scroller));
    return observer;
};

const ensureCrossingPlots = (root: HTMLElement, data: OptStoryClientData): CrossingPlot[] => {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const knownMarks = data.marks
        .filter((row) => row[6] != null)
        .map((row) => ({ id: row[0], field: row[2], compensationUsd: row[6] as number }))
        .sort((a, b) => a.id - b.id);
    return Array.from(root.querySelectorAll<SVGSVGElement>("[data-mobile-crossing-plot]")).map((plot) => {
        const layer = plot.querySelector<SVGGElement>("[data-mobile-crossing-dots]");
        const colorMode = plot.dataset.mobileCrossingColor ?? "status";
        const existing = Array.from(layer?.querySelectorAll<SVGCircleElement>("circle") ?? []);
        if (existing.length) return { plot, colorMode, dots: existing };
        const fragment = document.createDocumentFragment();
        const dots = knownMarks.map((mark) => {
            const circle = document.createElementNS(svgNamespace, "circle");
            circle.setAttribute("r", "2.75");
            circle.setAttribute("aria-hidden", "true");
            circle.dataset.compensation = String(mark.compensationUsd);
            circle.dataset.field = mark.field;
            if (colorMode === "field") circle.style.fill = `var(--field-${mark.field})`;
            fragment.append(circle);
            return circle;
        });
        layer?.append(fragment);
        return { plot, colorMode, dots };
    });
};

const findOutcome = (scenario: FeeScenario, dimension: string, key: string): FeeOutcomeRow | undefined => {
    if (dimension === "fields") return scenario.outcomes.fields.find((row) => row.key === key);
    if (dimension === "occupationFamilies") return scenario.outcomes.occupationFamilies.find((row) => row.key === key);
    if (dimension === "workSettings") return scenario.outcomes.workSettings.find((row) => row.key === key);
    return undefined;
};

export const initializeMobileStory = (root: HTMLElement, data: OptStoryClientData): MobileStoryController => {
    let active = false;
    let latestFee = data.meta.defaultFeeUsd;
    let events: AbortController | null = null;
    let tableObserver: ResizeObserver | null = null;
    let crossingPlots: CrossingPlot[] | null = null;

    const ensureDom = () => {
        ensureScatterDots(root, data);
        crossingPlots ??= ensureCrossingPlots(root, data);
    };

    const renderFee = (feeUsd: number) => {
        latestFee = feeUsd;
        if (!active) return;
        const scenario = data.feeScenarios.find((row) => row.feeUsd === feeUsd);
        if (!scenario) return;
        const selectedFee = formatMoney.format(feeUsd);
        setText(root, "[data-mobile-gate-fee]", `${selectedFee} fee`);
        setText(root, "[data-mobile-threshold-fee]", `${selectedFee} fee`);
        setText(root, "[data-mobile-ending-fee]", `${selectedFee} OPT fee`);
        setText(root, "[data-mobile-crossing-fee]", `${selectedFee} FEE`);
        setText(root, "[data-mobile-plot-continue-count]", formatNumber.format(scenario.continuesPeople));
        setText(root, "[data-mobile-plot-stop-count]", formatNumber.format(scenario.doesNotContinuePeople));
        setText(root, "[data-mobile-gross-exposure]", formatCompactMoney.format(data.meta.totalEntrants * feeUsd));
        setText(root, "[data-mobile-student-fee]", selectedFee);
        root.querySelectorAll<HTMLElement>("[data-mobile-student-fee-bar]").forEach((bar) => {
            bar.style.width = `${100 * feeUsd / data.meta.feeMaxUsd}%`;
        });
        setText(root, "[data-mobile-payments]", formatCompactMoney.format(scenario.feePaymentsUsd));
        setText(root, "[data-mobile-compensation]", formatCompactMoney.format(scenario.representedCompensationUsd));

        crossingPlots?.forEach(({ plot, colorMode, dots }) => {
            const stopped = dots.filter((dot) => Number(dot.dataset.compensation) < feeUsd);
            const continuing = dots.filter((dot) => Number(dot.dataset.compensation) >= feeUsd);
            const position = (dot: SVGCircleElement, index: number, status: "stop" | "continue") => {
                const columns = 34;
                const column = index % columns;
                const row = Math.floor(index / columns);
                dot.setAttribute("cx", String(14 + column * (332 / (columns - 1))));
                dot.setAttribute("cy", String(status === "stop" ? 148 - row * 8.1 : 194 + row * 8.1));
                dot.dataset.status = status;
                if (colorMode === "status") dot.style.fill = status === "continue" ? "var(--degree-bachelors)" : "var(--goldenrod)";
            };
            stopped.forEach((dot, index) => position(dot, index, "stop"));
            continuing.forEach((dot, index) => position(dot, index, "continue"));
            plot.setAttribute("aria-label", `At a ${selectedFee} fee, ${formatNumber.format(scenario.continuesPeople)} entrants with compensation estimates would continue and ${formatNumber.format(scenario.doesNotContinuePeople)} would not continue.${colorMode === "field" ? " Dots are colored by field." : ""}`);
        });

        root.querySelectorAll<HTMLElement>("[data-outcome-dimension][data-outcome-key]").forEach((element) => {
            const row = findOutcome(scenario, element.dataset.outcomeDimension ?? "", element.dataset.outcomeKey ?? "");
            if (!row || row.matchedPeople <= 0) return;
            const continueBar = element.querySelector<HTMLElement>("[data-row-continue-bar]");
            const stopBar = element.querySelector<HTMLElement>("[data-row-stop-bar]");
            const count = element.querySelector<HTMLElement>("[data-row-continue]");
            if (continueBar) continueBar.style.width = `${100 * row.continuesPeople / row.matchedPeople}%`;
            if (stopBar) stopBar.style.width = `${100 * row.doesNotContinuePeople / row.matchedPeople}%`;
            if (count) count.textContent = formatNumber.format(row.continuesPeople);
            element.setAttribute("aria-label", `${count?.closest(".mobile-chart-heading")?.querySelector("strong")?.textContent ?? row.key}: ${formatNumber.format(row.continuesPeople)} would continue and ${formatNumber.format(row.doesNotContinuePeople)} would not continue among ${formatNumber.format(row.matchedPeople)} jobs with compensation estimates.`);
        });
    };

    const activate = () => {
        if (active) return;
        active = true;
        ensureDom();
        events = new AbortController();
        bindTabs(root, events.signal);
        bindScatter(root, events.signal);
        tableObserver = bindTableEdges(root, events.signal);
        renderFee(latestFee);
    };

    const deactivate = () => {
        if (!active) return;
        active = false;
        events?.abort();
        events = null;
        tableObserver?.disconnect();
        tableObserver = null;
    };

    return {
        activate,
        deactivate,
        renderFee,
        destroy: deactivate,
    };
};
