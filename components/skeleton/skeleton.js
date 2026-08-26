function SkeletonCard() {
  const card = document.createElement('article');
  card.className = 'skeleton skeleton-card';
  card.setAttribute('aria-hidden', 'true');

  card.innerHTML = `
    <div class="skeleton-card__header">
      <div class="skeleton__circle skeleton-card__mood"></div>
      <div class="skeleton__line skeleton-card__date"></div>
    </div>
    <div class="skeleton__line skeleton__line--long skeleton-card__title"></div>
    <div class="skeleton-card__preview">
      <div class="skeleton-card__preview-line skeleton__line--full"></div>
      <div class="skeleton-card__preview-line skeleton__line--full"></div>
      <div class="skeleton-card__preview-line skeleton__line--medium"></div>
    </div>
    <div class="skeleton-card__footer">
      <div class="skeleton-card__footer-left">
        <div class="skeleton__circle skeleton-card__footer-icon"></div>
        <div class="skeleton__line skeleton-card__footer-text"></div>
      </div>
      <div class="skeleton__line skeleton-card__footer-badge"></div>
    </div>
  `;

  return card;
}

function renderSkeletons(container, count = 6) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    container.appendChild(SkeletonCard());
  }
}
