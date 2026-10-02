# Dashboard pages

Each dashboard destination has its own folder and page renderer. `router.js` registers the page names and hash routes; `pages.css` contains shared page styles. Navigation stays inside the app shell, and the live simulation is still reachable from the sidebar.

| Page | Folder | Renderer | Main owner |
|---|---|---|---|
| Building twin | `1-prafful-sharma/pages/building-twin/` | `page.js` | Prafful Sharma · team lead / integration |
| Scenario library | `2-satyam-sharma/pages/scenario-library/` | `page.js` | Satyam Sharma · developer |
| Reports & insights | `3-rudra-khaire/pages/reports-insights/` | `page.js` | Rudra Keyur Khaire · developer |
| Team & access | `1-prafful-sharma/pages/team-access/` | `page.js` | Prafful Sharma · team lead |
| Settings | `4-het-patel/pages/settings/` | `page.js` | Het Patel · design / Satyam Sharma · implementation |

These screens currently use sample content. Authentication, report data pipelines, real floorplan editing and CCTV feeds are not connected.
