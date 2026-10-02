const SCENARIOS = [
  { id: 'library-fire', name: 'Reading hall fire', building: 'Central Library · Ground floor', type: 'fire', label: 'FIRE', people: 200, time: '04:18', level: 'HIGH', icon: '♨', tone: 'fire', description: 'Fire source near the west reading zone with dynamic exit routing.' },
  { id: 'lab-gas', name: 'Research lab gas leak', building: 'Central Library · Ground floor', type: 'gas', label: 'GAS LEAK', people: 120, time: '05:06', level: 'ELEVATED', icon: '◉', tone: 'gas', description: 'Diffusion scenario near the research wing and shared corridor.' },
  { id: 'atrium-flood', name: 'Atrium water ingress', building: 'Central Library · Ground floor', type: 'flood', label: 'FLOOD', people: 180, time: '06:20', level: 'MODERATE', icon: '≈', tone: 'flood', description: 'Low-level flooding near the atrium and east-side exits.' },
  { id: 'archive-smoke', name: 'Archive smoke event', building: 'Central Library · Ground floor', type: 'fire', label: 'SMOKE', people: 160, time: '04:42', level: 'HIGH', icon: '≋', tone: 'fire', description: 'Smoke-first evacuation exercise for the archives and reading hall.' },
  { id: 'auditorium-full', name: 'Peak occupancy drill', building: 'Meridian Campus · Assembly', type: 'crowd', label: 'CROWD FLOW', people: 420, time: '07:35', level: 'ELEVATED', icon: '⠿', tone: 'crowd', description: 'High-density crowd routing with a distributed-exit comparison.' },
  { id: 'electrical-fire', name: 'Electrical room fire', building: 'Central Library · Ground floor', type: 'fire', label: 'FIRE', people: 90, time: '03:52', level: 'HIGH', icon: 'ϟ', tone: 'fire', description: 'Localized fire scenario beside a service corridor.' },
  { id: 'stairwell-egress', name: 'Restricted stairwell', building: 'Meridian Campus · North wing', type: 'crowd', label: 'BLOCKED EXIT', people: 240, time: '06:08', level: 'ELEVATED', icon: '⇧', tone: 'crowd', description: 'What-if drill with one stairwell removed from available routes.' },
  { id: 'basement-water', name: 'Basement water alert', building: 'Meridian Campus · Service level', type: 'flood', label: 'FLOOD', people: 70, time: '05:22', level: 'MODERATE', icon: '≈', tone: 'flood', description: 'Illustrative water alert and upward evacuation exercise.' }
];

export function renderScenarioLibrary() {
  const cards = SCENARIOS.map((scenario) => `
    <article class="scenario-card" data-scenario-card data-category="${scenario.type}">
      <div class="scenario-card-top"><span class="scenario-icon ${scenario.tone}">${scenario.icon}</span><button class="scenario-save" aria-label="Save ${scenario.name}" data-action="save-scenario" data-scenario-id="${scenario.id}">☆</button></div>
      <div class="scenario-meta"><span class="scenario-type ${scenario.tone}">${scenario.label}</span><span class="scenario-level">${scenario.level} RISK</span></div>
      <h3>${scenario.name}</h3><p>${scenario.building}</p><div class="scenario-description">${scenario.description}</div>
      <div class="scenario-card-stats"><span><small>PEOPLE</small><b>${scenario.people}</b></span><span><small>EST. CLEAR</small><b>${scenario.time}</b></span><button data-action="run-scenario" data-scenario-id="${scenario.id}" data-hazard="${scenario.type}">Run drill <span>↗</span></button></div>
    </article>`).join('');
  return `
    <section class="page-view-content">
      <div class="page-breadcrumb-label">OPERATIONS / PRE-BUILT EXERCISES</div>
      <div class="content-heading"><div><h1>Scenario library<span>.</span></h1><p>Start with a drill template, then tune it to your building and team.</p></div><button class="page-action-button" data-action="create-scenario">＋ &nbsp; Create scenario</button></div>
      <div class="scenario-summary-strip"><div><b>08</b><span>READY-TO-RUN SCENARIOS</span></div><i></i><div><b>04</b><span>HAZARD CATEGORIES</span></div><i></i><div><b>01</b><span>BUILDING MODEL LINKED</span></div><span class="scenario-demo-label"><i></i> SAMPLE DRILLS</span></div>
      <div class="scenario-toolbar"><div class="scenario-filters" role="group" aria-label="Filter scenarios"><button class="scenario-filter active" data-scenario-filter="all">All <span>8</span></button><button class="scenario-filter" data-scenario-filter="fire">Fire <span>3</span></button><button class="scenario-filter" data-scenario-filter="gas">Gas <span>1</span></button><button class="scenario-filter" data-scenario-filter="flood">Flood <span>2</span></button><button class="scenario-filter" data-scenario-filter="crowd">Crowd & egress <span>2</span></button></div><div class="scenario-sort">SORT BY <button data-action="sort-scenarios">Recommended⌄</button></div></div>
      <div class="scenario-grid" id="scenarioGrid">${cards}</div>
      <div class="demo-note"><span>i</span><p><b>Templates are illustrative.</b> These presets are intended for product demonstration and planning exercises. Their clearance-time estimates are not safety-certified predictions.</p></div>
    </section>`;
}
