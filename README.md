# Formosa Trails 🏞️

A static guide to hiking and travel spots in Taiwan. Each spot page covers **what to do, what to eat, how to get there, the best season, and photos**.

The project is designed to be extended by AI: [`AGENTS.md`](AGENTS.md) holds the full rulebook (purpose, structure, template, naming, style, and a checklist for adding a new spot).

## Spots so far
| Spot | Region | Difficulty |
|---|---|---|
| Elephant Mountain 象山 | North | Easy |
| Yangmingshan & Qixingshan 陽明山・七星山 | North | Moderate |
| Jiufen & Teapot Mountain 九份・茶壺山 | North | Moderate |
| Sun Moon Lake 日月潭 | Central | Easy |
| Alishan 阿里山 | South | Moderate |

## Add a new spot with AI
Open the project in your AI tool and say:

> Read AGENTS.md, then add a new spot page for **Kenting (墾丁)**.

The AI copies `templates/spot-template.html`, fills in every section, creates `images/kenting/`, and adds a card to `index.html`.

## Adding photos
Put your own (or freely licensed) photos in `images/<slug>/` named `hero.jpg`, `1.jpg`, `2.jpg`, `3.jpg`. Until a photo exists, the page shows a soft placeholder.

## Tech
Plain HTML + CSS + vanilla JS. No build step. Hosted on GitHub Pages.
