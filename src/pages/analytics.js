// VenueIQ v3 - Analytics
function renderAnalytics(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">ANALYTICS</h1>
        <p class="page-subtitle">Event performance insights and operational intelligence</p>
      </div>
      <button class="btn btn-primary" onclick="trackFeature('export-report','click')" aria-label="Export analytics report">Export Report</button>
    </div>

    <div class="metrics-grid">
      <article class="metric-card" style="--accent-color:#00d4ff">
        <div class="metric-label">Overall Score</div>
        <div class="metric-value">87<small style="font-size:1rem">%</small></div>
        <div class="metric-delta up">▲ +4% vs last event</div>
      </article>
      <article class="metric-card" style="--accent-color:#00ff88">
        <div class="metric-label">NPS Score</div>
        <div class="metric-value">+68</div>
        <div class="metric-delta up">▲ Excellent</div>
      </article>
      <article class="metric-card" style="--accent-color:#ffd700">
        <div class="metric-label">Incident Rate</div>
        <div class="metric-value">0.4<small style="font-size:1rem">%</small></div>
        <div class="metric-delta up">▼ -0.2% vs avg</div>
      </article>
      <article class="metric-card" style="--accent-color:#7c3aed">
        <div class="metric-label">AI Accuracy</div>
        <div class="metric-value">94<small style="font-size:1rem">%</small></div>
        <div class="metric-delta up">▲ Predictions</div>
      </article>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Attendance Flow (Hourly)</h2>
        </div>
        <canvas id="attend-chart" height="100" aria-label="Hourly attendance flow chart"></canvas>
      </div>
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Fan Satisfaction Breakdown</h2>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px" role="list" aria-label="Satisfaction metrics">
          ${[
            {label:'Entry Experience', val:88, color:'#00d4ff'},
            {label:'Food & Beverage', val:76, color:'#ffd700'},
            {label:'Safety & Security', val:94, color:'#00ff88'},
            {label:'Navigation & Wayfinding', val:82, color:'#7c3aed'},
            {label:'Staff Helpfulness', val:91, color:'#00ff88'},
            {label:'Overall Experience', val:87, color:'#00d4ff'},
          ].map(s => `
            <div role="listitem" aria-label="${s.label}: ${s.val}%">
              <div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:3px">
                <span style="color:var(--text-secondary)">${s.label}</span>
                <span style="color:${s.color};font-family:var(--font-mono)">${s.val}%</span>
              </div>
              <div class="progress-bar" role="progressbar" aria-valuenow="${s.val}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-fill" style="width:${s.val}%;background:${s.color}"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="padded">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">AI-Generated Recommendations</h2>
          <span class="badge badge-cyan">◈ AI INSIGHTS</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px" role="list" aria-label="AI recommendations">
          ${[
            {icon:'🟢', title:'Deploy Gate C Staff Earlier', desc:'Opening Gate C 30 min earlier could reduce peak wait by 35%', impact:'High'},
            {icon:'🟡', title:'Optimize F2 Staff Rotation', desc:'Staggered breaks during halftime would improve throughput by 22%', impact:'Medium'},
            {icon:'🔵', title:'Expand East Concourse Capacity', desc:'Temporary barriers removal increases flow capacity by 18%', impact:'Medium'},
            {icon:'🟢', title:'Pre-Event Fan Companion Alerts', desc:'Push notifications reduce gate D congestion by 28% historically', impact:'High'},
          ].map(r => `
            <div style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:8px;padding:14px" role="listitem">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                <span style="font-size:0.82rem;font-weight:600">${r.icon} ${r.title}</span>
                <span class="badge ${r.impact==='High'?'badge-green':'badge-cyan'}" aria-label="${r.impact} impact">${r.impact}</span>
              </div>
              <p style="font-size:0.75rem;color:var(--text-muted);margin:0">${r.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    drawBarChart(document.getElementById('attend-chart'),
      ['16h','17h','18h','19h','20h','21h','22h','23h'],
      [12000, 28000, 45000, 67000, 73000, 72000, 68000, 41000], '#00d4ff');
  }, 50);
}
