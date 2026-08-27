document.addEventListener('DOMContentLoaded', () => {
  if (!getSession()) {
    window.location.href = '../../Login/login.html';
    return;
  }

  const app = document.getElementById('app');
  const loadingScreen = document.getElementById('loadingScreen');

  const navbar = Navbar('entries');
  app.insertBefore(navbar, app.firstChild);


  initNavbar();

  const searchInput = document.getElementById('searchInput');
  const searchWrapper = document.getElementById('searchWrapper');
  const searchClear = document.getElementById('searchClear');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInputFloating = document.getElementById('searchInputFloating');
  const searchClearFloating = document.getElementById('searchClearFloating');
  const sortDropdown = document.getElementById('sortDropdown');
  const sortTrigger = document.getElementById('sortTrigger');
  const sortMenu = document.getElementById('sortMenu');
  const sortLabel = sortTrigger.querySelector('.entries-page__sort-label');
  const sortOptions = sortMenu.querySelectorAll('.entries-page__sort-option');
  const moodFilter = document.getElementById('moodFilter');
  const entriesGrid = document.getElementById('entriesGrid');
  const pagination = document.getElementById('pagination');
  const entriesCount = document.getElementById('entriesCount');

  let currentMood = 'all';
  let currentSort = 'newest';
  let searchQuery = '';

  const moodDropdown = document.getElementById('moodDropdown');
  const moodTrigger = document.getElementById('moodTrigger');
  const moodMenu = document.getElementById('moodMenu');
  const moodTriggerEmoji = moodTrigger.querySelector('.entries-page__mood-trigger-emoji');
  const moodTriggerLabel = moodTrigger.querySelector('.entries-page__mood-trigger-label');

  MOOD_OPTIONS.forEach(mood => {
    const option = document.createElement('button');
    option.className = 'entries-page__mood-option';
    option.dataset.mood = mood.value;
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', 'false');
    option.innerHTML = `<span class="entries-page__mood-option-emoji">${mood.emoji}</span><span class="entries-page__mood-option-text">${mood.label}</span>`;
    moodMenu.appendChild(option);
  });

  const moodOptions = moodMenu.querySelectorAll('.entries-page__mood-option');

  moodTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = moodDropdown.classList.contains('open');
    if (isOpen) {
      closeMoodMenu();
    } else {
      moodDropdown.classList.add('open');
      moodTrigger.setAttribute('aria-expanded', 'true');
    }
  });

  moodOptions.forEach(option => {
    option.addEventListener('click', () => {
      moodOptions.forEach(o => {
        o.classList.remove('active');
        o.setAttribute('aria-selected', 'false');
      });
      option.classList.add('active');
      option.setAttribute('aria-selected', 'true');
      moodTriggerEmoji.textContent = option.querySelector('.entries-page__mood-option-emoji').textContent;
      moodTriggerLabel.textContent = option.querySelector('.entries-page__mood-option-text').textContent;
      currentMood = option.dataset.mood;
      closeMoodMenu();
      renderEntries();
    });
  });

  function closeMoodMenu() {
    moodDropdown.classList.remove('open');
    moodTrigger.setAttribute('aria-expanded', 'false');
  }

  document.addEventListener('click', (e) => {
    if (!moodDropdown.contains(e.target)) {
      closeMoodMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMoodMenu();
    }
  });

  function openSearchOverlay() {
    searchOverlay.classList.add('active');
    searchInputFloating.value = searchInput.value;
    searchInputFloating.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeSearchOverlay() {
    searchOverlay.classList.remove('active');
    searchInput.value = searchInputFloating.value;
    searchQuery = searchInput.value.trim().toLowerCase();
    if (searchQuery) {
      searchWrapper.classList.add('has-value');
    } else {
      searchWrapper.classList.remove('has-value');
    }
    renderEntries();
    document.body.style.overflow = '';
  }

  searchInput.addEventListener('click', () => {
    openSearchOverlay();
  });

  searchInput.addEventListener('focus', () => {
    openSearchOverlay();
  });

  searchInputFloating.addEventListener('input', debounce((e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    searchInput.value = searchInputFloating.value;
    if (searchQuery) {
      searchWrapper.classList.add('has-value');
    } else {
      searchWrapper.classList.remove('has-value');
    }
    renderEntries();
  }, 300));

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchWrapper.classList.remove('has-value');
    renderEntries();
    searchInput.focus();
  });

  searchClearFloating.addEventListener('click', () => {
    searchInputFloating.value = '';
    searchInput.value = '';
    searchQuery = '';
    searchWrapper.classList.remove('has-value');
    renderEntries();
    closeSearchOverlay();
  });

  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      closeSearchOverlay();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearchOverlay();
    }
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearchOverlay();
    }
  });

  sortTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = sortDropdown.classList.contains('open');
    if (isOpen) {
      closeSortMenu();
    } else {
      sortDropdown.classList.add('open');
      sortTrigger.setAttribute('aria-expanded', 'true');
    }
  });

  sortOptions.forEach(option => {
    option.addEventListener('click', () => {
      sortOptions.forEach(o => {
        o.classList.remove('active');
        o.setAttribute('aria-selected', 'false');
      });
      option.classList.add('active');
      option.setAttribute('aria-selected', 'true');
      sortLabel.textContent = option.textContent.trim();
      currentSort = option.dataset.value;
      closeSortMenu();
      renderEntries();
    });
  });

  function closeSortMenu() {
    sortDropdown.classList.remove('open');
    sortTrigger.setAttribute('aria-expanded', 'false');
  }

  document.addEventListener('click', (e) => {
    if (!sortDropdown.contains(e.target)) {
      closeSortMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSortMenu();
    }
  });

  function getFilteredEntries() {
    return DiaryService.loadEntries({
      search: searchQuery,
      mood: currentMood,
      sort: currentSort
    });
  }

  let isLoading = true;

  function renderEntries() {
    const entries = getFilteredEntries();

    if (isLoading) {
      renderSkeletons(entriesGrid, 6);
      entriesCount.textContent = '';
      pagination.innerHTML = '';
      return;
    }

    entriesGrid.innerHTML = '';

    if (entries.length === 0) {
      const empty = EmptyState({
        title: 'No memories found',
        quote: { text: 'Every great diary starts with the first page.', author: "Cutie Pie J&I" },
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

  setTimeout(() => {
    isLoading = false;
    renderEntries();
  }, 800);

  setTimeout(() => {
    if (loadingScreen) loadingScreen.classList.add('hidden');
  }, 300);

  if (typeof initPageTransition === 'function') {
    initPageTransition();
  }
});
