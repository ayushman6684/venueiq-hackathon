// ─── Router ────────────────────────────────────────────────────
const PAGES = {
  dashboard:  { render: renderDashboard,  init: initDashboard },
  crowd:      { render: renderCrowd,      init: initCrowd },
  queues:     { render: renderQueues,     init: initQueues },
  alerts:     { render: renderAlerts,     init: initAlerts },
  companion:  { render: renderCompanion,  init: initCompanion },
  concessions:{ render: renderConcessions,init: initConcessions },
  analytics:  { render: renderAnalytics,  init: initAnalytics },
};

let currentPage = null;

function navigate(el, pageId) {
  // Clear existing intervals
  ['_dashInterval','_queueInterval'].forEach(k => {
    if (window[k]) { clearInterval(window[k]); window[k] = null; }
  });

  // Update nav
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');

  const page = PAGES[pageId];
  if (!page) return;

  const main = document.getElementById('main-content');
  main.innerHTML = page.render();
  currentPage = pageId;

  // Init after render
  requestAnimationFrame(() => {
    page.init();
  });
}

// Boot
navigate(document.querySelector('[data-page="dashboard"]'), 'dashboard');
