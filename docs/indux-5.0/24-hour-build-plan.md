# Vistaraz — 24-Hour Build Plan

This is a time-boxed plan for an on-site event build. The current workspace is a concept prototype; follow INDUX originality rules and organizer guidance when producing the final event implementation.

## Roles

- **Prafful Sharma — Team Leader:** scope, architecture decisions, integration, milestone tracking, presentation and submission coordination.
- **Het Patel — Design:** user journey, interface system, wireframes, accessibility and demo clarity.
- **Satyam Sharma — Developer:** simulation data model, scenario runner and tested baseline routing.
- **Rudra Keyur Khaire — Developer:** building graph/digital-twin model, hazard-aware routing, metrics and integration support.

## Schedule and gates

| Time | Main work | Owner(s) | Gate / evidence |
|---|---|---|---|
| 00:00–01:00 | Read problem statement, select one focus area, agree MVP and success metrics | All; Prafful leads | One-sentence problem, user, scope, and testable acceptance criteria |
| 01:00–03:00 | Create original event workspace/repository; define data contract and handoff points | Prafful + developers | Clean repo, issue list, starter README, no copied pre-event implementation |
| 03:00–06:00 | Build small verified/sample floor graph; create core screen skeleton | Rudra + Het | 1-floor graph and a navigable prototype with clear simulated-data labels |
| 06:00–10:00 | Implement deterministic baseline pathfinding and one hazard scenario | Satyam + Rudra | Baseline reaches exits; invalid/no-exit state is handled |
| 10:00–13:00 | Add capacity/hazard cost and synthetic agent simulation | Satyam + Rudra | Same seeded scenario runs repeatably; queue metric is collected |
| 13:00–16:00 | Build route comparison, metric panel and scenario setup interaction | Het + Prafful | End-to-end happy path works; functional and mocked parts are distinguished |
| 16:00–18:00 | Integrate modules, test blocked exit, high density, empty data and restart | All | No route through blocked edge; tests and demo reset work |
| 18:00–20:00 | Repeat experiment across seeds; record measured baseline/candidate metrics | Satyam + Rudra | Results table and assumptions; no unsupported improvement claim |
| 20:00–22:00 | Fix highest-impact bugs, test on target demo hardware/network, accessibility pass | Het + developers | Reliable 3-minute flow and visible error/empty states |
| 22:00–23:00 | Record backup walkthrough; finalize pitch/deck with real screenshots/results | Prafful + Het | Video, deck and local backup match the submitted build |
| 23:00–24:00 | Freeze, verify clean commit, credits, handoff and final pitch rehearsal | All; Prafful coordinates | Reproducible run instructions, no unsupported claims, submission package ready |

## Cut line if time slips

Keep: one floor, one hazard, two route strategies, a clear baseline, repeatable seeded comparison, peak queue, safe-exit validation and one end-to-end demo.

Cut first: multiple hazard types, 3D effects, CCTV, learned reinforcement learning, live networking, multi-building support and decorative dashboards. A trustworthy narrow prototype is better than a broad non-working simulation.
