# PEACH / Personal Space — Codex development instructions

## Project
- Static personal hobby portfolio hosted with GitHub Pages; repository: `larus-peach/peach-personal-space`.
- Use plain HTML, CSS, and vanilla JavaScript. Do not introduce frameworks, build systems, or external dependencies unless explicitly requested.
- Pages: `/` (HOME), `/baseball/`, `/idol/`, `/car/`, `/boatrace/`.
- Shared styles: `assets/css/style.css`; shared script: `assets/js/main.js`.
- Preserve relative links so the site works at `https://larus-peach.github.io/peach-personal-space/`.

## Visual design
- Elegant, understated editorial-gallery aesthetic. Off-white `#F7F7F5`, dark ink `#202020`, fine borders, spacious layout.
- Compact, consistent heading scale across all pages (page title around 36px, section titles around 24px on desktop; responsive on mobile).
- Balance heading sizes with nearby body text, data, lists, and whitespace. Do not change one heading in isolation without checking the entire page.
- Preserve existing user-provided images and page contents. Never replace them with unrelated generated/stock images.

## Content rules
- Do not invent names, product models, racing statistics, event dates, locations, or personal history.
- HOME gallery order: BASEBALL, IDOL, CAR, BOAT RACE.
- Baseball: supporting since 2008; annual on-site records only: 2026 76 games/38W/36L/2D, 2025 80/38W/41L/1D, 2024 86/44W/39L/3D. Favorite players in order: 西岡剛, 早坂響 (OTO HAYASAKA), 平沢大河. No ranking labels.
- Idol: four groups and their existing song lists; preserve the exact spelling `あーぐれす`. No rankings or song links.
- Car: NISSAN SILVIA S15 Spec-R AERO, street-focused with track experience. Keep `The Details.` as a compact two-column parts table. Wheel size next to product name; AERO PARTS has FRONT and REAR only (do not list side skirts). Preserve suspension arms, meters, and NARDI black leather/black spokes. Do not publish model year, body color, tire brand, private travel/track/shop/location details, or ownership history. Do not guess exact BLITZ intercooler model or NISMO meter edition.
- Boat race: text-only; `女子レーサーメイン`. Favorites: 松田真実 (5272, 愛知), 西橋奈未 (4961, 福井). On My Radar: 高橋涼夏 (5390, 群馬). Only visited racecourse: 江戸川. No photo gallery.
- HOME favorite name must be `松田真実` (not `松田真美`).

## Workflow
- Before editing, inspect the relevant HTML and shared CSS and identify any cross-page effects.
- Make focused changes; preserve unrelated design/content.
- Check all five pages at desktop and mobile widths, especially Baseball and Idol typography balance.
- Validate local links, relative asset paths, and missing images. Never claim to have deployed unless a deployment actually occurred.
- Explain modified files and how to verify changes.
- Do not read from or rely on unrelated projects or chats.
