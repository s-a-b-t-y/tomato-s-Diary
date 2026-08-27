function EmptyState(options = {}) {
  const {
    title = 'Your diary is waiting',
    quote = null,
    buttonText = 'Write Your First Memory',
    buttonLink = 'pages/diary/diary.html',
    illustration = 'diary'
  } = options;

  const selectedQuote = quote || MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

  const container = document.createElement('div');
  container.className = 'empty-state animate-fade-in-up';

  const illustrations = {
    diary: `<svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="110" cy="110" r="100" fill="#1E2D4F" opacity="0.3"/>
      <rect x="55" y="40" width="110" height="140" rx="8" fill="#162040" stroke="#5B9BD5" stroke-width="2"/>
      <rect x="65" y="40" width="100" height="140" rx="8" fill="#1E2D4F" stroke="#5B9BD5" stroke-width="1.5"/>
      <line x1="80" y1="75" x2="150" y2="75" stroke="#3A4F73" stroke-width="2" stroke-linecap="round"/>
      <line x1="80" y1="95" x2="135" y2="95" stroke="#3A4F73" stroke-width="2" stroke-linecap="round"/>
      <line x1="80" y1="115" x2="145" y2="115" stroke="#3A4F73" stroke-width="2" stroke-linecap="round"/>
      <line x1="80" y1="135" x2="120" y2="135" stroke="#3A4F73" stroke-width="2" stroke-linecap="round"/>
      <circle cx="160" cy="55" r="18" fill="#5B9BD5" opacity="0.15"/>
      <path d="M155 50C155 50 162 55 162 60C162 65 155 67 155 67" stroke="#C9A96E" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="45" cy="150" r="12" fill="#8BA3CC" opacity="0.2"/>
      <circle cx="175" cy="140" r="8" fill="#5B9BD5" opacity="0.15"/>
    </svg>`,
    entries: `<svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="110" cy="110" r="100" fill="#162040" opacity="0.3"/>
      <rect x="40" y="50" width="80" height="100" rx="6" fill="#1E2D4F" stroke="#5B9BD5" stroke-width="1.5"/>
      <rect x="55" y="65" width="50" height="4" rx="2" fill="#3A4F73"/>
      <rect x="55" y="78" width="40" height="3" rx="1.5" fill="#3A4F73" opacity="0.6"/>
      <rect x="55" y="88" width="45" height="3" rx="1.5" fill="#3A4F73" opacity="0.4"/>
      <rect x="100" y="40" width="80" height="100" rx="6" fill="#1E2D4F" stroke="#5B9BD5" stroke-width="1.5" transform="rotate(5 140 90)"/>
      <rect x="115" y="60" width="50" height="4" rx="2" fill="#3A4F73" transform="rotate(5 140 62)"/>
      <rect x="115" y="73" width="40" height="3" rx="1.5" fill="#3A4F73" opacity="0.6" transform="rotate(5 135 74)"/>
      <circle cx="160" cy="170" r="15" fill="#5B9BD5" opacity="0.1"/>
      <circle cx="50" cy="170" r="10" fill="#8BA3CC" opacity="0.15"/>
    </svg>`
  };

  container.innerHTML = `
    <div class="empty-state__illustration">
      ${illustrations[illustration] || illustrations.diary}
    </div>
    <h2 class="empty-state__title">${title}</h2>
    <p class="empty-state__quote">
      "${selectedQuote.text}"
      <span class="empty-state__quote-author">— ${selectedQuote.author}</span>
    </p>
    <div class="empty-state__action">
      <a href="${buttonLink}" class="btn btn--primary btn--large">
        ${ICONS.pen}
        <span>${buttonText}</span>
      </a>
    </div>
  `;

  return container;
}
