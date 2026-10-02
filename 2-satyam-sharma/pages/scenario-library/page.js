// Member 2 — Satyam Sharma (Scenario Library Page)
// Preset drill scenarios, hazard options and simulation stress-test templates

export function renderScenarioLibrary() {
  const scenarios = [
    {
      id: 'drill-01',
      title: 'Central Library Main Hall Fire',
      category: 'fire',
      hazard: 'fire',
      difficulty: 'High',
      occupants: 200,
      estTime: '04:18',
      score: 92,
      saved: true,
      description: 'Simulate a thermal incident near Reading Hall 01. Tests primary west and north exit capacities under dense occupancy.'
    },
    {
      id: 'drill-02',
      title: 'Archives Room Chemical / Gas Leak',
      category: 'gas',
      hazard: 'gas',
      difficulty: 'Critical',
      occupants: 150,
      estTime: '05:06',
      score: 86,
      saved: false,
      description: 'Toxic vapor dissemination near Zone 02. Evaluates corridor isolation and adaptive rerouting away from toxic plumes.'
    },
    {
      id: 'drill-03',
      title: 'Atrium Water Ingress / Flash Flood',
      category: 'flood',
      hazard: 'flood',
      difficulty: 'Medium',
      occupants: 180,
      estTime: '06:20',
      score: 89,
      saved: false,
      description: 'Heavy water pipe breach cutting off central corridor access. Tests perimeter exit redirection and crowd distribution.'
    },
    {
      id: 'drill-04',
      title: 'Exam Day Peak Crowd Evacuation',
      category: 'crowd',
      hazard: 'fire',
      difficulty: 'High',
      occupants: 250,
      estTime: '07:15',
      score: 81,
      saved: true,
      description: 'Maximum capacity stress test across all 8 zones. Validates multi-lane bottleneck clearing at exits E1 and E2.'
    },
    {
      id: 'drill-05',
      title: 'Server Room Electrical Fire',
      category: 'fire',
      hazard: 'fire',
      difficulty: 'Medium',
      occupants: 120,
      estTime: '03:45',
      score: 95,
      saved: false,
      description: 'Localized thermal threat in backend infrastructure. Rapid clearance protocol testing for technical staff.'
    },
    {
      id: 'drill-06',
      title: 'Research Wing Hazardous Spill',
      category: 'gas',
      hazard: 'gas',
      difficulty: 'High',
      occupants: 90,
      estTime: '04:50',
      score: 88,
      saved: false,
      description: 'Laboratory airborne contaminant scenario requiring automated ventilation override and east exit priority.'
    },
    {
      id: 'drill-07',
      title: 'South Corridor Inundation Test',
      category: 'flood',
      hazard: 'flood',
      difficulty: 'Low',
      occupants: 160,
      estTime: '05:30',
      score: 91,
      saved: false,
      description: 'Simulated infrastructure drainage failure impacting exit E4. Reroutes all lower-quadrant occupants to exit E1.'
    },
    {
      id: 'drill-08',
      title: 'Assembly Hall Bottleneck Drill',
      category: 'crowd',
      hazard: 'fire',
      difficulty: 'High',
      occupants: 220,
      estTime: '06:45',
      score: 84,
      saved: true,
      description: 'Simultaneous alarm trigger during multi-zone event. Evaluates staged exit release protocols.'
    }
  ];

  const cardsHtml = scenarios
    .map(
      (sc) => `
    <article class="page-card scenario-card" data-scenario-card data-category="${sc.category}">
      <div class="scenario-card-header">
        <span class="hazard-badge ${sc.category}">${sc.category.toUpperCase()} DRILL</span>
        <button class="save-star ${sc.saved ? 'saved' : ''}" data-action="save-scenario" aria-label="Save scenario">${sc.saved ? '★' : '☆'}</button>
      </div>
      <h3>${sc.title}</h3>
      <p class="scenario-desc">${sc.description}</p>
      <div class="scenario-stats">
        <div><small>EST. CLEARANCE</small><b>${sc.estTime}</b></div>
        <div><small>OCCUPANTS</small><b>${sc.occupants}</b></div>
        <div><small>SAFETY SCORE</small><b class="score-val">${sc.score}<i>/100</i></b></div>
      </div>
      <div class="scenario-card-footer">
        <span class="difficulty-pill ${sc.difficulty.toLowerCase()}">${sc.difficulty} Priority</span>
        <button class="page-action-button compact" data-action="run-scenario" data-hazard="${sc.hazard}" data-scenario-id="${sc.id}">▶ Load in Simulator</button>
      </div>
    </article>
  `
    )
    .join('');

  return `
    <section class="page-view-content">
      <div class="page-breadcrumb-label">SIMULATION / DRILL TEMPLATES</div>
      <div class="content-heading">
        <div>
          <h1>Scenario library<span>.</span></h1>
          <p>Preset incident drills, crowd density stress-tests and hazard propagation models.</p>
        </div>
        <button class="page-action-button" data-action="create-scenario">＋ &nbsp; Create drill scenario</button>
      </div>

      <div class="scenario-toolbar">
        <div class="filter-pills">
          <button class="filter-pill active" data-scenario-filter="all">All drills (8)</button>
          <button class="filter-pill" data-scenario-filter="fire">🔥 Fire (3)</button>
          <button class="filter-pill" data-scenario-filter="gas">☣ Gas / Chemical (2)</button>
          <button class="filter-pill" data-scenario-filter="flood">🌊 Flood (2)</button>
          <button class="filter-pill" data-scenario-filter="crowd">👥 Crowd flow (2)</button>
        </div>
        <button class="page-subtle-button" data-action="sort-scenarios">⇅ Sort by safety score</button>
      </div>

      <div class="scenario-grid">
        ${cardsHtml}
      </div>

      <div class="demo-note">
        <span>i</span>
        <p><b>Simulation drill presets.</b> Loading a scenario populates the simulation engine with corresponding hazard origins, occupant counts and environmental parameters.</p>
      </div>
    </section>
  `;
}
