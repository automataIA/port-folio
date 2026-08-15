"""Assembla docs/index.html dal design system in design-bundle/.

Le sezioni projects/publications/certifications sono renderizzate qui a build
time a partire dai JSON in design-bundle/components/data/: il sito pubblicato
non carica React da CDN. Per aggiungere una voce si edita il JSON e si rilancia
questo script.
"""

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BUNDLE = ROOT / "design-bundle"
COMPONENTS = BUNDLE / "components"
DATA = COMPONENTS / "data"
OUT = ROOT / "docs" / "index.html"


def body_of(name: str) -> str:
    """Markup della sezione: da <body> al primo <script> che segue."""
    src = (COMPONENTS / f"{name}.html").read_text(encoding="utf-8")
    start = src.index("<body>") + len("<body>")
    end = src.index("<script", start)
    return src[start:end].strip("\n")


def styles() -> str:
    """I blocchi <style> del design system (identici in tutte le sezioni)."""
    src = (COMPONENTS / "hero.html").read_text(encoding="utf-8")
    blocks = re.findall(r"<style>(.*?)</style>", src, re.S)
    shared = (BUNDLE / "styles.css").read_text(encoding="utf-8")
    # il font arriva dal <link> in <head>, non serve l'@import
    shared = re.sub(r"^@import url\([^)]*\);\n", "", shared)
    return "\n".join(b.strip("\n") for b in blocks) + "\n" + shared


def e(text) -> str:
    return html.escape(str(text), quote=True)


# ── Port dei componenti-riga (design-bundle/components/*/*.jsx) ──

def tags(items) -> str:
    if not items:
        return ""
    spans = "".join(f'<span class="row-tag">{e(t)}</span>' for t in items)
    return f'<div class="row-tags">{spans}</div>'


def project_card(p) -> str:
    out = [f'<article class="row">', f'<div class="row-title">{e(p["title"])}</div>']
    if p.get("metric"):
        out.append(f'<div class="row-metric">{e(p["metric"])}</div>')
    if p.get("description"):
        out.append(f'<p class="row-desc">{e(p["description"])}</p>')
    out.append(tags(p.get("tags", [])))
    links = []
    if p.get("repo"):
        links.append(f'<a href="{e(p["repo"])}" target="_blank" rel="noopener">repo ↗</a>')
    if p.get("demo"):
        links.append(f'<a href="{e(p["demo"])}" target="_blank" rel="noopener">demo ↗</a>')
    if links:
        out.append(f'<div class="row-links">{"".join(links)}</div>')
    out.append("</article>")
    return "".join(x for x in out if x)


def publication_item(p) -> str:
    out = ['<article class="row">']
    if p.get("type"):
        out.append(f'<div class="row-badge">{e(p["type"])}</div>')
    year = f'<div class="row-meta">{e(p["year"])}</div>' if p.get("year") else ""
    out.append(f'<div class="row-head"><div class="row-title">{e(p["title"])}</div>{year}</div>')
    if p.get("venue"):
        out.append(f'<div class="row-sub">{e(p["venue"])}</div>')
    if p.get("summary"):
        out.append(f'<p class="row-desc">{e(p["summary"])}</p>')
    if p.get("url"):
        out.append(f'<div class="row-links"><a href="{e(p["url"])}" target="_blank" rel="noopener">read ↗</a></div>')
    out.append("</article>")
    return "".join(out)


def experience_item(x) -> str:
    out = ['<article class="row">']
    company = f'<div class="row-sub">{e(x["company"])}</div>' if x.get("company") else ""
    period = f'<div class="row-meta">{e(x["period"])}</div>' if x.get("period") else ""
    out.append(f'<div class="row-head"><div><div class="row-title">{e(x["role"])}</div>'
               f'{company}</div>{period}</div>')
    if x.get("bullets"):
        lis = "".join(f"<li>{e(b)}</li>" for b in x["bullets"][:4])  # come il JSX: max 4
        out.append(f'<ul class="row-bullets">{lis}</ul>')
    out.append(tags(x.get("stack", [])))
    out.append("</article>")
    return "".join(o for o in out if o)


