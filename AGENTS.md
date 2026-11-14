# AGENTS.md — Formosa Trails 🏞️

This file tells any AI agent (Claude, ChatGPT, Copilot, Codex, etc.) how this project works and **how to keep building it the same way**. Read the whole file before changing anything.

---

## 1. Project purpose

**Formosa Trails** is a static travel guide to hiking and travel spots in Taiwan.
Each spot gets **one page** that answers five questions for a first-time visitor:

1. **What to do** there
2. **What to eat** there
3. **How to get** there (public transport first)
4. **When to go** (best season, month by month)
5. **What it looks like** (photos)

Audience: international students and travelers in Taiwan who can read English, plus some Chinese place names.
Goal: someone should be able to plan a day trip from one page alone.

---

## 2. Tech rules

- Plain **HTML + CSS + a little vanilla JS**. No frameworks, no build step, no npm.
- Hosted on **GitHub Pages** straight from the `main` branch root.
- All links must be **relative** (`../css/style.css`, `spots/alishan.html`), never starting with `/`, so the site works under `https://<user>.github.io/<repo>/`.
- Only one external resource is allowed: the Google Fonts link already in the `<head>`. Do not add other CDNs or libraries.
- Keep `.nojekyll` in the root (it stops GitHub from running Jekyll on the files).

---

## 3. Folder structure

```
taiwan-trails/
├── AGENTS.md                ← this file (rules for AI)
├── CLAUDE.md                ← points to AGENTS.md
├── README.md                ← human intro + setup guide
├── index.html               ← home page: hero + filter bar + spot cards
├── .nojekyll
├── css/style.css            ← the ONLY stylesheet
├── js/main.js               ← filters, month strip, photo fallback
├── templates/
│   └── spot-template.html   ← copy this to make a new spot page
├── spots/
│   └── <slug>.html          ← one page per spot
└── images/
    └── <slug>/              ← one folder per spot
        ├── hero.jpg         ← wide banner photo (landscape)
        ├── 1.jpg
        ├── 2.jpg
        └── 3.jpg
```

---

## 4. Naming rules

- **Slug** = lowercase English name, words joined with hyphens, no spaces or Chinese characters.
  - ✅ `sun-moon-lake`, `yangmingshan-qixingshan`, `jiufen-teapot-mountain`
  - ❌ `SunMoonLake`, `sun_moon_lake`, `日月潭`
- The same slug is used in **three places**, and they must match exactly:
  1. Page file: `spots/<slug>.html`
  2. Image folder: `images/<slug>/`
  3. Home page card link: `href="spots/<slug>.html"`
- Images: `hero.jpg` (banner) and `1.jpg`, `2.jpg`, `3.jpg` (gallery). Use `.jpg`, landscape, ideally ≤ 400 KB each (resize to about 1600 px wide).

---

## 5. Spot page structure (required, in this order)

Every spot page is a copy of `templates/spot-template.html`. Do not remove or reorder sections. Each section has a fixed `id`:

| # | Section | `id` | What goes in it |
|---|---------|------|-----------------|
| 1 | Hero | — | English name, Chinese name (`<span lang="zh-Hant">`), region, one-sentence tagline, `hero.jpg` |
| 2 | Quick facts | `facts` | Exactly 4 facts: **Region**, **Difficulty**, **Time needed**, **Best months** |
| 3 | What to do | `do` | 3–5 activity cards: `<h3>` title + 1–2 sentences |
| 4 | What to eat | `eat` | 3–5 food items: English name + Chinese name + 1 sentence |
| 5 | Getting there | `transport` | Numbered steps from **Taipei Main Station** (or nearest HSR station), with time estimates. Public transport first, car/scooter last |
| 6 | Best season | `season` | Month strip + 2–3 sentences explaining why |
| 7 | Photos | `photos` | Exactly 3 `<figure>`s using `1.jpg`–`3.jpg`, each with a `<figcaption>` |
| 8 | Tips | `tips` | 3–5 short bullet tips (safety, crowds, what to bring) |
| 9 | Footer note | — | `Last checked: YYYY-MM` + reminder to verify schedules |

### Fixed vocabularies (use these exact words)

- **Region:** `North`, `Central`, `South`, `East`, `Islands`
- **Difficulty:** `Easy` (anyone, < 2 h walking), `Moderate` (some climbing, 2–4 h), `Hard` (steep, long, or high altitude, needs preparation)
- **Type tags:** `Hiking`, `City`, `Lake`, `Mountain`, `Old Street`, `Coast`, `Hot Spring`, `Forest`

