import { describe, expect, it } from "vitest";
import storyData from "../data/opt-story.json";
import type { OptStoryData, OutcomeStatus } from "../types/opt-story";
import { allocateOutcomeParticles } from "./opt-story-outcome-particles";

const data = storyData as unknown as OptStoryData;
const statuses: OutcomeStatus[] = ["continue", "stop", "unknown"];

describe("allocateOutcomeParticles", () => {
    it.each(data.compensation.feeScenarios)("allocates exact visual margins at $feeUsd", (scenario) => {
        const first = allocateOutcomeParticles(scenario, data.cohort.fieldGroups, data.meta.optMarkCount);
        const second = allocateOutcomeParticles(scenario, data.cohort.fieldGroups, data.meta.optMarkCount);
        expect(second).toEqual(first);
        expect(first).toHaveLength(1_159);

        const totalPeople = data.meta.totalEntrants;
        const expected = {
            continue: Math.round(scenario.continuesPeople * first.length / totalPeople),
            stop: Math.round(scenario.doesNotContinuePeople * first.length / totalPeople),
            unknown: Math.round(scenario.unknownPeople * first.length / totalPeople),
        };
        statuses.forEach((status) => {
            expect(first.filter((particle) => particle.status === status)).toHaveLength(expected[status]);
        });
        expect(new Set(statuses.flatMap((status) => first
            .filter((particle) => particle.status === status)
            .map((particle) => particle.id))).size).toBe(first.length);
    });

    it("keeps each field within one display dot of its exact cohort share", () => {
        const scenario = data.compensation.feeScenarios.find((row) => row.feeUsd === 100_000)!;
        const particles = allocateOutcomeParticles(scenario, data.cohort.fieldGroups, data.meta.optMarkCount);
        data.cohort.fieldGroups.forEach((field) => {
            const actual = particles.filter((particle) => particle.field === field.key).length;
            const quota = field.people * particles.length / data.meta.totalEntrants;
            expect(Math.abs(actual - quota)).toBeLessThan(1);
        });
    });
});
