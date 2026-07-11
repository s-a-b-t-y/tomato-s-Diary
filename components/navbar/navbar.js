function Navbar(activePage) {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');

  const isSubPage = window.location.pathname.includes('/pages/');
  const isLoginOrDeep = window.location.pathname.includes('/Login/');
  const homePath = (isSubPage || isLoginOrDeep) ? '../../index.html' : 'index.html';
  const diaryPath = (isSubPage || isLoginOrDeep) ? '../diary/diary.html' : 'pages/diary/diary.html';
  const entriesPath = (isSubPage || isLoginOrDeep) ? '../entries/entries.html' : 'pages/entries/entries.html';
  const loginPath = (isSubPage || isLoginOrDeep) ? '../../Login/login.html' : 'Login/login.html';

  const logoPath = (isSubPage || isLoginOrDeep) ? '../../assets/icons/Tomato-diary-favicon.png' : 'assets/icons/Tomato-diary-favicon.png';
  const tomatoLogo = `<img src="${logoPath}" alt="Tomato's Diary Logo" class="navbar__logo-img" width="36" height="36">`;

  const session = getSession();
  const isLoggedIn = !!session;
  const userName = isLoggedIn ? session.name : '';
  const userInitial = isLoggedIn ? userName.charAt(0).toUpperCase() : '';

  nav.innerHTML = `
    <div class="container navbar__inner">
      <div class="navbar__brand-group">
        <a href="${homePath}" class="navbar__brand" aria-label="Tomato's Diary Home">
          <div class="navbar__logo">
            ${tomatoLogo}
          </div>
          <span class="navbar__title">Tomato's Diary</span>
        </a>
      </div>

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
        ${isLoggedIn
          ? `<div class="navbar__user">
               <div class="navbar__avatar" title="${userName}">${userInitial}</div>
               <div class="navbar__user-dropdown">
                 <div class="navbar__user-info">
                   <span class="navbar__user-name">${userName}</span>
                   <span class="navbar__user-email">${session.email || session.username}</span>
                 </div>
                 <button class="navbar__logout-btn" id="navbarLogoutBtn" type="button">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                   Sign Out
                 </button>
               </div>
             </div>`
          : `<a href="${loginPath}" class="navbar__signin-btn">Sign In</a>`
        }
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
      ${isLoggedIn
        ? `<button class="navbar__mobile-link navbar__mobile-link--btn" id="mobileLogoutBtn" type="button">Sign Out</button>`
        : `<a href="${loginPath}" class="navbar__mobile-link navbar__mobile-link--btn">Sign In</a>`
      }
    </div>
  `;

  return nav;
}

function getSession() {
  try {
    const raw = localStorage.getItem('tomato_diary_session');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem('tomato_diary_session');
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const toggle = navbar.querySelector('.navbar__mobile-toggle');
  const mobileMenu = navbar.querySelector('.navbar__mobile-menu');
  const closeBtn = navbar.querySelector('.navbar__mobile-close');
  const mobileLinks = navbar.querySelectorAll('.navbar__mobile-link');
  const logoutBtn = navbar.querySelector('#navbarLogoutBtn');
  const mobileLogoutBtn = navbar.querySelector('#mobileLogoutBtn');
  const avatar = navbar.querySelector('.navbar__avatar');
  const userDropdown = navbar.querySelector('.navbar__user-dropdown');

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

  if (avatar && userDropdown) {
    avatar.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!userDropdown.contains(e.target) && e.target !== avatar) {
        userDropdown.classList.remove('open');
      }
    });
  }

  function handleLogout() {
    clearSession();
    window.location.href = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/Login/')
      ? '../../index.html'
      : 'index.html';
  }

  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
  if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleLogout);
}
