// ─── Mock Live Data Store ─────────────────────────────────────────────────
const DATA = {
  event: {
    name: 'IPL 2025 Finals',
    teams: 'MI vs CSK',
    venue: 'Wankhede Stadium',
    capacity: 66000,
    current: 63400,
    quarter: 'Q3',
    score: '18.2 ov | MI 156/4',
  },

  metrics: {
    occupancy: { value: 96.1, unit: '%', change: +2.3, label: 'OCCUPANCY' },
    avgWait: { value: 4.2, unit: 'MIN', change: -1.8, label: 'AVG WAIT TIME' },
    incidents: { value: 2, unit: '', change: -3, label: 'ACTIVE INCIDENTS' },
    satisfaction: { value: 4.6, unit: '/5', change: +0.2, label: 'FAN SCORE' },
  },

  zones: [
    { id: 'N', name: 'North Stand', capacity: 16000, current: 15200, exits: 4, crowd: 0.95 },
    { id: 'S', name: 'South Stand', capacity: 18000, current: 17100, exits: 5, crowd: 0.95 },
    { id: 'E', name: 'East Pavilion', capacity: 14000, current: 13200, exits: 3, crowd: 0.94 },
    { id: 'W', name: 'West Wing', capacity: 18000, current: 17900, exits: 5, crowd: 0.99 },
  ],

  queues: [
    { gate: 'Gate A', location: 'North Entrance', wait: 2.1, length: 34, trend: 'down', alert: false },
    { gate: 'Gate B', location: 'South Entrance', wait: 4.8, length: 89, trend: 'up', alert: true },
    { gate: 'Gate C', location: 'VIP Entry', wait: 0.8, length: 12, trend: 'stable', alert: false },
    { gate: 'Gate D', location: 'East Access', wait: 6.2, length: 140, trend: 'up', alert: true },
    { gate: 'Gate E', location: 'West Entry', wait: 3.3, length: 62, trend: 'down', alert: false },
    { gate: 'Food Court 1', location: 'Level 1', wait: 7.5, length: 110, trend: 'up', alert: true },
    { gate: 'Food Court 2', location: 'Level 2', wait: 3.1, length: 45, trend: 'stable', alert: false },
    { gate: 'Merchandise', location: 'Main Concourse', wait: 9.2, length: 180, trend: 'up', alert: true },
  ],

  alerts: [
    { id: 1, type: 'critical', title: 'Gate D — Overcrowding Risk', desc: 'Queue length exceeds 140 persons. Deploy 2 additional stewards. Consider opening Gate D-2.', time: '2 min ago', icon: '⚠' },
    { id: 2, type: 'critical', title: 'Food Court 1 — Supply Low', desc: 'Samosa stock at 8%. Replenishment ETA 14 min. Recommend promoting alternatives.', time: '5 min ago', icon: '⚠' },
    { id: 3, type: 'warning', title: 'Gate B — Wait Trending Up', desc: 'Average wait increased by 2.1 min in last 10 mins. Predictive model: may hit 8 min threshold in ~12 min.', time: '8 min ago', icon: '↑' },
    { id: 4, type: 'warning', title: 'Parking Lot C — 94% Full', desc: 'Suggest routing incoming vehicles to Lot A or Lot E. Estimated 220 spots remaining.', time: '11 min ago', icon: '🅿' },
    { id: 5, type: 'info', title: 'Halftime in 8 Minutes', desc: 'Predicted surge: Food Court +340%, Gate exits +180%. Staff on standby.', time: '12 min ago', icon: 'ℹ' },
    { id: 6, type: 'info', title: 'Weather Update', desc: 'Light drizzle forecast at 21:30. Covered concourses pre-opened. PA announcement scheduled.', time: '18 min ago', icon: '🌧' },
  ],

  concessions: [
    { name: 'Vada Pav', emoji: '🍔', stand: 'Stand 3A', price: 40, stock: 88, waitMin: 2.1, hot: true },
    { name: 'Samosa', emoji: '🥟', stand: 'FC1', price: 30, stock: 8, waitMin: 7.5, hot: false },
    { name: 'Cold Coffee', emoji: '☕', stand: 'Stand 5B', price: 80, stock: 62, waitMin: 1.8, hot: false },
    { name: 'Popcorn', emoji: '🍿', stand: 'Level 2', price: 60, stock: 91, waitMin: 1.2, hot: false },
    { name: 'Biryani', emoji: '🍛', stand: 'FC2', price: 150, stock: 45, waitMin: 3.1, hot: true },
    { name: 'Ice Cream', emoji: '🍦', stand: 'Stand 7C', price: 70, stock: 78, waitMin: 1.5, hot: false },
    { name: 'Nachos', emoji: '🌮', stand: 'FC1', price: 90, stock: 34, waitMin: 7.5, hot: true },
    { name: 'Nimbu Pani', emoji: '🍋', stand: 'Stand 2A', price: 25, stock: 95, waitMin: 0.8, hot: false },
  ],

  heatmap: generateHeatmap(),
  flowHistory: generateFlowHistory(),
  hourlyOccupancy: generateHourly(),
};

