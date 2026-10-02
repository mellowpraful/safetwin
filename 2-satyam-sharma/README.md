# Member 2 — Satyam Sharma (Developer)

**Module:** Simulation engine & Scenario library  
**Push order:** #2 (after Prafful Sharma base build, before Rudra Keyur Khaire optimizer)

## Deliverables

- `2-satyam-sharma/engine.js`: `SimulationEngine` ES module managing crowd dynamic vectors, panic thresholds, exit distance calculation, hazard propagation (fire, gas, flood) and clearance stats (`evacuated`, `elapsed`, `risk`, `coverage`, `events`).
- `2-satyam-sharma/pages/scenario-library/page.js`: Scenario Library view rendering 8 incident templates with hazard filters, safety score ratings and direct load-to-simulator CTAs.

## Integration contract

- Exports `SimulationEngine` class used in root `app.js` and `building-twin/page.js`.
- Keeps simulation properties stable: `total`, `evacuated`, `elapsed`, `hazard`, `agents`, `plan`, `running`, `speed`, `events`, `risk`, `coverage`.
- Methods: `deployHazard(type, x, y)`, `reset()`, `tick()`.
