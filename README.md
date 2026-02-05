# JA Alberta North — Weekly Scroll Slideshow (Skeleton)

This is a simple static website designed to feel like a slideshow you scroll through.

## What’s included

- Sticky header with **Week One–Week Four** navigation
- Long-form weekly sections (add as much content as you want per week)
- Clean dark theme (radiant purple/black with green accents)
- “Light up” hover + glow effects and scroll-into-view reveal animations

## Run / Preview
 jdke
### Option A: VS Code Live Server (recommended)

1. Install the **Live Server** extension.
2. Open `index.html`.
3. Click **Go Live**.

### Option B: Python (quick local server)

From this folder, run:

- `python -m http.server 5500`

Then open: `http://localhost:5500`

## Editing weeks

- Weeks are sections in `index.html` with ids: `week-1`, `week-2`, `week-3`, `week-4`.
- The top nav links match those ids.

If you want more weeks, duplicate a `<section class="week" ...>` block and add a matching nav link.
