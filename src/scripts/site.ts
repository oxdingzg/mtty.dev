// Fades sections in as they reach the viewport.
//
// The hiding class is applied from here rather than written into the markup, and
// only to elements that are still below the fold at load. So the page is whole
// without JavaScript, and nothing already on screen can flash as this file
// arrives.

const targets = document.querySelectorAll<HTMLElement>("[data-reveal]")

if (targets.length > 0 && "IntersectionObserver" in window) {
  const pending = Array.from(targets).filter(
    (target) => target.getBoundingClientRect().top > window.innerHeight * 0.85,
  )

  if (pending.length > 0) {
    for (const target of pending) target.classList.add("reveal-pending")

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add("is-revealed")
          observer.unobserve(entry.target)
        }
      },
      // A little way in, so nothing flickers at the very bottom edge.
      { rootMargin: "0px 0px -10% 0px" },
    )

    for (const target of pending) observer.observe(target)

    // Backstop for the case where the observer is present but never reports.
    setTimeout(() => {
      for (const target of pending) target.classList.add("is-revealed")
    }, 2500)
  }
}

// Copy buttons next to commands. The command text is read from the element the
// button points at, so what is copied is exactly what is shown.
for (const button of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
  button.hidden = !navigator.clipboard
  button.addEventListener("click", async () => {
    const source = document.getElementById(button.dataset.copy ?? "")
    if (!source) return
    await navigator.clipboard.writeText(source.textContent?.trim() ?? "")
    button.dataset.state = "copied"
    setTimeout(() => delete button.dataset.state, 1600)
  })
}

// Install commands: show one platform at a time, starting with the visitor's.
// Without this script both commands stay listed with their captions.
const windows = /win/i.test(
  (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ??
    navigator.platform ??
    navigator.userAgent,
)
for (const install of document.querySelectorAll<HTMLElement>("[data-install]")) {
  const tabs = install.querySelectorAll<HTMLButtonElement>("[data-os]")
  const select = (os: string) => {
    for (const tab of tabs) tab.setAttribute("aria-selected", String(tab.dataset.os === os))
    for (const panel of install.querySelectorAll<HTMLElement>("[data-os-panel]"))
      panel.hidden = panel.dataset.osPanel !== os
  }
  for (const tab of tabs) tab.addEventListener("click", () => select(tab.dataset.os ?? "unix"))
  install.querySelector<HTMLElement>("[role=tablist]")?.removeAttribute("hidden")
  install.dataset.ready = ""
  select(windows ? "windows" : "unix")
}

// The theme switch writes the same key Starlight uses, so the choice carries
// into the documentation and back.
for (const button of document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]")) {
  button.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light"
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem("starlight-theme", next)
    } catch {
      // Storage can be unavailable (private windows); the switch still works
      // for this page view.
    }
  })
}
