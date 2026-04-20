// ─── Concessions Page ─────────────────────────────────────────
function renderConcessions() {
  return `
<div class="page-header">
  <div>
    <div class="page-title">CONCESSIONS</div>
    <div class="page-sub">Inventory intelligence, demand forecasting & staff coordination</div>
  </div>
  <div class="header-actions">
    <div class="live-chip"><div class="live-dot"></div> LIVE</div>
    <button class="btn btn-ghost">Reorder All Low</button>
    <button class="btn btn-accent">Print Report</button>
  </div>
</div>

<div class="page-body">
  <div class="grid-4">
    ${[
      { label: 'STANDS ACTIVE', value: '24/26', color: '#00e5a0' },
      { label: 'LOW STOCK ITEMS', value: '3', color: '#ff4d6d' },
      { label: 'AVG QUEUE', value: '3.4 min', color: '#ffd166' },
      { label: 'TRANSACTIONS/HR', value: '4,280', color: '#4ea8ff' },
    ].map(m=>`
    <div class="metric-card" style="--accent-color:${m.color}">
      <div class="metric-label">${m.label}</div>
      <div class="metric-value" style="font-size:26px">${m.value}</div>
    </div>`).join('')}
  </div>

  <div class="grid-2">
    <!-- Item list -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">Menu Inventory Status</span>
        <div style="display:flex;gap:6px">
          <button class="tab active" style="font-size:11px;padding:4px 10px" onclick="filterConcessions(this,'all')">All</button>
          <button class="tab" style="font-size:11px;padding:4px 10px" onclick="filterConcessions(this,'low')">Low Stock</button>
          <button class="tab" style="font-size:11px;padding:4px 10px" onclick="filterConcessions(this,'hot')">Hot Items</button>
        </div>
      </div>
      <div class="card-body" id="concession-list">
        ${renderConcessionList('all')}
      </div>
    </div>

    <!-- Demand forecast + Stand map -->
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Halftime Demand Forecast</span>
          <span class="tag tag-yellow">In 8 min</span>
        </div>
        <div class="card-body">
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Expected surge at halftime based on historical + current attendance:</div>
          ${[
            { item: 'Cold Drinks', surge: '+340%', units: 820 },
            { item: 'Snacks (Popcorn, Samosa)', surge: '+280%', units: 640 },
            { item: 'Biryani / Hot Food', surge: '+180%', units: 340 },
            { item: 'Ice Cream', surge: '+120%', units: 290 },
          ].map(f=>`
          <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
            <div style="flex:1;font-size:13px">${f.item}</div>
            <div style="font-size:12px;font-family:var(--font-mono);color:var(--accent3)">${f.surge}</div>
            <div style="font-size:11px;color:var(--text-muted)">${f.units} units</div>
          </div>`).join('')}
          <div style="margin-top:12px;padding:10px;background:rgba(0,229,160,0.06);border:1px solid rgba(0,229,160,0.15);border-radius:var(--radius);font-size:12px">
            ✦ <strong>AI Action:</strong> Pre-positioning 2 cold drink carts at North and South concourse. Alerting kitchen to start samosa batch now.
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">Stand Performance</span>
        </div>
        <div class="card-body">
          <table class="data-table">
            <thead>
              <tr>
                <th>Stand</th>
                <th>Revenue</th>
                <th>Txns</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${[
                { stand: 'Stand 3A', rev: '₹24,800', txns: 620, status: 'active' },
                { stand: 'Food Court 1', rev: '₹18,400', txns: 460, status: 'busy' },
                { stand: 'Food Court 2', rev: '₹21,600', txns: 540, status: 'active' },
                { stand: 'Stand 7C', rev: '₹9,600', txns: 240, status: 'active' },
                { stand: 'Merchandise', rev: '₹44,200', txns: 221, status: 'busy' },
              ].map(s=>`
              <tr>
                <td>${s.stand}</td>
                <td style="font-family:var(--font-mono);color:var(--accent)">${s.rev}</td>
                <td style="font-family:var(--font-mono)">${s.txns}</td>
                <td><span class="tag ${s.status==='busy'?'tag-yellow':'tag-green'}">${s.status}</span></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function renderConcessionList(filter) {
  let items = DATA.concessions;
  if (filter === 'low') items = items.filter(i => i.stock < 30);
  if (filter === 'hot') items = items.filter(i => i.hot);
  return items.map(i => `
  <div class="concession-item">
    <div class="concession-emoji">${i.emoji}</div>
    <div style="flex:1">
      <div class="concession-name">${i.name}</div>
      <div class="concession-meta">${i.stand} · ₹${i.price} · ${i.waitMin} min wait</div>
    </div>
    <div class="concession-stock" style="color:${i.stock<20?'var(--accent2)':i.stock<50?'var(--accent3)':'var(--accent)'}">
      ${i.stock}%
    </div>
    <div style="margin-left:8px">
      <div class="progress-bar" style="width:40px">
        <div class="progress-fill" style="width:${i.stock}%;--fill-color:${i.stock<20?'#ff4d6d':i.stock<50?'#ffd166':'#00e5a0'}"></div>
      </div>
    </div>
  </div>`).join('');
}

function filterConcessions(el, filter) {
  document.querySelectorAll('.card-header .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const list = document.getElementById('concession-list');
  if (list) list.innerHTML = renderConcessionList(filter);
}

function initConcessions() {}
