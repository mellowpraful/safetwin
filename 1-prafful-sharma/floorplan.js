// Member 4 — digital-twin floorplan data + SVG renderer
export const BUILDING = {
  name: 'Meridian Campus · Central Library',
  floor: 'Floor 01',
  occupants: 200,
  exits: [
    { id: 'E1', x: 34, y: 244, side: 'left' },
    { id: 'E2', x: 866, y: 244, side: 'right' },
    { id: 'E3', x: 440, y: 34, side: 'top' },
    { id: 'E4', x: 440, y: 466, side: 'bottom' }
  ],
  rooms: [
    { id: '01', name: 'Reading hall', x: 92, y: 84, w: 156, h: 116, type: 'room' },
    { id: '02', name: 'Archives', x: 270, y: 84, w: 154, h: 116, type: 'room' },
    { id: '03', name: 'Research lab', x: 476, y: 84, w: 154, h: 116, type: 'room' },
    { id: '04', name: 'Media room', x: 652, y: 84, w: 156, h: 116, type: 'room' },
    { id: '05', name: 'Study lounge', x: 92, y: 300, w: 156, h: 116, type: 'room' },
    { id: '06', name: 'Cafeteria', x: 270, y: 300, w: 154, h: 116, type: 'room' },
    { id: '07', name: 'Lecture room', x: 476, y: 300, w: 154, h: 116, type: 'room' },
    { id: '08', name: 'Atrium', x: 652, y: 300, w: 156, h: 116, type: 'room' }
  ]
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function renderTwinSVG(state, showHeat = true, wireframe = false) {
  const rooms = BUILDING.rooms.map((room) => `
    <g class="room-group">
      <rect class="room-shape" x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}" rx="10" />
      <text class="room-number" x="${room.x + 13}" y="${room.y + 22}">${room.id}</text>
      <text class="room-label" x="${room.x + 13}" y="${room.y + 42}">${esc(room.name)}</text>
      <circle class="room-dot" cx="${room.x + room.w - 16}" cy="${room.y + 17}" r="3" />
    </g>`).join('');

  const heat = state.hazard && showHeat ? `
    <g class="heat-layer" pointer-events="none">
      <circle cx="${state.hazard.x}" cy="${state.hazard.y}" r="${state.hazard.radius * 1.8}" fill="url(#heatOuter)" />
      <circle cx="${state.hazard.x}" cy="${state.hazard.y}" r="${state.hazard.radius}" fill="url(#heatInner)" />
      <circle cx="${state.hazard.x}" cy="${state.hazard.y}" r="${state.hazard.radius * 0.34}" class="hazard-core" />
    </g>` : '';

  const hazardMark = state.hazard ? `
    <g class="hazard-marker" transform="translate(${state.hazard.x} ${state.hazard.y})" pointer-events="none">
      <circle class="hazard-pulse" r="17" />
      <circle class="hazard-point" r="6" />
      <text x="13" y="-12" class="hazard-label">${esc(state.hazard.type.toUpperCase())} · ${Math.round(state.hazard.intensity * 100)}%</text>
    </g>` : '';

  const agents = state.agents.filter((agent) => agent.active).map((agent) => {
    const nearHazard = state.hazard && Math.hypot(agent.x - state.hazard.x, agent.y - state.hazard.y) < state.hazard.radius + 20;
    const color = nearHazard ? '#ff687b' : agent.panic > 0.7 ? '#ffbd66' : '#72f6d1';
    return `<g transform="translate(${agent.x.toFixed(1)} ${agent.y.toFixed(1)})" class="agent-mark"><circle r="5.6" fill="${color}" opacity=".14"/><circle r="2.25" fill="${color}"/><circle cy="-3.7" r="1.4" fill="${color}"/></g>`;
  }).join('');

  const exits = BUILDING.exits.map((exit) => `
    <g class="exit-marker" transform="translate(${exit.x} ${exit.y})">
      <rect x="-15" y="-11" width="30" height="22" rx="6" />
      <path d="M-5 0h11m-4-4 4 4-4 4" />
      <text y="-18">${exit.id}</text>
    </g>`).join('');

  const routes = `
    <g class="route-layer" fill="none" stroke-linecap="round" pointer-events="none">
      <path d="M344 245 C270 250 178 244 48 244" />
      <path d="M500 264 C590 257 710 246 852 244" />
      <path d="M430 222 C437 168 439 104 440 45" />
      <path d="M480 279 C468 342 453 404 440 456" />
    </g>`;

  return `<svg class="twin-svg ${wireframe ? 'wireframe' : ''}" viewBox="0 0 900 500" role="img" aria-label="Interactive floor plan with simulated crowd and emergency overlays" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="corridor" x1="0" x2="1"><stop stop-color="#112a3a"/><stop offset=".5" stop-color="#142c3a"/><stop offset="1" stop-color="#112a3a"/></linearGradient>
      <radialGradient id="heatOuter"><stop stop-color="#ff536c" stop-opacity=".2"/><stop offset=".62" stop-color="#ff8b52" stop-opacity=".1"/><stop offset="1" stop-color="#ffb34d" stop-opacity="0"/></radialGradient>
      <radialGradient id="heatInner"><stop stop-color="#ff375e" stop-opacity=".34"/><stop offset=".58" stop-color="#ff8f43" stop-opacity=".21"/><stop offset="1" stop-color="#ffc75a" stop-opacity="0"/></radialGradient>
      <pattern id="grid" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M22 0H0V22" fill="none" stroke="rgba(122,171,193,.055)" stroke-width="1"/></pattern>
    </defs>
    <rect width="900" height="500" rx="18" class="map-bg"/>
    <rect width="900" height="500" rx="18" fill="url(#grid)"/>
    <rect x="55" y="211" width="790" height="78" rx="18" class="corridor"/>
    <rect x="228" y="188" width="54" height="127" rx="14" class="cross-corridor"/>
    <rect x="618" y="188" width="54" height="127" rx="14" class="cross-corridor"/>
    <path class="corridor-center" d="M72 250H828" />
    ${rooms}
    ${heat}
    ${routes}
    ${agents}
    ${exits}
    ${hazardMark}
    <g class="map-compass" transform="translate(838 57)"><circle r="20"/><path d="M0 9V-9M-4-4 0-9l4 5"/><text y="-27">N</text></g>
    <text class="map-scale" x="72" y="465">MERIDIAN CAMPUS / CENTRAL LIBRARY</text>
  </svg>`;
}
