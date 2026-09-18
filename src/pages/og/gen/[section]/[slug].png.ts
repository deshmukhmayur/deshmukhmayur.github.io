import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getCollection } from 'astro:content';

/*
 * Generated OG cards (ticket 30, spec §8): a satori-rendered terminal card
 * (1200×630) with the entry title — the fallback for any detail entry that
 * doesn't opt in via colocated `ogImage` frontmatter. Rendered at build
 * time (static output), satori locked as the generator. satori needs raw
 * TTF/OTF outlines, so the self-hosted Space Mono woff is decompressed.
 */
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import woff2otf from 'woff2otf';

const WIDTH = 1200;
const HEIGHT = 630;
const BG = '#16181d';
const INK = '#e8e6e0';
const DIM = '#8a8f98';
const GREEN = '#7fd88f';
const CYAN = '#6fd3d3';

const require = createRequire(import.meta.url);
const fontPath = require.resolve('@fontsource/space-mono/files/space-mono-latin-400-normal.woff');
// satori needs raw TTF/OTF outlines: convert the self-hosted Space Mono woff
const font = Buffer.from(woff2otf(await readFile(fontPath)));

interface Card {
  section: string;
  slug: string;
  title: string;
  prompt: string;
}

export const getStaticPaths = (async () => {
  const cards: Card[] = [];

  const studies = await getCollection('studies', ({ data }) => data.status !== 'draft');
  for (const e of studies) {
    cards.push({ section: 'studies', slug: e.id, title: e.data.title, prompt: `~/studies $ identify ${e.id}.md` });
  }
  const soliloquy = await getCollection('soliloquy');
  for (const e of soliloquy) {
    cards.push({ section: 'soliloquy', slug: e.data.slug ?? e.id, title: e.data.title ?? e.data.datetime, prompt: `~/soliloquy $ cat ${e.data.slug ?? e.id}.md` });
  }
  const art = await getCollection('art');
  for (const e of art) {
    cards.push({ section: 'art', slug: e.id, title: e.data.title, prompt: `~/art $ identify ${e.id}.jpg` });
  }
  const prints = await getCollection('prints');
  for (const e of prints) {
    cards.push({ section: 'prints', slug: e.id, title: e.data.title, prompt: `~/prints $ identify ${e.id}.jpg` });
  }
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  for (const e of projects) {
    cards.push({ section: 'projects', slug: e.id, title: e.data.title, prompt: `~/projects $ identify ${e.id}` });
  }

  return cards.map((card) => ({
    params: { section: card.section, slug: card.slug },
    props: { card },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { card } = props;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: BG,
          padding: '72px 80px',
          color: INK,
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', fontSize: 30, color: GREEN },
              children: card.prompt,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: 28,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { fontSize: 76, fontWeight: 700, lineHeight: 1.1 },
                    children: card.title,
                  },
                },
          {
            type: 'div',
            props: {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
              children: [
                {
                  type: 'div',
                  props: { style: { fontSize: 30, color: CYAN }, children: `mayur deshmukh · ${card.section}` },
                },
                {
                  type: 'div',
                  props: { style: { fontSize: 26, color: DIM }, children: 'deshmukhmayur.com' },
                },
              ],
            },
          },
              ],
            },
          },
        ],
      },
    },
    { width: WIDTH, height: HEIGHT, fonts: [{ name: 'Space Mono', data: font, weight: 400, style: 'normal' }] },
  );

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();

  return new Response(png as unknown as BodyInit, {
    headers: { 'Content-Type': 'image/png' },
  });
};
