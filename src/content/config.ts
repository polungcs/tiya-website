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
    /** Optional thumbnail under /public, e.g. "/columns/foo.jpg". 480×384-ish 5:4 JPG. */
    image: z.string().optional(),
    imageAltZh: z.string().optional(),
    imageAltEn: z.string().optional(),
    featured: z.boolean().default(true),
  }),
});

const news = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    sourceZh: z.string(),
    sourceEn: z.string(),
    titleZh: z.string(),
    titleEn: z.string(),
    summaryZh: z.string(),
    summaryEn: z.string(),
    url: z.string().url(),
    /** Relative path under /public, e.g. "/news/foo.jpg". 1200px wide JPG/WebP, ≥3:2 ratio (card crops to 16:9). */
    image: z.string(),
    imageAltZh: z.string().optional(),
    imageAltEn: z.string().optional(),
    featured: z.boolean().default(true),
  }),
});

export const collections = { events, columns, news };
