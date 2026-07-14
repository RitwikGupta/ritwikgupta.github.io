import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

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

export const collections = { movingSale };
