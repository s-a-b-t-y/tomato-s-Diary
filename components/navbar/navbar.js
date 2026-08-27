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

  const logoPath = (isSubPage || isLoginOrDeep) ? '../../assets/icons/Logo.png' : 'assets/icons/Logo.png';
  const tomatoLogo = `<img src="${logoPath}" alt="Cutie Pie J&I Logo" class="navbar__logo-img" width="36" height="36">`;

  const session = getSession();
  const isLoggedIn = !!session;
  const userName = isLoggedIn ? session.name : '';
  const userInitial = isLoggedIn ? userName.charAt(0).toUpperCase() : '';
  const userPfp = isLoggedIn ? getUserPfp() : '';

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

  nav.innerHTML = `
    <div class="navbar__inner">
      <div class="navbar__left">
        <a href="${homePath}" class="navbar__brand" aria-label="Cutie Pie J&I Home">
          <div class="navbar__logo">
            ${tomatoLogo}
          </div>
          <span class="navbar__title">Cutie Pie J&I</span>
        </a>
      </div>

      <div class="navbar__center">
        <a href="${homePath}" class="navbar__link ${activePage === 'home' ? 'active' : ''}" data-page="home">Home</a>
        <a href="${diaryPath}" class="navbar__link ${activePage === 'diary' ? 'active' : ''}" data-page="diary">Write</a>
        <a href="${entriesPath}" class="navbar__link ${activePage === 'entries' ? 'active' : ''}" data-page="entries">Past Notes</a>
      </div>

      <div class="navbar__right">
        <a href="${diaryPath}" class="navbar__write-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          Write
        </a>

        <button class="navbar__theme-toggle" id="themeToggle" type="button" aria-label="Toggle theme" title="Switch theme">
          <svg class="navbar__theme-icon navbar__theme-icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg class="navbar__theme-icon navbar__theme-icon--moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        ${isLoggedIn
          ? `<div class="navbar__user">
               <div class="navbar__avatar" title="${userName}">
                 ${userPfp ? `<img src="${userPfp}" alt="${userName}" class="navbar__avatar-img">` : userInitial}
               </div>
               <div class="navbar__user-dropdown">
                 <div class="navbar__user-info">
                   <span class="navbar__user-name">${userName}</span>
                   <span class="navbar__user-email">${session.email || session.username}</span>
                 </div>
                 <div class="navbar__dropdown-actions">
                   <input type="file" id="pfpInput" accept="image/*" class="navbar__pfp-input">
                   <button class="navbar__pfp-btn navbar__action-btn" id="pfpBtn" type="button">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                     Change Photo
                   </button>
                   <button class="navbar__action-btn" id="changeNameBtn" type="button">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                     Change Name
                   </button>
                   <button class="navbar__action-btn" id="changeUsernameBtn" type="button">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                     Change Username
                   </button>
                   <button class="navbar__action-btn" id="changePassBtn" type="button">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                     Change Password
                   </button>
                   <button class="navbar__logout-btn" id="navbarLogoutBtn" type="button">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                     Sign Out
                   </button>
                 </div>
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

    <div class="navbar__mobile-backdrop" id="mobileBackdrop"></div>
    <div class="navbar__mobile-menu" role="dialog" aria-label="Mobile navigation">
      <button class="navbar__mobile-close" aria-label="Close menu">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <div class="navbar__mobile-header">
        <img src="${logoPath}" alt="" class="navbar__mobile-header-logo">
        <span class="navbar__mobile-header-title">Cutie Pie J&I</span>
      </div>

      <div class="navbar__mobile-nav">
        <a href="${homePath}" class="navbar__mobile-link ${activePage === 'home' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Home
        </a>
        <a href="${diaryPath}" class="navbar__mobile-link ${activePage === 'diary' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Write
        </a>
        <a href="${entriesPath}" class="navbar__mobile-link ${activePage === 'entries' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          Past Notes
        </a>
      </div>

      <div class="navbar__mobile-divider"></div>

      <div class="navbar__mobile-bottom">
        <button class="navbar__mobile-link navbar__mobile-link--theme" id="mobileThemeToggle" type="button">
          <span>Theme</span>
          <div class="navbar__mobile-theme-switch">
            <svg class="navbar__mobile-theme-icon navbar__mobile-theme-icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <svg class="navbar__mobile-theme-icon navbar__mobile-theme-icon--moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </div>
        </button>
        ${isLoggedIn
          ? `<button class="navbar__mobile-link navbar__mobile-link--btn" id="mobileLogoutBtn" type="button">Sign Out</button>`
          : `<a href="${loginPath}" class="navbar__mobile-link navbar__mobile-link--btn">Sign In</a>`
        }
      </div>
    </div>
  `;

  return nav;
}

function getSession() {
  try {
    const raw = localStorage.getItem('tomato_diary_session');
    if (!raw) return null;
    const session = JSON.parse(raw);
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - new Date(session.loginAt).getTime() > SEVEN_DAYS) {
      localStorage.removeItem('tomato_diary_session');
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem('tomato_diary_session');
}

function getUserPfp() {
  try {
    const session = getSession();
    if (!session) return '';
    return localStorage.getItem('tomato_diary_pfp_' + session.username) || '';
  } catch {
    return '';
  }
}

function setUserPfp(dataUrl) {
  try {
    const session = getSession();
    if (!session) return;
    localStorage.setItem('tomato_diary_pfp_' + session.username, dataUrl);
  } catch {}
}

function resizeImage(file, maxSize, callback) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      let w = img.width;
      let h = img.height;
      if (w > h) {
        if (w > maxSize) { h = h * maxSize / w; w = maxSize; }
      } else {
        if (h > maxSize) { w = w * maxSize / h; h = maxSize; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      callback(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const toggle = navbar.querySelector('.navbar__mobile-toggle');
  const mobileMenu = navbar.querySelector('.navbar__mobile-menu');
  const mobileBackdrop = navbar.querySelector('#mobileBackdrop');
  const closeBtn = navbar.querySelector('.navbar__mobile-close');
  const mobileLinks = navbar.querySelectorAll('.navbar__mobile-link');
  const logoutBtn = navbar.querySelector('#navbarLogoutBtn');
  const mobileLogoutBtn = navbar.querySelector('#mobileLogoutBtn');
  const avatar = navbar.querySelector('.navbar__avatar');
  const userDropdown = navbar.querySelector('.navbar__user-dropdown');
  const themeToggle = navbar.querySelector('#themeToggle');
  const mobileThemeToggle = navbar.querySelector('#mobileThemeToggle');

  const session = getSession();
  const userName = session ? session.name : '';

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  function switchTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'pink' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('tomato_diary_theme', next);
    updateToggleState();
  }

  function updateToggleState() {
    const isPink = document.documentElement.getAttribute('data-theme') === 'pink';
    if (themeToggle) themeToggle.classList.toggle('navbar__theme-toggle--pink', isPink);
  }

  updateToggleState();

  if (themeToggle) themeToggle.addEventListener('click', switchTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', switchTheme);

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) closeMobileMenu(); else openMobileMenu();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMobileMenu);
    }

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeMobileMenu);
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  if (avatar && userDropdown) {
    avatar.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = userDropdown.classList.contains('open');
      userDropdown.classList.toggle('open');
      avatar.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!userDropdown.contains(e.target) && e.target !== avatar) {
        userDropdown.classList.remove('open');
        avatar.classList.remove('active');
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

  const pfpInput = navbar.querySelector('#pfpInput');
  const pfpBtn = navbar.querySelector('#pfpBtn');
  if (pfpBtn && pfpInput) {
    pfpBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      pfpInput.click();
    });
    pfpInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) return;
      resizeImage(file, 200, (dataUrl) => {
        setUserPfp(dataUrl);
        const currentAvatar = navbar.querySelector('.navbar__avatar');
        if (currentAvatar) {
          const existing = currentAvatar.querySelector('.navbar__avatar-img');
          if (existing) {
            existing.src = dataUrl;
          } else {
            const img = document.createElement('img');
            img.className = 'navbar__avatar-img';
            img.src = dataUrl;
            img.alt = userName;
            currentAvatar.textContent = '';
            currentAvatar.appendChild(img);
          }
        }
        userDropdown.classList.remove('open');
        avatar.classList.remove('active');
      });
    });
  }

  function closeDropdown() {
    userDropdown.classList.remove('open');
    avatar.classList.remove('active');
  }

  function showSuccessModal(message) {
    closeDropdown();
    const existing = document.getElementById('successModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'profile-modal-overlay';
    modal.id = 'successModal';
    modal.innerHTML = `
      <div class="profile-modal profile-modal--success">
        <div class="profile-modal__checkmark">
          <svg viewBox="0 0 52 52">
            <circle class="profile-modal__checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="profile-modal__checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h3 class="profile-modal__title">Success!</h3>
        <p class="profile-modal__message">${message}</p>
        <button class="profile-modal__btn" id="successModalClose">OK</button>
      </div>
    `;
    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('active'));

    modal.querySelector('#successModalClose').addEventListener('click', () => {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 300);
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
      }
    });
  }

  function showFormModal(title, contentHTML, onSubmit) {
    closeDropdown();
    const existing = document.getElementById('formModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'profile-modal-overlay';
    modal.id = 'formModal';
    modal.innerHTML = `
      <div class="profile-modal">
        <button class="profile-modal__close" id="formModalClose" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <h3 class="profile-modal__title profile-modal__title--form">${title}</h3>
        <div class="profile-modal__form">${contentHTML}</div>
      </div>
    `;
    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('active'));

    function closeModal() {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 300);
    }

    modal.querySelector('#formModalClose').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    onSubmit(modal, closeModal);
  }

  const USERS_KEY = 'tomato_diary_users';
  function getUsers() { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; } }
  function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }

  const changeNameBtn = navbar.querySelector('#changeNameBtn');
  if (changeNameBtn) {
    changeNameBtn.addEventListener('click', () => {
      showFormModal('Change Name', `
        <div class="profile-input-group">
          <label class="profile-label">New Name</label>
          <input type="text" class="profile-input" id="newNameInput" placeholder="Enter new display name" autocomplete="off" value="${userName}">
          <span class="profile-input-error" id="newNameError"></span>
        </div>
        <button class="profile-modal__btn profile-modal__btn--primary" id="saveNameBtn">Save</button>
      `, (modal) => {
        const input = modal.querySelector('#newNameInput');
        const error = modal.querySelector('#newNameError');
        const saveBtn = modal.querySelector('#saveNameBtn');
        input.focus();
        input.select();

        saveBtn.addEventListener('click', () => {
          const val = input.value.trim();
          if (!val) { error.textContent = 'Please enter a name'; return; }
          if (val.length < 2) { error.textContent = 'Name must be at least 2 characters'; return; }
          const users = getUsers();
          const currentSession = getSession();
          const user = users.find(u => u.username === currentSession.username);
          if (user) {
            user.name = val;
            saveUsers(users);
          }
          const newSession = { ...currentSession, name: val };
          localStorage.setItem('tomato_diary_session', JSON.stringify(newSession));
          showSuccessModal('Name changed successfully!');
          setTimeout(() => location.reload(), 1500);
        });
      });
    });
  }

  const changeUsernameBtn = navbar.querySelector('#changeUsernameBtn');
  if (changeUsernameBtn) {
    changeUsernameBtn.addEventListener('click', () => {
      showFormModal('Change Username', `
        <div class="profile-input-group">
          <label class="profile-label">New Username</label>
          <input type="text" class="profile-input" id="newUsernameInput" placeholder="Enter new username" autocomplete="off">
          <span class="profile-input-error" id="newUsernameError"></span>
        </div>
        <button class="profile-modal__btn profile-modal__btn--primary" id="saveUsernameBtn">Save</button>
      `, (modal) => {
        const input = modal.querySelector('#newUsernameInput');
        const error = modal.querySelector('#newUsernameError');
        const saveBtn = modal.querySelector('#saveUsernameBtn');
        input.focus();

        saveBtn.addEventListener('click', () => {
          const val = input.value.trim();
          if (!val) { error.textContent = 'Please enter a username'; return; }
          if (!/^[a-zA-Z0-9_]{3,20}$/.test(val)) { error.textContent = '3-20 chars, letters, numbers & underscore only'; return; }
          const users = getUsers();
          const currentSession = getSession();
          if (users.find(u => u.username.toLowerCase() === val.toLowerCase() && u.username !== currentSession.username)) {
            error.textContent = 'This username is already taken'; return;
          }
          const user = users.find(u => u.username === currentSession.username);
          if (user) {
            const oldKey = 'tomato_diary_pfp_' + user.username;
            const newKey = 'tomato_diary_pfp_' + val;
            const pfp = localStorage.getItem(oldKey);
            if (pfp) { localStorage.setItem(newKey, pfp); localStorage.removeItem(oldKey); }
            user.username = val;
            saveUsers(users);
          }
          const newSession = { ...currentSession, username: val };
          localStorage.setItem('tomato_diary_session', JSON.stringify(newSession));
          showSuccessModal('Username changed successfully!');
          setTimeout(() => location.reload(), 1500);
        });
      });
    });
  }

  const changePassBtn = navbar.querySelector('#changePassBtn');
  if (changePassBtn) {
    changePassBtn.addEventListener('click', () => {
      showFormModal('Change Password', `
        <div class="profile-input-group">
          <label class="profile-label">Current Password</label>
          <div class="profile-input-wrap">
            <input type="password" class="profile-input" id="currentPassInput" placeholder="Enter current password">
            <button type="button" class="profile-toggle-pass" data-target="currentPassInput" aria-label="Show password">
              <svg class="eye-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg class="eye-closed" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>
          <span class="profile-input-error" id="currentPassError"></span>
        </div>
        <div class="profile-input-group">
          <label class="profile-label">New Password</label>
          <div class="profile-input-wrap">
            <input type="password" class="profile-input" id="newPassInput" placeholder="Enter new password">
            <button type="button" class="profile-toggle-pass" data-target="newPassInput" aria-label="Show password">
              <svg class="eye-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg class="eye-closed" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>
          <div class="profile-strength" id="passStrength">
            <div class="profile-strength__bar">
              <div class="profile-strength__fill" id="passStrengthFill"></div>
            </div>
            <span class="profile-strength__label" id="passStrengthLabel"></span>
          </div>
          <span class="profile-input-error" id="newPassError"></span>
        </div>
        <div class="profile-input-group">
          <label class="profile-label">Confirm New Password</label>
          <div class="profile-input-wrap">
            <input type="password" class="profile-input" id="confirmPassInput" placeholder="Retype new password">
            <button type="button" class="profile-toggle-pass" data-target="confirmPassInput" aria-label="Show password">
              <svg class="eye-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg class="eye-closed" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>
          <span class="profile-input-error" id="confirmPassError"></span>
        </div>
        <button class="profile-modal__btn profile-modal__btn--primary" id="savePassBtn">Save</button>
      `, (modal) => {
        const curInput = modal.querySelector('#currentPassInput');
        const newInput = modal.querySelector('#newPassInput');
        const confInput = modal.querySelector('#confirmPassInput');
        const curErr = modal.querySelector('#currentPassError');
        const newErr = modal.querySelector('#newPassError');
        const confErr = modal.querySelector('#confirmPassError');
        const saveBtn = modal.querySelector('#savePassBtn');
        curInput.focus();

        modal.querySelectorAll('.profile-toggle-pass').forEach(btn => {
          btn.addEventListener('click', () => {
            const target = modal.querySelector('#' + btn.dataset.target);
            const isPassword = target.type === 'password';
            target.type = isPassword ? 'text' : 'password';
            btn.querySelector('.eye-open').style.display = isPassword ? 'none' : 'block';
            btn.querySelector('.eye-closed').style.display = isPassword ? 'block' : 'none';
          });
        });

        function clearErr(el) { el.textContent = ''; }

        function getStrength(pw) {
          let score = 0;
          if (pw.length >= 6) score++;
          if (pw.length >= 10) score++;
          if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
          if (/\d/.test(pw)) score++;
          if (/[^a-zA-Z0-9]/.test(pw)) score++;
          return score;
        }

        const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
        const strengthColors = ['', '#E55555', '#E5A033', '#5B9BD5', '#5BA87C', '#3D8B5F'];
        const strengthFill = modal.querySelector('#passStrengthFill');
        const strengthLabel = modal.querySelector('#passStrengthLabel');

        newInput.addEventListener('input', () => {
          const val = newInput.value;
          if (!val) {
            strengthFill.style.width = '0%';
            strengthFill.style.background = 'transparent';
            strengthLabel.textContent = '';
            return;
          }
          const score = getStrength(val);
          const pct = (score / 5) * 100;
          strengthFill.style.width = pct + '%';
          strengthFill.style.background = strengthColors[score];
          strengthLabel.textContent = strengthLabels[score];
          strengthLabel.style.color = strengthColors[score];
        });

        saveBtn.addEventListener('click', () => {
          clearErr(curErr); clearErr(newErr); clearErr(confErr);
          let valid = true;

          if (!curInput.value) { curErr.textContent = 'Please enter current password'; valid = false; }
          if (!newInput.value) { newErr.textContent = 'Please enter new password'; valid = false; }
          else if (newInput.value.length < 6) { newErr.textContent = 'Must be at least 6 characters'; valid = false; }
          if (!confInput.value) { confErr.textContent = 'Please confirm new password'; valid = false; }
          else if (confInput.value !== newInput.value) { confErr.textContent = 'Passwords do not match'; valid = false; }
          if (!valid) return;

          const currentSession = getSession();
          const users = getUsers();
          const user = users.find(u => u.username === currentSession.username);

          if (!user || atob(user.password) !== curInput.value) {
            curErr.textContent = 'Current password is incorrect'; return;
          }

          user.password = btoa(newInput.value);
          saveUsers(users);
          showSuccessModal('Password changed successfully!');
        });
      });
    });
  }
}
