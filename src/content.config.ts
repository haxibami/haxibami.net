import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lastmod: z.date().optional(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    emoji: z.string().optional().default("📝"),
    related: z.array(z.string()).optional(),
  }),
});

const page = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/page" }),
  schema: z.object({
    title: z.string(),
    enTitle: z.string(),
    lastmod: z.date(),
    description: z.string(),
    emoji: z.string().optional().default("📝"),
  }),
});

const data = defineCollection({
  loader: file("src/content/data/meta.yml"),
  schema: z.object({
    top: z.object({
      title: z.string(),
      description: z.string(),
    }),
    blog: z.object({
      description: z.string(),
    }),
  }),
});

export const collections = { data, blog, page };
