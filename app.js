import { SimulationEngine } from './2-satyam-sharma/engine.js';
import { comparePlans, formatDuration } from './3-rudra-khaire/optimizer.js';
import { BUILDING, renderTwinSVG } from './1-prafful-sharma/floorplan.js';
import { renderActivity, renderPlans } from './4-het-patel/ui.js';
import { PAGES, resolvePageHash } from './pages/router.js';

const engine = new SimulationEngine();
engine.running = false; // The simulation starts only after the visitor opens the dashboard.
const $ = (selector) => document.querySelector(selector);
const mapStage = $('#mapStage');
let selectedHazard = 'fire';
let showHeat = true;
let wireframe = false;
let zoom = 100;
let toastTimer;

function clock(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}

function navigateDashboard(page = 'simulation', updateAddress = true) {
  const dashboardMain = $('#dashboardMain');
  const subpageShell = $('#subpageShell');
  document.querySelectorAll('.primary-nav [data-page]').forEach((link) => link.classList.toggle('active', link.dataset.page === page));
  if (page === 'simulation' || !PAGES[page]) {
    dashboardMain.hidden = false;
    subpageShell.hidden = true;
    if (updateAddress) history.replaceState(null, '', '#simulation');
  } else {
    dashboardMain.hidden = true;
    subpageShell.hidden = false;
    $('#subpageTitle').textContent = PAGES[page].title;
    $('#pageContent').innerHTML = PAGES[page].render();
    if (updateAddress) history.replaceState(null, '', `#${PAGES[page].hash}`);
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function openDashboard(page = 'simulation') {
  $('#landingPage').hidden = true;
  $('#dashboard').hidden = false;
  engine.running = true;
  navigateDashboard(page, true);
  refresh();
}

function returnToLanding() {
  engine.running = false;
  $('#dashboard').hidden = true;
  $('#landingPage').hidden = false;
  closeAnalysis();
  history.replaceState(null, '', '#home');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function refresh() {
  const percent = Math.round((engine.evacuated / engine.total) * 100);
  const activeAgents = engine.agents.filter((agent) => agent.active).length;
  $('#evacValue').textContent = engine.evacuated;
  $('#evacPercent').textContent = `${percent}%`;
  $('#evacProgress').style.width = `${percent}%`;
  $('#coverageValue').textContent = engine.coverage;
  $('#riskValue').textContent = engine.risk;
  $('#riskDial').style.setProperty('--risk', engine.risk);
  $('#riskStatus').textContent = engine.risk > 70 ? 'High exposure detected' : engine.risk > 40 ? 'Controlled, but active' : 'Risk trending down';
  $('#activeCount').textContent = `${activeAgents} active`;
  $('#elapsedValue').textContent = clock(engine.elapsed);
  $('#timeValue').textContent = formatDuration(comparePlans(engine.hazard?.type || selectedHazard, engine.total).find((p) => p.id === engine.plan)?.minutes || 4.3);
  const timelineProgress = Math.min(100, (engine.elapsed / 480) * 100);
  $('#timelineFill').style.width = `${timelineProgress}%`;
  $('#timelineMarker').style.left = `${timelineProgress}%`;
  $('#timelinePercent').textContent = `${percent}%`;
  $('#mapSvgHolder').innerHTML = renderTwinSVG(engine, showHeat, wireframe);
  $('#planList').innerHTML = renderPlans(comparePlans(engine.hazard?.type || selectedHazard, engine.total), engine.plan);
  $('#activityList').innerHTML = renderActivity(engine.events);
  $('#playBtn').textContent = engine.running ? 'Ⅱ' : '▶';
  $('#playBtn').setAttribute('aria-label', engine.running ? 'Pause simulation' : 'Resume simulation');
  $('#playState').textContent = engine.running ? 'Simulation running' : 'Simulation paused';
  $('#playState').previousElementSibling.classList.toggle('paused', !engine.running);
  $('#mapHint').classList.toggle('hint-hidden', !engine.running || !engine.hazard);
  $('#selectedHazardLabel').textContent = selectedHazard;
}

function deployAt(x, y) {
  engine.deployHazard(selectedHazard, x, y);
  engine.running = true;
  refresh();
  const label = selectedHazard === 'gas' ? 'Gas leak' : selectedHazard === 'flood' ? 'Flood zone' : 'Fire';
  showToast(`${label} source deployed · routes recalculated`);
}

function openAnalysis() {
  const plans = comparePlans(engine.hazard?.type || selectedHazard, engine.total);
  const best = plans[0];
  $('#analysisResults').innerHTML = plans.map((plan, index) => `
    <div class="analysis-result ${index === 0 ? 'best' : ''}">
      <span class="result-rank">${index === 0 ? '✳' : `0${index + 1}`}</span>
      <span class="result-name"><b>${plan.name}</b><small>${plan.description}</small></span>
      <span class="result-time"><b>${formatDuration(plan.minutes)}</b><small>${plan.score} safety score</small></span>
    </div>`).join('');
  $('#modalCopy').textContent = `The AI compared ${plans.length} routing strategies for ${engine.total} occupants and the active ${engine.hazard?.type || selectedHazard} scenario.`;
  $('#applyPlan').dataset.plan = best.id;
  $('#modalBackdrop').classList.add('open');
  $('#modalBackdrop').setAttribute('aria-hidden', 'false');
}

function closeAnalysis() {
  $('#modalBackdrop').classList.remove('open');
  $('#modalBackdrop').setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('[data-open-dashboard]').forEach((button) => button.addEventListener('click', () => openDashboard('simulation')));
document.querySelectorAll('[data-return-landing]').forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); returnToLanding(); }));
$('#returnSimBtn').addEventListener('click', () => navigateDashboard('simulation'));
if (location.hash && location.hash !== '#home') openDashboard(resolvePageHash(location.hash));

