function DiaryCard(entry, options = {}) {
  const { compact = false } = options;
  const card = document.createElement('article');
  card.className = `diary-card ${compact ? 'diary-card--compact' : ''}`;
  card.setAttribute('role', 'article');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Diary entry: ${entry.title}`);

  const preview = compact
    ? truncateText(entry.content, 80)
    : truncateText(entry.content, 150);

  card.innerHTML = `
    <div class="diary-card__header">
      <span class="diary-card__mood" aria-label="Mood: ${entry.mood}">${getMoodEmoji(entry.mood)}</span>
      <span class="diary-card__date">${formatDate(entry.date)}</span>
    </div>
    <h3 class="diary-card__title">${escapeHtml(entry.title)}</h3>
    <p class="diary-card__preview line-clamp-3">${escapeHtml(preview)}</p>
    <div class="diary-card__footer">
      <span class="diary-card__reading-time">
        ${ICONS.clock}
        ${estimateReadingTime(entry.content)}
      </span>
      <span class="diary-card__mood-label">${getMoodLabel(entry.mood)}</span>
    </div>
  `;

  card.addEventListener('click', () => {
    window.location.href = `../view-entry/view-entry.html?id=${entry.id}`;
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = `../view-entry/view-entry.html?id=${entry.id}`;
    }
  });

  return card;
}
