// VenueIQ v3 - Crowd Flow
function renderCrowd(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">CROWD FLOW</h1>
        <p class="page-subtitle">Real-time density mapping and flow analysis</p>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-ghost" onclick="this.parentElement.querySelectorAll('.btn').forEach(b=>b.classList.remove('btn-primary'));this.classList.add('btn-primary');renderCrowdView('density')" aria-pressed="true">Density</button>
        <button class="btn btn-ghost" onclick="this.parentElement.querySelectorAll('.btn').forEach(b=>b.classList.remove('btn-primary'));this.classList.add('btn-primary');renderCrowdView('flow')" aria-pressed="false">Flow</button>
        <button class="btn btn-ghost" onclick="this.parentElement.querySelectorAll('.btn').forEach(b=>b.classList.remove('btn-primary'));this.classList.add('btn-primary');renderCrowdView('exits')" aria-pressed="false">Exits</button>
      </div>
    </div>

    <div class="metrics-grid" style="padding:0 24px;margin-bottom:20px">
      <article class="metric-card" style="--accent-color:#ff3366">
        <div class="metric-label">Overcrowded Zones</div>
        <div class="metric-value">2</div>
        <div class="metric-delta down">▲ Action Required</div>
      </article>
      <article class="metric-card" style="--accent-color:#ffd700">
        <div class="metric-label">Avg Zone Density</div>
        <div class="metric-value">72%</div>
        <div class="metric-delta neutral">● Manageable</div>
      </article>
      <article class="metric-card" style="--accent-color:#00ff88">
        <div class="metric-label">Crowd Velocity</div>
        <div class="metric-value">2.3<small style="font-size:1rem">k/h</small></div>
        <div class="metric-delta up">▼ -8% from peak</div>
      </article>
      <article class="metric-card" style="--accent-color:#00d4ff">
        <div class="metric-label">Predicted Peak</div>
        <div class="metric-value">18<small style="font-size:1rem">min</small></div>
        <div class="metric-delta down">⚠ Halftime surge</div>
      </article>
    </div>

    <div class="grid-2" style="padding:0 24px;margin-bottom:20px">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Stadium Zone Map</h2>
          <span class="badge badge-red" aria-label="Live data">LIVE</span>
        </div>
        <div id="venue-map" aria-label="Stadium zone density visualization" role="img" style="position:relative;background:var(--bg-secondary);border-radius:8px;padding:16px;min-height:280px;display:flex;align-items:center;justify-content:center;">
          <canvas id="map-canvas" width="380" height="260" aria-label="Stadium crowd density map"></canvas>
        </div>
        <div style="display:flex;justify-content:center;gap:16px;margin-top:10px;font-size:0.68rem;color:var(--text-muted)" role="note">
          <span><span style="color:#ff3366">■</span> Critical (>90%)</span>
          <span><span style="color:#ffd700">■</span> Busy (70-90%)</span>
          <span><span style="color:#00ff88">■</span> Normal (<70%)</span>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">AI Routing Engine</h2>
          <span class="badge badge-cyan">◈ AI ACTIVE</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${VenueData.crowdZones.filter(z => z.density > 75).map(z => `
            <div style="background:rgba(255,51,102,0.06);border:1px solid rgba(255,51,102,0.2);border-radius:8px;padding:12px" role="alert">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                <span style="font-size:0.82rem;font-weight:600;color:var(--accent-red)">${z.name}</span>
                <span class="badge badge-red">${z.density}%</span>
              </div>
              <div style="font-size:0.75rem;color:var(--text-muted)">▶ Redirect to adjacent zone • Deploy 3 staff</div>
            </div>
          `).join('')}
          ${VenueData.crowdZones.filter(z => z.density < 60).map(z => `
            <div style="background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.15);border-radius:8px;padding:12px">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                <span style="font-size:0.82rem;font-weight:600;color:var(--accent-green)">${z.name}</span>
                <span class="badge badge-green">AVAILABLE</span>
              </div>
              <div style="font-size:0.75rem;color:var(--text-muted)">▶ Can absorb overflow from adjacent zones</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <section class="padded">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Zone Detail — All Sections</h2>
        </div>
        <table class="data-table" role="table" aria-label="Crowd density by zone">
          <thead>
            <tr>
              <th scope="col">Zone</th>
              <th scope="col">Density</th>
              <th scope="col">Trend</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            ${VenueData.crowdZones.map(z => `
              <tr>
                <td style="font-weight:500">${z.name}</td>
                <td>
                  <div style="display:flex;align-items:center;gap:8px">
                    <div class="progress-bar" style="width:80px" role="progressbar" aria-valuenow="${z.density}" aria-valuemin="0" aria-valuemax="100">
                      <div class="progress-fill" style="width:${z.density}%;background:${z.color}"></div>
                    </div>
                    <span style="font-family:var(--font-mono);font-size:0.78rem;color:${z.color}">${z.density}%</span>
                  </div>
                </td>
                <td style="color:${z.trend==='increasing'?'#ff6b35':z.trend==='decreasing'?'#00ff88':'#8a9bb8'};font-size:0.78rem">
                  ${z.trend === 'increasing' ? '▲ Rising' : z.trend === 'decreasing' ? '▼ Falling' : '● Stable'}
                </td>
                <td><span class="badge ${z.density>85?'badge-red':z.density>70?'badge-orange':'badge-green'}">${z.density>85?'CRITICAL':z.density>70?'BUSY':'NORMAL'}</span></td>
                <td><button class="btn btn-ghost" style="padding:4px 10px;font-size:0.7rem" aria-label="Manage ${z.name}" onclick="trackFeature('zone-manage','click')">Manage</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;

  // Draw stadium map
  setTimeout(() => drawStadiumMap(), 50);
  startLiveUpdates(() => drawStadiumMap());
}

function drawStadiumMap() {
  const canvas = document.getElementById('map-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = 380, h = 260;
  ctx.clearRect(0, 0, w, h);

  // Outer oval
  ctx.beginPath();
  ctx.ellipse(190, 130, 170, 110, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0,212,255,0.3)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Field
  ctx.beginPath();
  ctx.ellipse(190, 130, 90, 55, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,100,40,0.4)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,200,80,0.3)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Zones
  const zones = [
    {angle: -Math.PI/2, label: 'NORTH', density: 94, color: '#ff1a4f'},
    {angle: 0, label: 'EAST', density: 87, color: '#ff6b35'},
    {angle: Math.PI/2, label: 'SOUTH', density: 78, color: '#ffd700'},
    {angle: Math.PI, label: 'WEST', density: 82, color: '#ff6b35'},
  ];

  zones.forEach(z => {
    const rx = 190 + Math.cos(z.angle) * 140;
    const ry = 130 + Math.sin(z.angle) * 90;
    ctx.beginPath();
    ctx.arc(rx, ry, 20, 0, Math.PI * 2);
    ctx.fillStyle = z.color.replace(')', ',0.25)').replace('#', 'rgba(').replace('rgba(', 'rgba(') || 'rgba(255,100,50,0.25)';
    try { ctx.fill(); } catch(e) {}
    ctx.strokeStyle = z.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px Rajdhani, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(z.density + '%', rx, ry);
  });

  // Center label
  ctx.fillStyle = 'rgba(0,212,255,0.6)';
  ctx.font = '10px Rajdhani, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('FIELD', 190, 130);
}

function renderCrowdView(type) {
  drawStadiumMap();
}
