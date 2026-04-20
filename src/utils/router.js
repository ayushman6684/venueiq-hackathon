// VenueIQ v3 - Router
const pages = {
  dashboard: renderDashboard,
  crowd: renderCrowd,
  queues: renderQueues,
  alerts: renderAlerts,
  companion: renderCompanion,
  concessions: renderConcessions,
  analytics: renderAnalytics,
  map: renderMap
};

let currentPage = null;

function navigate(page) {
  stopLiveUpdates();
  // Update nav
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.remove('active');
    el.removeAttribute('aria-current');
  });
  const activeBtn = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-current', 'page');
  }
  currentPage = page;
  const container = document.getElementById('page-container');
  if (container) {
    container.innerHTML = '';
    if (pages[page]) pages[page](container);
    // Focus main content for accessibility
    const main = document.getElementById('main-content');
    if (main) main.focus();
  }
}
