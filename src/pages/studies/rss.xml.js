import rss from '@astrojs/rss';
import { getStudies } from '../../lib/studies';
import { SEO } from '../../lib/constants';

/*
 * Studies feed (ticket 30, spec §8): summary-only <description> (RSS 2.0).
 */
export async function GET(context) {
  const items = (await getStudies()).map((e) => ({
    title: e.data.title,
    description: e.data.summary,
    pubDate: e.data.date,
    link: `/studies/${e.id}/`,
    categories: e.data.tags,
  }));

  return rss({
    title: SEO.feeds.studies.title,
    description: SEO.feeds.studies.description,
    site: context.site,
    items,
    trailingSlash: true,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<atom:link href="${new URL('/studies/rss.xml', context.site)}" rel="self" type="application/rss+xml" />`,
  });
}
