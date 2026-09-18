import rss from '@astrojs/rss';
import { getSoliloquy } from '../../lib/soliloquy';
import { SEO } from '../../lib/constants';

/*
 * Soliloquy feed (ticket 30, spec §8): summary-only <description> (RSS 2.0).
 */
export async function GET(context) {
  const items = (await getSoliloquy()).map((e) => ({
    title: e.title ?? e.slug,
    description: e.excerpt,
    pubDate: new Date(`${e.datetime}:00Z`),
    link: `/soliloquy/${e.slug}/`,
    categories: e.entry.data.tags,
  }));

  return rss({
    title: SEO.feeds.soliloquy.title,
    description: SEO.feeds.soliloquy.description,
    site: context.site,
    items,
    trailingSlash: true,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<atom:link href="${new URL('/soliloquy/rss.xml', context.site)}" rel="self" type="application/rss+xml" />`,
  });
}
