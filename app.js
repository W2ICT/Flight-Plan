/* ===== Shared App Logic ===== */

// Nav toggle (mobile)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Mark active nav link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });

  // Accordion
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
});

// Navbar HTML shared across pages
function renderNav(active) {
  return `
  <nav class="nav">
    <a href="index.html" class="nav-brand">
      <div class="nav-brand-icon">✈</div>
      <div>
        <div class="nav-brand-text">FlightPlan TH</div>
        <div class="nav-brand-sub">Thai Aviation</div>
      </div>
    </a>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html" class="${active==='home'?'active':''}"><span class="icon">🏠</span> หน้าหลัก</a></li>
      <li><a href="flight-plan.html" class="${active==='fpl'?'active':''}"><span class="icon">📋</span> Flight Plan</a></li>
      <li><a href="manual.html" class="${active==='manual'?'active':''}"><span class="icon">📖</span> คู่มือ</a></li>
      <li><a href="enroute-chart.html" class="${active==='map'?'active':''}"><span class="icon">🗺️</span> Enroute Chart</a></li>
    </ul>
    <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">☰</button>
  </nav>`;
}

// Inject nav if placeholder exists
const navPlaceholder = document.getElementById('nav-placeholder');
if (navPlaceholder) {
  const active = navPlaceholder.dataset.active || 'home';
  navPlaceholder.outerHTML = renderNav(active);
  // Re-run active link + toggle logic
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
}
