// ─── Fan Companion Page ───────────────────────────────────────
function renderCompanion() {
  return `
<div class="page-header">
  <div>
    <div class="page-title">FAN COMPANION</div>
    <div class="page-sub">AI-powered personal assistant for every attendee · Mobile-first</div>
  </div>
  <div class="header-actions">
    <div class="live-chip"><div class="live-dot"></div> LIVE</div>
    <button class="btn btn-ghost">Preview App</button>
  </div>
</div>

<div class="page-body">
  <div class="grid-2" style="grid-template-columns:1fr 1.5fr">
    <!-- Phone mockup -->
    <div class="card">
      <div class="card-header"><span class="card-title">Fan App — My Match</span></div>
      <div class="card-body">
        <div class="companion-phone">
          <!-- Event header -->
          <div class="companion-header">
            <div style="font-size:12px;opacity:0.7;margin-bottom:2px">🏏 IPL FINALS · LIVE</div>
            <div style="font-size:15px">MI vs CSK · 18.2 ov · 156/4</div>
            <div style="font-size:11px;opacity:0.7;margin-top:4px">Seat: Block N12 · Row G · Seat 24</div>
          </div>

          <!-- Quick Actions -->
          <div class="quick-action-grid">
            <div class="quick-action" onclick="fanAction('food')">
              <div class="quick-action-icon">🍔</div>
              <div style="font-size:12px;font-weight:500">Order Food</div>
              <div class="quick-action-label">2.1 min nearest</div>
            </div>
            <div class="quick-action" onclick="fanAction('route')">
              <div class="quick-action-icon">🗺️</div>
              <div style="font-size:12px;font-weight:500">Best Route</div>
              <div class="quick-action-label">Exit guidance</div>
            </div>
            <div class="quick-action" onclick="fanAction('toilet')">
              <div class="quick-action-icon">🚻</div>
              <div style="font-size:12px;font-weight:500">Washrooms</div>
              <div class="quick-action-label">0 min wait</div>
            </div>
            <div class="quick-action" onclick="fanAction('merch')">
              <div class="quick-action-icon">👕</div>
              <div style="font-size:12px;font-weight:500">Merchandise</div>
              <div class="quick-action-label">Stand 4B</div>
            </div>
          </div>

          <!-- AI Assistant -->
          <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:12px">
            <div style="font-size:10px;letter-spacing:1.5px;color:var(--accent);margin-bottom:8px;font-weight:500">✦ VENUE AI</div>
            <div id="companion-chat">
              <div class="chat-msg ai">
                <div class="chat-bubble">Hey! Halftime is in <strong>8 min</strong>. I'd head to Food Court 2 now — only 3 min wait vs 8 min after break. Want me to pre-order? 🍿</div>
              </div>
            </div>
            <div class="chat-input-row">
              <input class="chat-input" id="fan-input" placeholder="Ask me anything..." onkeypress="fanChat(event)"/>
              <button class="btn btn-accent" style="padding:8px 12px" onclick="fanChatSend()">→</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fan services panel -->
    <div style="display:flex;flex-direction:column;gap:14px">
      <!-- Notifications sent -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Live Fan Notifications</span>
          <span style="font-size:12px;color:var(--text-muted)">Sent to 63,400 fans</span>
        </div>
        <div class="card-body">
          ${[
            { icon: '⏱', msg: 'Halftime in 8 minutes — head to concessions now to beat the rush!', time: '2 min ago', reach: '63.4k' },
            { icon: '🅿', msg: 'Parking Lot C nearly full. Lot A has space — navigate →', time: '11 min ago', reach: '4.2k' },
            { icon: '🌧', msg: 'Light drizzle expected at 21:30. Covered areas are open on Level 1.', time: '18 min ago', reach: '63.4k' },
            { icon: '🍔', msg: 'Shortest food queue right now: Stand 3A (Vada Pav) — 2 min wait', time: '22 min ago', reach: '12.1k' },
          ].map(n => `
          <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)">
            <div style="font-size:18px;flex-shrink:0">${n.icon}</div>
            <div style="flex:1">
              <div style="font-size:12.5px;line-height:1.4">${n.msg}</div>
              <div style="display:flex;gap:10px;margin-top:4px">
                <span style="font-size:10px;color:var(--text-dim)">${n.time}</span>
                <span style="font-size:10px;color:var(--accent)">↗ ${n.reach} fans</span>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Fan feedback -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Live Sentiment</span>
          <span class="tag tag-green">4.6 / 5 avg</span>
        </div>
        <div class="card-body">
          <div class="grid-2" style="gap:10px;margin-bottom:14px">
            ${[
              { label: 'Food & Bev', score: 4.2, color: '#00e5a0' },
              { label: 'Seating', score: 4.8, color: '#4ea8ff' },
              { label: 'Queues', score: 3.9, color: '#ffd166' },
              { label: 'Facilities', score: 4.5, color: '#00e5a0' },
            ].map(s=>`
            <div style="display:flex;flex-direction:column;gap:4px">
              <div style="display:flex;justify-content:space-between;font-size:12px">
                <span style="color:var(--text-muted)">${s.label}</span>
                <span style="color:${s.color};font-family:var(--font-mono)">${s.score}</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width:${(s.score/5)*100}%;--fill-color:${s.color}"></div></div>
            </div>`).join('')}
          </div>
          <div style="font-size:11px;color:var(--text-muted)">Based on 4,821 real-time responses · Last 30 min</div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function fanAction(type) {
  const responses = {
    food: 'Nearest open food point: <strong>Stand 3A (Vada Pav) — 2.1 min wait</strong>. Tap to get directions from your seat!',
    route: 'Best exit from Block N12: <strong>Gate A</strong> — 0.8 min walk, currently 2 min wait. Avoid Gate D (overcrowded).',
    toilet: 'Nearest washroom: <strong>Level 1, North Wing</strong> — 0 min wait! Level 2 West is also open.',
    merch: 'Merchandise at <strong>Stand 4B</strong> — 9 min wait ⚠️. Try <strong>Stand 4A</strong> (3 min wait, same items).',
  };
  addChatMsg('ai', responses[type]);
}

function fanChat(e) { if (e.key === 'Enter') fanChatSend(); }

function fanChatSend() {
  const input = document.getElementById('fan-input');
  const val = input?.value.trim();
  if (!val) return;
  addChatMsg('user', val);
  input.value = '';
  setTimeout(() => {
    addChatMsg('ai', 'Great question! Based on current venue data, I recommend checking <strong>Food Court 2</strong> — it\'s the least busy right now with a 3.1 min wait. Shall I give you directions from your seat?');
  }, 900);
}

function addChatMsg(role, text) {
  const chat = document.getElementById('companion-chat');
  if (!chat) return;
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = `<div class="chat-bubble">${text}</div>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function initCompanion() {}
