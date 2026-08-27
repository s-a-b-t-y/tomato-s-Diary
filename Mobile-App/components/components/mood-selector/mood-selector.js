function MoodSelector(selectedMood, onSelect) {
  const container = document.createElement('div');
  container.className = 'mood-trigger';

  let currentMood = selectedMood;

  function getMoodData(value) {
    return MOOD_OPTIONS.find(m => m.value === value) || null;
  }

  function renderButton() {
    const mood = getMoodData(currentMood);
    container.innerHTML = `
      <button class="mood-trigger__btn" type="button" aria-label="Select mood">
        <span class="mood-trigger__emoji">${mood ? mood.emoji : '🎭'}</span>
        <span class="mood-trigger__text">${mood ? mood.label : 'How are you feeling?'}</span>
        <svg class="mood-trigger__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    `;

    container.querySelector('.mood-trigger__btn').addEventListener('click', openMoodModal);
  }

  function openMoodModal() {
    const overlay = document.createElement('div');
    overlay.className = 'mood-modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Select your mood');

    let gridHTML = '';
    MOOD_OPTIONS.forEach(mood => {
      const isActive = currentMood === mood.value;
      gridHTML += `
        <button class="mood-modal__option ${isActive ? 'mood-modal__option--active' : ''}"
                type="button"
                data-mood="${mood.value}"
                aria-label="${mood.label}">
          <span class="mood-modal__emoji">${mood.emoji}</span>
          <span class="mood-modal__label">${mood.label}</span>
        </button>
      `;
    });

    overlay.innerHTML = `
      <div class="mood-modal">
        <div class="mood-modal__header">
          <h3 class="mood-modal__title">How are you feeling?</h3>
          <button class="mood-modal__close" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="mood-modal__grid">${gridHTML}</div>
      </div>
    `;

    function closeModal() {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
    }

    overlay.querySelector('.mood-modal__close').addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    overlay.querySelectorAll('.mood-modal__option').forEach(btn => {
      btn.addEventListener('click', () => {
        currentMood = btn.dataset.mood;
        if (onSelect) onSelect(currentMood);
        renderButton();
        closeModal();
      });
    });

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));
  }

  renderButton();

  return container;
}
