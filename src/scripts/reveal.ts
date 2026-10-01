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
