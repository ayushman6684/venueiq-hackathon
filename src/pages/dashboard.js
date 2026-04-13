// ─── Dashboard Page ────────────────────────────────────────────
function renderDashboard() {
  const m = DATA.metrics;
  return `
<div class="page-header">
  <div>
    <div class="page-title">COMMAND CENTER</div>
    <div class="page-sub">${DATA.event.venue} · ${DATA.event.teams} · Updated every 4s</div>
  </div>
  <div class="header-actions">
    <div class="live-chip"><div class="live-dot"></div> LIVE</div>
    <button class="btn btn-ghost">Export PDF</button>
    <button class="btn btn-accent">Alert Staff</button>
  </div>
</div>

<div class="page-body">
  <!-- Metric Row -->
  <div class="grid-4">
    <div class="metric-card" style="--accent-color:#00e5a0">
      <div class="metric-icon">◉</div>
      <div class="metric-label">OCCUPANCY</div>
      <div class="metric-value" id="m-occ">${m.occupancy.value.toFixed(1)}%</div>
      <div class="metric-change up">↑ +${m.occupancy.change}% vs entry</div>
    </div>
    <div class="metric-card" style="--accent-color:#ffd166">
      <div class="metric-icon">⏱</div>
      <div class="metric-label">AVG WAIT TIME</div>
      <div class="metric-value" id="m-wait">${m.avgWait.value.toFixed(1)}<span style="font-size:18px;opacity:0.5"> min</span></div>
      <div class="metric-change up">↓ ${Math.abs(m.avgWait.change)} min vs last event</div>
    </div>
    <div class="metric-card" style="--accent-color:#ff4d6d">
      <div class="metric-icon">⚠</div>
      <div class="metric-label">ACTIVE INCIDENTS</div>
      <div class="metric-value" id="m-inc">${m.incidents.value}</div>
      <div class="metric-change down">↓ ${Math.abs(m.incidents.change)} vs last match</div>
    </div>
    <div class="metric-card" style="--accent-color:#4ea8ff">
      <div class="metric-icon">★</div>
      <div class="metric-label">FAN SCORE</div>
      <div class="metric-value" id="m-sat">${m.satisfaction.value.toFixed(1)}<span style="font-size:18px;opacity:0.5">/5</span></div>
      <div class="metric-change up">↑ +${m.satisfaction.change} vs avg</div>
    </div>
  </div>

  <!-- Main 2-col -->
  <div class="grid-2" style="grid-template-columns: 1.6fr 1fr">
    <!-- Venue Heatmap -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">Live Crowd Density Map</span>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="width:8px;height:8px;border-radius:2px;background:#00e5a080;display:inline-block"></span><span style="font-size:11px;color:var(--text-muted)">Low</span>
          <span style="width:8px;height:8px;border-radius:2px;background:#ffd16680;display:inline-block"></span><span style="font-size:11px;color:var(--text-muted)">Med</span>
          <span style="width:8px;height:8px;border-radius:2px;background:#ff4d6d99;display:inline-block"></span><span style="font-size:11px;color:var(--text-muted)">High</span>
        </div>
      </div>
      <div class="card-body">
        <div class="heatmap-container" id="heatmap-container">
          <div class="heatmap-grid" id="heatmap-grid"></div>
          <!-- Zone labels overlaid -->
          <div style="position:absolute;top:12px;left:50%;transform:translateX(-50%);font-size:10px;letter-spacing:2px;color:rgba(232,237,243,0.35);text-transform:uppercase;pointer-events:none">North Stand</div>
          <div style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);font-size:10px;letter-spacing:2px;color:rgba(232,237,243,0.35);text-transform:uppercase;pointer-events:none">South Stand</div>
          <div style="position:absolute;top:50%;left:10px;transform:translateY(-50%) rotate(-90deg);font-size:10px;letter-spacing:2px;color:rgba(232,237,243,0.35);text-transform:uppercase;pointer-events:none">West</div>
          <div style="position:absolute;top:50%;right:10px;transform:translateY(-50%) rotate(90deg);font-size:10px;letter-spacing:2px;color:rgba(232,237,243,0.35);text-transform:uppercase;pointer-events:none">East</div>
        </div>
      </div>
    </div>

    <!-- Right panel: zones + alerts preview -->
    <div style="display:flex;flex-direction:column;gap:14px">
      <!-- Zone status -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Zone Status</span>
        </div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:12px">
          ${DATA.zones.map(z => `
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
              <div style="font-size:13px;font-weight:500">${z.name}</div>
              <div style="font-size:12px;font-family:var(--font-mono);color:${z.crowd > 0.97 ? 'var(--accent2)' : z.crowd > 0.9 ? 'var(--accent3)' : 'var(--accent)'}">
                ${(z.crowd * 100).toFixed(0)}%
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${z.crowd*100}%;--fill-color:${z.crowd > 0.97 ? '#ff4d6d' : z.crowd > 0.9 ? '#ffd166' : '#00e5a0'}"></div>
            </div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:3px">${z.current.toLocaleString()} / ${z.capacity.toLocaleString()} · ${z.exits} exits open</div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Critical alerts mini -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Active Alerts</span>
          <span class="tag tag-red">${DATA.alerts.filter(a=>a.type==='critical').length} Critical</span>
        </div>
        <div class="card-body">
          ${DATA.alerts.filter(a=>a.type==='critical').map(a=>`
          <div class="alert-item critical" style="margin-bottom:6px">
            <div class="alert-icon critical">${a.icon}</div>
            <div>
              <div class="alert-title">${a.title}</div>
              <div class="alert-time">${a.time}</div>
            </div>
          </div>`).join('')}
          <button class="btn btn-ghost" style="width:100%;margin-top:4px;font-size:12px" onclick="navigate(document.querySelector('[data-page=alerts]'),'alerts')">View all alerts →</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom 3-col -->
  <div class="grid-3">
    <!-- Entry flow trend -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">Crowd Entry Flow</span>
        <span style="font-size:11px;color:var(--text-muted)">Last 24 intervals</span>
      </div>
      <div class="card-body">
        <canvas id="flow-canvas" width="400" height="90" style="width:100%;height:90px"></canvas>
        <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:11px;color:var(--text-muted)">
          <span>Entry open</span><span>Peak</span><span>Now</span>
        </div>
      </div>
    </div>

    <!-- Hourly occupancy -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">Hourly Occupancy %</span>
      </div>
      <div class="card-body">
        <canvas id="occ-canvas" width="400" height="90" style="width:100%;height:90px"></canvas>
        <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:11px;color:var(--text-muted)">
          <span>12:00</span><span>17:00</span><span>Now</span>
        </div>
      </div>
    </div>

    <!-- Queue summary -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">Top Wait Times</span>
      </div>
      <div class="card-body">
        ${DATA.queues.sort((a,b)=>b.wait-a.wait).slice(0,5).map(q=>`
        <div class="stat-row">
          <div class="stat-row-label">${q.gate}</div>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="tag ${q.wait > 6 ? 'tag-red' : q.wait > 4 ? 'tag-yellow' : 'tag-green'}">${q.wait.toFixed(1)} min</span>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>`;
}

function initDashboard() {
  // Render heatmap
  const grid = document.getElementById('heatmap-grid');
  if (grid) {
    grid.innerHTML = DATA.heatmap.map((v, i) =>
      `<div class="heat-cell" title="Density: ${(v*100).toFixed(0)}%" style="background:${heatColor(v)}"></div>`
    ).join('');
  }
  // Draw sparklines
  const fc = document.getElementById('flow-canvas');
  const oc = document.getElementById('occ-canvas');
  if (fc) {
    fc.width = fc.offsetWidth * window.devicePixelRatio || 400;
    fc.height = 90 * window.devicePixelRatio || 90;
    drawSparkline(fc, DATA.flowHistory, '#4ea8ff');
  }
  if (oc) {
    oc.width = oc.offsetWidth * window.devicePixelRatio || 400;
    oc.height = 90 * window.devicePixelRatio || 90;
    drawSparkline(oc, DATA.hourlyOccupancy, '#00e5a0');
  }

  // Live update loop for this page
  window._dashInterval = setInterval(() => {
    const mOcc = document.getElementById('m-occ');
    const mWait = document.getElementById('m-wait');
    if (mWait) mWait.innerHTML = DATA.metrics.avgWait.value.toFixed(1) + '<span style="font-size:18px;opacity:0.5"> min</span>';
  }, 4000);
}
