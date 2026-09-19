#!/usr/bin/env node
// Import artwork into the art pipeline.
//
// Usage:
//   node scripts/import-art.mjs <image> --slug <slug> --date <YYYY-MM-DD> --title <title> \
//     --alt <required alt text> [--medium digital|pencil|ink|mixed] [--tools "Clip Studio Paint,Photoshop"] \
//     [--tags anime,car,doodle] [--collection <name>] [--featured] [--description <text>] \
//     [--process <image> [--process <image>...]]
//
// What it does:
//   1. Strips ALL metadata (EXIF etc.), bakes orientation, caps long edge at 4096px,
//      recompresses as mozjpeg q82 -> src/assets/art/<date>-<slug>/main.jpg (+ process-N.jpg)
//   2. Scaffolds src/content/art/<date>-<slug>.md with the frontmatter from ticket 04
//   3. Prints next steps (write description, review alt)

import { argv, exit } from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

function fail(msg) {
  console.error(`error: ${msg}`);
  exit(1);
}

function parseArgs() {
  const args = argv.slice(2);
  const opts = { process: [] };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--process') opts.process.push(args[++i]);
    else if (arg.startsWith('--')) opts[arg.slice(2)] = args[++i];
    else opts.image ??= arg;
  }
  return opts;
}

const opts = parseArgs();
if (!opts.image || !opts.slug || !opts.date || !opts.title || !opts.alt) {
  fail('required: <image> --slug --date YYYY-MM-DD --title --alt');
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(opts.date)) fail('--date must be YYYY-MM-DD');
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(opts.slug)) fail('--slug must be kebab-case (lowercase, digits, hyphens)');

const slug = `${opts.date}-${opts.slug}`;
const assetsDir = path.join('src', 'assets', 'art', slug);
const contentFile = path.join('src', 'content', 'art', `${slug}.md`);
if (fs.existsSync(contentFile)) fail(`${contentFile} already exists`);

fs.mkdirSync(assetsDir, { recursive: true });

async function importImage(input, output) {
  const meta = await sharp(input).metadata();
  await sharp(input)
    .rotate() // bake EXIF orientation, then metadata is dropped on output
    .resize({ width: 4096, height: 4096, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(output);
  const before = fs.statSync(input).size;
  const after = fs.statSync(output).size;
  console.log(
    `  ${path.basename(output)}: ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(1)}MB ` +
      `(${meta.width}x${meta.height} -> capped at 4096 long edge)`
  );
}

console.log(`importing ${opts.image} as ${slug}`);
await importImage(opts.image, path.join(assetsDir, 'main.jpg'));

const processShots = [];
for (const [i, p] of opts.process.entries()) {
  const out = path.join(assetsDir, `process-${i + 1}.jpg`);
  await importImage(p, out);
  processShots.push(out);
}

const fmImages = [`  main: "../../assets/art/${slug}/main.jpg"`];
if (processShots.length > 0) {
  fmImages.push('  process:');
  for (const p of processShots) {
    fmImages.push(`    - "../../assets/art/${path.relative('src/content/art', p).replace(/\\/g, '/')}"`);
  }
}

const frontmatter = [
  '---',
  `title: "${opts.title.replace(/"/g, '\\"')}"`,
  `publishDate: ${opts.date}`,
  `medium: ${opts.medium ?? 'digital'}`,
  `tools: [${(opts.tools ?? '').split(',').map((t) => `"${t.trim()}"`).filter((s) => s.length > 2).join(', ')}]`,
  ...(opts.collection ? [`collection: ${opts.collection}`] : []),
  `tags: [${(opts.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean).join(', ')}]`,
  ...(opts.description ? [`description: "${opts.description.replace(/"/g, '\\"')}"`] : []),
  'images:',
  ...fmImages,
  ...(opts.featured ? ['featured: true'] : []),
  `alt: "${opts.alt.replace(/"/g, '\\"')}"`,
  '---',
  '',
  '<TODO: description / commentary>',
].join('\n');

fs.writeFileSync(contentFile, frontmatter + '\n');
console.log(`\nwrote ${contentFile}`);
console.log('next: fill in description, review alt text, then commit. `npx astro build` must pass (alt is schema-required).');
