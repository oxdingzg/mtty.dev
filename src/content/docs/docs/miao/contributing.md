---
title: Contributing
description: How to report a problem and send a change to miao.
sidebar:
  order: 8
---

miao is MIT licensed and developed in the open at
[oxdingzg/miao](https://github.com/oxdingzg/miao). The full guide is
[`CONTRIBUTING.md`](https://github.com/oxdingzg/miao/blob/main/CONTRIBUTING.md)
in the repository; this page is the short version.

## Before you write code: open an issue

**Every pull request must reference an existing issue.** Open an issue
describing the bug or the feature first — it helps maintainers triage, and it
prevents two people doing the same work. A pull request without a linked issue
may be closed without review.

Link it with `Fixes #123` or `Closes #123` in the pull request description. For
a small fix, a brief issue is enough: just enough context to understand the
problem.

Anyone can open an issue at
[github.com/oxdingzg/miao/issues](https://github.com/oxdingzg/miao/issues).

## Pull requests

- Keep them **small and focused**.
- Explain the problem and why your change fixes it.
- Before adding new functionality, check that it does not already exist
  elsewhere in the codebase.
- **UI changes**: include screenshots or a video showing before and after.
- **Logic changes** (bug fixes, features, refactors): explain how you verified
  it — what you tested, and how a reviewer can reproduce it.

Long, AI-generated pull request descriptions and issues are not acceptable and
may be ignored: write short, focused descriptions in your own words. If you
cannot explain the change briefly, the change is probably too large.

### Titles

Titles follow conventional commits, optionally with a scope:

```text
feat: add dark mode support
fix: resolve crash on startup
docs: update contributing guidelines
chore: bump dependency versions
feat(app): add dark mode support
fix(desktop): resolve crash on startup
```

The prefixes are `feat:`, `fix:`, `docs:`, `chore:`, `refactor:` and `test:`.

## Working on the code

The development setup, the commands for running from source, the API server, the
web app and the desktop app, and the debugger setup are all in
[`CONTRIBUTING.md`](https://github.com/oxdingzg/miao/blob/main/CONTRIBUTING.md).
[The guide](/docs/miao/guide/) covers installing and using the released agent,
which is usually the faster starting point.

## Security

Do not report vulnerabilities as issues — see [Security](/docs/miao/security/).

## License

miao is MIT licensed. By contributing, you agree that your contribution is
provided under the same licence.
