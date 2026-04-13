// ─── Mini Chart Helpers ────────────────────────────────────────

function drawSparkline(canvas, data, color = '#00e5a0', fill = true) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / range) * (H - 4) - 2
  }));

  // Fill
  if (fill) {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, H);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length-1].x, H);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, color + '40');
    grad.addColorStop(1, color + '00');
    ctx.fillStyle = grad;
    ctx.fill();
  }

  // Line
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function drawBarChart(canvas, data, colors) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const max = Math.max(...data.map(d => d.v));
  const barW = (W - (data.length - 1) * 3) / data.length;

  data.forEach((d, i) => {
    const barH = (d.v / max) * (H - 20);
    const x = i * (barW + 3);
    const y = H - barH - 16;
    const color = colors ? colors[i] : '#00e5a040';

    ctx.beginPath();
    ctx.roundRect(x, y, barW, barH, [2,2,0,0]);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.font = '9px DM Sans, sans-serif';
    ctx.fillStyle = 'rgba(232,237,243,0.4)';
    ctx.textAlign = 'center';
    ctx.fillText(d.label, x + barW/2, H - 2);
  });
}

function heatColor(value) {
  // value: 0-1
  if (value < 0.3) return `rgba(0,229,160,${0.15 + value * 0.5})`;
  if (value < 0.6) return `rgba(255,209,102,${0.3 + value * 0.4})`;
  if (value < 0.85) return `rgba(255,140,70,${0.5 + value * 0.3})`;
  return `rgba(255,77,109,${0.6 + value * 0.3})`;
}

function drawDonut(canvas, pct, color = '#00e5a0') {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const r = Math.min(W, H) / 2 - 4;
  const cx = W / 2, cy = H / 2;
  ctx.clearRect(0, 0, W, H);

  // Background ring
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 6;
  ctx.stroke();

  // Filled arc
  ctx.beginPath();
  ctx.arc(cx, cy, r, -Math.PI/2, -Math.PI/2 + (pct/100) * Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.stroke();
}
