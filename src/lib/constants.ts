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
