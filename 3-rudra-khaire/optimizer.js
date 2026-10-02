// Member 3 — AI what-if optimizer
// Transparent heuristic scoring for the demo; production version can call a server-side optimizer.
const PLAN_LIBRARY = [
  { id: 'adaptive', name: 'Adaptive routing', tag: 'AI RECOMMENDED', icon: '✳', color: 'cyan', description: 'Live hazard-aware rerouting', base: 4.2, exposure: 18, throughput: 91 },
  { id: 'distributed', name: 'Distributed exits', tag: 'BALANCED', icon: '⇱', color: 'violet', description: 'Split occupants across 4 exits', base: 5.1, exposure: 25, throughput: 84 },
  { id: 'nearest', name: 'Nearest exit', tag: 'BASELINE', icon: '↗', color: 'amber', description: 'Static shortest-path routing', base: 6.8, exposure: 42, throughput: 67 }
];

export function comparePlans(hazardType = 'fire', crowd = 200) {
  const hazardPenalty = hazardType === 'gas' ? 1.18 : hazardType === 'flood' ? 1.08 : 1;
  return PLAN_LIBRARY.map((plan) => {
    const time = plan.base * (crowd / 200) * hazardPenalty;
    const score = Math.round(100 - time * 6 - plan.exposure * 0.35 + plan.throughput * 0.12);
    return { ...plan, minutes: time, score: Math.max(35, Math.min(98, score)) };
  }).sort((a, b) => a.minutes - b.minutes);
}

export function formatDuration(minutes) {
  const totalSeconds = Math.round(minutes * 60);
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
