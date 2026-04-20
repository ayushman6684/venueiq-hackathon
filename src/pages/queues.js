// VenueIQ v3 - Queue Intelligence
function renderQueues(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">QUEUE INTEL</h1>
        <p class="page-subtitle">Real-time wait time monitoring across all points</p>
      </div>
      <span class="badge badge-green" aria-label="Live queue data">● LIVE DATA</span>
    </div>

    <div class="metrics-grid">
      <article class="metric-card" style="--accent-color:#00ff88">
        <div class="metric-label">Avg Gate Wait</div>
        <div class="metric-value" id="q-avg-gate">5.4<small style="font-size:1rem">m</small></div>
        <div class="metric-delta up">▼ -0.8m vs 30min ago</div>
      </article>
      <article class="metric-card" style="--accent-color:#ff3366">
        <div class="metric-label">Critical Queues</div>
        <div class="metric-value" id="q-critical">2</div>
        <div class="metric-delta down">▲ Need attention</div>
      </article>
      <article class="metric-card" style="--accent-color:#ffd700">
        <div class="metric-label">Avg Food Wait</div>
        <div class="metric-value">6.8<small style="font-size:1rem">m</small></div>
        <div class="metric-delta down">▲ +2m halftime soon</div>
      </article>
      <article class="metric-card" style="--accent-color:#00d4ff">
        <div class="metric-label">People Rerouted</div>
        <div class="metric-value">1,247</div>
        <div class="metric-delta up">▲ AI saved ~8min avg</div>
      </article>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Entry Gates</h2>
          <button class="btn btn-primary" style="padding:4px 12px;font-size:0.72rem" onclick="rerouteAll()" aria-label="Activate AI rerouting for all gates">AI Reroute All</button>
        </div>
        <table class="data-table" role="table" aria-label="Gate wait times">
          <thead>
            <tr>
              <th scope="col">Gate</th>
              <th scope="col">Wait</th>
              <th scope="col">Load</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody id="gate-table">
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Food Courts</h2>
        </div>
        <table class="data-table" role="table" aria-label="Food court wait times">
          <thead>
            <tr>
              <th scope="col">Location</th>
              <th scope="col">Wait</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            ${VenueData.foodCourts.map(f => `
              <tr>
                <td style="font-size:0.78rem">${f.name}</td>
                <td style="font-family:var(--font-mono);color:${f.wait>10?'var(--accent-red)':f.wait>6?'var(--accent-yellow)':'var(--accent-green)'}" aria-label="${f.wait} minute wait">${f.wait}m</td>
                <td><span class="badge ${f.status==='critical'?'badge-red':f.status==='busy'?'badge-orange':'badge-green'}">${f.status.toUpperCase()}</span></td>
                <td><button class="btn btn-ghost" style="padding:3px 8px;font-size:0.68rem" aria-label="Manage ${f.name}">Manage</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="padded">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Wait Time History (Last 60 min)</h2>
          <span class="badge badge-cyan">TREND ANALYSIS</span>
        </div>
        <canvas id="wait-history" height="100" aria-label="Wait time trends over last 60 minutes"></canvas>
      </div>
    </div>

    <div role="status" id="reroute-msg" aria-live="polite" style="position:fixed;bottom:20px;right:20px;display:none" class="badge badge-green">✓ Rerouting activated</div>
  `;

  renderGateTable();
  setTimeout(() => {
    drawBarChart(document.getElementById('wait-history'),
      ['5m','10m','15m','20m','25m','30m','35m','40m','45m','50m','55m','60m'],
      [8,9,7,8,6,7,5,6,5,4,5,4], '#00d4ff');
  }, 50);

  startLiveUpdates(() => renderGateTable());
}

function renderGateTable() {
  const tbody = document.getElementById('gate-table');
  if (!tbody) return;
  tbody.innerHTML = VenueData.gates.map(g => `
    <tr>
      <td style="font-size:0.78rem;font-weight:500">${g.name}</td>
      <td style="font-family:var(--font-mono);color:${getStatusColor(g.status)}" aria-label="${g.wait} minute wait">${g.wait}m</td>
      <td>
        <div class="progress-bar" style="width:60px" role="progressbar" aria-valuenow="${g.capacity}" aria-valuemin="0" aria-valuemax="100" aria-label="${g.capacity}% capacity">
          <div class="progress-fill" style="width:${g.capacity}%;background:${getStatusColor(g.status)}"></div>
        </div>
      </td>
      <td><span class="badge ${g.status==='critical'?'badge-red':g.status==='busy'?'badge-orange':'badge-green'}">${g.status.toUpperCase()}</span></td>
    </tr>
  `).join('');
}

function rerouteAll() {
  trackFeature('ai-reroute', 'activate');
  const msg = document.getElementById('reroute-msg');
  if (msg) {
    msg.style.display = 'inline-flex';
    setTimeout(() => { msg.style.display = 'none'; }, 3000);
  }
}
