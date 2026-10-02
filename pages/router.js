import { renderBuildingTwinPage } from '../1-prafful-sharma/pages/building-twin/page.js';
import { renderScenarioLibrary } from '../2-satyam-sharma/pages/scenario-library/page.js';
import { renderReportsPage } from '../3-rudra-khaire/pages/reports-insights/page.js';
import { renderTeamAccessPage } from '../1-prafful-sharma/pages/team-access/page.js';
import { renderSettingsPage } from '../4-het-patel/pages/settings/page.js';

export const PAGES = {
  building: { title: 'Building twin', render: renderBuildingTwinPage, hash: 'building' },
  scenarios: { title: 'Scenario library', render: renderScenarioLibrary, hash: 'scenarios' },
  reports: { title: 'Reports & insights', render: renderReportsPage, hash: 'reports' },
  team: { title: 'Team & access', render: renderTeamAccessPage, hash: 'team' },
  settings: { title: 'Settings', render: renderSettingsPage, hash: 'settings' }
};

export function resolvePageHash(hash) {
  if (hash === '#simulation' || hash === '#home' || !hash) return 'simulation';
  return Object.keys(PAGES).find((key) => `#${PAGES[key].hash}` === hash) || 'simulation';
}
