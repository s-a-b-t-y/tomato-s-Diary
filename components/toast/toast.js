function showToast(message, type = 'info', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('role', 'log');
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__icon">${icons[type]}</span>
    <span class="toast__message">${message}</span>
    <button class="toast__close" aria-label="Dismiss notification">
      ${ICONS.close}
    </button>
  `;

  const closeBtn = toast.querySelector('.toast__close');
  const remove = () => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  };

  closeBtn.addEventListener('click', remove);
  setTimeout(remove, duration);

  container.appendChild(toast);
  return toast;
}
