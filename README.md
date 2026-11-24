# PREPVAULT

Single-page browser app (no build step, no dependencies).

## Files
- `index.html` – page shell (`#app` and `#toast` mount points)
- `styles.css` – base theme and layout
- `app.js` – all application logic (several modules inject their own extra CSS at runtime)

## Run locally
Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000

## Deploy on GitHub Pages
Repo Settings → Pages → Deploy from branch → `main` / root.
