function Navbar(activePage) {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');

  const isSubPage = window.location.pathname.includes('/pages/');
  const homePath = isSubPage ? '../../index.html' : 'index.html';
  const diaryPath = isSubPage ? '../diary/diary.html' : 'pages/diary/diary.html';
  const entriesPath = isSubPage ? '../entries/entries.html' : 'pages/entries/entries.html';

  const tomatoLogo = `
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="20" rx="13" ry="12" fill="#E85D4A"/>
      <ellipse cx="18" cy="20" rx="13" ry="12" fill="url(#tomatoGrad)"/>
      <ellipse cx="14" cy="18" rx="5" ry="7" fill="#F07060" opacity="0.4"/>
      <path d="M15 9C15 9 16 5 18 4C20 5 21 9 21 9" stroke="#5A8C3C" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M13 10C13 10 15 7 18 6C21 7 23 10 23 10" fill="#5A8C3C"/>
      <ellipse cx="18" cy="9.5" rx="4" ry="1.5" fill="#6BA345"/>
      <defs>
        <radialGradient id="tomatoGrad" cx="0.35" cy="0.3" r="0.7">
          <stop offset="0%" stop-color="#F07060" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#D04838" stop-opacity="0.2"/>
        </radialGradient>
      </defs>
    </svg>`;

  nav.innerHTML = `
    <div class="container navbar__inner">
      <a href="${homePath}" class="navbar__brand" aria-label="Tomato's Dairy Home">
        <div class="navbar__logo">
          ${tomatoLogo}
        </div>
        <span class="navbar__title">Tomato's Dairy</span>
      </a>

      <div class="navbar__links">
        <a href="${homePath}" class="navbar__link ${activePage === 'home' ? 'active' : ''}" data-page="home">Home</a>
        <a href="${diaryPath}" class="navbar__link ${activePage === 'diary' ? 'active' : ''}" data-page="diary">Write</a>
        <a href="${entriesPath}" class="navbar__link ${activePage === 'entries' ? 'active' : ''}" data-page="entries">Entries</a>
        <a href="${diaryPath}" class="navbar__write-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          Write
        </a>
      </div>

      <button class="navbar__mobile-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="navbar__mobile-menu" role="dialog" aria-label="Mobile navigation">
      <button class="navbar__mobile-close" aria-label="Close menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <a href="${homePath}" class="navbar__mobile-link">Home</a>
      <a href="${diaryPath}" class="navbar__mobile-link">Write</a>
      <a href="${entriesPath}" class="navbar__mobile-link">Entries</a>
    </div>
  `;

  return nav;
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const toggle = navbar.querySelector('.navbar__mobile-toggle');
  const mobileMenu = navbar.querySelector('.navbar__mobile-menu');
  const closeBtn = navbar.querySelector('.navbar__mobile-close');
  const mobileLinks = navbar.querySelectorAll('.navbar__mobile-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      toggle.classList.toggle('open');
      toggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
}
