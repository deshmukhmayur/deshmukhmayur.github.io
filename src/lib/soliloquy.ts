import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/*
 * Soliloquy helpers (ticket 26). Datetime strings stay strings (see the
 * schema comment in content.config.ts): `YYYY-MM-DDTHH:MM` sorts correctly
 * as plain strings and slices into day/time without timezone drift.
 *
 * URL slugs: frontmatter slug wins; entries without one (titleless micros
 * and untitled-slug entries alike) resolve to `<YYYY-MM-DD>-<ordinal>`,
 * where the ordinal counts slugless entries of that day in time order.
 * Every read of the collection goes through getSoliloquy() so duplicate
 * resolved slugs fail the build instead of silently overwriting routes.
 */

export type SoliloquyEntry = CollectionEntry<'soliloquy'>;

export interface SolEntryResolved {
  entry: SoliloquyEntry;
  /** URL slug: frontmatter slug ?? `<date>-<ordinal>` */
  slug: string;
  /** 1-based chronological position (asc by datetime), for `entry #N` */
  number: number;
  title: string | undefined;
  datetime: string;
  dayISO: string;
  time: string;
  /** plain-text excerpt of the markdown body (images stripped) */
  excerpt: string;
  /** body images resolved to imported assets, in body order */
  images: { src: ImageMetadata; alt: string }[];
}

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/soliloquy/**/*.{jpg,jpeg,png,webp,avif,gif}',
  { eager: true },
);

const IMAGE_RE = /!\[([^\]]*)\]\(([^)\s]+)\)/g;

export async function getSoliloquy(): Promise<SolEntryResolved[]> {
  const raw = await getCollection('soliloquy');

  for (const e of raw) {
    if (e.data.slug && !KEBAB.test(e.data.slug)) {
      throw new Error(`soliloquy "${e.id}": slug must be lowercase kebab-case`);
    }
  }

  // time order, oldest first — the spine the ordinals and entry numbers hang on
  const asc = [...raw].sort((a, b) => a.data.datetime.localeCompare(b.data.datetime));

  // ordinal within the day counts slugless entries only, 1-based
  const perDay = new Map<string, number>();
  const resolved: SolEntryResolved[] = [];
  const seen = new Set<string>();
  for (const entry of asc) {
    const { datetime, slug } = entry.data;
    const dayISO = datetime.slice(0, 10);
    const urlSlug = slug ?? (() => {
      const n = (perDay.get(dayISO) ?? 0) + 1;
      perDay.set(dayISO, n);
      return `${dayISO}-${n}`;
    })();
    if (seen.has(urlSlug)) {
      throw new Error(`soliloquy "${entry.id}": resolved slug "${urlSlug}" is already used`);
    }
    seen.add(urlSlug);

    resolved.push({
      entry,
      slug: urlSlug,
      number: resolved.length + 1,
      title: entry.data.title,
      datetime,
      dayISO,
      time: datetime.slice(11, 16),
      excerpt: excerptOf(entry),
      images: imagesOf(entry),
    });
  }

  // listings read newest first; entry numbers stay chronological
  return resolved.reverse();
}

/* plain-text body: images and md chrome stripped; titled entries cap at 240
 * chars for the listing excerpt, titleless micros show the full one-liner */
function excerptOf(entry: SoliloquyEntry): string {
  const text = (entry.body ?? '')
    .replace(IMAGE_RE, '')
    .replace(/^#.+$/gm, '')
    .replace(/[*_`>]/g, '')
    .trim();
  const first = text.split(/\n{2,}/)[0]?.replace(/\s+/g, ' ').trim() ?? '';
  if (entry.data.title) {
    return first.length > 240 ? `${first.slice(0, 240).trimEnd()}…` : first;
  }
  return first;
}

function imagesOf(entry: SoliloquyEntry): { src: ImageMetadata; alt: string }[] {
  const images: { src: ImageMetadata; alt: string }[] = [];
  for (const [, alt, path] of (entry.body ?? '').matchAll(IMAGE_RE)) {
    const base = path.split('/').pop()!;
    // the glob key keeps the original (unhashed) filename, so match on that
    const mod = Object.entries(imageModules).find(([k]) => k.split('/').pop() === base);
    if (!mod) {
      throw new Error(
        `soliloquy "${entry.id}": body image "${path}" not found under src/assets/soliloquy/`,
      );
    }
    images.push({ src: mod[1].default, alt: alt || entry.data.title || entry.id });
  }
  return images;
}

/* months (desc) with entry counts, for the sticky date rail */
export function monthsOf(entries: SolEntryResolved[]): { month: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const e of entries) {
    const month = e.dayISO.slice(0, 7);
    counts.set(month, (counts.get(month) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([month, count]) => ({ month, count }));
}

/* unique sorted tag list, open vocabulary shared with Studies */
export function tagOptionsOf(entries: SolEntryResolved[]): string[] {
  return [...new Set(entries.flatMap((e) => e.entry.data.tags))].sort();
}