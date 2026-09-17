import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
      tags: z.array(z.string()).default([]),
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

export const collections = { art, projects };
