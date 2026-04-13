// ─── Live Alerts Page ─────────────────────────────────────────
function renderAlerts() {
  return `
<div class="page-header">
  <div>
    <div class="page-title">LIVE ALERTS</div>
    <div class="page-sub">Incident management & real-time coordination center</div>
  </div>
  <div class="header-actions">
    <div class="live-chip"><div class="live-dot"></div> LIVE</div>
    <button class="btn btn-ghost">Mark All Read</button>
    <button class="btn btn-danger">Broadcast PA</button>
  </div>
</div>

<div class="page-body">
  <div class="grid-3" style="margin-bottom:4px">
    <div class="metric-card" style="--accent-color:#ff4d6d">
      <div class="metric-label">CRITICAL</div>
      <div class="metric-value" style="font-size:30px">${DATA.alerts.filter(a=>a.type==='critical').length}</div>
    </div>
    <div class="metric-card" style="--accent-color:#ffd166">
      <div class="metric-label">WARNING</div>
      <div class="metric-value" style="font-size:30px">${DATA.alerts.filter(a=>a.type==='warning').length}</div>
    </div>
    <div class="metric-card" style="--accent-color:#4ea8ff">
      <div class="metric-label">INFO</div>
      <div class="metric-value" style="font-size:30px">${DATA.alerts.filter(a=>a.type==='info').length}</div>
    </div>
  </div>

  <div class="grid-2" style="grid-template-columns:1.5fr 1fr">
    <div class="card">
      <div class="card-header">
        <span class="card-title">All Incidents</span>
        <div style="display:flex;gap:6px">
          <button class="tab active" style="font-size:11px;padding:4px 10px" onclick="filterAlerts(this,'all')">All</button>
          <button class="tab" style="font-size:11px;padding:4px 10px" onclick="filterAlerts(this,'critical')">Critical</button>
          <button class="tab" style="font-size:11px;padding:4px 10px" onclick="filterAlerts(this,'warning')">Warning</button>
        </div>
      </div>
      <div class="card-body" id="alerts-list">
        ${renderAlertsList('all')}
      </div>
    </div>

    <!-- Staff Comm Panel -->
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Staff Dispatch</span>
          <span class="tag tag-green">12 on duty</span>
        </div>
        <div class="card-body">
          ${[
            { name: 'Team Alpha', location: 'Gate D Area', status: 'deployed', role: 'Security' },
            { name: 'Team Beta', location: 'Food Court 1', status: 'standby', role: 'Ops' },
            { name: 'Medic Unit 1', location: 'North Stand', status: 'available', role: 'Medical' },
            { name: 'Tech Support', location: 'Control Room', status: 'active', role: 'Tech' },
          ].map(t=>`
          <div class="stat-row">
            <div>
              <div style="font-size:13px;font-weight:500">${t.name}</div>
              <div style="font-size:11px;color:var(--text-muted)">${t.location} · ${t.role}</div>
            </div>
            <span class="tag ${t.status==='deployed'?'tag-red':t.status==='active'?'tag-yellow':'tag-green'}">${t.status}</span>
          </div>`).join('')}
          <button class="btn btn-accent" style="width:100%;margin-top:10px">Dispatch All Available</button>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Quick Actions</span>
        </div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:8px">
          ${[
            { label: '📢 PA Announcement', desc: 'Broadcast venue-wide' },
            { label: '🚨 Emergency Protocol', desc: 'Activate security level 2' },
            { label: '🔓 Open Emergency Exits', desc: 'All secondary exits' },
            { label: '📱 SMS Fan Alert', desc: 'Notify 63k attendees' },
          ].map(a=>`
          <button class="btn btn-ghost" style="text-align:left;padding:10px 12px;height:auto;display:flex;flex-direction:column;gap:2px">
            <span style="font-size:13px">${a.label}</span>
            <span style="font-size:11px;color:var(--text-dim)">${a.desc}</span>
          </button>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function renderAlertsList(filter) {
  const alerts = filter === 'all' ? DATA.alerts : DATA.alerts.filter(a => a.type === filter);
  return alerts.map(a => `
  <div class="alert-item ${a.type}">
    <div class="alert-icon ${a.type}">${a.icon}</div>
    <div style="flex:1">
      <div class="alert-title">${a.title}</div>
      <div class="alert-desc">${a.desc}</div>
      <div class="alert-time">${a.time}</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      <button class="btn btn-ghost" style="padding:4px 10px;font-size:11px">Resolve</button>
      <button class="btn btn-ghost" style="padding:4px 10px;font-size:11px">Assign</button>
    </div>
  </div>`).join('');
}

function filterAlerts(el, filter) {
  document.querySelectorAll('.card-header .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const list = document.getElementById('alerts-list');
  if (list) list.innerHTML = renderAlertsList(filter);
}

function initAlerts() {}
