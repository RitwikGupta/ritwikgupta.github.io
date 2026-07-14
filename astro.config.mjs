// @ts-check
import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeProgressiveImages from "./src/utils/rehype-progressive-images";
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
        rehypePlugins: [rehypeProgressiveImages, [rehypeKatex, { output: "mathml" }]],
    },
    site: siteConfig.url,
});
