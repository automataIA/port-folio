# Portfolio — design system

Design system del portfolio ML Engineer di Carlo Calledda. Direzione **Technical / terminal**: DM Sans + DM Mono, palette fredda hue 200 con primario teal, angoli vivi, griglia 44px visibile, light e dark mode via `[data-theme]`.

## Foundations
- `styles.css` — token di colore, tipografia e motion (`--ease`, `--dur-1..4`, `--stagger`, `--shift`)
- `foundations/colors.html` — palette
- `foundations/typography.html` — scala tipografica
- `foundations/motion.html` — durate, easing, regole di reduced motion

## Components
Componenti-riga ripetibili: si compone una sezione passando dati, senza duplicare markup.

- **ExperienceItem** — ruolo, azienda, periodo, 2-4 bullet, tag stack
- **ProjectCard** — titolo, descrizione, tag variabili, link repo/demo, metrica opzionale
- **PublicationItem** — titolo, venue, anno, link
- **CertificationItem** — nome, ente, anno, badge opzionale
- **EmptyState** — sezione senza elementi

Contenitori: `.stack-list` (lista verticale) e `.card-grid` (flex-wrap, basis 320px: l'ultima riga si allarga, nessun buco con numeri dispari).

## Sections
`components/*.html` — le sezioni complete della pagina (nav, hero, about, skills, projects, publications, certifications, contact, footer).

## Explorations
`explorations/` — le tre direzioni visive valutate (A editoriale, B terminal, C evoluzione) e la pagina di confronto. B è quella adottata.
