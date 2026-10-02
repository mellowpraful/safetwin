// Member 2 — Satyam Sharma (Developer)
// Simulation state engine: crowd motion, hazard propagation, evacuation progression & risk signals

export class SimulationEngine {
  constructor() {
    this.total = 200;
    this.evacuated = 0;
    this.elapsed = 0;
    this.hazard = null; // { type: 'fire'|'gas'|'flood', x, y, radius, intensity }
    this.coverage = '96%';
    this.risk = 18;
    this.plan = 'adaptive'; // 'adaptive' | 'distributed' | 'nearest'
    this.running = false;
    this.speed = 1;
    this.events = [];
    this.agents = [];

    this.exits = [
      { id: 'E1', x: 34, y: 244 },
      { id: 'E2', x: 866, y: 244 },
      { id: 'E3', x: 440, y: 34 },
      { id: 'E4', x: 440, y: 466 }
    ];

    this.initAgents();
    this.initEvents();
  }

  initAgents() {
    this.agents = [];
    const zones = [
      { x: 92, y: 84, w: 156, h: 116 },   // Reading hall
      { x: 270, y: 84, w: 154, h: 116 },  // Archives
      { x: 476, y: 84, w: 154, h: 116 },  // Research lab
      { x: 652, y: 84, w: 156, h: 116 },  // Media room
      { x: 92, y: 300, w: 156, h: 116 },  // Study lounge
      { x: 270, y: 300, w: 154, h: 116 }, // Cafeteria
      { x: 476, y: 300, w: 154, h: 116 }, // Lecture room
      { x: 652, y: 300, w: 156, h: 116 }, // Atrium
      { x: 72, y: 220, w: 756, h: 60 }    // Central corridor
    ];

    for (let i = 0; i < this.total; i++) {
      const zone = zones[i % zones.length];
      const x = zone.x + 8 + Math.random() * (zone.w - 16);
      const y = zone.y + 8 + Math.random() * (zone.h - 16);
      this.agents.push({
        id: i + 1,
        x: x,
        y: y,
        active: true,
        panic: Math.random() * 0.25,
        speed: 1.8 + Math.random() * 1.6
      });
    }
  }

  initEvents() {
    this.events = [
      { id: 1, type: 'system', title: 'SIMULATION INITIALIZED', time: '00:00', detail: '200 occupants mapped across 8 floorplan zones.', tone: 'info' },
      { id: 2, type: 'sensor', title: 'ENVIRONMENTAL NORMAL', time: '00:00', detail: 'All egress routes clear. Air quality index optimal.', tone: 'good' }
    ];
  }

  deployHazard(type = 'fire', x = 344, y = 250) {
    const validTypes = ['fire', 'gas', 'flood'];
    const hazardType = validTypes.includes(type) ? type : 'fire';

    this.hazard = {
      type: hazardType,
      x: Math.max(40, Math.min(860, x)),
      y: Math.max(40, Math.min(460, y)),
      radius: 36,
      intensity: 0.75
    };

    this.risk = Math.min(95, this.risk + 52);

    this.agents.forEach((agent) => {
      if (agent.active) {
        const dist = Math.hypot(agent.x - this.hazard.x, agent.y - this.hazard.y);
        if (dist < 130) {
          agent.panic = Math.min(1.0, agent.panic + 0.45);
        }
      }
    });

    const label = hazardType === 'gas' ? 'Gas leak' : hazardType === 'flood' ? 'Flood zone' : 'Fire outbreak';
    const timeStr = this.formatTime(this.elapsed);
    this.events.unshift({
      id: Date.now(),
      type: 'hazard',
      title: `${hazardType.toUpperCase()} DETECTED`,
      time: timeStr,
      detail: `${label} reported at (${Math.round(x)}, ${Math.round(y)}). Dynamic rerouting active.`,
      tone: 'alert'
    });
  }

