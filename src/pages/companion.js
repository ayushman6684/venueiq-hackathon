// VenueIQ v3 - Fan Companion
function renderCompanion(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">FAN COMPANION</h1>
        <p class="page-subtitle">AI-powered assistant for every fan — available 24/7</p>
      </div>
      <span class="badge badge-cyan" aria-label="AI powered assistant">◈ AI ACTIVE</span>
    </div>

    <div class="grid-2">
      <div class="card" style="display:flex;flex-direction:column;height:500px">
        <div class="card-header">
          <h2 class="card-title">Ask VenueIQ AI</h2>
          <span class="badge badge-green">● Online</span>
        </div>
        <div class="chat-messages" id="chat-messages" role="log" aria-label="Chat conversation" aria-live="polite" aria-relevant="additions">
          <div class="chat-msg bot" role="article" aria-label="VenueIQ assistant message">
            👋 Hi! I'm your VenueIQ assistant. I can help with directions, queue times, food options, parking, and more!<br><br>
            Try asking: <em>"nearest washroom"</em>, <em>"food wait times"</em>, or <em>"best exit"</em>
          </div>
        </div>
        <div class="chat-input-row">
          <label for="chat-input" class="sr-only">Type your question</label>
          <input type="text" id="chat-input" class="chat-input" placeholder="Ask about food, exits, parking..." 
                 aria-label="Type your question to VenueIQ assistant"
                 onkeypress="if(event.key==='Enter')sendMessage()" />
          <button class="btn btn-primary" onclick="sendMessage()" aria-label="Send message">Send</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Quick Actions</h2>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px" role="group" aria-label="Quick question buttons">
            ${['🚻 Washroom', '🍔 Food Times', '🅿️ Parking', '🚪 Best Exit', '📶 WiFi Info', '💺 My Seat'].map(q => `
              <button class="btn btn-ghost" style="justify-content:center;padding:10px" 
                      onclick="quickAsk('${q}')" 
                      aria-label="Ask about ${q.replace(/[^\w\s]/g, '')}">${q}</button>
            `).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Fan Stats (Today)</h2>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${[
              {label:'Queries Answered', val:'4,823', color:'var(--accent-cyan)'},
              {label:'Avg Response Time', val:'0.3s', color:'var(--accent-green)'},
              {label:'Fan Satisfaction', val:'98.2%', color:'var(--accent-yellow)'},
              {label:'Reroutes Suggested', val:'1,247', color:'var(--accent-orange)'},
            ].map(s => `
              <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
                <span style="font-size:0.8rem;color:var(--text-secondary)">${s.label}</span>
                <span style="font-family:var(--font-mono);font-size:0.82rem;color:${s.color}">${s.val}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <style>
      .sr-only { position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0; }
    </style>
  `;
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');
  if (!input || !messages || !input.value.trim()) return;

  const userText = input.value.trim();
  trackFeature('fan-companion-query', 'message');

  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.setAttribute('role', 'article');
  userMsg.setAttribute('aria-label', 'Your message');
  userMsg.textContent = userText;
  messages.appendChild(userMsg);
  input.value = '';

  // Typing indicator
  const typing = document.createElement('div');
  typing.className = 'chat-msg bot';
  typing.id = 'typing';
  typing.setAttribute('aria-label', 'VenueIQ is typing');
  typing.innerHTML = '<em style="color:var(--text-muted)">◌ Thinking...</em>';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;

  // Get response
  setTimeout(() => {
    typing.remove();
    const response = getBotResponse(userText.toLowerCase());
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg bot';
    botMsg.setAttribute('role', 'article');
    botMsg.setAttribute('aria-label', 'VenueIQ assistant response');
    botMsg.innerHTML = response.replace(/\n/g, '<br>');
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 600 + Math.random() * 400);
}

function getBotResponse(text) {
  const r = VenueData.botResponses;
  if (text.includes('wash') || text.includes('toilet') || text.includes('restroom')) return r['nearest washroom'];
  if (text.includes('food') || text.includes('eat') || text.includes('hungry')) return r['food'];
  if (text.includes('park')) return r['parking'];
  if (text.includes('exit') || text.includes('leave') || text.includes('out')) return r['exit'];
  if (text.includes('wait') || text.includes('queue') || text.includes('line')) return r['wait'];
  if (text.includes('seat') || text.includes('block') || text.includes('section')) return r['seat'];
  if (text.includes('wifi') || text.includes('internet') || text.includes('connect')) return r['wifi'];
  if (text.includes('help') || text.includes('what')) return r['help'];
  return r['default'];
}

function quickAsk(q) {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = q.replace(/[^\w\s]/g, '').trim();
    sendMessage();
  }
}