$('#hazardOptions').addEventListener('click', (event) => {
  const button = event.target.closest('[data-hazard]');
  if (!button) return;
  selectedHazard = button.dataset.hazard;
  document.querySelectorAll('.hazard-option').forEach((item) => item.classList.toggle('active', item === button));
  $('#selectedHazardLabel').textContent = selectedHazard;
  showToast(`${selectedHazard === 'gas' ? 'Gas leak' : selectedHazard} selected · click the floorplan to place`);
});

$('#deployBtn').addEventListener('click', () => deployAt(344 + (Math.random() - 0.5) * 120, 250 + (Math.random() - 0.5) * 100));
mapStage.addEventListener('click', (event) => {
  if (!event.target.closest('.twin-svg')) return;
  const rect = event.target.closest('.twin-svg').getBoundingClientRect();
  const x = Math.max(20, Math.min(880, ((event.clientX - rect.left) / rect.width) * 900));
  const y = Math.max(20, Math.min(480, ((event.clientY - rect.top) / rect.height) * 500));
  deployAt(x, y);
});

$('#playBtn').addEventListener('click', () => { engine.running = !engine.running; refresh(); });
$('#replayBtn').addEventListener('click', () => { engine.reset(); refresh(); showToast('Simulation restarted · all zones reset'); });
$('#resetBtn').addEventListener('click', () => { engine.reset(); refresh(); showToast('Drill reset · ready for a new scenario'); });
$('#analyzeBtn').addEventListener('click', openAnalysis);
$('#modalClose').addEventListener('click', closeAnalysis);
$('#modalBackdrop').addEventListener('click', (event) => { if (event.target === $('#modalBackdrop')) closeAnalysis(); });
$('#applyPlan').addEventListener('click', (event) => {
  engine.plan = event.currentTarget.dataset.plan || 'adaptive';
  engine.running = true;
  closeAnalysis();
  refresh();
  showToast(`${engine.plan === 'adaptive' ? 'Adaptive routing' : engine.plan === 'distributed' ? 'Distributed exits' : 'Nearest exit'} activated`);
});

$('#planList').addEventListener('click', (event) => {
  const button = event.target.closest('[data-plan]');
  if (!button) return;
  engine.plan = button.dataset.plan;
  refresh();
  showToast(`${button.querySelector('.plan-name').textContent} selected`);
});

