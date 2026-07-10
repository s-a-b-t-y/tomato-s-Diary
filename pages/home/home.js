document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const loadingScreen = document.getElementById('loadingScreen');

  const navbar = Navbar('home');
  app.insertBefore(navbar, app.firstChild);

  const footer = Footer();
  app.appendChild(footer);

  initNavbar();

  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
  }, 800);
});
