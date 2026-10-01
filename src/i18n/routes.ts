// The marketing pages exist in both languages and mirror one another
// one-to-one, so translating a path is a prefix swap. Documentation routes are
// left to Starlight, which owns its own language switcher.

export type Locale = "en" | "zh"

export const LOCALES: Locale[] = ["en", "zh"]

/** English is the root locale, so it takes no prefix. */
export function prefixFor(locale: Locale) {
  return locale === "en" ? "" : `/${locale}`
}

export function alternateFor(locale: Locale, pathname: string) {
  if (locale === "en") return `/zh${pathname}`
  return pathname.replace(/^\/zh/, "") || "/"
}
