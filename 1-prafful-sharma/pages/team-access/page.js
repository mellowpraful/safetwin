const TEAM = [
  { initials: 'PS', name: 'Prafful Sharma', role: 'Team Leader · Product & integration', access: 'Owner', tone: 'mint' },
  { initials: 'HP', name: 'Het Patel', role: 'Design · Interface & experience', access: 'Editor', tone: 'lilac' },
  { initials: 'SS', name: 'Satyam Sharma', role: 'Developer · Simulation engine', access: 'Editor', tone: 'amber' },
  { initials: 'RK', name: 'Rudra Keyur Khaire', role: 'Developer · Digital twin & systems', access: 'Editor', tone: 'blue' }
];

export function renderTeamAccessPage() {
  const members = TEAM.map((member, index) => `<div class="team-access-row"><span class="access-avatar ${member.tone}">${member.initials}<i></i></span><span class="access-name"><b>${member.name}</b><small>${member.role}</small></span><span class="access-status"><i></i> Active</span><span class="access-role ${index === 0 ? 'owner-role' : ''}">${member.access}</span><button class="row-more" data-action="member-menu" data-member="${member.name}" aria-label="Options for ${member.name}">···</button></div>`).join('');
  return `
    <section class="page-view-content">
      <div class="page-breadcrumb-label">WORKSPACE / PEOPLE & PERMISSIONS</div>
      <div class="content-heading"><div><h1>Team & access<span>.</span></h1><p>One team working together to make emergency planning clearer.</p></div><button class="page-action-button" data-action="invite-member">＋ &nbsp; Invite member</button></div>
      <div class="team-workspace-card"><div class="workspace-emblem">V</div><div><div class="section-kicker">TEAM WORKSPACE</div><h2>Vistaraz</h2><p>SafeTwin AI · Emergency readiness prototype</p></div><span class="team-active-pill"><i></i> 4 MEMBERS</span></div>
      <article class="page-card team-access-card"><div class="page-card-heading"><div><div class="section-kicker">MEMBER DIRECTORY</div><h2>People with workspace access</h2></div><button class="report-period" data-action="manage-roles">Manage roles⌄</button></div><div class="team-access-list">${members}</div><div class="team-access-footer"><span>Showing all 4 active members</span><button data-action="invite-member">Invite a teammate <b>→</b></button></div></article>
      <div class="access-info-grid"><article class="page-card"><span class="access-info-icon mint">♙</span><div><b>Team owner</b><p>Prafful Sharma manages workspace access and project coordination.</p></div></article><article class="page-card"><span class="access-info-icon blue">⌑</span><div><b>Shared ownership</b><p>Design and developer responsibilities are divided across the member folders.</p></div></article></div>
      <div class="demo-note"><span>i</span><p><b>Prototype access page.</b> Authentication, invitations and permission enforcement are visual placeholders. No account system or real access controls are connected.</p></div>
    </section>`;
}
