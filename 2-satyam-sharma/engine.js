// Member 2 — simulation & hazard engine
// Lightweight client-side demo model. Replace this module with the FastAPI/WebSocket adapter.
export class SimulationEngine {
  constructor() {
    this.total = 200;
    this.running = true;
    this.elapsed = 258;
    this.speed = 2;
    this.evacuated = 146;
    this.hazard = { type: 'fire', x: 344, y: 255, radius: 52, intensity: 0.68 };
    this.plan = 'adaptive';
    this.agents = this.createAgents(68);
    this.events = [];
  }

  createAgents(count) {
    const rooms = [
      [118, 110, 122, 70], [330, 105, 118, 68], [570, 110, 130, 68],
      [122, 323, 126, 72], [356, 332, 130, 64], [585, 324, 125, 70],
      [270, 208, 340, 74], [215, 178, 54, 155], [610, 178, 55, 155]
    ];
    return Array.from({ length: count }, (_, id) => {
      const room = rooms[Math.floor(Math.random() * rooms.length)];
      return {
        id,
        x: room[0] + Math.random() * room[2],
        y: room[1] + Math.random() * room[3],
        panic: Math.random(),
        active: true,
        phase: Math.random() * Math.PI * 2
      };
    });
  }

  tick() {
    if (!this.running) return;
    this.elapsed += this.speed;
    const progress = this.plan === 'adaptive' ? 4 : this.plan === 'distributed' ? 3 : 2;
    this.evacuated = Math.min(this.total, this.evacuated + Math.floor(Math.random() * progress) + 1);
    if (this.hazard) {
      this.hazard.radius = Math.min(156, this.hazard.radius + 0.48 * this.speed);
      this.hazard.intensity = Math.min(0.98, this.hazard.intensity + 0.0015 * this.speed);
    }
    this.agents.forEach((agent) => {
      if (!agent.active) return;
      const exit = agent.x < 440 ? { x: 46, y: 254 } : { x: 854, y: 254 };
      const danger = this.hazard && Math.hypot(agent.x - this.hazard.x, agent.y - this.hazard.y) < this.hazard.radius + 25;
      const target = danger ? (exit.x < 100 ? { x: 850, y: 254 } : { x: 50, y: 254 }) : exit;
      const dx = target.x - agent.x, dy = target.y - agent.y;
      const length = Math.max(1, Math.hypot(dx, dy));
      const pace = (0.45 + agent.panic * 0.5) * this.speed;
      agent.x += (dx / length) * pace + Math.sin(this.elapsed * 0.04 + agent.phase) * 0.22;
      agent.y += (dy / length) * pace + Math.cos(this.elapsed * 0.035 + agent.phase) * 0.2;
      agent.panic = Math.min(1, agent.panic + (danger ? 0.008 : -0.001));
      if (agent.x < 35 || agent.x > 865) agent.active = false;
    });
    if (this.agents.filter((a) => a.active).length < 18 && this.evacuated < this.total) {
      this.agents = this.createAgents(68);
    }
  }

  deployHazard(type, x, y) {
    this.hazard = { type, x, y, radius: 34, intensity: 0.48 };
    const labels = { fire: 'Fire source deployed', gas: 'Gas leak detected', flood: 'Flood zone activated' };
    this.events.unshift({ time: 'NOW', text: labels[type] || 'Hazard deployed', kind: type });
  }

  reset() {
    this.running = true;
    this.elapsed = 0;
    this.evacuated = 0;
    this.hazard = null;
    this.agents = this.createAgents(68);
    this.events.unshift({ time: 'NOW', text: 'Scenario reset · building cleared', kind: 'safe' });
  }

  get risk() {
    if (!this.hazard) return 8;
    const base = this.hazard.type === 'fire' ? 42 : this.hazard.type === 'gas' ? 51 : 36;
    return Math.max(9, Math.min(96, Math.round(base + this.hazard.intensity * 25 - (this.evacuated / this.total) * 25)));
  }

  get coverage() {
    if (!this.hazard) return 0;
    return Math.min(74, Math.round((this.hazard.radius / 156) * 42 + this.hazard.intensity * 18));
  }
}