### Month strip

The month strip is drawn by `js/main.js` from data attributes. Use numbers 1–12:

```html
<ol class="months" data-best="3,4,10,11" data-ok="5,9,12"></ol>
```

- `data-best` = best months (green). `data-ok` = fine months (light green). Any other month = not ideal (grey).
- The **Best months** fact in the Quick facts bar must match `data-best` (for example `Mar–Apr, Oct–Nov`).

---

## 6. Home page card format

Each spot needs one card inside `<div class="cards">` in `index.html`, between the `SPOTS:START` and `SPOTS:END` comments. Cards are in **north → south → east** order.

```html
<a class="card" href="spots/<slug>.html"
   data-region="North" data-difficulty="Easy">
  <div class="card-img">
    <img src="images/<slug>/hero.jpg" alt="<English name>" loading="lazy"
         onerror="this.parentElement.classList.add('missing')">
  </div>
  <div class="card-body">
    <p class="card-region">North · Easy</p>
    <h3><English name> <span lang="zh-Hant"><中文名></span></h3>
    <p><Tagline, same as on the spot page></p>
    <ul class="tags"><li>Hiking</li><li>City</li></ul>
  </div>
</a>
```

`data-region` and `data-difficulty` must use the fixed vocabularies, because the filter buttons depend on them.

---

## 7. Style guide

**Look and feel:** fresh, outdoorsy, clean. Lots of white space, rounded cards, big photos.

| Token (CSS variable) | Value | Use |
|---|---|---|
| `--forest` | `#1f4d3a` | headings, header, main brand color |
| `--moss` | `#5f8d4e` | best-month green, tags |
| `--sunset` | `#e07a3f` | buttons, links, highlights |
| `--cream` | `#f7f5ef` | page background |
| `--ink` | `#23302a` | body text |

- Fonts: **Fraunces** for headings, **Noto Sans TC** for body text (handles Chinese).
- Use only the CSS variables and classes already in `css/style.css`. If a new style is truly needed, add it to `style.css` under a clear comment. **No inline `style=""` attributes.**
- Must stay responsive: check that the page works at 375 px (phone) width.

### Writing style

- English, friendly and practical, like advice from a local friend. Second person ("you").
- Short sentences. No marketing hype ("breathtaking", "must-see paradise").
- Always give Chinese names for places and foods once: `Taro balls (芋圓)`.
- Use Traditional Chinese (繁體), never Simplified.
- Times as ranges ("about 1–1.5 h"). Prices only if you are sure, in NT$.

---

## 8. Workflow: adding a new spot (checklist)

When asked "add <place>", do **all** of these steps:

1. Choose the slug (section 4).
2. Copy `templates/spot-template.html` → `spots/<slug>.html`.
3. Replace every `{{PLACEHOLDER}}` in the copy. Search the file for `{{` afterwards; there must be **zero** left.
4. Create `images/<slug>/` with a `.gitkeep` file. Do **not** invent image files; the human adds real photos (see section 9).
5. Add a card to `index.html` in the right geographic position (section 6).
6. Do not edit the spot count in the home page hero (`<span id="spot-count">`). `js/main.js` counts the cards automatically.
7. Set `Last checked:` to the current year and month.
8. Check: all links relative, no inline styles, slug matches in all 3 places, Quick facts "Best months" matches the month strip.

## 9. Photos and facts: honesty rules

- **Never make up photo files or photo URLs.** If no photo exists, leave the `<img>` path in place. The `onerror` fallback shows a soft placeholder until the human adds the file.
- Photos must be the owner's own, or freely licensed (e.g. Wikimedia Commons, Unsplash). Put the credit in the `<figcaption>`: `Photo: Name / Source, License`.
- Transport routes, bus numbers and opening times change. Only write details you are confident about; otherwise describe the route in general terms ("take the tourist shuttle from Chiayi HSR station") and keep the "verify before you go" note in the footer.
- If a place is closed or damaged (e.g. after an earthquake or typhoon), say so in **Tips** and add a warning.

## 10. Editing existing pages

- Keep the section order and `id`s. Small text fixes are fine; structural changes must be made in **the template first**, then applied to **every** spot page so they all stay the same.
- When you change facts on a page, update its `Last checked:` date.
- Do not delete a spot without being asked.

## 11. Ideas for future growth (only when asked)

- Region pages (`regions/north.html`) that list cards for one region.
- A "Trip combos" page linking nearby spots (e.g. Jiufen + Shifen).
- Chinese version of each page (`spots/zh/<slug>.html`) using the same template.
