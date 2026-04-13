// ─── Analytics Page ───────────────────────────────────────────
function renderAnalytics() {
  return `
<div class="page-header">
  <div>
    <div class="page-title">ANALYTICS</div>
    <div class="page-sub">Post-event insights, trends & operational intelligence</div>
  </div>
  <div class="header-actions">
    <button class="btn btn-ghost">Last 5 Events</button>
    <button class="btn btn-accent">Generate Report</button>
  </div>
</div>

<div class="page-body">
  <div class="grid-4">
    ${[
      { label: 'PEAK OCCUPANCY', value: '96.1%', sub: '↑ +3.2% vs avg', color: '#00e5a0' },
      { label: 'INCIDENTS RESOLVED', value: '100%', sub: '6 total, 0 major', color: '#4ea8ff' },
      { label: 'FAN SATISFACTION', value: '4.6/5', sub: 'Top 12% events', color: '#ffd166' },
      { label: 'REVENUE GENERATED', value: '₹2.1Cr', sub: '↑ +18% vs last', color: '#00e5a0' },
    ].map(m=>`
    <div class="metric-card" style="--accent-color:${m.color}">
      <div class="metric-label">${m.label}</div>
      <div class="metric-value" style="font-size:24px">${m.value}</div>
      <div class="metric-change up">${m.sub}</div>
    </div>`).join('')}
  </div>

  <div class="grid-2">
    <!-- Occupancy over time -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">Crowd Flow — Full Event Timeline</span>
        <span style="font-size:11px;color:var(--text-muted)">Today · 14:00 – 22:00</span>
      </div>
      <div class="card-body">
        <canvas id="ana-flow" width="600" height="120" style="width:100%;height:120px"></canvas>
        <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:10px;color:var(--text-muted)">
          ${['14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','Now'].map(t=>`<span>${t}</span>`).join('')}
        </div>
        <!-- Annotations -->
        <div style="display:flex;gap:16px;margin-top:12px;flex-wrap:wrap">
          ${[
            { label: 'Gates Open', color: '#4ea8ff' },
            { label: 'Match Start', color: '#00e5a0' },
            { label: 'Halftime', color: '#ffd166' },
            { label: 'Now', color: '#ff4d6d' },
          ].map(a=>`<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-muted)">
            <div style="width:10px;height:2px;background:${a.color}"></div>${a.label}
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Top Insights -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">AI Insights</span>
        <span class="tag tag-blue">6 found</span>
      </div>
      <div class="card-body">
        ${[
          { icon: '📈', text: 'Gate D bottleneck caused avg 2.3 min delay for 12% of fans. Recommend adding 2 lanes before next event.', type: 'insight' },
          { icon: '🍔', text: 'Samosa sold out 40 min before match end. Recommend 40% higher stock for finals.', type: 'warning' },
          { icon: '⭐', text: 'Satisfaction dipped at halftime (3.8) but recovered after AI routing announcements (4.7).', type: 'success' },
          { icon: '💰', text: 'Merchandise revenue 22% above forecast. Recommend opening Stand M3 next match.', type: 'success' },
        ].map(ins=>`
        <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:18px;flex-shrink:0">${ins.icon}</span>
          <div style="font-size:12.5px;line-height:1.5;color:var(--text-muted)">${ins.text}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <div class="grid-3">
    <!-- Queue performance -->
    <div class="card">
      <div class="card-header"><span class="card-title">Queue Performance by Gate</span></div>
      <div class="card-body">
        <canvas id="ana-gates" width="400" height="100" style="width:100%;height:100px"></canvas>
        <div style="margin-top:8px">
          ${DATA.queues.map(q=>`
          <div class="stat-row">
            <div class="stat-row-label">${q.gate}</div>
            <div class="stat-row-value" style="color:${q.wait>6?'var(--accent2)':q.wait>3?'var(--accent3)':'var(--accent)'}">${q.wait.toFixed(1)} min</div>
          </div>`).slice(0,5).join('')}
        </div>
      </div>
    </div>

    <!-- Satisfaction by category -->
    <div class="card">
      <div class="card-header"><span class="card-title">Fan Satisfaction Breakdown</span></div>
      <div class="card-body">
        ${[
          { cat: 'Seating & View', score: 4.8 },
          { cat: 'Food Quality', score: 4.3 },
          { cat: 'Wait Times', score: 3.9 },
          { cat: 'Security', score: 4.7 },
          { cat: 'Facilities', score: 4.5 },
          { cat: 'Overall', score: 4.6 },
        ].map(s=>`
        <div style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:12px">
            <span style="color:var(--text-muted)">${s.cat}</span>
            <span style="font-family:var(--font-mono);color:var(--accent)">${s.score}</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${(s.score/5)*100}%"></div></div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Comparison -->
    <div class="card">
      <div class="card-header"><span class="card-title">Event Comparison</span></div>
      <div class="card-body">
        <table class="data-table">
          <thead>
            <tr><th>Metric</th><th>Today</th><th>Avg</th></tr>
          </thead>
          <tbody>
            ${[
              { m: 'Avg Wait', t: '4.2m', a: '6.1m', better: true },
              { m: 'Incidents', t: '6', a: '9', better: true },
              { m: 'Satisfaction', t: '4.6', a: '4.3', better: true },
              { m: 'Occupancy', t: '96%', a: '88%', better: true },
              { m: 'Revenue', t: '₹2.1Cr', a: '₹1.8Cr', better: true },
            ].map(r=>`
            <tr>
              <td style="color:var(--text-muted)">${r.m}</td>
              <td style="font-family:var(--font-mono);color:var(--accent)">${r.t}</td>
              <td style="font-family:var(--font-mono);color:var(--text-muted)">${r.a}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>`;
}

function initAnalytics() {
  const fc = document.getElementById('ana-flow');
  if (fc) {
    fc.width = (fc.offsetWidth || 600) * (window.devicePixelRatio || 1);
    fc.height = 120 * (window.devicePixelRatio || 1);
    // Multi-colored flow
    const extData = [...DATA.hourlyOccupancy.slice(8), ...DATA.hourlyOccupancy.slice(0,8)];
    drawSparkline(fc, extData, '#00e5a0', true);
  }
  const gc = document.getElementById('ana-gates');
  if (gc) {
    gc.width = (gc.offsetWidth || 400) * (window.devicePixelRatio || 1);
    gc.height = 100 * (window.devicePixelRatio || 1);
    const colors = DATA.queues.map(q => q.wait > 6 ? 'rgba(255,77,109,0.6)' : q.wait > 3 ? 'rgba(255,209,102,0.6)' : 'rgba(0,229,160,0.5)');
    drawBarChart(gc, DATA.queues.map(q => ({ v: q.wait, label: '' })), colors);
  }
}
