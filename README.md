# SafeTwin AI — Emergency Digital Twin

A repo-ready, two-screen concept prototype for **SafeTwin AI by Vistaraz**, prepared around INDUX 5.0’s **Digital Twin & Simulation** focus area. The standalone landing page leads into a command-center dashboard; the sidebar contains dedicated pages for the building twin, scenario library, reports, team access and settings. The interface uses vanilla HTML, CSS and JavaScript modules, so it runs with no install step or external assets.

**Competition pack:** `docs/indux-5.0/` contains the abstract, technical approach, pitch deck outline, 3-minute pitch script, 24-hour team plan and compliance checklist. The project selects one theme: Digital Twin & Simulation; EHS is the impact context.

> **Prototype / safety notice:** all building data and simulation outputs are illustrative. The heuristic planner is not validated for real incidents and must not be used to direct a real evacuation. No CCTV or real occupant data are connected.
>
> **INDUX originality notice:** the [official INDUX 5.0 repository](https://github.com/VikrantUniversity-gwalior/Indux-5.0-2026) says code/assets built during the 24-hour on-site round must be original work by the team. This workspace is pre-event preparation and concept validation; ask the organizers what preparatory material is permitted, and do not reuse this implementation in the event build if that would violate their rules.

## Run locally

Requirements: Python 3 (or any static HTTP server), modern browser.

```bash
python3 -m http.server 4173
```

Open <http://localhost:4173>. Alternatively, run `npm start` (same static server; no npm dependencies). Serve the repository root over HTTP because the UI uses JavaScript ES modules. For deployment, publish this folder as a static site on Netlify, Vercel, GitHub Pages, or an equivalent host.
## SafeTwin AI — Dynamic Emergency Digital Twin

[![Live Demo](https://safetwin.vercel.app/)

AI-powered emergency evacuation digital twin...


## INDUX 5.0 planning note

The official event repository lists registration through **1 October 2026**, screening interviews on **8–9 October 2026**, and the on-site 24-hour round on **2–3 November 2026** at Vikrant University, Gwalior. Dates and rules may change, so verify the [official event repository](https://github.com/VikrantUniversity-gwalior/Indux-5.0-2026) before submission. The competition calls for one selected focus area; this concept selects **Digital Twin & Simulation**.

## What works in this prototype

- A separate, polished landing screen opens first; visitors enter the dashboard only by clicking a simulator CTA. Landing page includes the Vistaraz team, product story and future CCTV roadmap.
- Responsive dark command-center UI with an accessible dark/light toggle.
- Live simulated crowd, evacuation progress, elapsed time, hazard footprint, risk score, timeline and event feed.
- Fire, gas-leak and flood scenarios; choose a source and deploy it by clicking the building floorplan.
- Live floorplan overlays: occupants, hazard spread, exits and animated recommended routes; 2D/3D-style view, heatmap, wireframe, zoom and recenter controls.
- Three evacuation strategies with an explainable what-if comparison. Apply the recommended route or select a strategy directly.
- Five working dashboard sections from the sidebar: building twin, 8-item scenario library with filters and launch actions, reports/CSV export, Vistaraz team access directory, and settings with session-only toggles.
- Pause/resume, reset, replay, 1×/2×/4× speed controls, keyboard shortcuts and in-product feedback.
- Each dashboard destination has a dedicated folder under `pages/`; see `pages/README.md` for ownership and routing.

## Team of four — ownership map

Each requested member folder contains a working module and an ownership note. Keep shared integration points in the root `app.js` and `index.html`.

| Owner | Folder / file | Responsibility |
|---|---|---|
| Member 1 — Het Patel (Design) | `4-het-patel/ui.js` | Reusable interface rendering, visual system and dashboard polish. |
| Member 2 — Satyam Sharma (Developer) | `2-satyam-sharma/engine.js` | Simulation state, crowd motion, hazard deployment/spread, evacuation progression and risk signals. |
| Member 3 — Rudra Keyur Khaire (Developer) | `3-rudra-khaire/optimizer.js` | Scenario comparison, plan scoring, clearance-time estimates and AI optimizer integration. |
| Member 4 — Prafful Sharma (Team Leader) | `1-prafful-sharma/floorplan.js` | Building/floorplan data, digital-twin rendering and overall team integration. |

### Integration contract

- `app.js` owns event wiring and imports one module from each member folder.
- Keep the floorplan model in the 900 × 500 SVG coordinate space; the app maps pointer clicks to those coordinates.
- Keep simulation fields (`total`, `evacuated`, `elapsed`, `hazard`, `agents`, `plan`, `running`, `speed`) stable when replacing the demo engine with an API client.
- The optimizer returns plans with `id`, `name`, `minutes`, `score`, `description`, `icon`, and `color` fields.

## Suggested next sprint

1. Replace `2-satyam-sharma/engine.js` with a FastAPI/WebSocket client and move the simulation to a server-side, validated model.
2. Replace the example map in `1-prafful-sharma/floorplan.js` with surveyed building geometry, accessibility data and verified exit capacities.
3. Integrate calibrated crowd-flow and hazard models; document assumptions and uncertainty.
4. Add automated tests for path safety, blocked exits, accessibility, high-density queues and loss-of-connectivity behaviour.
5. Add role-based access, audit history, data retention controls, incident runbooks and an explicit simulation/live-data indicator.

## Repository layout

```text
safetwin-ai/
├── index.html                 # Landing screen + dashboard shell
├── styles.css                 # Shared visual system + landing/dashboard styles
├── app.js                     # View navigation and interactive wiring
├── package.json
├── README.md
├── docs/indux-5.0/            # Abstract, pitch, build plan, compliance notes
├── 1-prafful-sharma/           # Prafful Sharma — base build, digital twin / integration (push #1)
│   ├── floorplan.js
│   └── pages/{building-twin,team-access}
├── 2-satyam-sharma/           # Satyam Sharma — simulation engine (push #2)
│   ├── engine.js
│   └── pages/scenario-library
├── 3-rudra-khaire/            # Rudra Keyur Khaire — optimizer (push #3)
│   ├── optimizer.js
│   └── pages/reports-insights
├── 4-het-patel/               # Het Patel — design / reusable UI (push #4)
│   ├── ui.js
│   └── pages/settings
└── pages/
    ├── router.js
    ├── pages.css
    ├── building-twin/page.js
    ├── scenario-library/page.js
    ├── reports-insights/page.js
    ├── team-access/page.js
    └── settings/page.js
```
