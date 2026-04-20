// VenueIQ v3 - Concessions
function renderConcessions(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">CONCESSIONS</h1>
        <p class="page-subtitle">Inventory tracking and demand forecasting</p>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <span class="badge badge-orange" aria-label="Halftime in 18 minutes">⚠ HALFTIME IN 18 MIN</span>
      </div>
    </div>

    <div class="metrics-grid">
      <article class="metric-card" style="--accent-color:#00ff88">
        <div class="metric-label">Total Revenue</div>
        <div class="metric-value">₹2.8L</div>
        <div class="metric-delta up">▲ +12% vs forecast</div>
      </article>
      <article class="metric-card" style="--accent-color:#ff3366">
        <div class="metric-label">Low Stock Items</div>
        <div class="metric-value">2</div>
        <div class="metric-delta down">▲ Restock needed</div>
      </article>
      <article class="metric-card" style="--accent-color:#ffd700">
        <div class="metric-label">Items Sold</div>
        <div class="metric-value">10.2k</div>
        <div class="metric-delta up">▲ High demand</div>
      </article>
      <article class="metric-card" style="--accent-color:#7c3aed">
        <div class="metric-label">Halftime Forecast</div>
        <div class="metric-value">+180%</div>
        <div class="metric-delta down">▲ Prepare now</div>
      </article>
    </div>

    <div class="padded">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Inventory Status</h2>
          <button class="btn btn-primary" style="padding:5px 12px;font-size:0.72rem" aria-label="Auto-reorder low stock items">Auto-Reorder Low Stock</button>
        </div>
        <table class="data-table" role="table" aria-label="Concession inventory">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Stock %</th>
              <th scope="col">Sold</th>
              <th scope="col">Revenue</th>
              <th scope="col">Demand</th>
              <th scope="col">Trend</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            ${VenueData.concessions.map(c => `
              <tr>
                <td style="font-weight:500">${c.name}</td>
                <td>
                  <div style="display:flex;align-items:center;gap:8px">
                    <div class="progress-bar" style="width:70px" role="progressbar" aria-valuenow="${c.stock}" aria-valuemin="0" aria-valuemax="100" aria-label="${c.stock}% stock remaining">
                      <div class="progress-fill" style="width:${c.stock}%;background:${c.stock<40?'var(--accent-red)':c.stock<60?'var(--accent-yellow)':'var(--accent-green)'}"></div>
                    </div>
                    <span style="font-family:var(--font-mono);font-size:0.75rem;color:${c.stock<40?'var(--accent-red)':c.stock<60?'var(--accent-yellow)':'var(--accent-green)'}">${c.stock}%</span>
                  </div>
                </td>
                <td style="font-family:var(--font-mono);font-size:0.78rem">${c.sold.toLocaleString()}</td>
                <td style="font-family:var(--font-mono);font-size:0.78rem;color:var(--accent-green)">₹${(c.revenue/1000).toFixed(1)}k</td>
                <td><span class="badge ${c.demand==='critical'?'badge-red':c.demand==='high'?'badge-orange':c.demand==='medium'?'badge-yellow':'badge-cyan'}">${c.demand.toUpperCase()}</span></td>
                <td style="color:${c.trend==='up'?'var(--accent-green)':c.trend==='down'?'var(--accent-red)':'var(--text-muted)'}">
                  ${c.trend === 'up' ? '▲' : c.trend === 'down' ? '▼' : '●'}
                </td>
                <td>
                  ${c.stock < 40 ? `<button class="btn btn-danger" style="padding:3px 8px;font-size:0.68rem" aria-label="Reorder ${c.name} urgently">Reorder!</button>` : 
                    `<button class="btn btn-ghost" style="padding:3px 8px;font-size:0.68rem" aria-label="Manage ${c.name}">Manage</button>`}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="padded">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Halftime Demand Forecast</h2>
          <span class="badge badge-orange">AI PREDICTION</span>
        </div>
        <canvas id="forecast-chart" height="90" aria-label="Halftime demand forecast by item"></canvas>
      </div>
    </div>
  `;

  setTimeout(() => {
    drawBarChart(document.getElementById('forecast-chart'),
      ['Beer','Hotdog','Drink','Burger','Pizza','Water'],
      [95, 78, 82, 65, 58, 70], '#ff6b35');
  }, 50);
}
