# 3-Minute Video Pitch — SafeTwin AI

**Team:** Vistaraz  
**Selected focus:** Digital Twin & Simulation  
**Run time target:** 2:45–3:00. Replace bracketed values with measured results from the final event build.

## 0:00–0:25 — Team + problem

**Prafful Sharma, Team Leader:** “Hi, we are Vistaraz. We chose Digital Twin & Simulation for INDUX 5.0. Building evacuation plans are usually static. But when a corridor is blocked or a hazard changes, a building team needs to understand how that changes the route—not rely on a paper map alone.”

## 0:25–0:50 — Introduce SafeTwin

**Het Patel, Design:** “SafeTwin AI is a rehearsal and planning prototype. It turns a verified floor layout into a digital twin, lets a safety team set up a simulated emergency, and makes the assumptions visible. It is a planning aid—not an emergency-control system.”

## 0:50–1:45 — Show the working journey

**Satyam Sharma, Developer:** “We start with [name the verified demo floor]. I select [hazard actually implemented] and run the same scenario with two plans: the nearest-exit baseline and our hazard/capacity-aware alternative.”

**Show on screen:** start scenario → twin updates → route selection → bottleneck/queue metric → comparison panel.

**Satyam:** “Here the baseline produced [measured value] and our alternative produced [measured value] across [number] repeated runs. We measure clearance time, peak queue and modeled hazard exposure. These are simulation results, not guaranteed real-world outcomes.”

## 1:45–2:20 — Technical depth + feasibility

**Rudra Keyur Khaire, Developer:** “The floor is represented as [actual graph/grid model]. Our route cost includes [implemented factors]. We use [actual algorithm] and compare it against a clear baseline under the same scenario and random seeds. If the model has no valid route, we report that rather than inventing one.”

## 2:20–2:45 — Impact + responsible roadmap

**Prafful:** “Our first users are campus and building safety teams rehearsing drills. We start with a single verified floor because reliable building data matters more than a city-scale animation. CCTV or sensor integration is future work only. This build uses synthetic occupants; it does not identify people or connect to cameras.”

## 2:45–3:00 — Close

**All / Prafful:** “SafeTwin AI helps teams rehearse before the moment that matters. We are Vistaraz. Thank you.”

## Recording checklist

- Show the team on camera or introduce all four members by name.
- Capture the actual event-built code running locally; include a backup recording.
- Show one complete flow without cuts that conceal failures.
- Read out baseline and candidate metrics only after repeated runs are measured.
- Label demo data and future features; do not claim validated life-safety benefit.
- Keep final video within the organizer's format and length requirements.
