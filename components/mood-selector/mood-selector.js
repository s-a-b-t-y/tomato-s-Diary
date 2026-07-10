function MoodSelector(selectedMood, onSelect) {
  const container = document.createElement('div');
  container.className = 'mood-selector';
  container.setAttribute('role', 'radiogroup');
  container.setAttribute('aria-label', 'Select your mood');

  MOOD_OPTIONS.forEach(mood => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = `mood-selector__option ${selectedMood === mood.value ? 'selected' : ''}`;
    option.setAttribute('role', 'radio');
    option.setAttribute('aria-checked', selectedMood === mood.value ? 'true' : 'false');
    option.setAttribute('aria-label', mood.label);
    option.innerHTML = `
      <span class="mood-selector__emoji">${mood.emoji}</span>
      <span class="mood-selector__label">${mood.label}</span>
    `;

    option.addEventListener('click', () => {
      container.querySelectorAll('.mood-selector__option').forEach(opt => {
        opt.classList.remove('selected');
        opt.setAttribute('aria-checked', 'false');
      });
      option.classList.add('selected');
      option.setAttribute('aria-checked', 'true');
      if (onSelect) onSelect(mood.value);
    });

    container.appendChild(option);
  });

  return container;
}
