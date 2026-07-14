// @ts-check
import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import tailwindcss from "@tailwindcss/vite";

import partytown from "@astrojs/partytown";
import { siteConfig } from "./src/config/site";

// https://astro.build/config
export default defineConfig({
    integrations: [partytown()],
    vite: {
        plugins: [tailwindcss()]
    },
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [[rehypeKatex, { output: "mathml" }]],
    },
    site: siteConfig.url,
});
