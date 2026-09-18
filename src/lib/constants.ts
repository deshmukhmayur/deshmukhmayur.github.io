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

// nav labels are the section paths without the prompt "$" (user review, 12)
export const NAV = [
  { label: "~/projects", href: "/projects/" },
  { label: "~/art", href: "/art/" },
  { label: "~/prints", href: "/prints/" },
  { label: "~/soliloquy", href: "/soliloquy/" },
  { label: "~/studies", href: "/studies/" },
  { label: "~/about", href: "/about/" },
  { label: "~/contact", href: "/contact/" },
] as const;

export const FOOTER = {
  ascii: `  /\\_/\\
 ( o.o )   no trackers were harmed
  > ^ <    in the making of this site`,
  copyright: (year: number) => `© ${year} mayur deshmukh`,
  rssLabel: "rss",
  contactLabel: "contact",
} as const;

/*
 * Social identity (ticket 12). Brand keys map to SocialIcon's inline SVGs;
 * the footer row and the homepage pane corners both read from here.
 */
export const SOCIALS = [
  { brand: "github", label: "github", href: "https://github.com/deshmukhmayur" },
  { brand: "linkedin", label: "linkedin", href: "https://linkedin.com/in/deshmukhmayur" },
  { brand: "cara", label: "cara", href: "https://cara.app/deshmukhmayur" },
  { brand: "instagram", label: "instagram", href: "https://instagram.com/deshmukhmayur" },
  { brand: "printables", label: "printables", href: "https://printables.com/@mayur" },
] as const;

export type SocialBrand = (typeof SOCIALS)[number]["brand"];

export const THEME = {
  key: "site-theme",
  default: "dark",
} as const;

// demo-page chrome (interim page until real sections land in tickets 22–29)
export const DEMO = {
  commands: ["cat hello.md", "ls ~/"],
  comment: "# demo page — real sections land in tickets 22–29",
  // compact chip label (ticket 12): [dark] / [light]
  toggleLabel: (theme: string) => `[${theme}]`,
} as const;

/*
 * Art section chrome (ticket 23). Voice per ADR 0007: lowercase, terse,
 * real POSIX verbs; errors dry with a real command-link reset.
 */
