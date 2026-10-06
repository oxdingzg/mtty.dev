// Pages this site publishes from a product repository.
//
// `to` is the path under the documentation root — Starlight derives the route
// from it, so `to: "miao/guide"` becomes /docs/miao/guide/ in English and
// /zh/docs/miao/guide/ in Chinese.
//
// Documents that are not listed here stay in the product repository. The site
// publishes the user-facing layer only; internal engineering records (audits,
// feasibility studies, ADRs) are deliberately excluded.

export const LOCALES = ["en", "zh"] as const
export type Locale = (typeof LOCALES)[number]

export type DocPage = {
  repo: string
  to: string
  order: number
  sources: Record<Locale, string>
}

export const pages: DocPage[] = [
  {
    repo: "oxdingzg/miao",
    to: "miao/guide",
    order: 1,
    sources: { en: "docs/guide.en.md", zh: "docs/guide.zh.md" },
  },
  {
    repo: "oxdingzg/miao",
    to: "miao/release",
    order: 4,
    sources: { en: "docs/release.en.md", zh: "docs/release.zh.md" },
  },
  {
    repo: "oxdingzg/miao",
    to: "miao/miao-vs-opencode",
    order: 5,
    sources: {
      en: "docs/miao-vs-opencode.en.md",
      zh: "docs/miao-vs-opencode.zh.md",
    },
  },

  // The security policy is published verbatim rather than summarised. A
  // hand-written summary of it drifted from the code once already — it still
  // claimed miao had no sandbox after crates/miao-sandbox landed — and a
  // security document is the worst place for that to go unnoticed.
  {
    repo: "oxdingzg/miao",
    to: "miao/security",
    order: 7,
    sources: { en: "SECURITY.md", zh: "SECURITY.zh.md" },
  },

  // mtty names its bilingual pairs `X.md` / `X.zh-CN.md`, so each page
  // states both paths rather than the sync assuming one convention.
  {
    repo: "oxdingzg/mtty",
    to: "mtty/install",
    order: 1,
    sources: { en: "docs/INSTALL.md", zh: "docs/INSTALL.zh-CN.md" },
  },
  {
    repo: "oxdingzg/mtty",
    to: "mtty/config",
    order: 2,
    sources: { en: "docs/CONFIG.md", zh: "docs/CONFIG.zh-CN.md" },
  },
  {
    repo: "oxdingzg/mtty",
    to: "mtty/cli",
    order: 6,
    sources: { en: "docs/CLI.md", zh: "docs/CLI.zh-CN.md" },
  },
  {
    repo: "oxdingzg/mtty",
    to: "mtty/shortcuts",
    order: 5,
    sources: { en: "docs/SHORTCUTS.md", zh: "docs/SHORTCUTS.zh-CN.md" },
  },
  {
    repo: "oxdingzg/mtty",
    to: "mtty/troubleshooting",
    order: 8,
    sources: { en: "docs/TROUBLESHOOTING.md", zh: "docs/TROUBLESHOOTING.zh-CN.md" },
  },
  {
    repo: "oxdingzg/mtty",
    to: "mtty/view-rules",
    order: 7,
    sources: { en: "docs/VIEW-RULES.md", zh: "docs/VIEW-RULES.zh-CN.md" },
  },
  {
    repo: "oxdingzg/mtty",
    to: "mtty/security",
    order: 9,
    sources: { en: "SECURITY.md", zh: "SECURITY.zh-CN.md" },
  },
]

/** The site route a published page owns, or null when it stays on GitHub. */
export function routeFor(repo: string, locale: Locale, from: string) {
  const page = pages.find(
    (candidate) => candidate.repo === repo && candidate.sources[locale] === from,
  )
  if (!page) return null
  return locale === "en" ? `/docs/${page.to}/` : `/${locale}/docs/${page.to}/`
}
