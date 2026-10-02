# Push Order — who pushes what and when

Conflict-free merge order for the team. Each member pushes ONLY their folder (plus their own files). Shared root files stay at the repo root and are handled by the Team Lead.

## Order

### 1. Prafful Sharma (Team Lead) — base build
Push first. Base repo + shared files so everyone else has a working skeleton.

- `index.html`, `styles.css`, `app.js`, `package.json`, `README.md`, `.gitignore`, `docs/`, `pages/pages.css`, `pages/router.js`
- `1-prafful-sharma/floorplan.js`
- `1-prafful-sharma/pages/building-twin/`, `1-prafful-sharma/pages/team-access/`

### 2. Satyam Sharma (Developer) — simulation engine
Push second. Engine output is consumed by the optimizer and the UI.

- `2-satyam-sharma/engine.js`
- `2-satyam-sharma/pages/scenario-library/`

### 3. Rudra Keyur Khaire (Developer) — AI optimizer
Push third. Consumes engine plans, so it goes after the engine.

- `3-rudra-khaire/optimizer.js`
- `3-rudra-khaire/pages/reports-insights/`

### 4. Het Patel (Design) — UI polish
Push last. Polishes shared styling so no styling conflicts occur.

- `4-het-patel/ui.js`
- `4-het-patel/pages/settings/`
- May refine `styles.css` / `pages/pages.css` (only after Prafful's base is merged)

## Rules

- Before pushing, `git pull` and merge the previous push.
- `app.js`, `index.html` and `pages/router.js` are integration points — never edit them without telling the Team Lead.
- Keep the integration contract stable: simulation fields (`total`, `evacuated`, `elapsed`, `hazard`, `agents`, `plan`, `running`, `speed`) and optimizer plans (`id`, `name`, `minutes`, `score`, `description`, `icon`, `color`).
- Member folders are prefixed with their push order number: `1-` `2-` `3-` `4-`.