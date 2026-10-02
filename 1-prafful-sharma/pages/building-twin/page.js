import { SimulationEngine } from '../../../2-satyam-sharma/engine.js';
import { renderTwinSVG } from '../../../1-prafful-sharma/floorplan.js';

export function renderBuildingTwinPage() {
  const demoState = new SimulationEngine();
  const map = renderTwinSVG(demoState, true, false);
  return `
    <section class="page-view-content">
      <div class="page-breadcrumb-label">INFRASTRUCTURE / DIGITAL MODEL</div>
      <div class="content-heading"><div><h1>Building twin<span>.</span></h1><p>Explore the spaces, exits and data layers behind your emergency model.</p></div><button class="page-action-button" data-action="edit-floor">✎ &nbsp; Edit floor plan</button></div>
      <div class="building-summary-card"><div class="building-summary-art">${map}</div><div class="building-summary-info"><div class="model-status"><i></i> MODEL READY <span>DEMO DATA</span></div><h2>Meridian Campus<br>Central Library</h2><p class="building-address">Vadodara, Gujarat <span>·</span> Academic campus</p><div class="building-meta"><div><small>FLOORS</small><b>03</b></div><div><small>MODEL AREA</small><b>3,720 <i>m²</i></b></div><div><small>EXIT POINTS</small><b>12</b></div></div><div class="building-summary-foot"><span class="building-avatar">M</span><span>Last model sync<br><b>29 Sep 2026 · 14:30 IST</b></span><button data-action="sync-model">↻</button></div></div></div>
      <div class="floor-section-heading"><div><div class="section-kicker">SPATIAL MODEL</div><h2>Floors & zones</h2></div><button class="page-subtle-button" data-action="add-floor">＋ Add floor</button></div>
      <div class="floor-card-grid"><button class="floor-info-card selected" data-floor-choice="01"><span class="floor-card-number">LEVEL 01</span><b>Ground floor</b><small>8 zones <i>·</i> 4 exits</small><span class="floor-card-status"><i></i> Model ready</span></button><button class="floor-info-card" data-floor-choice="02"><span class="floor-card-number">LEVEL 02</span><b>First floor</b><small>6 zones <i>·</i> 4 exits</small><span class="floor-card-status"><i></i> Model ready</span></button><button class="floor-info-card" data-floor-choice="03"><span class="floor-card-number">LEVEL 03</span><b>Second floor</b><small>5 zones <i></i> 4 exits</small><span class="floor-card-status"><i class="status-pending"></i> Review needed</span></button><button class="floor-add-card" data-action="add-floor"><span>＋</span><b>Add a floor</b><small>Extend this building model</small></button></div>
      <div class="demo-note"><span>i</span><p><b>Illustrative building model.</b> This prototype uses sample geometry, not a surveyed or certified floor plan. Verify dimensions, exit access and occupant capacity before any real-world use.</p></div>
    </section>`;
}
