# AI & Machine Learning Engineer Portfolio

![Portfolio Preview](docs/assets/images/port.png)

> Portfolio site for an AI / Machine Learning Engineer. Static single-file output, no runtime dependencies, deployed to GitHub Pages.

**Live:** https://automataia.github.io/port-folio/

## How this repo works

`docs/index.html` is **generated**, not hand-edited. Content lives in JSON, design lives in a component library, and a build script assembles the two into one static file.

```
design-bundle/          design system (synced with Claude Design)
  styles.css              design tokens + row primitives
  foundations/            colors, typography, motion specs
  components/
    data/*.json           ← content lives here
    */*.jsx               row components (reference implementation)
    *.html                page sections
        │
        │  uv run scripts/build_site.py
        ▼
docs/index.html         single static file, deployed
```

The row components are ported to Python inside the build script and rendered at build time. The published page ships **no third-party JavaScript** — no React, no CDN. Only Google Fonts is fetched externally.

## Adding content

Edit the relevant JSON, then rebuild:

```bash
uv run scripts/build_site.py
```

| To add | Edit |
|---|---|
| a job | `design-bundle/components/data/experience.json` |
| a project | `design-bundle/components/data/projects.json` (`featured` or `more`) |
| a publication | `design-bundle/components/data/publications.json` |
| a certification | `design-bundle/components/data/certifications.json` |
| a degree or language | `design-bundle/components/data/background.json` |

Optional fields may be omitted — the components skip them. `ProjectCard` accepts `title`, `description`, `tags[]`, `repo`, `demo`, `metric`; `ExperienceItem` accepts `role`, `company`, `period`, `bullets[]` (max 4 rendered), `stack[]`. Empty arrays render an empty state rather than a blank section.

Hero, About, Skills and Contact are markup, not data: edit them in `design-bundle/components/<section>.html` and rebuild.

## Changing the design

Design tokens are in `design-bundle/styles.css`:

```css
:root {
  --pri: oklch(0.45 0.13 170);   /* primary — teal */
  --acc: oklch(0.50 0.13 60);    /* accent */
  --bg:  oklch(0.97 0.004 200);  /* background */
  --r: 0px;                      /* corner radius */
  --dur-2: 200ms;                /* motion durations */
  --ease: cubic-bezier(.22,.61,.36,1);
}
```

Dark mode overrides the same tokens under `[data-theme="dark"]`. The theme is applied before first paint from `localStorage` to avoid a flash, and toggled from the nav.

Motion is CSS transforms plus one `IntersectionObserver`. Under `prefers-reduced-motion: reduce` every reveal resolves immediately — no content is left at `opacity: 0`.

## Deployment

Pushing to `main` with changes under `docs/` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which uploads `docs/` and deploys it to GitHub Pages.

One-time setup: **Settings → Pages → Source: GitHub Actions**.

## Local preview

```bash
uv run scripts/build_site.py
python -m http.server -d docs 8000   # http://localhost:8000
```

Opening `docs/index.html` directly via `file://` also works — the page has no fetches or module imports.

## Project structure

```
portfolio/
├── docs/                       # deployed site (generated — do not edit by hand)
│   ├── index.html
│   ├── assets/images/port.png
│   └── .nojekyll
├── design-bundle/              # design system, synced with Claude Design
├── scripts/build_site.py       # design-bundle/ → docs/index.html
├── .github/workflows/deploy.yml
├── others/                     # drafts, audits, earlier versions (not deployed)
└── README.md
```

## Stack

Vanilla HTML, CSS and JavaScript. DM Sans + DM Mono. Colors in `oklch`. Build script is Python, run with [uv](https://docs.astral.sh/uv/). No bundler, no framework, no package manifest.