def certification_item(c) -> str:
    out = ['<article class="row">']
    if c.get("badge"):
        out.append(f'<div class="row-badge">{e(c["badge"])}</div>')
    year = f'<div class="row-meta">{e(c["year"])}</div>' if c.get("year") else ""
    out.append(f'<div class="row-head"><div class="row-title">{e(c["name"])}</div>{year}</div>')
    if c.get("issuer"):
        out.append(f'<div class="row-sub">{e(c["issuer"])}</div>')
    if c.get("summary"):
        out.append(f'<p class="row-desc">{e(c["summary"])}</p>')
    out.append("</article>")
    return "".join(out)


def education_item(x) -> str:
    """Formato compatto: titolo, ente, luogo, anno — convenzione per profili
    con esperienza consolidata, dove l'istruzione occupa poco spazio."""
    where = " · ".join(v for v in (x.get("institution"), x.get("location")) if v)
    sub = f'<div class="row-sub">{e(where)}</div>' if where else ""
    year = f'<div class="row-meta">{e(x["year"])}</div>' if x.get("year") else ""
    out = ['<article class="row">',
           f'<div class="row-head"><div><div class="row-title">{e(x["degree"])}</div>'
           f'{sub}</div>{year}</div>']
    if x.get("note"):
        out.append(f'<p class="row-desc">{e(x["note"])}</p>')
    out.append("</article>")
    return "".join(out)


def empty_state(label="No entries yet", hint="") -> str:
    return f'<div class="empty"><b>{e(label)}</b>{e(hint) if hint else ""}</div>'


def fill(section: str, container_id: str, rows: list[str], empty_label: str) -> str:
    """Sostituisce il div contenitore vuoto con le righe pre-renderizzate."""
    markup = "".join(rows) if rows else empty_state(empty_label)
    pattern = re.compile(rf'(<div id="{container_id}" class="[^"]*">)(</div>)')
    new, n = pattern.subn(lambda m: m.group(1) + markup + m.group(2), section)
    if n != 1:
        raise SystemExit(f"contenitore #{container_id} non trovato (match: {n})")
    return new


# La sezione Experience non arriva da Claude Design: il componente ExperienceItem
# esiste nel design system ma non era montato in nessuna pagina. Shell modellata
# su publications.html.
EXPERIENCE_SECTION = """    <section id="experience">
        <div class="w">
            <div class="sec-title">Career</div>
            <h2 class="sec-heading">Work Experience</h2>
            <div id="experience-list" class="stack-list"></div>
        </div>
    </section>"""


BACKGROUND_SECTION = """    <section id="background">
        <div class="w">
            <div class="sec-title">Background</div>
            <h2 class="sec-heading">Education &amp; Languages</h2>
            <div id="education-list" class="stack-list"></div>
            <div class="row-tags" style="margin-top:20px">{languages}</div>
        </div>
    </section>"""


