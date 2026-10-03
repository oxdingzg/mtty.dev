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
    order: 2,
    sources: { en: "docs/release.en.md", zh: "docs/release.zh.md" },
  },
  {
    repo: "oxdingzg/miao",
    to: "miao/miao-vs-opencode",
    order: 3,
    sources: {
      en: "docs/miao-vs-opencode.en.md",
      zh: "docs/miao-vs-opencode.zh.md",
    },
  },

  // miao-term names its bilingual pairs `X.md` / `X.zh-CN.md`, so each page
  // states both paths rather than the sync assuming one convention.
  {
    repo: "oxdingzg/miao-term",
    to: "mtty/install",
    order: 1,
    sources: { en: "docs/INSTALL.md", zh: "docs/INSTALL.zh-CN.md" },
  },
  {
    repo: "oxdingzg/miao-term",
    to: "mtty/config",
    order: 2,
    sources: { en: "docs/CONFIG.md", zh: "docs/CONFIG.zh-CN.md" },
  },
  {
    repo: "oxdingzg/miao-term",
    to: "mtty/cli",
    order: 3,
    sources: { en: "docs/CLI.md", zh: "docs/CLI.zh-CN.md" },
  },
  {
    repo: "oxdingzg/miao-term",
    to: "mtty/shortcuts",
    order: 4,
    sources: { en: "docs/SHORTCUTS.md", zh: "docs/SHORTCUTS.zh-CN.md" },
  },
  {
    repo: "oxdingzg/miao-term",
    to: "mtty/troubleshooting",
    order: 5,
    sources: { en: "docs/TROUBLESHOOTING.md", zh: "docs/TROUBLESHOOTING.zh-CN.md" },
  },
  {
    repo: "oxdingzg/miao-term",
    to: "mtty/view-rules",
    order: 6,
    sources: { en: "docs/VIEW-RULES.md", zh: "docs/VIEW-RULES.zh-CN.md" },
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
