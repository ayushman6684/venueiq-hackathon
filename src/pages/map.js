// VenueIQ v3 - Venue Map (Google Maps integration)
function renderMap(container) {
  // Jawaharlal Nehru Stadium, New Delhi coords
  const lat = 28.5665, lng = 77.2431;

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">VENUE MAP</h1>
        <p class="page-subtitle">Live venue location and surrounding area — powered by Google Maps</p>
      </div>
      <span class="badge badge-google" aria-label="Powered by Google Maps">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        Google Maps
      </span>
    </div>

    <div class="metrics-grid">
      <article class="metric-card" style="--accent-color:#4285f4">
        <div class="metric-label">Venue</div>
        <div style="font-family:var(--font-heading);font-size:1rem;font-weight:700;color:#4285f4">JLN Stadium</div>
        <div class="metric-delta neutral">New Delhi, India</div>
      </article>
      <article class="metric-card" style="--accent-color:#00ff88">
        <div class="metric-label">Nearby Metro</div>
        <div style="font-family:var(--font-heading);font-size:1rem;font-weight:700;color:var(--accent-green)">JLN Metro</div>
        <div class="metric-delta up">● 200m away</div>
      </article>
      <article class="metric-card" style="--accent-color:#ffd700">
        <div class="metric-label">Parking Lots</div>
        <div class="metric-value">4</div>
        <div class="metric-delta neutral">● Available nearby</div>
      </article>
      <article class="metric-card" style="--accent-color:#ff6b35">
        <div class="metric-label">Traffic Status</div>
        <div style="font-family:var(--font-heading);font-size:1rem;font-weight:700;color:var(--accent-orange)">Moderate</div>
        <div class="metric-delta down">▲ Heavy post-event</div>
      </article>
    </div>

    <div class="padded">
      <div class="card" style="padding:0;overflow:hidden">
        <div style="padding:12px 18px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
          <h2 class="card-title" style="margin:0">Live Venue Location</h2>
          <a href="https://maps.google.com/?q=Jawaharlal+Nehru+Stadium+New+Delhi" 
             target="_blank" rel="noopener noreferrer"
             class="btn btn-ghost" style="padding:5px 12px;font-size:0.72rem;text-decoration:none"
             aria-label="Open in Google Maps (opens new tab)">
            Open in Google Maps ↗
          </a>
        </div>
        <div style="position:relative">
          <iframe
            title="Jawaharlal Nehru Stadium location on Google Maps"
            width="100%"
            height="400"
            style="border:0;display:block"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.117!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3b7a77ed2e9%3A0xaf92fe0fd92cde76!2sJawaharlal%20Nehru%20Stadium!5e0!3m2!1sen!2sin!4v1234567890"
            aria-label="Google Maps showing Jawaharlal Nehru Stadium location"
          ></iframe>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Parking Status</h2>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px" role="list" aria-label="Parking lot availability">
          ${[
            {name:'Lot A — West Gate', avail:38, total:500, dist:'100m'},
            {name:'Lot B — North Gate', avail:142, total:400, dist:'250m'},
            {name:'Lot C — South Gate', avail:87, total:350, dist:'400m'},
            {name:'Lot D — External', avail:215, total:600, dist:'800m'},
          ].map(p => `
            <div style="background:var(--bg-secondary);border-radius:6px;padding:10px" role="listitem" aria-label="${p.name}: ${p.avail} spaces available, ${p.dist} away">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                <span style="font-size:0.8rem;font-weight:500">${p.name}</span>
                <span style="font-size:0.72rem;color:var(--text-muted)">${p.dist}</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
                <div class="progress-bar" style="flex:1" role="progressbar" aria-valuenow="${Math.round((p.total-p.avail)/p.total*100)}" aria-valuemin="0" aria-valuemax="100">
                  <div class="progress-fill" style="width:${Math.round((p.total-p.avail)/p.total*100)}%;background:${p.avail<50?'var(--accent-red)':p.avail<150?'var(--accent-yellow)':'var(--accent-green)'}"></div>
                </div>
                <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--accent-cyan)">${p.avail} free</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Transport Options</h2>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px" role="list" aria-label="Transport options">
          ${[
            {icon:'🚇', name:'Metro — JLN Stadium Station', detail:'200m walk · Blue Line · Every 5 min', color:'#4285f4'},
            {icon:'🚌', name:'Bus Routes 423, 181, 552', detail:'North Gate stop · Frequent service', color:'#34a853'},
            {icon:'🚕', name:'Auto/Cab Pickup Zone', detail:'West Gate, Gate E, Gate H', color:'#ffd700'},
            {icon:'🚲', name:'Cycle Parking', detail:'200 stands at Gates A, C, E', color:'#00ff88'},
          ].map(t => `
            <div style="display:flex;gap:12px;align-items:center;padding:10px;background:var(--bg-secondary);border-radius:6px" role="listitem" aria-label="${t.name}">
              <span style="font-size:1.4rem" aria-hidden="true">${t.icon}</span>
              <div>
                <div style="font-size:0.82rem;font-weight:500;color:${t.color}">${t.name}</div>
                <div style="font-size:0.72rem;color:var(--text-muted)">${t.detail}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