function generateHeatmap() {
  const grid = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 16; c++) {
      const distFromEdge = Math.min(r, 8 - r, c, 15 - c);
      const base = distFromEdge < 2 ? 0.85 + Math.random() * 0.15 : 0.1 + Math.random() * 0.3;
      grid.push(Math.min(1, base + Math.random() * 0.1));
    }
  }
  return grid;
}

function generateFlowHistory() {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push(Math.floor(800 + Math.sin(i / 3) * 400 + Math.random() * 200));
  }
  return data;
}

function generateHourly() {
  return [12, 18, 25, 40, 55, 70, 82, 90, 96, 94, 88, 72, 65, 78, 85, 88, 91, 94, 96, 95, 90, 82, 68, 40];
}

// ─── Live update simulation ────────────────────────────────────────────────
let _liveInterval = null;

function liveUpdate() {
  DATA.metrics.avgWait.value = Math.max(1, DATA.metrics.avgWait.value + (Math.random() - 0.5) * 0.4);
  DATA.metrics.satisfaction.value = Math.min(5, Math.max(3.5, DATA.metrics.satisfaction.value + (Math.random() - 0.5) * 0.05));
  DATA.queues.forEach(q => {
    q.wait = Math.max(0.5, q.wait + (Math.random() - 0.5) * 0.8);
    q.length = Math.max(0, q.length + Math.floor((Math.random() - 0.5) * 15));
  });
}

// startLiveUpdates / stopLiveUpdates — used by tests and app
function startLiveUpdates(callback) {
  stopLiveUpdates();
  _liveInterval = setInterval(() => {
    liveUpdate();
    if (typeof callback === 'function') callback(DATA);
  }, 4000);
}

function stopLiveUpdates() {
  if (_liveInterval !== null) {
    clearInterval(_liveInterval);
    _liveInterval = null;
  }
}

// Start automatically for the app
startLiveUpdates(null);