  reset() {
    this.evacuated = 0;
    this.elapsed = 0;
    this.hazard = null;
    this.coverage = '96%';
    this.risk = 18;
    this.running = false;
    this.initAgents();
    this.initEvents();
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  getBestExit(agent) {
    let candidates = [...this.exits];

    if (this.hazard) {
      const safeCandidates = candidates.filter(
        (ex) => Math.hypot(ex.x - this.hazard.x, ex.y - this.hazard.y) > this.hazard.radius + 35
      );
      if (safeCandidates.length > 0) candidates = safeCandidates;
    }

    if (this.plan === 'nearest') {
      return candidates.reduce((closest, ex) => {
        const d1 = Math.hypot(agent.x - ex.x, agent.y - ex.y);
        const d2 = Math.hypot(agent.x - closest.x, agent.y - closest.y);
        return d1 < d2 ? ex : closest;
      }, candidates[0]);
    } else if (this.plan === 'distributed') {
      return candidates[agent.id % candidates.length];
    } else {
      // Adaptive strategy: balance distance and hazard avoidance
      return candidates.reduce((best, ex) => {
        let score = Math.hypot(agent.x - ex.x, agent.y - ex.y);
        if (this.hazard) {
          const hDist = Math.hypot(ex.x - this.hazard.x, ex.y - this.hazard.y);
          score += 350 / (hDist + 1);
        }
        const bestScore = Math.hypot(agent.x - best.x, agent.y - best.y);
        return score < bestScore ? ex : best;
      }, candidates[0]);
    }
  }

  tick() {
    if (!this.running) return;

    const dt = 1 * this.speed;
    this.elapsed += dt;

    if (this.hazard) {
      this.hazard.radius = Math.min(125, this.hazard.radius + 0.35 * dt);
      this.hazard.intensity = Math.min(1.0, this.hazard.intensity + 0.006 * dt);
    }

    this.agents.forEach((agent) => {
      if (!agent.active) return;

      const targetExit = this.getBestExit(agent);
      let dx = targetExit.x - agent.x;
      let dy = targetExit.y - agent.y;
      let dist = Math.hypot(dx, dy);

      if (dist < 16) {
        agent.active = false;
        this.evacuated++;
        return;
      }

      if (this.hazard) {
        const hdx = agent.x - this.hazard.x;
        const hdy = agent.y - this.hazard.y;
        const hdist = Math.hypot(hdx, hdy);
        if (hdist < this.hazard.radius + 35 && hdist > 0) {
          const repelStr = (this.hazard.radius + 35 - hdist) / 10;
          dx += (hdx / hdist) * repelStr * 18;
          dy += (hdy / hdist) * repelStr * 18;
          dist = Math.hypot(dx, dy);
        }
      }

      const moveStep = agent.speed * (1 + agent.panic * 0.4) * dt * 3.2;
      agent.x += (dx / dist) * Math.min(moveStep, dist);
      agent.y += (dy / dist) * Math.min(moveStep, dist);

      agent.x = Math.max(30, Math.min(870, agent.x));
      agent.y = Math.max(30, Math.min(470, agent.y));
    });

    const activeCount = this.agents.filter((a) => a.active).length;
    if (activeCount === 0) {
      this.risk = Math.max(5, this.risk - 3 * dt);
    } else {
      const hazardFactor = this.hazard ? (this.hazard.radius / 125) * 45 : 0;
      const unevacuatedFactor = (activeCount / this.total) * 45;
      this.risk = Math.round(Math.min(99, Math.max(10, unevacuatedFactor + hazardFactor)));
    }

    this.coverage = `${Math.round((this.evacuated / this.total) * 100)}%`;

    const timeStr = this.formatTime(this.elapsed);
    if (this.evacuated >= 100 && !this.events.some((e) => e.title === '50% EVACUATED')) {
      this.events.unshift({
        id: Date.now(),
        type: 'milestone',
        title: '50% EVACUATED',
        time: timeStr,
        detail: '100 of 200 occupants reached safe egress points.',
        tone: 'good'
      });
    } else if (this.evacuated >= 180 && !this.events.some((e) => e.title === 'CLEARANCE NEAR COMPLETION')) {
      this.events.unshift({
        id: Date.now(),
        type: 'milestone',
        title: 'CLEARANCE NEAR COMPLETION',
        time: timeStr,
        detail: '90% crowd clearance achieved across active routes.',
        tone: 'good'
      });
    } else if (this.evacuated === this.total && !this.events.some((e) => e.title === 'BUILDING FULLY EVACUATED')) {
      this.events.unshift({
        id: Date.now(),
        type: 'milestone',
        title: 'BUILDING FULLY EVACUATED',
        time: timeStr,
        detail: `All 200 occupants cleared in ${timeStr}. Zero simulated casualties.`,
        tone: 'good'
      });
    }
  }
}
