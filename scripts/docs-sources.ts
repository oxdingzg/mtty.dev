// Pages this site publishes from a product repository.
//
// `to` is a path under src/content/docs/docs/ — Starlight derives the route from
// it, so `to: "miao/guide"` becomes /docs/miao/guide/.
//
// Documents that are not listed here stay in the product repository. The site
// publishes the user-facing layer only; internal engineering records (audits,
// feasibility studies, ADRs) are deliberately excluded.

export type DocSource = {
  repo: string
  from: string
  to: string
  order: number
}

export const sources: DocSource[] = [
  { repo: "oxdingzg/miao", from: "docs/guide.en.md", to: "miao/guide", order: 1 },
  { repo: "oxdingzg/miao", from: "docs/release.en.md", to: "miao/release", order: 2 },
  {
    repo: "oxdingzg/miao",
    from: "docs/miao-vs-opencode.en.md",
    to: "miao/miao-vs-opencode",
    order: 3,
  },
]
