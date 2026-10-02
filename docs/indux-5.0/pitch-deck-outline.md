# INDUX 5.0 Pitch Deck Outline

Target: concise Stage 2 presentation that explains the project and what the team will build. Check the event portal for slide count, file type and size rules.

## Slide 1 — SafeTwin AI / Vistaraz
- Selected theme: **Digital Twin & Simulation**.
- One-liner: rehearse building emergencies in a digital twin and compare evacuation plans.
- All four team members and roles.
- One strong, clearly labeled product visual.

## Slide 2 — The problem, precisely scoped
- Static plans do not show how changing hazards, blocked exits or unequal exit capacities affect a drill.
- Primary user: building/campus safety manager.
- First context: one verified floor and one repeatable drill—not a city-scale system.
- Add a credible source for any external fire/evacuation statistic; otherwise omit it.

## Slide 3 — Product journey
- Import/verify the floor graph → select scenario → simulate synthetic agents → compare routes → review queue and exposure metrics.
- Show actual working screens or a simple annotated wireframe.
- State what is currently functional, simulated and planned.

## Slide 4 — Technical approach
- Building graph + exits/capacities.
- Hazard state update and synthetic agent simulation.
- Baseline shortest path vs hazard/capacity-aware path assignment.
- Explicit objective, data structures and test-seed strategy.
- Keep ML claims proportional to the code actually built.

## Slide 5 — How we test it
- Scenarios: localized hazard, blocked route, unequal exit capacities.
- Repeated seeded runs, fixed starting occupants, same conditions for baseline and candidate.
- Metrics: clearance time, peak queue, hazard exposure, safe egress and runtime.
- Insert measured results + uncertainty after implementation. No fabricated percentage gains.

## Slide 6 — Feasibility, impact and limits
- MVP feasibility: one floor, synthetic data, explainable routing.
- Intended beneficiaries: campus/building safety teams; validate through mentor/user feedback.
- CCTV/real occupancy: future possibility only, requiring authorization and privacy review.
- No direct emergency guidance, facial recognition or live monitoring claim.

## Slide 7 — 24-hour plan + team + ask
- Names, roles, integration plan and test gates.
- Show why each feature fits the 24-hour scope.
- State the specific feedback/mentorship that would help validate the prototype.
- Close with the one-line impact, not a list of speculative features.
