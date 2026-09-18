/*
 * Static per-section OG card placeholders (ticket 30, spec §8) — 1200×630
 * terminal-styled PNGs written to public/og/. Hand-made cards replace these
 * when real content lands (ticket 32); regenerating is idempotent:
 *
 *   bun run scripts/generate-og-placeholders.mjs
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "og");
mkdirSync(outDir, { recursive: true });

const SECTIONS = {
  home: { prompt: "~ $", title: "mayur deshmukh", sub: "designer & developer" },
  projects: { prompt: "~/projects $", title: "projects", sub: "software built and maintained" },
  art: { prompt: "~/art $", title: "art", sub: "drawings, illustrations, process" },
  prints: { prompt: "~/prints $", title: "prints", sub: "3d printing makes & maker logs" },
  studies: { prompt: "~/studies $", title: "studies", sub: "case studies, findings, experiments" },
  soliloquy: { prompt: "~/soliloquy $", title: "soliloquy", sub: "casual entries, as they happen" },
  about: { prompt: "~ $", title: "about", sub: "whoami --verbose" },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const W = 1200, H = 630;
const BG = "#16181d", INK = "#e8e6e0", DIM = "#8a8f98", GREEN = "#7fd88f", CYAN = "#6fd3d3";

for (const [key, { prompt, title, sub }] of Object.entries(SECTIONS)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <text x="80" y="140" font-family="monospace" font-size="34" fill="${GREEN}">${esc(prompt)}</text>
  <text x="80" y="360" font-family="monospace" font-size="88" font-weight="bold" fill="${INK}">${esc(title)}</text>
  <text x="80" y="440" font-family="monospace" font-size="34" fill="${DIM}">${esc(sub)}</text>
  <text x="80" y="560" font-family="monospace" font-size="28" fill="${CYAN}">deshmukhmayur.com</text>
</svg>`;

  const out = join(outDir, `${key}.png`);
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log(`og: wrote ${out}`);
}
