// VenueIQ v3 - Dashboard
function renderDashboard(container) {
  const m = VenueData.metrics;
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title" tabindex="0">COMMAND CENTER</h1>
        <p class="page-subtitle" aria-live="polite">Live stadium intelligence — updates every 4 seconds</p>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <span class="badge badge-green" aria-label="System status: all systems operational">● ALL SYSTEMS OPERATIONAL</span>
        <span id="live-clock" style="font-family:var(--font-mono);font-size:0.8rem;color:var(--text-muted)" aria-live="off"></span>
      </div>
    </div>

    <section aria-label="Key Metrics" class="metrics-grid">
      <article class="metric-card" style="--accent-color:#00d4ff" aria-label="Current attendance">
        <div class="metric-label">Attendance</div>
        <div class="metric-value" id="m-att">73,240</div>
        <div class="metric-delta up" aria-label="Trending up">▲ 91.5% capacity</div>
        <canvas id="spark-att" height="40" style="margin-top:8px" aria-hidden="true"></canvas>
      </article>
      <article class="metric-card" style="--accent-color:#00ff88" aria-label="Average wait time">
        <div class="metric-label">Avg Wait</div>
        <div class="metric-value" id="m-wait">${m.avgWaitTime}<small style="font-size:1rem">m</small></div>
        <div class="metric-delta up" aria-label="Improved from last check">▼ -1.2m vs last hour</div>
        <canvas id="spark-wait" height="40" style="margin-top:8px" aria-hidden="true"></canvas>
      </article>
      <article class="metric-card" style="--accent-color:#ffd700" aria-label="Fan satisfaction score">
        <div class="metric-label">Fan Score</div>
        <div class="metric-value" id="m-score">${m.fanScore}<small style="font-size:1rem">/5</small></div>
        <div class="metric-delta neutral" aria-label="Stable">● Stable</div>
        <canvas id="spark-score" height="40" style="margin-top:8px" aria-hidden="true"></canvas>
      </article>
      <article class="metric-card" style="--accent-color:#ff3366" aria-label="Active incidents">
        <div class="metric-label">Incidents</div>
        <div class="metric-value" id="m-inc">${m.incidents}</div>
        <div class="metric-delta down" aria-label="Active incidents requiring attention">▲ 1 critical active</div>
        <canvas id="spark-inc" height="40" style="margin-top:8px" aria-hidden="true"></canvas>
      </article>
      <article class="metric-card" style="--accent-color:#7c3aed" aria-label="Staff deployed">
        <div class="metric-label">Staff On Duty</div>
        <div class="metric-value">${m.staffDeployed}</div>
        <div class="metric-delta neutral">● 94% deployment</div>
      </article>
      <article class="metric-card" style="--accent-color:#00ff88" aria-label="Concession revenue">
        <div class="metric-label">Revenue</div>
        <div class="metric-value">₹2.8L</div>
        <div class="metric-delta up">▲ +12% vs forecast</div>
      </article>
    </section>

    <section class="grid-2" aria-label="Crowd Analysis">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Zone Density Map</h2>
          <span class="badge badge-red" aria-label="1 zone critical">1 CRITICAL</span>
        </div>
        <div id="zone-bars" role="list" aria-label="Crowd density by zone"></div>
      </div>
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Gate Status</h2>
          <span class="badge badge-cyan">LIVE</span>
        </div>
        <div id="gate-status" role="list" aria-label="Gate wait times"></div>
      </div>
    </section>

    <section class="grid-2" aria-label="AI Insights and Heatmap">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">AI Recommendations</h2>
          <span class="badge badge-cyan" aria-label="AI powered">◈ AI</span>
        </div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:10px" aria-label="AI recommendations list">
          <li style="display:flex;gap:10px;align-items:flex-start">
            <span style="color:var(--accent-red);font-size:1rem" aria-hidden="true">⚠</span>
            <div>
              <div style="font-size:0.82rem;font-weight:600;color:var(--text-primary)">Reroute Gate D Traffic</div>
              <div style="font-size:0.75rem;color:var(--text-muted)">Direct 40% flow to Gate C — saves ~8 min wait</div>
            </div>
          </li>
          <li style="display:flex;gap:10px;align-items:flex-start">
            <span style="color:var(--accent-orange);font-size:1rem" aria-hidden="true">◉</span>
            <div>
              <div style="font-size:0.82rem;font-weight:600;color:var(--text-primary)">Pre-Position Staff at North Stand</div>
              <div style="font-size:0.75rem;color:var(--text-muted)">Halftime in 18 min — expect 200% flow increase</div>
            </div>
          </li>
          <li style="display:flex;gap:10px;align-items:flex-start">
            <span style="color:var(--accent-green);font-size:1rem" aria-hidden="true">✓</span>
            <div>
              <div style="font-size:0.82rem;font-weight:600;color:var(--text-primary)">Restock Beer at F2 Urgently</div>
              <div style="font-size:0.75rem;color:var(--text-muted)">31% stock remaining, high demand forecast</div>
            </div>
          </li>
          <li style="display:flex;gap:10px;align-items:flex-start">
            <span style="color:var(--accent-cyan);font-size:1rem" aria-hidden="true">◌</span>
            <div>
              <div style="font-size:0.82rem;font-weight:600;color:var(--text-primary)">Open Emergency Exit Path E3</div>
              <div style="font-size:0.75rem;color:var(--text-muted)">Predicted crowd surge in East section at 85 min</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Crowd Density Heatmap</h2>
          <span class="badge badge-orange" aria-label="1 zone overcrowded">1 OVERCROWDED</span>
        </div>
        <div id="heatmap-grid" class="heatmap-grid" role="img" aria-label="Crowd density heatmap — red indicates high density areas"></div>
        <div style="display:flex;gap:12px;margin-top:10px;font-size:0.68rem;color:var(--text-muted)" role="note" aria-label="Heatmap legend">
          <span><span style="color:#ff3366">■</span> Critical</span>
          <span><span style="color:#ffd700">■</span> Busy</span>
          <span><span style="color:#00ff88">■</span> Clear</span>
        </div>
      </div>
    </section>
  `;

  // Clock
  function updateClock() {
    const el = document.getElementById('live-clock');
    if (el) el.textContent = new Date().toLocaleTimeString();
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Zone bars
  renderZoneBars();
  renderGateStatus();
  renderHeatmap();

  // Sparklines
  setTimeout(() => {
    drawSparkline(document.getElementById('spark-att'), [71,72,73,72,73,74,73,73], '#00d4ff');
    drawSparkline(document.getElementById('spark-wait'), [6,5,5,6,5,4,4,4], '#00ff88');
    drawSparkline(document.getElementById('spark-score'), [4.4,4.5,4.5,4.6,4.6,4.6,4.6,4.6], '#ffd700');
    drawSparkline(document.getElementById('spark-inc'), [1,2,2,3,3,2,3,3], '#ff3366');
  }, 50);

  startLiveUpdates(() => {
    renderGateStatus();
    renderHeatmap();
    const waitEl = document.getElementById('m-wait');
    if (waitEl) waitEl.innerHTML = `${VenueData.metrics.avgWaitTime}<small style="font-size:1rem">m</small>`;
  });
}

function renderZoneBars() {
  const el = document.getElementById('zone-bars');
  if (!el) return;
  el.innerHTML = VenueData.crowdZones.map(z => `
    <div role="listitem" style="margin-bottom:10px" aria-label="${z.name}: ${z.density}% density">
      <div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:3px">
        <span style="color:var(--text-secondary)">${z.name}</span>
        <span style="color:${z.color};font-family:var(--font-mono)">${z.density}%</span>
      </div>
      <div class="progress-bar" role="progressbar" aria-valuenow="${z.density}" aria-valuemin="0" aria-valuemax="100" aria-label="${z.name} density">
        <div class="progress-fill" style="width:${z.density}%;background:${z.color}"></div>
      </div>
    </div>
  `).join('');
}

function renderGateStatus() {
  const el = document.getElementById('gate-status');
  if (!el) return;
  el.innerHTML = VenueData.gates.map(g => `
    <div role="listitem" style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.04)" aria-label="${g.name}: ${g.wait} minute wait, ${g.status} status">
      <span style="font-size:0.78rem;color:var(--text-secondary)">${g.name}</span>
      <div style="display:flex;gap:8px;align-items:center">
        <span style="font-family:var(--font-mono);font-size:0.78rem;color:${getStatusColor(g.status)}">${g.wait}m</span>
        <span style="width:8px;height:8px;border-radius:50%;background:${getStatusColor(g.status)};display:inline-block" aria-hidden="true"></span>
      </div>
    </div>
  `).join('');
}

function renderHeatmap() {
  const grid = document.getElementById('heatmap-grid');
  if (!grid) return;
  const cells = Array.from({length: 72}, () => Math.floor(Math.random() * 100));
  grid.innerHTML = cells.map((v, i) => `
    <div class="heat-cell" style="background:${getHeatCellColor(v)}" 
         title="Zone ${i+1}: ${v}% density" 
         role="gridcell"
         tabindex="0"
         aria-label="Zone ${i+1} density ${v}%"></div>
  `).join('');
}
