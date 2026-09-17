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
 * Projects section chrome (ticket 22). Voice per ADR 0007: lowercase, terse,
 * real POSIX verbs; errors dry with a real command-link reset.
 */
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
