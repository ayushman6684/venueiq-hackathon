// VenueIQ v3 - Live Alerts
function renderAlerts(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">LIVE ALERTS</h1>
        <p class="page-subtitle">Incident management and staff coordination</p>
      </div>
      <button class="btn btn-danger" onclick="broadcastPA()" aria-label="Broadcast PA announcement to all zones">📢 PA Broadcast</button>
    </div>

    <div class="metrics-grid">
      <article class="metric-card" style="--accent-color:#ff3366">
        <div class="metric-label">Critical</div>
        <div class="metric-value">1</div>
        <div class="metric-delta down">▲ Immediate action</div>
      </article>
      <article class="metric-card" style="--accent-color:#ff6b35">
        <div class="metric-label">Warnings</div>
        <div class="metric-value">1</div>
        <div class="metric-delta neutral">● Monitoring</div>
      </article>
      <article class="metric-card" style="--accent-color:#00ff88">
        <div class="metric-label">Resolved Today</div>
        <div class="metric-value">8</div>
        <div class="metric-delta up">▼ Good response</div>
      </article>
      <article class="metric-card" style="--accent-color:#7c3aed">
        <div class="metric-label">Staff Dispatched</div>
        <div class="metric-value">9</div>
        <div class="metric-delta neutral">● Active</div>
      </article>
    </div>

    <div class="grid-2">
      <div class="card padded" style="padding:18px">
        <div class="card-header">
          <h2 class="card-title">Active Incidents</h2>
          <span class="badge badge-red" role="status" aria-live="polite">3 ACTIVE</span>
        </div>
        <div role="list" aria-label="Active incidents">
          ${VenueData.incidents.map(inc => `
            <div class="alert-item ${inc.type}" role="listitem" aria-label="${inc.title} — ${inc.type} severity">
              <div style="width:8px;height:8px;border-radius:50%;background:${inc.type==='critical'?'var(--accent-red)':inc.type==='warning'?'var(--accent-orange)':'var(--accent-cyan)'};margin-top:5px;flex-shrink:0" aria-hidden="true"></div>
              <div style="flex:1">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                  <span style="font-weight:600;font-size:0.85rem">${inc.title}</span>
                  <span class="badge ${inc.type==='critical'?'badge-red':inc.type==='warning'?'badge-orange':'badge-cyan'}">${inc.type.toUpperCase()}</span>
                </div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:8px">
                  📍 ${inc.zone} · ${inc.time} · ${inc.staff} staff assigned
                </div>
                <div style="display:flex;gap:6px">
                  <button class="btn btn-primary" style="padding:4px 10px;font-size:0.7rem" onclick="dispatchStaff(${inc.id})" aria-label="Dispatch additional staff to ${inc.title}">Dispatch Staff</button>
                  <button class="btn btn-ghost" style="padding:4px 10px;font-size:0.7rem" onclick="markResolved(${inc.id}, this)" aria-label="Mark ${inc.title} as resolved">Mark Resolved</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Staff Deployment Map</h2>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px" role="list" aria-label="Staff deployment by zone">
          ${[
            {zone:'Gate D — East', staff:4, type:'crowd'},
            {zone:'North Stand F2', staff:2, type:'queue'},
            {zone:'Section 14', staff:3, type:'medical'},
            {zone:'Parking Lot A', staff:6, type:'traffic'},
            {zone:'Main Concourse', staff:12, type:'patrol'},
          ].map(s => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:var(--bg-secondary);border-radius:6px" role="listitem" aria-label="${s.zone}: ${s.staff} staff deployed for ${s.type}">
              <div>
                <div style="font-size:0.82rem;font-weight:500">${s.zone}</div>
                <div style="font-size:0.7rem;color:var(--text-muted)">${s.type} management</div>
              </div>
              <div style="text-align:right">
                <div style="font-family:var(--font-mono);font-size:0.9rem;color:var(--accent-cyan)">${s.staff}</div>
                <div style="font-size:0.65rem;color:var(--text-muted)">staff</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div role="status" id="pa-msg" aria-live="assertive" style="position:fixed;bottom:20px;right:20px;display:none;background:var(--bg-card);border:1px solid var(--accent-cyan);padding:12px 16px;border-radius:8px;font-size:0.82rem">
      📢 PA broadcast sent to all zones
    </div>
  `;
}

function dispatchStaff(id) {
  trackFeature('dispatch-staff', 'click');
  alert(`✓ Additional staff dispatched to incident #${id}`);
}

function markResolved(id, btn) {
  const item = btn.closest('.alert-item');
  if (item) {
    item.style.opacity = '0.4';
    btn.textContent = '✓ Resolved';
    btn.disabled = true;
  }
}

function broadcastPA() {
  trackFeature('pa-broadcast', 'click');
  const msg = document.getElementById('pa-msg');
  if (msg) {
    msg.style.display = 'block';
    setTimeout(() => msg.style.display = 'none', 3000);
  }
}
