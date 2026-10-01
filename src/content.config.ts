import { defineCollection } from "astro:content"
import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders"
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema"

// `docs` is the documentation tree. `i18n` holds UI string overrides; Starlight
// reads it eagerly, so leaving it undefined prints a "collection does not
// exist" warning on every build even when no strings are overridden.
export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
}
