import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        description: z.string(),
        og_image: image(),
    }),
});

export const collections = { blog };
