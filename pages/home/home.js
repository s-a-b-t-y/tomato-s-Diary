document.addEventListener('DOMContentLoaded', () => {
  const session = getSession();
  if (!session) {
    window.location.href = 'Login/login.html';
    return;
  }

  const app = document.getElementById('app');
  const loadingScreen = document.getElementById('loadingScreen');

  const navbar = Navbar('home');
  app.insertBefore(navbar, app.firstChild);

  const footer = Footer();
  app.appendChild(footer);

  initNavbar();

  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
  }

  if (typeof showInitialTransition === 'function') {
    showInitialTransition();
  }

  if (typeof initPageTransition === 'function') {
    initPageTransition();
  }
});
