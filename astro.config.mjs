// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"

// mtty.dev is the umbrella site for two products: miao (an AI coding agent) and
// mtty (a Rust terminal emulator). Hand-written marketing pages own the root;
// Starlight renders the documentation under /docs.
//
// Starlight's `base` option applies to the whole project, so `base: "/docs"`
// would push src/pages/index.astro to /docs/ as well — and the marketing home
// has to own "/". The content directory is therefore nested one level deeper
// (src/content/docs/docs/**), which is the approach Starlight documents for
// mounting at a subpath: https://github.com/withastro/starlight/discussions/966
export default defineConfig({
  site: "https://mtty.dev",
  output: "static",
  devToolbar: { enabled: false },
  integrations: [
    starlight({
      title: "mtty.dev",
      description:
        "miao — an AI coding agent for the terminal. mtty — a fast, embeddable terminal emulator written in Rust.",
      defaultLocale: "root",
      locales: {
        root: { label: "English", lang: "en" },
        zh: { label: "简体中文", lang: "zh-CN" },
      },
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/oxdingzg" }],
      customCss: ["./src/styles/tokens.css", "./src/styles/starlight.css"],
      sidebar: [
        {
          label: "miao",
          translations: { zh: "miao" },
          items: [{ autogenerate: { directory: "docs/miao" } }],
        },
        {
          label: "mtty",
          translations: { zh: "mtty" },
          items: [{ autogenerate: { directory: "docs/mtty" } }],
        },
      ],
    }),
  ],
})