document.querySelectorAll('.speed-options button').forEach((button) => button.addEventListener('click', () => {
  engine.speed = Number(button.dataset.speed);
  document.querySelectorAll('.speed-options button').forEach((item) => item.classList.toggle('selected', item === button));
  showToast(`Simulation speed set to ${engine.speed}×`);
}));

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const icon = document.body.classList.contains('light-theme') ? '☾' : '☼';
  document.querySelectorAll('.theme-icon').forEach((item) => { item.textContent = icon; });
  showToast(document.body.classList.contains('light-theme') ? 'Light mode enabled' : 'Dark command mode enabled');
}
$('#themeToggle').addEventListener('click', toggleTheme);
$('#landingThemeToggle').addEventListener('click', toggleTheme);
$('#subpageThemeToggle').addEventListener('click', toggleTheme);
$('#heatToggle').addEventListener('click', (event) => {
  showHeat = !showHeat;
  event.currentTarget.classList.toggle('tool-active', showHeat);
  refresh();
});
$('#wireToggle').addEventListener('click', (event) => {
  wireframe = !wireframe;
  event.currentTarget.classList.toggle('tool-active', wireframe);
  refresh();
});
$('#viewToggle').addEventListener('click', (event) => {
  const button = event.currentTarget;
  const is3d = !button.classList.contains('is-3d');
  button.classList.toggle('is-3d', is3d);
  button.querySelectorAll('span').forEach((span, i) => span.classList.toggle('view-active', i === (is3d ? 1 : 0)));
  $('#mapStage').classList.toggle('view-3d', is3d);
  showToast(is3d ? '3D perspective view' : '2D floorplan view');
});
$('#zoomIn').addEventListener('click', () => { zoom = Math.min(130, zoom + 10); updateZoom(); });
$('#zoomOut').addEventListener('click', () => { zoom = Math.max(80, zoom - 10); updateZoom(); });
$('#centerMap').addEventListener('click', () => { zoom = 100; updateZoom(); showToast('Twin view recentered'); });
function updateZoom() { $('#zoomValue').textContent = `${zoom}%`; $('#mapSvgHolder').style.transform = `scale(${zoom / 100})`; }
$('#expandBtn').addEventListener('click', () => { $('#mapStage').classList.toggle('map-expanded'); showToast($('#mapStage').classList.contains('map-expanded') ? 'Expanded floorplan view' : 'Floorplan view restored'); });
$('#fullscreenBtn').addEventListener('click', () => { $('#mapStage').classList.toggle('map-expanded'); });
$('#activityLink').addEventListener('click', () => showToast('Event log · showing the latest simulated signals'));
$('#tourBtn').addEventListener('click', () => showToast('Welcome to SafeTwin · choose a hazard, then run AI analysis'));
$('#profileBtn').addEventListener('click', () => showToast('Team lead · Prafful Sharma · Vistaraz'));

