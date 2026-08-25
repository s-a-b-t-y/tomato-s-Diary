function PageTransition() {
  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  overlay.setAttribute('role', 'status');
  overlay.setAttribute('aria-label', 'Page loading');

  const isSubPage = window.location.pathname.includes('/pages/');
  const logoPath = isSubPage ? '../../assets/icons/Logo.png' : 'assets/icons/Logo.png';

  overlay.innerHTML = `
    <div class="page-transition__orb page-transition__orb--1"></div>
    <div class="page-transition__orb page-transition__orb--2"></div>
    <div class="page-transition__orb page-transition__orb--3"></div>

    <div class="page-transition__particles">
      <div class="page-transition__particle"></div>
      <div class="page-transition__particle"></div>
      <div class="page-transition__particle"></div>
      <div class="page-transition__particle"></div>
      <div class="page-transition__particle"></div>
      <div class="page-transition__particle"></div>
      <div class="page-transition__particle"></div>
      <div class="page-transition__particle"></div>
    </div>

    <div class="page-transition__center">
      <div class="page-transition__glow-ring"></div>
      <svg class="page-transition__ring" viewBox="0 0 160 160">
        <circle class="page-transition__ring-track" cx="80" cy="80" r="70"/>
        <circle class="page-transition__ring-progress" cx="80" cy="80" r="70"/>
      </svg>
      <div class="page-transition__orbit-ring"></div>
      <img src="${logoPath}" alt="Cutie Pie J&I" class="page-transition__logo">
    </div>

    <div class="page-transition__text-block">
      <h2 class="page-transition__title">Cutie Pie J&I</h2>
      <p class="page-transition__tagline">A quiet place for your thoughts</p>
    </div>

    <div class="page-transition__dots">
      <span class="page-transition__dot"></span>
      <span class="page-transition__dot"></span>
      <span class="page-transition__dot"></span>
    </div>

    <div class="page-transition__progress">
      <div class="page-transition__progress-bar" id="transitionProgressBar"></div>
    </div>
  `;

  return overlay;
}

function initPageTransition() {
  const overlay = PageTransition();
  document.body.appendChild(overlay);

  const TRANSITION_MIN = 1000;
  const TRANSITION_MAX = 1500;
  const progressBar = () => overlay.querySelector('#transitionProgressBar');

  function getTransitionDuration() {
    return Math.floor(Math.random() * (TRANSITION_MAX - TRANSITION_MIN + 1)) + TRANSITION_MIN;
  }

  function animateProgress(duration) {
    const bar = progressBar();
    if (!bar) return;
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 95);
      bar.style.width = pct + '%';
      if (pct < 95) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function completeProgress() {
    const bar = progressBar();
    if (bar) {
      bar.style.width = '100%';
    }
  }

  function navigateTo(url) {
    overlay.classList.remove('leaving');
    overlay.classList.add('active');

    const duration = getTransitionDuration();
    animateProgress(duration);

    setTimeout(() => {
      completeProgress();
      setTimeout(() => {
        window.location.href = url;
      }, 150);
    }, duration);
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    if (link.target === '_blank') return;

    const currentUrl = window.location.href;
    let targetUrl;
    try {
      targetUrl = new URL(href, currentUrl).href;
    } catch {
      return;
    }

    if (targetUrl === currentUrl) return;

    e.preventDefault();
    navigateTo(href);
  });

  return { navigateTo, overlay };
}

function showInitialTransition(callback) {
  const overlay = PageTransition();
  document.body.appendChild(overlay);

  const duration = 1000;
  const bar = overlay.querySelector('#transitionProgressBar');

  overlay.classList.add('active');

  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const pct = Math.min((elapsed / duration) * 100, 95);
    if (bar) bar.style.width = pct + '%';
    if (pct < 95) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);

  setTimeout(() => {
    if (bar) bar.style.width = '100%';
    setTimeout(() => {
      overlay.classList.add('leaving');
      setTimeout(() => {
        if (callback) callback();
        setTimeout(() => overlay.remove(), 400);
      }, 400);
    }, 150);
  }, duration);
}
