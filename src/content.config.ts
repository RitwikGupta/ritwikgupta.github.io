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

const movingSale = defineCollection({
    loader: file("src/data/moving-sale.yaml"),
    schema: z.object({
        id: z.string(),
        name: z.string(),
        product_url: z.url().optional(),
        image_url: z.url(),
        price: z.number().nonnegative(),
        notes: z.string().optional(),
        claimed: z.boolean(),
    }),
});

export const collections = { blog, movingSale };
