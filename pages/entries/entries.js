document.addEventListener('DOMContentLoaded', () => {
  if (!getSession()) {
    window.location.href = '../../Login/login.html';
    return;
  }

  const app = document.getElementById('app');
  const loadingScreen = document.getElementById('loadingScreen');

  const navbar = Navbar('entries');
  app.insertBefore(navbar, app.firstChild);

  const footer = Footer();
  app.appendChild(footer);

  initNavbar();

  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const moodFilter = document.getElementById('moodFilter');
  const entriesGrid = document.getElementById('entriesGrid');
  const pagination = document.getElementById('pagination');
  const entriesCount = document.getElementById('entriesCount');

  let currentMood = 'all';
  let currentSort = 'newest';
  let searchQuery = '';

  MOOD_OPTIONS.forEach(mood => {
    const chip = document.createElement('button');
    chip.className = 'entries-page__mood-chip';
    chip.dataset.mood = mood.value;
    chip.setAttribute('role', 'tab');
    chip.setAttribute('aria-selected', 'false');
    chip.innerHTML = `${mood.emoji} ${mood.label}`;
    moodFilter.appendChild(chip);
  });

  const moodChips = moodFilter.querySelectorAll('.entries-page__mood-chip');

  moodChips.forEach(chip => {
    chip.addEventListener('click', () => {
      moodChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
      currentMood = chip.dataset.mood;
      renderEntries();
    });
  });

  searchInput.addEventListener('input', debounce((e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderEntries();
  }, 300));

  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderEntries();
  });

  function getFilteredEntries() {
    let entries = [...SAMPLE_ENTRIES];

    if (searchQuery) {
      entries = entries.filter(e =>
        e.title.toLowerCase().includes(searchQuery) ||
        e.content.toLowerCase().includes(searchQuery)
      );
    }

    if (currentMood !== 'all') {
      entries = entries.filter(e => e.mood === currentMood);
    }

    switch (currentSort) {
      case 'newest':
        entries.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        entries.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'title':
        entries.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return entries;
  }

  function renderEntries() {
    const entries = getFilteredEntries();
    entriesGrid.innerHTML = '';

    if (entries.length === 0) {
      const empty = EmptyState({
        title: 'No memories found',
        quote: { text: 'Every great diary starts with the first page.', author: "Tomato's Diary" },
        buttonText: 'Write Something',
        buttonLink: '../diary/diary.html',
        illustration: 'entries'
      });
      entriesGrid.appendChild(empty);
      entriesCount.textContent = '';
      pagination.innerHTML = '';
      return;
    }

    entries.forEach((entry, index) => {
      const card = DiaryCard(entry);
      card.style.animationDelay = `${index * 0.08}s`;
      card.classList.add('animate-fade-in-up');
      entriesGrid.appendChild(card);
    });

    entriesCount.textContent = `${entries.length} ${entries.length === 1 ? 'memory' : 'memories'} found`;
    renderPagination(entries.length);
  }

  function renderPagination(total) {
    pagination.innerHTML = '';
    const pages = Math.ceil(total / 6);

    if (pages <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.className = 'entries-page__page-btn';
    prevBtn.disabled = true;
    prevBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>`;
    prevBtn.setAttribute('aria-label', 'Previous page');
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= pages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.className = `entries-page__page-btn ${i === 1 ? 'active' : ''}`;
      pageBtn.textContent = i;
      pageBtn.setAttribute('aria-label', `Page ${i}`);
      pagination.appendChild(pageBtn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'entries-page__page-btn';
    nextBtn.disabled = pages <= 1;
    nextBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>`;
    nextBtn.setAttribute('aria-label', 'Next page');
    pagination.appendChild(nextBtn);
  }

  renderEntries();

  setTimeout(() => {
    if (loadingScreen) loadingScreen.classList.add('hidden');
  }, 600);

  if (typeof initPageTransition === 'function') {
    initPageTransition();
  }
});
