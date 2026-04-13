// ─── Mock Live Data Store ─────────────────────────────────────
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
  // 9 rows x 16 cols, simulating a stadium bird's eye
  const grid = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 16; c++) {
      // Simulate high density at sides, lower at center field
      const distFromEdge = Math.min(r, 8-r, c, 15-c);
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
  return [12,18,25,40,55,70,82,90,96,94,88,72,65,78,85,88,91,94,96,95,90,82,68,40];
}

// Simulate live data updates
function liveUpdate() {
  DATA.metrics.avgWait.value = Math.max(1, DATA.metrics.avgWait.value + (Math.random() - 0.5) * 0.4);
  DATA.metrics.satisfaction.value = Math.min(5, Math.max(3.5, DATA.metrics.satisfaction.value + (Math.random() - 0.5) * 0.05));
  DATA.queues.forEach(q => {
    q.wait = Math.max(0.5, q.wait + (Math.random() - 0.5) * 0.8);
    q.length = Math.max(0, q.length + Math.floor((Math.random() - 0.5) * 15));
  });
}

setInterval(liveUpdate, 4000);
