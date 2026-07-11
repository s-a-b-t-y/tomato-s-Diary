function LoadingScreen() {
  const screen = document.createElement('div');
  screen.className = 'loading-screen';
  screen.setAttribute('role', 'status');
  screen.setAttribute('aria-label', 'Loading');

  const isSubPage = window.location.pathname.includes('/pages/');
  const logoPath = isSubPage ? '../../assets/icons/Tomato-diary-favicon.png' : 'assets/icons/Tomato-diary-favicon.png';

  screen.innerHTML = `
    <div class="loading-screen__logo-wrap">
      <img src="${logoPath}" alt="Tomato's Diary" class="loading-screen__logo">
    </div>
    <p class="loading-screen__text">
      Opening your diary
      <span class="loading-screen__dots">
        <span></span><span></span><span></span>
      </span>
    </p>
  `;

  return screen;
}

function showLoading() {
  let screen = document.querySelector('.loading-screen');
  if (!screen) {
    screen = LoadingScreen();
    document.body.appendChild(screen);
  }
  screen.classList.remove('hidden');
}

function hideLoading() {
  const screen = document.querySelector('.loading-screen');
  if (screen) {
    screen.classList.add('hidden');
  }
}
