/*
 * Subset the self-hosted Libron WOFF2 files in public/fonts/ in place.
 * See public/fonts/README.md for the full rationale (ADR 0008).
 *
 * Usage:
 *   bun scripts/subset-fonts.mjs              # subset with the default ranges below
 *   bun scripts/subset-fonts.mjs U+0400-04FF  # extend with extra unicode-range blocks
 *
 * Requirements: python3 with fontTools + brotli  (pip install fonttools brotli)
 *
 * To extend the subset later: either add a range to DEFAULT_RANGES and re-run,
 * or pass extra ranges as CLI args (they are unioned with the defaults).
 * Re-running is always safe: it re-subsets from the files already in public/fonts/,
 * so the result never grows beyond what the ranges allow.
 */
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import path from "node:path";

const FONTS_DIR = new URL("../public/fonts/", import.meta.url).pathname;

// Same codepoint blocks as the Google Fonts "latin" subset (plus U+0100-017F
// latin-ext-a for occasional accented names). Extend as needed — see header.
const DEFAULT_RANGES = [
  "U+0000-00FF", // basic latin + latin-1 supplement
  "U+0100-017F", // latin-ext-a (é-type accented letters beyond latin-1)
  "U+0131",
  "U+0152-0153",
  "U+02BB-02BC",
  "U+02C6",
  "U+02DA",
  "U+02DC",
  "U+2000-206F", // general punctuation: em/en dash, curly quotes, ellipsis, bullets
  "U+2074",
  "U+20AC", // euro
  "U+2122", // trademark
  "U+2212", // minus
  "U+FEFF",
  "U+FFFD",
];

const extra = process.argv.slice(2);
const ranges = [...DEFAULT_RANGES, ...extra].join(",");

const libronFiles = readdirSync(FONTS_DIR).filter((f) => f.startsWith("Libron-") && f.endsWith(".woff2"));
if (libronFiles.length === 0) {
  console.error(`no Libron-*.woff2 files found in ${FONTS_DIR}`);
  process.exit(1);
}

for (const file of libronFiles) {
  const target = path.join(FONTS_DIR, file);
  const tmp = target + ".subset";
  execFileSync("pyftsubset", [
    target,
    `--unicodes=${ranges}`,
    "--flavor=woff2",
    `--output-file=${tmp}`,
    "--layout-features=kern,liga,onum", // keep kerning, ligatures, oldstyle figures; drop the rest
    "--no-hinting",
  ]);
  execFileSync("mv", [tmp, target]);
  console.log(`subset ${file}`);
}

console.log(`\ndone — ranges: ${ranges}`);
