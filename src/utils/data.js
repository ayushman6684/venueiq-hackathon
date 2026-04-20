// VenueIQ v3 - Data Layer
const VenueData = {
  stadium: { name: 'National Sports Complex', capacity: 80000, currentAttendance: 73240, sections: 8, gates: 12 },
  metrics: {
    occupancy: 91.5, avgWaitTime: 4.2, fanScore: 4.6, incidents: 3,
    staffDeployed: 847, concessionRevenue: 284500, crowdFlow: 2340
  },
  gates: [
    { id: 'G1', name: 'Gate A - North', wait: 3, status: 'normal', capacity: 85, zone: 'north' },
    { id: 'G2', name: 'Gate B - North', wait: 7, status: 'busy', capacity: 92, zone: 'north' },
    { id: 'G3', name: 'Gate C - East', wait: 2, status: 'normal', capacity: 67, zone: 'east' },
    { id: 'G4', name: 'Gate D - East', wait: 12, status: 'critical', capacity: 98, zone: 'east' },
    { id: 'G5', name: 'Gate E - South', wait: 4, status: 'normal', capacity: 78, zone: 'south' },
    { id: 'G6', name: 'Gate F - South', wait: 5, status: 'normal', capacity: 80, zone: 'south' },
    { id: 'G7', name: 'Gate G - West', wait: 8, status: 'busy', capacity: 88, zone: 'west' },
    { id: 'G8', name: 'Gate H - West', wait: 6, status: 'normal', capacity: 82, zone: 'west' },
  ],
  foodCourts: [
    { id: 'F1', name: 'Main Concourse - Level 1', wait: 6, status: 'normal', items: ['Hot Dogs', 'Burgers', 'Drinks'] },
    { id: 'F2', name: 'North Stand - Level 2', wait: 14, status: 'critical', items: ['Pizza', 'Nachos', 'Beer'] },
    { id: 'F3', name: 'East Wing Kiosk', wait: 3, status: 'normal', items: ['Snacks', 'Water', 'Juice'] },
    { id: 'F4', name: 'VIP Lounge - Level 3', wait: 2, status: 'normal', items: ['Gourmet', 'Cocktails', 'Desserts'] },
    { id: 'F5', name: 'South Plaza Food Court', wait: 9, status: 'busy', items: ['Indian', 'Chinese', 'Fast Food'] },
  ],
  incidents: [
    { id: 1, type: 'critical', title: 'Overcrowding - Gate D East', zone: 'East Gate', time: '2 min ago', status: 'active', staff: 4 },
    { id: 2, type: 'warning', title: 'Long Queue - North Stand F2', zone: 'North Food Court', time: '8 min ago', status: 'monitoring', staff: 2 },
    { id: 3, type: 'info', title: 'Medical Assistance Required', zone: 'Section 14', time: '15 min ago', status: 'resolved', staff: 3 },
  ],
  crowdZones: [
    { name: 'North Stand', density: 94, color: '#ff3366', trend: 'increasing' },
    { name: 'East Stand', density: 87, color: '#ff6b35', trend: 'stable' },
    { name: 'South Stand', density: 78, color: '#ffd700', trend: 'decreasing' },
    { name: 'West Stand', density: 82, color: '#ff6b35', trend: 'stable' },
    { name: 'Center Field', density: 45, color: '#00ff88', trend: 'stable' },
    { name: 'Concourse L1', density: 71, color: '#ffd700', trend: 'increasing' },
    { name: 'VIP Area', density: 63, color: '#00d4ff', trend: 'stable' },
    { name: 'Parking A', density: 56, color: '#00ff88', trend: 'decreasing' },
  ],
  concessions: [
    { id: 'C1', name: 'Hot Dogs', stock: 68, sold: 1240, revenue: 14880, demand: 'high', trend: 'up' },
    { id: 'C2', name: 'Burgers', stock: 42, sold: 890, revenue: 17800, demand: 'medium', trend: 'stable' },
    { id: 'C3', name: 'Beer / Draft', stock: 31, sold: 2100, revenue: 25200, demand: 'critical', trend: 'up' },
    { id: 'C4', name: 'Soft Drinks', stock: 85, sold: 1850, revenue: 9250, demand: 'high', trend: 'stable' },
    { id: 'C5', name: 'Pizza Slices', stock: 55, sold: 740, revenue: 11100, demand: 'medium', trend: 'up' },
    { id: 'C6', name: 'Nachos', stock: 72, sold: 630, revenue: 9450, demand: 'low', trend: 'stable' },
    { id: 'C7', name: 'Water Bottles', stock: 91, sold: 2400, revenue: 7200, demand: 'high', trend: 'stable' },
    { id: 'C8', name: 'Ice Cream', stock: 44, sold: 410, revenue: 4920, demand: 'low', trend: 'down' },
  ],
  botResponses: {
    'nearest washroom': 'The nearest washroom to your current section is 40m away — Section 12, Level 2, near Gate C. Estimated wait: <1 min.',
    'food': 'Best options right now:\n• East Wing Kiosk — only 3 min wait 🟢\n• Main Concourse — 6 min wait 🟡\n• Avoid North Stand F2 — 14 min wait 🔴',
    'parking': 'Parking Lot A (West entrance) is filling up fast. Lot B and Lot C still have good availability. Exit via Gate H after the match to avoid traffic.',
    'exit': 'Best exit routes after the match:\n• Gate A (North) — usually fastest\n• Gate E/F (South) — good for public transport\n• Avoid Gate D (East) — currently overcrowded',
    'wait': 'Current average gate wait time: 4.2 minutes. Gate C (East) has the shortest wait at just 2 minutes!',
    'seat': 'Your seat is in Block 12, Row G, Seat 23 — Level 2, East Stand. Take Gate C for the fastest access.',
    'wifi': 'Free WiFi: Connect to "VenueIQ-Fan" — no password needed. Speeds are best in the lower concourse.',
    'help': 'I can help with:\n• Nearest washrooms & facilities\n• Food court wait times\n• Best exit routes\n• Seat navigation\n• WiFi & facilities info\n\nJust ask me anything!',
    'default': "I'm checking the live system for you... For fastest help, try: 'food', 'exit', 'washroom', 'parking', or 'wait times'."
  }
};

