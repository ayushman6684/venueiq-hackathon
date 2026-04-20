// ─── Queue Intelligence Page ───────────────────────────────────
function renderQueues() {
  return `
<div class="page-header">
  <div>
    <div class="page-title">QUEUE INTEL</div>
    <div class="page-sub">Real-time wait time monitoring across all entry & service points</div>
  </div>
  <div class="header-actions">
    <div class="live-chip"><div class="live-dot"></div> LIVE</div>
  </div>
</div>

<div class="page-body">
  <div class="grid-4" id="queue-metrics">
    ${[
      { label: 'Gates Open', value: '12/14', color: '#00e5a0' },
      { label: 'Avg Wait', value: DATA.metrics.avgWait.value.toFixed(1)+' min', color: '#ffd166' },
      { label: 'Peak Queue', value: 'Gate D', color: '#ff4d6d' },
      { label: 'Total Queuing', value: DATA.queues.reduce((s,q)=>s+q.length,0)+' pax', color: '#4ea8ff' },
    ].map(m=>`
    <div class="metric-card" style="--accent-color:${m.color}">
      <div class="metric-label">${m.label}</div>
      <div class="metric-value" style="font-size:28px">${m.value}</div>
    </div>`).join('')}
  </div>

  <div class="grid-2">
    <!-- Queue Table -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">All Queue Points</span>
        <span style="font-size:12px;color:var(--text-muted)">Auto-updates every 4s</span>
      </div>
      <div class="card-body" id="queue-table-body">
        ${renderQueueTable()}
      </div>
    </div>

    <!-- Queue Viz -->
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Wait Time Distribution</span>
        </div>
        <div class="card-body">
          <canvas id="queue-bar" width="400" height="100" style="width:100%;height:100px"></canvas>
          <div style="display:flex;justify-content:space-around;margin-top:6px">
            ${DATA.queues.map(q=>`<div style="font-size:9px;color:var(--text-muted);text-align:center">${q.gate.replace('Gate ','G')}</div>`).join('')}
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">Smart Routing Suggestions</span>
          <span class="tag tag-green">AI</span>
        </div>
        <div class="card-body">
          <div style="background:rgba(0,229,160,0.06);border:1px solid rgba(0,229,160,0.15);border-radius:var(--radius);padding:12px;margin-bottom:10px">
            <div style="font-size:12px;font-weight:500;margin-bottom:4px">Fan in South Stand → Food</div>
            <div style="font-size:12px;color:var(--text-muted)">Recommended: <strong style="color:var(--accent)">Stand 3A</strong> (2.1 min wait) instead of FC1 (7.5 min wait). Save 5.4 min.</div>
          </div>
          <div style="background:rgba(255,209,102,0.06);border:1px solid rgba(255,209,102,0.15);border-radius:var(--radius);padding:12px;margin-bottom:10px">
            <div style="font-size:12px;font-weight:500;margin-bottom:4px">Exit Route — End of Match</div>
            <div style="font-size:12px;color:var(--text-muted)">Recommend <strong style="color:var(--accent3)">Gate A & C</strong> for North fans. Gate D at capacity.</div>
          </div>
          <div style="background:rgba(78,168,255,0.06);border:1px solid rgba(78,168,255,0.15);border-radius:var(--radius);padding:12px">
            <div style="font-size:12px;font-weight:500;margin-bottom:4px">Merchandise Rush Expected</div>
            <div style="font-size:12px;color:var(--text-muted)">Open additional counter at Stand M2. Current queue: 180 pax, 9.2 min wait.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function renderQueueTable() {
  return DATA.queues.map(q => `
  <div class="queue-item">
    <div>
      <div class="queue-name">${q.gate} <span class="status-dot ${q.alert ? 'red' : q.trend==='up' ? 'yellow' : 'green'}" style="margin-left:6px"></span></div>
      <div class="queue-sub">${q.location}</div>
    </div>
    <div class="queue-wait">${q.wait.toFixed(1)} min</div>
    <div>
      <div class="progress-bar" style="width:80px">
        <div class="progress-fill" style="width:${Math.min(100,q.length/2)}%;--fill-color:${q.alert ? '#ff4d6d' : q.wait > 4 ? '#ffd166' : '#00e5a0'}"></div>
      </div>
      <div style="font-size:10px;color:var(--text-muted);margin-top:2px;text-align:center">${q.length} pax</div>
    </div>
  </div>`).join('');
}

function initQueues() {
  // Bar chart
  const bc = document.getElementById('queue-bar');
  if (bc) {
    bc.width = (bc.offsetWidth || 400) * (window.devicePixelRatio || 1);
    bc.height = 100 * (window.devicePixelRatio || 1);
    const colors = DATA.queues.map(q => q.alert ? 'rgba(255,77,109,0.6)' : q.wait > 4 ? 'rgba(255,209,102,0.6)' : 'rgba(0,229,160,0.4)');
    drawBarChart(bc, DATA.queues.map(q => ({ v: q.wait, label: '' })), colors);
  }

  // Live update
  window._queueInterval = setInterval(() => {
    const tbody = document.getElementById('queue-table-body');
    if (tbody) tbody.innerHTML = renderQueueTable();
    if (bc) {
      const colors = DATA.queues.map(q => q.alert ? 'rgba(255,77,109,0.6)' : q.wait > 4 ? 'rgba(255,209,102,0.6)' : 'rgba(0,229,160,0.4)');
      drawBarChart(bc, DATA.queues.map(q => ({ v: q.wait, label: '' })), colors);
    }
  }, 4000);
}
