function LoadingScreen() {
  const screen = document.createElement('div');
  screen.className = 'loading-screen';
  screen.setAttribute('role', 'status');
  screen.setAttribute('aria-label', 'Loading');

  screen.innerHTML = `
    <div class="loading-screen__book">
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="8" width="35" height="44" rx="4" fill="#1E2D4F" stroke="#5B9BD5" stroke-width="1.5"/>
        <rect x="15" y="8" width="35" height="44" rx="4" fill="#162040" stroke="#5B9BD5" stroke-width="1.5"/>
        <line x1="22" y1="20" x2="40" y2="20" stroke="#3A4F73" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="22" y1="28" x2="36" y2="28" stroke="#3A4F73" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="22" y1="36" x2="38" y2="36" stroke="#3A4F73" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </div>
    <p class="loading-screen__text">
      Opening your dairy
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