document.querySelectorAll('.floor-tab').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.floor-tab').forEach((tab) => tab.classList.toggle('active', tab === button));
  if (!button.classList.contains('add-floor')) showToast(`Floor ${button.textContent.trim().slice(0, 2)} selected · demo twin view`);
}));
$('#pageContent').addEventListener('click', (event) => {
  const filter = event.target.closest('[data-scenario-filter]');
  if (filter) {
    document.querySelectorAll('[data-scenario-filter]').forEach((button) => button.classList.toggle('active', button === filter));
    document.querySelectorAll('[data-scenario-card]').forEach((card) => card.classList.toggle('filtered-out', filter.dataset.scenarioFilter !== 'all' && card.dataset.category !== filter.dataset.scenarioFilter));
    return;
  }
  const floor = event.target.closest('[data-floor-choice]');
  if (floor) {
    document.querySelectorAll('[data-floor-choice]').forEach((button) => button.classList.toggle('selected', button === floor));
    showToast(`Floor ${floor.dataset.floorChoice} selected · sample building model`);
    return;
  }
  const toggle = event.target.closest('[data-setting-toggle]');
  if (toggle) {
    const isOn = toggle.classList.toggle('on');
    toggle.setAttribute('aria-checked', String(isOn));
    return;
  }
  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === 'save-scenario') {
    const saved = actionButton.classList.toggle('saved');
    actionButton.textContent = saved ? '★' : '☆';
    showToast(saved ? 'Scenario saved to this session' : 'Scenario removed from saved');
  } else if (action === 'run-scenario') {
    const hazard = actionButton.dataset.hazard || 'fire';
    selectedHazard = ['fire', 'gas', 'flood'].includes(hazard) ? hazard : 'fire';
    document.querySelectorAll('.hazard-option').forEach((button) => button.classList.toggle('active', button.dataset.hazard === selectedHazard));
    const scenarioHazard = hazard;
    engine.deployHazard(scenarioHazard, 330 + Math.random() * 210, 190 + Math.random() * 120);
    engine.running = true;
    navigateDashboard('simulation');
    refresh();
    showToast(`${actionButton.dataset.scenarioId.replaceAll('-', ' ')} drill loaded into the simulator`);
  } else if (action === 'export-reports') {
    const csv = [
      'Scenario,Date,Hazard,Clear time,Safety score,Data type',
      'Central Library Fire drill,29 Sep 2026,Fire,04:18,92,SIMULATED',
      'Research wing Gas leak,24 Sep 2026,Gas,05:06,86,SIMULATED',
      'Assembly hall Egress test,18 Sep 2026,Crowd flow,07:35,81,SIMULATED',
      'Atrium Water ingress,12 Sep 2026,Flood,06:20,89,SIMULATED'
    ].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = document.createElement('a'); link.href = url; link.download = 'safetwin-demo-reports.csv'; link.click(); URL.revokeObjectURL(url);
    showToast('Sample report exported as CSV');
  } else if (action === 'save-settings') {
    showToast('Settings saved for this demo session');
  } else if (action === 'invite-member') {
    showToast('Team invitations are a UI placeholder · authentication is not connected');
  } else if (action === 'edit-floor' || action === 'add-floor') {
    showToast('Floor-plan editing is a prototype placeholder');
  } else if (action === 'sync-model') {
    showToast('Demo model refreshed · no external building data connected');
  } else if (action === 'create-scenario') {
    showToast('Scenario builder is planned · choose one of the 8 sample drills');
  } else if (action === 'sort-scenarios') {
    showToast('Showing the recommended sample order');
  } else if (action === 'report-period' || action === 'view-all-reports') {
    showToast('Report values are illustrative demo data');
  } else if (action === 'member-menu') {
    showToast(`${actionButton.dataset.member} · team directory preview`);
  } else if (action === 'manage-roles' || action === 'report-menu') {
    showToast('Access and report controls are visual demo placeholders');
  }
});

$('#pageContent').addEventListener('change', (event) => {
  if (event.target.matches('[data-setting-field]')) showToast(`${event.target.dataset.settingField} updated · not synced to a server`);
});

$('#pageContent').addEventListener('click', (event) => {
  const settingsLink = event.target.closest('.settings-nav a');
  if (!settingsLink) return;
  document.querySelectorAll('.settings-nav a').forEach((link) => link.classList.toggle('selected', link === settingsLink));
});

document.querySelectorAll('.primary-nav a[data-page]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  navigateDashboard(link.dataset.page);
}));

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !['INPUT', 'TEXTAREA', 'BUTTON'].includes(document.activeElement.tagName)) { event.preventDefault(); engine.running = !engine.running; refresh(); }
  if (event.key.toLowerCase() === 'r' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) { engine.reset(); refresh(); showToast('Simulation restarted'); }
  if (['1', '2', '3'].includes(event.key) && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    const planId = ['adaptive', 'distributed', 'nearest'][Number(event.key) - 1]; engine.plan = planId; refresh();
  }
  if (event.key === 'Escape') closeAnalysis();
});

setInterval(() => { if (!$('#dashboard').hidden) { engine.tick(); refresh(); } }, 1100);
refresh();
