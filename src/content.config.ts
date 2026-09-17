import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { ART, PRINTS } from './lib/constants';

const art = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/art' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishDate: z.coerce.date(),
      featured: z.boolean().optional(),
      medium: z.enum(['digital', 'pencil', 'ink', 'mixed']),
      tools: z.array(z.string()).default([]),
      collection: z.string().optional(),
      // closed starter subject tags (spec §4) — extended deliberately
      tags: z.array(z.enum(ART.startTags as [string, ...string[]])).default([]),
      description: z.string().optional(),
      images: z.object({
        main: image(),
        process: z.array(image()).optional(),
      }),
      alt: z.string().min(1),
    }),
});

/*
 * Projects (spec §4): slug is the stable join key for Studies' projects[] —
 * the entry id is generated from frontmatter slug, so /projects/<slug>/ URLs
 * and the join always agree; duplicate slugs fail the build at load time.
 */
const projects = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/projects',
    generateId: ({ data }) => {
      if (typeof data.slug !== 'string' || !data.slug) {
        throw new Error('project entry is missing a slug (stable join key)');
      }
      return data.slug;
    },
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        slug: z
          .string()
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be lowercase kebab-case'),
        summary: z.string().min(1),
        kinds: z
          .array(z.enum(['work', 'open-source', 'personal']))
          .min(1, 'at least one kind'),
        started: z
          .string()
          .regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, 'month precision, YYYY-MM'),
        ended: z
          .string()
          .regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, 'month precision, YYYY-MM')
          .nullish(),
        status: z.enum(['active', 'maintained', 'archived']),
        draft: z.boolean().default(false),
        role: z.string().optional(),
        tech: z.array(z.string()).default([]),
        links: z
          .array(z.object({ platform: z.string().min(1), url: z.string().url() }))
          .default([]),
        screenshots: z
          .array(z.object({ src: image(), alt: z.string().min(1) }))
          .max(4)
          .default([]),
        featured: z.boolean().default(false),
      })
      .refine((d) => !d.ended || d.ended >= d.started, {
        message: 'ended must not precede started',
      }),
});

/*
 * Prints (spec §4): entry id is the `YYYY-MM-DD-<slug>` filename → URL date
 * prefix. Print settings stay freeform in the body; the maker log is the
 * body's dated `## YYYY-MM-DD` sections (failures only as attempts inside a
 * successful print's log). Photos carry their own required alt; model links
 * are { platform, url } pairs.
 */
const prints = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/prints' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      printer: z.enum(PRINTS.printers as [string, ...string[]]),
      material: z.enum(PRINTS.materials as [string, ...string[]]),
      materialColor: z.string().optional(),
      durationHours: z.number().positive(),
      file: z.string().optional(),
      photos: z
        .array(z.object({ src: image(), alt: z.string().min(1) }))
        .min(1, 'at least one photo'),
      description: z.string().optional(),
      modelLinks: z
        .array(z.object({ platform: z.string().min(1), url: z.string().url() }))
        .default([]),
      tags: z.array(z.enum(PRINTS.startTags as [string, ...string[]])).default([]),
      featured: z.boolean().optional(),
    }),
});

export const collections = { art, prints, projects };
