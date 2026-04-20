// ─── Router ────────────────────────────────────────────────────
const PAGES = {
  dashboard:  { render: renderDashboard,  init: initDashboard },
  crowd:      { render: renderCrowd,      init: initCrowd },
  queues:     { render: renderQueues,     init: initQueues },
  alerts:     { render: renderAlerts,     init: initAlerts },
  companion:  { render: renderCompanion,  init: initCompanion },
  concessions:{ render: renderConcessions,init: initConcessions },
  analytics:  { render: renderAnalytics,  init: initAnalytics },
  map:        { render: renderMap,        init: initMap },
};

let currentPage = null;

function navigate(el, pageId) {
  ['_dashInterval','_queueInterval'].forEach(k => {
    if (window[k]) { clearInterval(window[k]); window[k] = null; }
  });

  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.remove('active');
    n.removeAttribute('aria-current');
  });
  if (el) {
    el.classList.add('active');
    el.setAttribute('aria-current', 'page');
  }

  const page = PAGES[pageId];
  if (!page) return;

  const main = document.getElementById('main-content');
  main.innerHTML = page.render();
  main.setAttribute('aria-label', pageId + ' content');
  currentPage = pageId;

  // Track page view
  if (typeof trackEvent !== 'undefined') {
    trackEvent('Navigation', 'page_view', pageId);
  }

  requestAnimationFrame(() => { page.init(); });
}

// Boot
navigate(document.querySelector('[data-page="dashboard"]'), 'dashboard');
