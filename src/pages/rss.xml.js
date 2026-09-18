import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getSoliloquy } from '../lib/soliloquy';
import { SITE, SEO } from '../lib/constants';

/*
 * Sitewide feed (ticket 30, spec §8): Studies-led, the external-share
 * default. Summary-only <description> — no full content (RSS 2.0).
 */
export async function GET(context) {
  const studies = (await getCollection('studies', ({ data }) => data.status !== 'draft')).map(
    (e) => ({
      title: e.data.title,
      description: e.data.summary,
      pubDate: e.data.date,
      link: `/studies/${e.id}/`,
      categories: e.data.tags,
    }),
  );

  const soliloquy = (await getSoliloquy()).map((e) => ({
    title: e.title ?? e.slug,
    description: e.excerpt,
    pubDate: new Date(`${e.datetime}:00Z`),
    link: `/soliloquy/${e.slug}/`,
    categories: e.entry.data.tags,
  }));

  const art = (await getCollection('art')).map((e) => ({
    title: e.data.title,
    description: e.data.description ?? '',
    pubDate: e.data.publishDate,
    link: `/art/${e.id}/`,
    categories: e.data.tags,
  }));

  const prints = (await getCollection('prints')).map((e) => ({
    title: e.data.title,
    description: e.data.description ?? '',
    pubDate: e.data.date,
    link: `/prints/${e.id}/`,
    categories: e.data.tags,
  }));

  const projects = (await getCollection('projects', ({ data }) => !data.draft)).map((e) => ({
    title: e.data.title,
    description: e.data.summary,
    pubDate: new Date(`${e.data.started}-15T00:00:00Z`),
    link: `/projects/${e.id}/`,
    categories: e.data.kinds,
  }));

  // studies lead the feed; the rest sorted in behind them, newest first
  const items = [...studies, ...soliloquy, ...art, ...prints, ...projects].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime(),
  );

  return rss({
    title: SEO.feeds.sitewide.title,
    description: SEO.feeds.sitewide.description,
    site: context.site,
    items,
    trailingSlash: true,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<atom:link href="${new URL(SITE.rss, context.site)}" rel="self" type="application/rss+xml" />`,
  });
}
