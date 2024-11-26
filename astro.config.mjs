// @ts-check
import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind()],
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [[rehypeKatex, { output: "mathml" }]],
    },
    site: "https://ritwikgupta.github.io",
});