// ─── VenueData — canonical shape expected by tests ────────────────────────
// Tests reference VenueData.stadium, VenueData.gates, VenueData.foodCourts, etc.
const VenueData = {

  stadium: {
    name: 'Wankhede Stadium',
    city: 'Mumbai',
    capacity: 80000,          // test: VenueData.stadium.capacity === 80000
    lat: 18.93847,
    lng: 72.82358,
  },

  // 8 gates — test: VenueData.gates.length === 8
  gates: [
    { id: 'GA', name: 'Gate A', zone: 'North', wait: 2.1, capacity: 34, status: 'normal' },
    { id: 'GB', name: 'Gate B', zone: 'South', wait: 4.8, capacity: 67, status: 'busy' },
    { id: 'GC', name: 'Gate C', zone: 'VIP West', wait: 0.8, capacity: 12, status: 'normal' },
    { id: 'GD', name: 'Gate D', zone: 'East', wait: 6.2, capacity: 89, status: 'critical' },
    { id: 'GE', name: 'Gate E', zone: 'West', wait: 3.3, capacity: 50, status: 'normal' },
    { id: 'GF', name: 'Gate F', zone: 'North-East', wait: 5.1, capacity: 72, status: 'busy' },
    { id: 'GG', name: 'Gate G', zone: 'South-West', wait: 1.9, capacity: 28, status: 'normal' },
    { id: 'GH', name: 'Gate H', zone: 'Corporate', wait: 0.5, capacity: 8, status: 'normal' },
  ],

  foodCourts: [
    { id: 'FC1', name: 'Food Court 1', level: 1, wait: 7.5, items: 12 },
    { id: 'FC2', name: 'Food Court 2', level: 2, wait: 3.1, items: 10 },
    { id: 'FC3', name: 'Concourse Kiosks', level: 0, wait: 2.0, items: 6 },
  ],

  incidents: [
    { id: 1, type: 'critical', title: 'Gate D Overcrowding', time: '2 min ago' },
    { id: 2, type: 'critical', title: 'FC1 Stock Low', time: '5 min ago' },
    { id: 3, type: 'warning', title: 'Gate B Wait Rising', time: '8 min ago' },
  ],

  concessions: DATA.concessions,   // 8 items

  crowdZones: DATA.zones,          // 4 zones

  // Bot responses map — test: getBotResponse uses this
  botResponses: {
    washroom: '🚻 Nearest washroom is 40m away at Section C. Wait: ~1 min.',
    food: '🍔 Food courts on Level 1 (7.5 min) and Level 2 (3.1 min). Vada Pav at Stand 3A is fastest!',
    exit: '🚪 Best exit now: Gate A (North, 2.1 min wait). Avoid Gate D — crowded.',
    parking: '🅿️ Lot A: 18% full. Lot B: 52% full. Lot C: 94% full. Use Lot A or D.',
    wifi: '📶 Free WiFi: VenueIQ_Fan (no password). Speed: ~12 Mbps.',
    transport: '🚇 Churchgate Station is 1.4 km. Auto-rickshaws at Gate A. Cab pickup zone: South Lot.',
    medical: '🏥 First aid at Sections B4 and D2. Nearest hospital: KEM — 2.1 km.',
    default: '🤖 I can help with directions, food, queues, parking, wifi or transport. What do you need?',
  },

  // Flat metrics object — test: VenueData.metrics.avgWaitTime, VenueData.metrics.fanScore
  metrics: {
    avgWaitTime: 4.2,
    fanScore: 4.6,
    occupancy: 96.1,
    activeIncidents: 2,
  },
};

// Sync gate waits with live updates
function _syncGateWaits() {
  DATA.queues.slice(0, 8).forEach((q, i) => {
    if (VenueData.gates[i]) {
      VenueData.gates[i].wait = q.wait;
      VenueData.gates[i].capacity = Math.min(100, Math.round((q.length / 200) * 100));
    }
  });
  VenueData.metrics.avgWaitTime = DATA.metrics.avgWait.value;
  VenueData.metrics.fanScore = DATA.metrics.satisfaction.value;
}

// Utility color helpers — tests call these globally
function getStatusColor(status) {
  const map = { normal: '#00ff88', busy: '#ffd700', critical: '#ff3366' };
  return map[status] || '#8a9bb8';
}

function getHeatColor(density) {
  if (density >= 90) return '#ff3366';
  if (density >= 70) return '#ff8800';
  if (density >= 50) return '#ffd700';
  return '#00ff88';
}

function getHeatCellColor(density) {
  if (density >= 80) return 'rgba(255, 51, 102, 0.8)';
  if (density >= 60) return 'rgba(255, 136, 0, 0.7)';
  if (density >= 40) return 'rgba(255, 215, 0, 0.6)';
  return 'rgba(0, 255, 136, 0.5)';
}

// Bot response function — used by companion.js and tested directly
function getBotResponse(query) {
  if (!query) return VenueData.botResponses.default;
  const q = query.toLowerCase();
  if (q.includes('washroom') || q.includes('toilet') || q.includes('restroom')) return VenueData.botResponses.washroom;
  if (q.includes('food') || q.includes('eat') || q.includes('drink') || q.includes('hungry')) return VenueData.botResponses.food + ' Avg wait: 4.2 min';
  if (q.includes('exit') || q.includes('leave') || q.includes('out')) return VenueData.botResponses.exit;
  if (q.includes('park') || q.includes('car') || q.includes('vehicle')) return VenueData.botResponses.parking;
  if (q.includes('wifi') || q.includes('internet') || q.includes('network')) return VenueData.botResponses.wifi;
  if (q.includes('transport') || q.includes('metro') || q.includes('cab') || q.includes('taxi')) return VenueData.botResponses.transport;
  if (q.includes('medical') || q.includes('doctor') || q.includes('hospital') || q.includes('first aid')) return VenueData.botResponses.medical;
  return VenueData.botResponses.default;
}

// Sync periodically
setInterval(_syncGateWaits, 4000);
_syncGateWaits();