export const ART = {
  filterCommand: "ls art",
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
  filterCommand: "ls prints",
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

/*
 * Studies section chrome (ticket 25). Voice per ADR 0007: lowercase, terse,
 * real POSIX verbs. Tags are open vocabulary, shared with Soliloquy.
 */
export const STUDIES = {
  filterCommand: "ls studies",
  flag: "tag",
  countSingular: "study",
  countPlural: "studies",
  emptyPrefix: "ls: no matches for --",
  // `$ identify <slug>.md` datasheet (spec §4)
  identify: (slug: string) => `identify ${slug}.md`,
  dateISO: (d: Date) => d.toISOString().slice(0, 10),
  datasheet: {
    date: "date",
    status: "status",
    tags: "tags",
    projects: "projects",
  },
  relatedHeading: "related studies",
  relatedEmpty: "# no related studies yet",
} as const;

/*
 * Soliloquy section chrome (ticket 26). Voice per ADR 0007: lowercase, terse,
 * real POSIX verbs. Tags are open vocabulary, shared with Studies.
 */
export const SOLILOQUY = {
  filterCommand: "ls soliloquy",
  flag: "tag",
  countSingular: "entry",
  countPlural: "entries",
  emptyPrefix: "ls: no matches for --",
  railHeading: "tail -f by month",
  dayISO: (dt: string) => dt.slice(0, 10),
  time: (dt: string) => dt.slice(11, 16),
  // `[2026-09-14 · 09:12]` — the pink timestamp
  stamp: (dt: string) => `[${dt.slice(0, 10)} · ${dt.slice(11, 16)}]`,
  entryNo: (n: number, total: number) => `entry #${n} of ${total}`,
  eof: "· · ·",
  // `$ cd ../entry-NN` prev/next (spec §4)
  navCmd: (n: number) => `cd ../entry-${n}`,
} as const;

/*
 * Contact form (ticket 27). One shared component for /contact/ and the
 * homepage pane. Voice per ADR 0007; status lines are real, never faked.
 */
export const CONTACT = {
  // session opens with the canonical mail command (ADR 0007 prompt anchor)
  sessionPrompt: PROMPTS.contactMail,
  sessionReply: "starting a new message… ok. three questions, then send.",
  fields: {
    name: "name:",
    email: "email:",
    message: "message:",
  },
  placeholders: {
    name: "who's asking",
    email: "you@somewhere.tld",
    message: "what's on your mind?",
  },
  honeypotLabel: "website:",
  // truthful placeholder when the site key isn't provisioned yet (HITL, 31)
  turnstileNote: "turnstile slot — keys provision at deploy",
  sendButton: "send",
  sending: "sending…",
  ok: "$ send ok — message queued. i'll try my best to respond.",
  error: "$ send: error — something ate the message. try again?",
  // 413/429 variants keep the dry unix tone (ADR 0007)
  errorTooLarge: "$ send: error — message too long. trim it and resend.",
  errorRateLimit: "$ send: error — rate limited. try again in a minute.",
manHeading: "man contact",
  manIntro:
    "one short form, straight to my inbox. replies come from my actual email — no ticket numbers, no \"do not reply\".",
  manSections: [
    {
      name: "name",
      text: "contact — send mayur a message",
    },
    {
      name: "description",
      text: "sends a short message to mayur's inbox — commissions, collabs, questions, kind words. fields: name, email, message.",
    },
    {
      name: "options",
      text: "--faster   quicker channels, listed below under elsewhere/",
    },
  ],
  manFaster: "ls elsewhere/ --faster",
  manAlt: [
    { label: "github issues", href: "https://github.com/deshmukhmayur" },
    { label: "instagram dm", href: "https://instagram.com/deshmukhmayur" },
    { label: "reply on a soliloquy", href: "/soliloquy/" },
  ],
  manReplyTime: "i usually reply within a few days.",
  endpoint: "/api/send",
} as const;

/*
 * Homepage (ticket 28, prototype variant F). Neofetch header + panes.
 * Placeholder until real content lands (spec §7 HITL slots).
 */
export const HOME = {
  bio: "software by day, drawings and plastic by night",
  now: {
    role: "software engineer",
    employer: "acme corp",
    href: "https://example.com",
    tenure: "2022–present",
  },
  resume: { label: "résumé.pdf", href: "/resume/" },
  paneLinks: {
    work: [
      { label: "github", href: "https://github.com/deshmukhmayur" },
      { label: "linkedin", href: "https://linkedin.com/in/deshmukhmayur" },
    ],
    art: [
      { label: "cara", href: "https://cara.app/deshmukhmayur" },
      { label: "instagram", href: "https://instagram.com/deshmukhmayur" },
    ],
    prints: [{ label: "printables", href: "https://printables.com/@mayur" }],
  },
  skills: [
    { key: "languages", value: "typescript · python · go" },
    { key: "web", value: "astro · react · node" },
    { key: "tools", value: "docker · cloudflare · linux" },
    { key: "extras", value: "fusion 360 · clip studio" },
  ],
  // featured slot minimums — featured entries first, recent entries pad the rest
  slots: { projects: 2, art: 3, prints: 2, studies: 1 },
  soliloquyHeading: "soliloquy of the day — ",
} as const;

export const PROJECTS = {
  // ticket 12: the static flag moved out of the command label — chips carry it
  filterCommand: "ls projects",
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

/*
 * About page (ticket 29, prototype variant D). Unboxed `$ whoami --verbose`
 * dl + `~/.history` timeline + right rail (resume, `ls content --count`
 * stats, `ls elsewhere/`). Voice per ADR 0007.
 */
export const ABOUT = {
  whoamiCommand: "whoami --verbose",
  whoami: {
    name: "mayur deshmukh",
    role: "software engineer",
    roleNote: " · web, tooling, occasional ops",
    now: "acme corp",
    tenure: "2022–present",
    focus: "software · anime-style illustration · 3D printing",
    site: "a playground",
    siteNote: " — the three hobbies, one roof",
  },
  historyTitlebar: "~/.history",
  historyCaption: "how i got here",
  // dated rows oldest → newest; year in pink
  history: [
    { year: "2018", text: "wrote my first line of python. never really stopped." },
    { year: "2020", text: "first anime-style illustration posted; clip studio paint joined the toolkit and never left." },
    { year: "2021", text: 'bought an ender 3 to print "one bracket". it snowballed into a second printer and a shelf of PETG.' },
    { year: "2022", text: "now → software engineer at acme corp · web, tooling, occasional ops" },
    { year: "2026", text: "rebuilt this site as a terminal. you're inside it." },
  ],
  // right rail
  resumeCmd: "curl -O resume.pdf",
  resumeNote: "→ /resume/ · download starts automatically · counted as a pageview",
  statsCmd: "ls content --count",
  statsNote: "counts computed from the content collections at build time",
  elsewhereCmd: "ls elsewhere/",
  elsewhere: [
    { label: "github", href: "https://github.com/deshmukhmayur" },
    { label: "linkedin", href: "https://www.linkedin.com/in/deshmukhmayur204/" },
    { label: "instagram", href: "https://instagram.com/deshmukhmayur" },
    { label: "youtube", href: "https://youtube.com/@deshmukhmayur" },
  ],
  ps: "p.s. — want to say hi? ",
  psLinkLabel: "the contact page",
  psLinkTail: " is one short form away.",
} as const;

/*
 * /resume/ interstitial (ticket 29, per ticket 08's spec). Tiny HTML page
 * that triggers the PDF download immediately — counts the download as a
 * pageview, and doubles as the shareable resume landing link.
 */
export const RESUME = {
  filename: "resume.pdf",
  heading: "download starting…",
  note: "if nothing happens, grab it directly:",
  directLabel: "resume.pdf",
} as const;

/*
 * 404 page (ticket 29, prototype variant D). Neofetch-style: ascii-cat logo
 * slot, host line, key/value block, `ls ~ →` nav. Static page — the real
 * requested path is filled in client-side from location.pathname.
 */
export const NOT_FOUND = {
  logoPlaceholder: `    ?
  /\\_/\\
 ( o.o )  ← confused but fine
  > ^ <`,
  cause: "the page moved, was never born, or the url has a typo",
  os: "mayur's playground",
  osNote: " (static edition)",
  host: "astro on cloudflare workers",
  uptime: "since 2026",
  uptimeNote: " — longest-running rewrite yet",
  status: "everything else is intact",
  statusNote: " — see below",
  navCmd: "ls ~",
  // `ls ~` nav — label + href pairs
  dirs: [
    { label: "home/", href: "/" },
    { label: "projects/", href: "/projects/" },
    { label: "art/", href: "/art/" },
    { label: "prints/", href: "/prints/" },
    { label: "studies/", href: "/studies/" },
    { label: "soliloquy/", href: "/soliloquy/" },
    { label: "about/", href: "/about/" },
    { label: "contact/", href: "/contact/" },
  ],
} as const;

/*
 * SEO layer (ticket 30, spec §8). Locked strings: title cascade
 * (homepage bare / detail ` — deshmukhmayur.com` / listing ` — Mayur
 * Deshmukh`), twitter:site, og:site_name, sameAs (all six identity
 * profiles — identity, not navigation; spec §9).
 */
export const SEO = {
  siteName: "Mayur Deshmukh",
  host: "deshmukhmayur.com",
  twitterSite: "@deshmukhmayur_",
  // hand-written per-section fallback descriptions (template `<Section> — …`)
  sections: {
    projects: "Projects — software built and maintained, from work tools to open-source and personal experiments.",
    art: "Art — digital and ink drawings, anime-style illustrations, sketches, and process shots.",
    prints: "Prints — 3D printing makes: specs, settings, model links, and maker logs.",
    soliloquy: "Soliloquy — casual entries, as they happen.",
    studies: "Studies — substantive write-ups: case studies, findings, experiments.",
    about: "About — whoami, how i got here, and where else to find me.",
    contact: "Contact — one short form, straight to mayur's inbox.",
    resume: "Resume — grab the pdf.",
    "404": "Nothing lives at this url.",
  },
  feeds: {
    sitewide: {
      title: "Mayur Deshmukh",
      description: SITE.description,
    },
    studies: {
      title: "Mayur Deshmukh — Studies",
      description: "Substantive write-ups: case studies, findings, experiments.",
    },
    soliloquy: {
      title: "Mayur Deshmukh — Soliloquy",
      description: "Casual entries, as they happen.",
    },
  },
  // all six identity profiles (spec §9): displayed socials + ArtStation/Twitter
  sameAs: [
    "https://github.com/deshmukhmayur",
    "https://linkedin.com/in/deshmukhmayur",
    "https://instagram.com/deshmukhmayur",
    "https://youtube.com/@deshmukhmayur",
    "https://artstation.com/deshmukhmayur",
    "https://twitter.com/deshmukhmayur_",
  ],
  // static per-section 1200×630 OG cards (public/og/); placeholders until 32
  og: {
    staticFor: (section: string) => `/og/${section}.png`,
    // satori-generated fallback card for entry details
    generatedFor: (section: string, slug: string) => `/og/gen/${section}/${slug}.png`,
  },
} as const;