// Live update simulation
let updateInterval = null;
function startLiveUpdates(callback) {
  if (updateInterval) clearInterval(updateInterval);
  updateInterval = setInterval(() => {
    // Update gate waits
    VenueData.gates.forEach(g => {
      g.wait = Math.max(1, g.wait + (Math.random() > 0.5 ? 1 : -1));
      g.capacity = Math.min(100, Math.max(40, g.capacity + (Math.random() > 0.5 ? 2 : -2)));
      g.status = g.wait > 10 ? 'critical' : g.wait > 6 ? 'busy' : 'normal';
    });
    // Update metrics
    VenueData.metrics.avgWaitTime = parseFloat((Math.random() * 3 + 3).toFixed(1));
    VenueData.metrics.crowdFlow = Math.floor(2000 + Math.random() * 700);
    if (callback) callback();
  }, 4000);
}

function stopLiveUpdates() {
  if (updateInterval) { clearInterval(updateInterval); updateInterval = null; }
}

function getStatusColor(status) {
  return { normal: '#00ff88', busy: '#ffd700', critical: '#ff3366' }[status] || '#8a9bb8';
}

function getHeatColor(density) {
  if (density >= 90) return '#ff1a4f';
  if (density >= 80) return '#ff3366';
  if (density >= 70) return '#ff6b35';
  if (density >= 60) return '#ffd700';
  if (density >= 45) return '#88cc00';
  return '#00ff88';
}

function getHeatCellColor(val) {
  if (val > 85) return `rgba(255,51,102,${0.4 + val/200})`;
  if (val > 70) return `rgba(255,107,53,${0.3 + val/250})`;
  if (val > 55) return `rgba(255,215,0,${0.3 + val/300})`;
  return `rgba(0,255,136,${0.1 + val/300})`;
}
