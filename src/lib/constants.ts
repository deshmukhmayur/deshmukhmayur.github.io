/*
 * All terminal-chrome copy lives here (ADR 0007 voice rules apply:
 * lowercase, terse, real POSIX verbs only, canonical prompt strings).
 */

export const SITE = {
  title: "mayur deshmukh",
  // canonical sitewide fallback (ADR 0007 copy anchor — quoted verbatim)
  description:
    "Mayur Deshmukh — designer and developer. A terminal-flavored home for projects, art, 3D prints, and writing.",
  host: "deshmukhmayur.com",
  rss: "/rss.xml",
} as const;

// prompts are the canonical strings (ADR 0007): ~/<section> $ / ~ $
export const PROMPTS = {
  home: "~ $",
  section: (section: string) => `~/${section} $`,
  contactMail: 'mail -s "hi from the internet" mayur',
  notFoundHost: "404@deshmukhmayur.com",
} as const;

export const NAV = [
  { label: PROMPTS.section("projects"), href: "/projects/" },
  { label: PROMPTS.section("art"), href: "/art/" },
  { label: PROMPTS.section("prints"), href: "/prints/" },
  { label: PROMPTS.section("soliloquy"), href: "/soliloquy/" },
  { label: PROMPTS.section("studies"), href: "/studies/" },
  { label: PROMPTS.section("about"), href: "/about/" },
] as const;

export const FOOTER = {
  ascii: `  /\\_/\\
 ( o.o )   no trackers were harmed
  > ^ <    in the making of this site`,
  copyright: (year: number) => `© ${year} mayur deshmukh`,
  rssLabel: "rss",
} as const;

export const THEME = {
  key: "site-theme",
  default: "dark",
} as const;

// demo-page chrome (interim page until real sections land in tickets 22–29)
export const DEMO = {
  commands: ["cat hello.md", "ls ~/"],
  comment: "# demo page — real sections land in tickets 22–29",
  toggleLabel: (theme: string) => `· ${theme}`,
} as const;

/*
 * Art section chrome (ticket 23). Voice per ADR 0007: lowercase, terse,
 * real POSIX verbs; errors dry with a real command-link reset.
 */
export const ART = {
  filterCommand: "ls art --tag",
  flag: "tag",
  // closed starter subject tags (spec §4) — the schema validates against these
  startTags: ["anime", "car", "doodle", "portrait", "fanart", "original"],
  tagOptions: ["all", "anime", "car", "doodle", "portrait", "fanart", "original"],
  countSingular: "piece",
  countPlural: "pieces",
  emptyPrefix: "ls: no matches for --",
  // titlebar `filename … date` — bare filename (id is `YYYY-MM-DD-<slug>`)
  filename: (id: string) => `${id.slice(11)}.jpg`,
  dateISO: (d: Date) => d.toISOString().slice(0, 10),
  caption: (collection: string | undefined, medium: string, tags: string[]) =>
    [collection, medium, ...tags.map((t) => `#${t}`)].filter(Boolean).join(" · "),
  identify: (id: string) => `identify ${id}.jpg`,
  // `$ identify` datasheet keys
  datasheet: {
    date: "date",
    medium: "medium",
    tools: "tools",
    collection: "collection",
    tags: "tags",
  },
  processHeading: "process/",
  processTitlebar: (id: string, index: number, total: number) =>
    `${id}/process-${index}.jpg · ${index}/${total}`,
  relatedHeading: "related works",
} as const;

/*
 * Projects section chrome (ticket 22). Voice per ADR 0007: lowercase, terse,
 * real POSIX verbs; errors dry with a real command-link reset.
 */
/*
 * Prints section chrome (ticket 24). Voice per ADR 0007: lowercase, terse,
 * real POSIX verbs; errors dry with a real command-link reset.
 */
export const PRINTS = {
  filterCommand: "ls prints/",
  // two chips share the one command; each flag renders as --<flag>=
  materialFlag: "material",
  printerFlag: "printer",
  // closed starter enums (spec §4) — extended deliberately
  materials: ["pla", "petg", "resin", "abs"],
  printers: ["a1-mini", "ender-3"],
  materialLabels: { pla: "PLA", petg: "PETG", resin: "resin", abs: "ABS" },
  printerLabels: { "a1-mini": "A1 mini", "ender-3": "Ender 3" },
  // subject tags, own closed starter list (mirrors the art rule)
  startTags: ["mecha", "functional", "vase-mode", "cosplay", "gift", "car"],
  countSingular: "print",
  countPlural: "prints",
  emptyPrefix: "ls: no matches for --",
  // titlebar `filename … duration` — bare filename (id is `YYYY-MM-DD-<slug>`)
  filename: (id: string, file?: string) => file ?? `${id.slice(11)}.gcode`,
  dateISO: (d: Date) => d.toISOString().slice(0, 10),
  duration: (hours: number) => `${hours.toFixed(1)}h`,
  caption: (printer: string, material: string, tags: string[]) =>
    [printer, material, ...tags.map((t) => `#${t}`)].filter(Boolean).join(" · "),
  // detail windows
  specsHeading: "specs",
  specsTitlebar: "cat",
  modelsHeading: "models & notes",
  modelsTitlebar: "open",
  // specs datasheet keys
  specs: {
    date: "date",
    printer: "printer",
    material: "material",
    duration: "duration",
    tags: "tags",
  },
  photoTitlebar: (id: string, index: number, total: number) =>
    `${id.slice(11)}-${String(index).padStart(2, "0")}.jpg · ${index}/${total}`,
  logHeading: "maker log",
  // dated `## YYYY-MM-DD` body sections; `— failed` suffix marks a pink dot
  failedMarker: /—\s*fail/i,
  failedLabel: " — failed attempt",
} as const;

export const PROJECTS = {
  filterCommand: "ls projects --kind",
  flag: "kind",
  // "all" is the reset value, the rest mirror the closed kinds enum
  kindOptions: ["all", "work", "open-source", "personal"],
  countSingular: "project",
  countPlural: "projects",
  // real-ls-error convention (ADR 0007): "ls: no matches for --kind <value>"
  emptyPrefix: "ls: no matches for --",
  readmeTitlebar: (slug: string) => `${slug}/README.md`,
  rendered: "rendered",
  identify: (slug: string) => `identify ${slug}`,
  // datasheet keys (the `$ identify` output vocabulary)
  datasheet: {
    kinds: "kinds",
    status: "status",
    dates: "dates",
    role: "role",
    tech: "tech",
    links: "links",
  },
  screenshotsHeading: "screenshots",
  relatedHeading: "related studies",
  relatedEmpty: "# no linked studies yet",
  ongoing: "→",
  dates: (started: string, ended?: string | null) =>
    ended ? `${started} → ${ended}` : `${started} →`,
  screenshotTitlebar: (slug: string, index: number, total: number) =>
    `${slug}.png · ${index}/${total}`,
} as const;
