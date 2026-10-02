// Member 1 — shared interface components for live feed and strategy cards
import { formatDuration } from '../3-rudra-khaire/optimizer.js';

export function renderPlans(plans, activePlan) {
  return plans.map((plan, index) => `
    <button class="plan-card ${activePlan === plan.id ? 'selected' : ''} ${plan.color}" data-plan="${plan.id}" aria-pressed="${activePlan === plan.id}">
      <span class="plan-icon">${plan.icon}</span>
      <span class="plan-copy"><span class="plan-name">${plan.name}</span><span class="plan-desc">${plan.description}</span></span>
      <span class="plan-time">${formatDuration(plan.minutes)}<small>min</small></span>
      ${index === 0 ? '<span class="plan-tag">AI PICK</span>' : ''}
    </button>`).join('');
}

export function renderActivity(events) {
  const defaults = [
    { time: '00:12', text: 'Route recalculated · East wing', kind: 'route' },
    { time: '00:08', text: 'Exit E2 capacity at 68%', kind: 'capacity' },
    { time: '00:03', text: 'Smoke sensor · Reading hall', kind: 'fire' }
  ];
  return (events.length ? events.slice(0, 3) : defaults).map((event) => `
    <div class="activity-row"><span class="activity-dot ${event.kind || 'route'}"></span><span class="activity-text">${event.text}</span><time>${event.time}</time></div>`).join('');
}
