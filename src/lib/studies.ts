import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/*
 * Studies helpers (ticket 25). `projects[]` is the many-to-many edge to
 * project slugs; the spec requires the join validated against the projects
 * collection at build (unknown slug → build failure), so every read of the
 * studies collection goes through here.
 */

export type Study = CollectionEntry<'studies'>;

export async function getStudies(): Promise<Study[]> {
  const [studies, projects] = await Promise.all([
    getCollection('studies'),
    getCollection('projects'),
  ]);
  const slugs = new Set(projects.map((p) => p.id));
  for (const study of studies) {
    for (const slug of study.data.projects) {
      if (!slugs.has(slug)) {
        throw new Error(
          `study "${study.id}": projects[] references unknown project slug "${slug}"`,
        );
      }
    }
  }
  // draft entries are excluded from all pages
  return studies
    .filter((s) => s.data.status === 'published')
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/* the join's receiving end: published studies whose projects[] contains slug */
export function studiesForProject(all: Study[], slug: string): Study[] {
  return all.filter((s) => s.data.projects.includes(slug));
}

/* related studies (mirrors art's rule): by project → by tag fallback; up to 3 */
export function relatedStudies(all: Study[], entry: Study, limit = 3): Study[] {
  const related: Study[] = [];
  const mine = new Set(entry.data.projects);
  for (const e of all) {
    if (e.id !== entry.id && e.data.projects.some((p) => mine.has(p))) {
      related.push(e);
    }
  }
  if (related.length < limit) {
    for (const e of all) {
      if (
        e.id !== entry.id &&
        !related.includes(e) &&
        e.data.tags.some((t) => entry.data.tags.includes(t))
      ) {
        related.push(e);
      }
    }
  }
  return related.slice(0, limit);
}
