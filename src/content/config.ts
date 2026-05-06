import { defineCollection, z } from 'astro:content';

const events = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    regionZh: z.string(),
    regionEn: z.string(),
    locationZh: z.string(),
    locationEn: z.string(),
    titleZh: z.string(),
    titleEn: z.string(),
    descriptionZh: z.string(),
    descriptionEn: z.string(),
    quoteZh: z.string().optional(),
    quoteEn: z.string().optional(),
    tags: z.array(z.string()).default([]),
    fbEmbedUrl: z.string().url().optional(),
    featured: z.boolean().default(true),
  }),
});

const columns = defineCollection({
  type: 'content',
  schema: z.object({
    publishedDate: z.date(),
    titleZh: z.string(),
    titleEn: z.string(),
    authorZh: z.string(),
    authorEn: z.string(),
    url: z.string().url(),
    platform: z.string().default('獨立評論@天下'),
    featured: z.boolean().default(true),
  }),
});

export const collections = { events, columns };
