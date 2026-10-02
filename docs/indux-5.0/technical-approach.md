# Technical Approach & Validation Plan

## Problem and intended user

**User:** campus/building safety manager preparing a drill.  
**Job:** identify how a hazard changes egress options, where occupants may queue, and which alternative route to rehearse.  
**Boundary:** decision support for planning and simulation only; not real-time life-safety instructions.

## Proposed 24-hour MVP

1. **Building graph:** model rooms, doors, corridors, stairs and exits as a weighted graph. Store edge width/capacity and accessible-route attributes; validate the model against one authorized floor plan.
2. **Hazard field:** start with a transparent grid or graph-local hazard model for one hazard type. Track blocked or costly nodes over time; expose simplified assumptions in the UI.
3. **Occupant simulation:** create synthetic agents with origin zones, walking speeds and route preferences. Avoid presenting them as real people or calibrated human behavior.
4. **Route optimizer:** compare a shortest-path baseline against hazard-aware and capacity-aware alternatives. Score each candidate with an explicit objective, such as travel time + hazard exposure + queue delay; reject paths through blocked edges.
5. **Demo UI:** choose a scenario, run the simulation, compare plans and inspect the result in a floor-level twin.
6. **Evaluation:** use repeated seeds and identical scenario inputs so the baseline and candidate plans are comparable.

## Suggested data model

- `Zone`: identifier, floor, polygon/grid footprint, capacity, occupancy seed.
- `Edge`: from/to zones, travel time, width/capacity, accessible flag, status.
- `Exit`: connected node, capacity, status, accessibility attributes.
- `HazardState`: type, time, intensity/blocked nodes, source and uncertainty.
- `Agent`: synthetic identifier, start zone, speed range, assigned path, evacuated state.
- `Run`: random seed, plan identifier, configuration, metrics and timestamp.

## Minimum metrics

| Metric | Definition | Why measure it |
|---|---|---|
| Clearance time | Time until every simulated agent reaches a valid exit | End-to-end plan comparison |
| Maximum queue | Peak agents waiting at any exit/edge | Find concentration and bottlenecks |
| Hazard exposure | Simulated time spent in hazard-cost regions | Compare safety proxy, with explicit model limits |
| Safe egress | Agents reaching a valid, unblocked exit / total | Catch invalid plans |
| Runtime | Wall-clock time per simulation/optimization | Demonstrate feasibility in the UI |

Report median and spread across repeated seeds; do not choose a single best run. Never label model outputs as real-world accuracy or predicted survival.

## Explainable objective (prototype proposal)

For a candidate plan `p`, define:

`J(p) = α · clearance_time(p) + β · hazard_exposure(p) + γ · max_queue(p) + penalties_for_blocked_or_inaccessible_paths(p)`

Make weights configurable and visible to the team. First implement deterministic graph search and route-cost updates. A learned policy or genetic optimizer is optional only if it can be tested, explained and compared fairly within the 24-hour window.

## System architecture for the event

- **Frontend:** building twin, scenario controls, route comparison and metric visualization.
- **Simulation service:** deterministic scenario runner, hazard update, agent step and metric collection.
- **Routing module:** graph pathfinding + capacity-aware assignment, with a baseline for comparison.
- **Storage:** local scenario/config files during the MVP; no real-person or CCTV data needed.
- **Optional future input:** aggregate occupancy sensor data only after written authorization, privacy review and explicit technical feasibility assessment.

## Reliability and safety states

- Invalid or missing floor graph → block simulation and show a data validation error.
- All exits blocked → show “no safe route found”; do not invent a route.
- Service interruption → mark data stale and stop claiming a live result.
- Empty building/zero agents → show an explicit empty state.
- Uncertain model parameters → display assumptions and confidence limits, not false precision.
- Separate `SIMULATED` from any future `LIVE SENSOR` state; never imply CCTV is currently connected.

## Current repository status versus event target

This repo's client-side simulator and heuristic plan ranking are a UI/demo prototype. It does not currently implement a validated hazard model, true crowd-flow physics, trained AI, surveyed building graph, backend, WebSocket stream, calibrated accuracy or CCTV integration. The event team should implement only what can be completed, tested and honestly demonstrated during the official 24-hour build.
