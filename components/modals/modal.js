function Modal(options = {}) {
  const {
    title = 'Confirm',
    body = '',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm = null,
    onCancel = null,
    danger = false
  } = options;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', title);

  overlay.innerHTML = `
    <div class="modal">
      <div class="modal__header">
        <h3 class="modal__title">${title}</h3>
        <button class="modal__close" aria-label="Close modal">${ICONS.close}</button>
      </div>
      <div class="modal__body">${body}</div>
      <div class="modal__footer">
        <button class="btn btn--secondary modal__cancel">${cancelText}</button>
        <button class="btn ${danger ? 'btn--danger' : 'btn--primary'} modal__confirm">${confirmText}</button>
      </div>
    </div>
  `;

  const closeBtn = overlay.querySelector('.modal__close');
  const cancelBtn = overlay.querySelector('.modal__cancel');
  const confirmBtn = overlay.querySelector('.modal__confirm');

  const close = () => {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  };

  closeBtn.addEventListener('click', () => {
    close();
    if (onCancel) onCancel();
  });

  cancelBtn.addEventListener('click', () => {
    close();
    if (onCancel) onCancel();
  });

  confirmBtn.addEventListener('click', () => {
    close();
    if (onConfirm) onConfirm();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      close();
      if (onCancel) onCancel();
    }
  });

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));

  return { close };
}
