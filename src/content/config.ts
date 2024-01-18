import { z, defineCollection } from "astro:content";

const postCollection = defineCollection({
  type: "content",
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

const pageCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    enTitle: z.string(),
    lastmod: z.date(),
    description: z.string(),
    emoji: z.string().optional().default("📝"),
  }),
});

const metaCollection = defineCollection({
  type: "data",
  schema: z.object({
    top: z.object({
      title: z.string(),
      enTitle: z.string(),
      description: z.string(),
    }),
    blog: z.object({
      description: z.string(),
    }),
  }),
});

export const collections = {
  data: metaCollection,
  blog: postCollection,
  page: pageCollection,
};