def build() -> None:
    projects = json.loads((DATA / "projects.json").read_text(encoding="utf-8"))
    publications = json.loads((DATA / "publications.json").read_text(encoding="utf-8"))
    certifications = json.loads((DATA / "certifications.json").read_text(encoding="utf-8"))
    experience = json.loads((DATA / "experience.json").read_text(encoding="utf-8"))

    background = json.loads((DATA / "background.json").read_text(encoding="utf-8"))

    exp = fill(EXPERIENCE_SECTION, "experience-list",
               [experience_item(x) for x in experience], "No experience listed yet")

    langs = "".join(f'<span class="row-tag">{e(l["name"])} — {e(l["level"])}</span>'
                    for l in background["languages"])
    bg = fill(BACKGROUND_SECTION.format(languages=langs), "education-list",
              [education_item(x) for x in background["education"]], "No education listed yet")

    # la nav punta a #projects, la sezione arriva dal design system con id="work"
    work = body_of("projects").replace('<section id="work">', '<section id="projects">', 1)
    work = fill(work, "featured-projects",
                [project_card(p) for p in projects["featured"]], "No featured projects yet")
    work = fill(work, "more-projects",
                [project_card(p) for p in projects["more"]], "No other projects yet")

    pubs = fill(body_of("publications"), "publications-list",
                [publication_item(p) for p in publications], "No publications yet")

    certs = fill(body_of("certifications"), "certifications-list",
                 [certification_item(c) for c in certifications], "No certifications yet")

    main = "\n".join([body_of("hero"), body_of("about"), exp, body_of("skills"),
                      work, pubs, certs, bg, body_of("contact")])

    # la nav arriva dal design system senza voce Experience
    nav = body_of("nav").replace(
        '<li><a href="#skills">Skills</a></li>',
        '<li><a href="#experience">Experience</a></li>\n'
        '                <li><a href="#skills">Skills</a></li>', 1)
    if "#experience" not in nav:
        raise SystemExit("voce Experience non inserita nella nav")

    page = f"""<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carlo Calledda — ML Engineer</title>
    <meta name="description" content="Portfolio of Carlo Calledda, AI & Machine Learning Engineer">
    <link rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23157a63'/><text x='50' y='68' font-size='58' font-family='sans-serif' font-weight='700' text-anchor='middle' fill='white'>C</text></svg>">
    <script>
        // Applica il tema salvato prima del paint per evitare il flash
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet">
    <style>
{styles()}
    </style>
</head>

<body>
{nav}

    <main id="main-content">
{main}
    </main>

{body_of("footer")}

    <script>
        (function () {{
            var y = document.getElementById('year');
            if (y) y.textContent = new Date().getFullYear();

            var root = document.documentElement, btn = document.getElementById('theme-toggle');
            if (btn) {{
                btn.addEventListener('click', function () {{
                    var dark = root.getAttribute('data-theme') === 'dark';
                    root.setAttribute('data-theme', dark ? 'light' : 'dark');
                    localStorage.setItem('theme', dark ? 'light' : 'dark');
                }});
            }}

            var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
            var rev = document.querySelectorAll('[data-reveal]');
            if (reduce) {{ rev.forEach(function (e) {{ e.classList.add('is-in') }}) }}
            else if ('IntersectionObserver' in window) {{
                var io = new IntersectionObserver(function (es) {{
                    es.forEach(function (e) {{
                        if (e.isIntersecting) {{ e.target.classList.add('is-in'); io.unobserve(e.target) }}
                    }})
                }}, {{ rootMargin: '0px 0px -8% 0px', threshold: .15 }});
                rev.forEach(function (e, i) {{ e.style.setProperty('--i', i % 4); io.observe(e) }});
            }} else {{ rev.forEach(function (e) {{ e.classList.add('is-in') }}) }}

            var nums = document.querySelectorAll('.hero-stat-num,.about-stat-num');
            if (nums.length && !reduce && 'IntersectionObserver' in window) {{
                var io2 = new IntersectionObserver(function (es) {{
                    es.forEach(function (e) {{
                        if (!e.isIntersecting) return; io2.unobserve(e.target);
                        var el = e.target, txt = el.textContent.trim(), m = txt.match(/^(\\d+)(.*)$/); if (!m) return;
                        var end = +m[1], suf = m[2], t0 = null, d = 400;
                        el.setAttribute('data-count', '');
                        function step(t) {{
                            if (!t0) t0 = t; var p = Math.min((t - t0) / d, 1);
                            var e2 = 1 - Math.pow(1 - p, 3);
                            el.textContent = Math.round(end * e2) + suf;
                            if (p < 1) requestAnimationFrame(step)
                        }}
                        el.textContent = '0' + suf; requestAnimationFrame(step);
                    }})
                }}, {{ threshold: .6 }});
                nums.forEach(function (n) {{ io2.observe(n) }});
            }}

            var nav = document.querySelector('nav');
            if (nav) {{
                var onScroll = function () {{ nav.classList.toggle('is-scrolled', window.scrollY > 8) }};
                onScroll(); addEventListener('scroll', onScroll, {{ passive: true }});
            }}
        }})();
    </script>
</body>

</html>
"""
    OUT.write_text(page, encoding="utf-8")
    print(f"{OUT.relative_to(ROOT)} — {len(page):,} byte")
    print(f"  {len(experience)} experience entries")
    print(f"  {len(projects['featured'])} featured + {len(projects['more'])} more projects")
    print(f"  {len(publications)} publications, {len(certifications)} certifications")
    print(f"  {len(background['education'])} education, {len(background['languages'])} languages")


if __name__ == "__main__":
    build()
