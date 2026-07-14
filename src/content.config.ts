import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        description: z.string(),
        og_image: z.string(),
    }),
});

const movingSale = defineCollection({
    loader: file("src/data/moving-sale.yaml"),
    schema: z.object({
        id: z.string(),
        name: z.string(),
        product_url: z.string().url().optional(),
        image_url: z.string().url(),
        price: z.number().nonnegative(),
        notes: z.string().optional(),
        claimed: z.boolean(),
    }),
});

export const collections = { blog, movingSale };
