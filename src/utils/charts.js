// VenueIQ v3 - Charts
function drawSparkline(canvas, data, color = '#00d4ff') {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.offsetWidth || 120;
  const h = canvas.offsetHeight || 40;
  canvas.width = w; canvas.height = h;
  ctx.clearRect(0, 0, w, h);
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * (h - 8) - 4;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
  // Fill
  ctx.lineTo((data.length - 1) * step, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fillStyle = color.replace(')', ', 0.12)').replace('rgb', 'rgba').replace('#', 'rgba(') || 'rgba(0,212,255,0.08)';
  try { ctx.fill(); } catch(e) {}
}

function drawBarChart(canvas, labels, values, color = '#00d4ff') {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.offsetWidth || 300;
  const h = canvas.offsetHeight || 120;
  canvas.width = w; canvas.height = h;
  ctx.clearRect(0, 0, w, h);
  const max = Math.max(...values) || 1;
  const barW = (w / values.length) * 0.6;
  const gap = (w / values.length) * 0.4;
  values.forEach((v, i) => {
    const barH = (v / max) * (h - 30);
    const x = i * (barW + gap) + gap / 2;
    const y = h - barH - 20;
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.7 + (i / values.length) * 0.3;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(x, y, barW, barH, 3) : ctx.rect(x, y, barW, barH);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '9px Inter, sans-serif';
    ctx.textAlign = 'center';
    if (labels[i]) ctx.fillText(labels[i], x + barW / 2, h - 4);
  });
}

function drawDonut(canvas, value, max, color = '#00d4ff') {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const s = Math.min(canvas.offsetWidth, canvas.offsetHeight) || 80;
  canvas.width = s; canvas.height = s;
  const cx = s/2, cy = s/2, r = s/2 - 6;
  ctx.clearRect(0,0,s,s);
  // BG arc
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2);
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 8; ctx.stroke();
  // Value arc
  const pct = value / max;
  ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI/2, -Math.PI/2 + Math.PI*2*pct);
  ctx.strokeStyle = color; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.stroke();
  // Label
  ctx.fillStyle = '#e8edf5'; ctx.font = `bold ${s*0.2}px Rajdhani, sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(Math.round(pct*100) + '%', cx, cy);
}
