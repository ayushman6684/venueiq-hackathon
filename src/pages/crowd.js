// ─── Crowd Flow Page ───────────────────────────────────────────
function renderCrowd() {
  return `
<div class="page-header">
  <div>
    <div class="page-title">CROWD FLOW</div>
    <div class="page-sub">Real-time movement tracking & predictive routing · AI-powered</div>
  </div>
  <div class="header-actions">
    <div class="live-chip"><div class="live-dot"></div> LIVE</div>
    <button class="btn btn-ghost">Export Map</button>
  </div>
</div>

<div class="page-body">
  <div class="grid-2" style="grid-template-columns:1.4fr 1fr">
    <!-- SVG Venue Map -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">Interactive Venue Map</span>
        <div style="display:flex;gap:8px">
          <button class="tab active" id="tab-density" onclick="setCrowdTab(this,'density')">Density</button>
          <button class="tab" id="tab-flow" onclick="setCrowdTab(this,'flow')">Flow Paths</button>
          <button class="tab" id="tab-exits" onclick="setCrowdTab(this,'exits')">Exit Routes</button>
        </div>
      </div>
      <div class="card-body" style="padding:0">
        <svg viewBox="0 0 600 420" style="width:100%;display:block;padding:20px" id="venue-svg">
          <!-- Stadium outline -->
          <ellipse cx="300" cy="210" rx="260" ry="185" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
          <!-- Field -->
          <ellipse cx="300" cy="210" rx="160" ry="115" fill="rgba(0,229,160,0.06)" stroke="rgba(0,229,160,0.2)" stroke-width="1"/>
          <ellipse cx="300" cy="210" rx="100" ry="72" fill="none" stroke="rgba(0,229,160,0.1)" stroke-width="1" stroke-dasharray="4 4"/>
          <text x="300" y="215" text-anchor="middle" fill="rgba(0,229,160,0.4)" font-size="12" font-family="Bebas Neue" letter-spacing="2">PITCH</text>
          
          <!-- North Stand -->
          <path d="M120 40 Q300 20 480 40 L460 90 Q300 75 140 90 Z" fill="rgba(255,77,109,0.25)" stroke="rgba(255,77,109,0.4)" stroke-width="1" class="zone-area" data-zone="North"/>
          <text x="300" y="62" text-anchor="middle" fill="rgba(232,237,243,0.7)" font-size="10" font-family="DM Sans" letter-spacing="1">NORTH STAND · 95%</text>

          <!-- South Stand -->
          <path d="M140 330 Q300 345 460 330 L480 380 Q300 400 120 380 Z" fill="rgba(255,77,109,0.25)" stroke="rgba(255,77,109,0.4)" stroke-width="1" class="zone-area" data-zone="South"/>
          <text x="300" y="362" text-anchor="middle" fill="rgba(232,237,243,0.7)" font-size="10" font-family="DM Sans" letter-spacing="1">SOUTH STAND · 95%</text>

          <!-- West Wing -->
          <path d="M40 110 L110 100 L110 320 L40 310 Z" fill="rgba(255,209,102,0.2)" stroke="rgba(255,209,102,0.4)" stroke-width="1" class="zone-area" data-zone="West"/>
          <text x="75" y="212" text-anchor="middle" fill="rgba(232,237,243,0.7)" font-size="9" font-family="DM Sans" transform="rotate(-90,75,212)">WEST · 99%</text>

          <!-- East Pavilion -->
          <path d="M490 100 L560 110 L560 310 L490 320 Z" fill="rgba(78,168,255,0.2)" stroke="rgba(78,168,255,0.4)" stroke-width="1" class="zone-area" data-zone="East"/>
          <text x="525" y="212" text-anchor="middle" fill="rgba(232,237,243,0.7)" font-size="9" font-family="DM Sans" transform="rotate(90,525,212)">EAST · 94%</text>

          <!-- Gate markers -->
          <circle cx="300" cy="28" r="7" fill="#ff4d6d" opacity="0.9" class="gate-dot" data-gate="A"/>
          <text x="300" y="16" text-anchor="middle" fill="rgba(232,237,243,0.6)" font-size="9" font-family="JetBrains Mono">Gate A</text>

          <circle cx="300" cy="393" r="7" fill="#ffd166" opacity="0.9" class="gate-dot" data-gate="B"/>
          <text x="300" y="408" text-anchor="middle" fill="rgba(232,237,243,0.6)" font-size="9" font-family="JetBrains Mono">Gate B</text>

          <circle cx="26" cy="210" r="7" fill="#00e5a0" opacity="0.9" class="gate-dot" data-gate="C"/>
          <text x="26" y="228" text-anchor="middle" fill="rgba(232,237,243,0.6)" font-size="9" font-family="JetBrains Mono">VIP</text>

          <circle cx="574" cy="210" r="7" fill="#ff4d6d" opacity="0.9" class="gate-dot" data-gate="D"/>
          <text x="574" y="228" text-anchor="middle" fill="rgba(232,237,243,0.6)" font-size="9" font-family="JetBrains Mono">Gate D</text>

          <!-- Flow arrows (animated) -->
          <g id="flow-arrows" style="display:none">
            <path d="M300 60 L300 95" stroke="#00e5a0" stroke-width="2" marker-end="url(#arr)" opacity="0.7" stroke-dasharray="4 2">
              <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="0.8s" repeatCount="indefinite"/>
            </path>
            <path d="M300 365 L300 330" stroke="#00e5a0" stroke-width="2" marker-end="url(#arr)" opacity="0.7" stroke-dasharray="4 2">
              <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="0.9s" repeatCount="indefinite"/>
            </path>
            <path d="M110 210 L140 210" stroke="#00e5a0" stroke-width="2" marker-end="url(#arr)" opacity="0.7" stroke-dasharray="4 2">
              <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1s" repeatCount="indefinite"/>
            </path>
            <path d="M490 210 L460 210" stroke="#00e5a0" stroke-width="2" marker-end="url(#arr)" opacity="0.7" stroke-dasharray="4 2">
              <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="0.7s" repeatCount="indefinite"/>
            </path>
          </g>

          <!-- Arrow marker -->
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M2 2L8 5L2 8" fill="none" stroke="#00e5a0" stroke-width="1.5"/>
            </marker>
          </defs>

          <!-- Hotspot pulsing (Gate D alert) -->
          <circle cx="574" cy="210" r="16" fill="none" stroke="#ff4d6d" stroke-width="1.5" opacity="0.6">
            <animate attributeName="r" values="12;22;12" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite"/>
          </circle>

          <!-- Concourse label -->
          <text x="175" y="200" fill="rgba(232,237,243,0.2)" font-size="9" font-family="DM Sans" letter-spacing="1">CONCOURSE</text>
          <text x="380" y="200" fill="rgba(232,237,243,0.2)" font-size="9" font-family="DM Sans" letter-spacing="1">CONCOURSE</text>
        </svg>
      </div>
    </div>

    <!-- Right panel -->
    <div style="display:flex;flex-direction:column;gap:14px">
      <!-- Crowd prediction -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Movement Prediction</span>
          <span class="tag tag-blue">AI Model</span>
        </div>
        <div class="card-body">
          <div style="font-size:13px;color:var(--text-muted);margin-bottom:12px">Predicted crowd surge in next 15 min:</div>
          ${[
            { zone: 'North Concourse', pct: 78, delta: '+340 pax' },
            { zone: 'Food Courts', pct: 65, delta: '+280 pax' },
            { zone: 'Exits (Gate D)', pct: 92, delta: 'OVERFLOW RISK', urgent: true },
            { zone: 'Merchandise', pct: 55, delta: '+120 pax' },
          ].map(p=>`
          <div style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="font-size:12px">${p.zone}</span>
              <span style="font-size:12px;color:${p.urgent ? 'var(--accent2)' : 'var(--text-muted)'}";font-family:var(--font-mono)>${p.delta}</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${p.pct}%;--fill-color:${p.pct>85?'#ff4d6d':p.pct>65?'#ffd166':'#00e5a0'}"></div></div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Recommended actions -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">AI Recommendations</span>
          <span class="tag tag-green">Auto-Generated</span>
        </div>
        <div class="card-body">
          ${[
            { icon: '→', text: 'Open Gate D-2 to split incoming crowd', priority: 'critical' },
            { icon: '📢', text: 'Broadcast PA: redirect fans to Gate A', priority: 'high' },
            { icon: '🚶', text: 'Deploy 3 stewards to North Concourse', priority: 'medium' },
            { icon: '🔓', text: 'Unlock West Corridor 3 for emergency flow', priority: 'medium' },
          ].map(r=>`
          <div style="display:flex;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)">
            <span style="font-size:16px;flex-shrink:0">${r.icon}</span>
            <div style="flex:1">
              <div style="font-size:12.5px">${r.text}</div>
              <span class="tag ${r.priority==='critical'?'tag-red':r.priority==='high'?'tag-yellow':'tag-blue'}" style="margin-top:4px">${r.priority}</span>
            </div>
            <button class="btn btn-ghost" style="padding:4px 10px;font-size:11px">Act</button>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function setCrowdTab(el, mode) {
  document.querySelectorAll('#tab-density, #tab-flow, #tab-exits').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const flowArrows = document.getElementById('flow-arrows');
  if (flowArrows) flowArrows.style.display = mode === 'flow' ? 'block' : 'none';
}

function initCrowd() {}
