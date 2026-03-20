import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        category: z.string(),
        image: z.string(),
        author: z.string().optional(),
    }),
});

const services = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
    schema: z.object({
        title: z.string(),
        tag: z.string(),
        description: z.string(),
        image: z.string(),
        gallery: z.array(z.string()).optional(),
        highlights: z.array(z.string()).optional(),
        icon: z.string().optional()
    }),
});

export const collections = { blog, services };
