document.addEventListener('DOMContentLoaded', () => {
  if (!getSession()) {
    window.location.href = '../../Login/login.html';
    return;
  }

  const app = document.getElementById('app');
  const loadingScreen = document.getElementById('loadingScreen');

  const navbar = Navbar('diary');
  app.insertBefore(navbar, app.firstChild);

  initNavbar();

  const dateDisplay = document.getElementById('diaryDateDisplay');
  const dateChangeBtn = document.getElementById('dateChangeBtn');
  const titleInput = document.getElementById('diaryTitle');
  const contentArea = document.getElementById('diaryContent');
  const pageDisplay = document.getElementById('pageDisplay');
  const pageInfo = document.getElementById('pageInfo');
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  const wordCountEl = document.getElementById('wordCount');
  const charCountEl = document.getElementById('charCount');
  const readingTimeEl = document.getElementById('readingTime');
  const saveBtn = document.getElementById('saveBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const moodContainer = document.getElementById('moodSelector');

  let selectedMood = '';
  let selectedDate = new Date();
  let pages = [''];
  let currentPage = 0;
  let isAnimating = false;

  function updateDateDisplay() {
    dateDisplay.textContent = formatDate(selectedDate);
  }

  updateDateDisplay();

  function openDatePicker() {
    TomatoDatePicker({
      selectedDate: selectedDate,
      onSelect: function(date) {
        selectedDate = date;
        updateDateDisplay();
      }
    });
  }

  dateChangeBtn.addEventListener('click', openDatePicker);
  dateDisplay.addEventListener('click', openDatePicker);

  const moodSelector = MoodSelector(selectedMood, (mood) => {
    selectedMood = mood;
  });
  moodContainer.appendChild(moodSelector);

  function getPageCapacity() {
    const style = getComputedStyle(pageDisplay);
    const measure = document.createElement('div');
    measure.style.cssText = `
      position:absolute; visibility:hidden; white-space:pre-wrap; word-wrap:break-word;
      font-family:${style.fontFamily}; font-size:${style.fontSize}; line-height:${style.lineHeight};
      width:${pageDisplay.clientWidth}px; padding:${style.padding};
    `;
    measure.textContent = 'M';
    document.body.appendChild(measure);
    const lineHeight = measure.offsetHeight;
    document.body.removeChild(measure);

    const pageHeight = pageDisplay.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    const linesPerPage = Math.floor(pageHeight / lineHeight);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = `${style.fontSize} ${style.fontFamily}`;
    const avgCharWidth = ctx.measureText('abcdefghijklmnopqrstuvwxyz').width / 26;
    const textWidth = pageDisplay.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const charsPerLine = Math.floor(textWidth / avgCharWidth);

    return { linesPerPage, charsPerLine, lineHeight };
  }

  function splitIntoPages(text) {
    if (!text) return [''];

    const { linesPerPage, charsPerLine } = getPageCapacity();
    const capacity = linesPerPage * charsPerLine;
    const result = [];
    let remaining = text;

    while (remaining.length > 0) {
      if (remaining.length <= capacity) {
        result.push(remaining);
        break;
      }

      let breakIdx = remaining.lastIndexOf('\n', capacity);
      if (breakIdx <= 0) breakIdx = remaining.lastIndexOf(' ', capacity);
      if (breakIdx <= 0) breakIdx = capacity;

      result.push(remaining.substring(0, breakIdx));
      remaining = remaining.substring(breakIdx).replace(/^\n/, '').replace(/^ /, '');
    }

    return result.length ? result : [''];
  }

  function renderPage(animate = false, direction = 'next') {
    if (isAnimating) return;

    const text = pages[currentPage] || '';
    pageDisplay.textContent = text;
    contentArea.value = text;

    const isEmpty = text.trim().length === 0;
    pageDisplay.classList.toggle('diary-page__page--empty', isEmpty);

    pageInfo.textContent = `Page ${currentPage + 1}`;
    prevPageBtn.disabled = currentPage === 0;
    nextPageBtn.disabled = false;

    if (animate) {
      isAnimating = true;
      pageDisplay.classList.remove('diary-page__page--flip-out-left', 'diary-page__page--flip-in-right', 'diary-page__page--flip-out-right', 'diary-page__page--flip-in-left');

      if (direction === 'next') {
        pageDisplay.classList.add('diary-page__page--flip-out-left');
        setTimeout(() => {
          pageDisplay.classList.remove('diary-page__page--flip-out-left');
          pageDisplay.textContent = text;
          pageDisplay.classList.toggle('diary-page__page--empty', isEmpty);
          pageDisplay.classList.add('diary-page__page--flip-in-right');
          setTimeout(() => {
            pageDisplay.classList.remove('diary-page__page--flip-in-right');
            isAnimating = false;
          }, 350);
        }, 350);
      } else {
        pageDisplay.classList.add('diary-page__page--flip-out-right');
        setTimeout(() => {
          pageDisplay.classList.remove('diary-page__page--flip-out-right');
          pageDisplay.textContent = text;
          pageDisplay.classList.toggle('diary-page__page--empty', isEmpty);
          pageDisplay.classList.add('diary-page__page--flip-in-left');
          setTimeout(() => {
            pageDisplay.classList.remove('diary-page__page--flip-in-left');
            isAnimating = false;
          }, 350);
        }, 350);
      }
    }
  }

  function syncContent() {
    const fullText = contentArea.value;
    pages = splitIntoPages(fullText);

    if (currentPage >= pages.length) {
      currentPage = pages.length - 1;
    }

    renderPage(false);
  }

  function syncHiddenTextarea() {
    contentArea.value = pages.join('\n\n');
    updateStats(contentArea.value);
  }

  contentArea.addEventListener('input', () => {
    const fullText = contentArea.value;
    const oldPageCount = pages.length;

    pages = splitIntoPages(fullText);

    if (pages.length > oldPageCount && currentPage === oldPageCount - 1) {
      currentPage = pages.length - 1;
      renderPage(true, 'next');
    } else {
      if (currentPage >= pages.length) {
        currentPage = pages.length - 1;
      }
      renderPage(false);
    }

    updateStats(fullText);
  });

  prevPageBtn.addEventListener('click', () => {
    if (currentPage > 0 && !isAnimating) {
      currentPage--;
      renderPage(true, 'prev');
    }
  });

  nextPageBtn.addEventListener('click', () => {
    if (isAnimating) return;

    if (currentPage >= pages.length - 1) {
      pages.push('');
      syncHiddenTextarea();
    }

    currentPage++;
    renderPage(true, 'next');
  });

  function updateStats(text) {
    wordCountEl.textContent = countWords(text);
    charCountEl.textContent = countCharacters(text);
    readingTimeEl.textContent = estimateReadingTime(text);
  }

  saveBtn.addEventListener('click', async () => {
    const title = titleInput.value.trim();
    const content = contentArea.value.trim();

    if (!title && !content) {
      showToast('Write something before saving', 'warning');
      return;
    }

    if (!title) {
      showToast('Give your entry a title', 'warning');
      titleInput.focus();
      return;
    }

    if (!content) {
      showToast('Write your thoughts before saving', 'warning');
      contentArea.focus();
      return;
    }

    const entry = {
      id: generateId(),
      title,
      content,
      mood: selectedMood || 'calm',
      date: selectedDate.toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveBtn.disabled = true;
    saveBtn.innerHTML = `
      <span class="loading-screen__dots"><span></span><span></span><span></span></span>
      Saving...
    `;

    await DiaryService.saveDiary(entry);

    showSaveSuccess();

    setTimeout(() => {
      titleInput.value = '';
      contentArea.value = '';
      selectedMood = '';
      selectedDate = new Date();
      currentPage = 0;
      pages = [''];
      updateDateDisplay();
      updateStats('');
      renderPage(false);
      saveBtn.disabled = false;
      saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
        Save Entry
      `;
    }, 1500);
  });

  cancelBtn.addEventListener('click', () => {
    const hasContent = titleInput.value.trim() || contentArea.value.trim();
    if (hasContent) {
      Modal({
        title: 'Discard this entry?',
        body: '<p>You have unsaved changes. Are you sure you want to leave? Your words will be lost.</p>',
        confirmText: 'Discard',
        cancelText: 'Keep Writing',
        danger: true,
        onConfirm: () => {
          window.location.href = '../../index.html';
        }
      });
    } else {
      window.location.href = '../../index.html';
    }
  });

  setTimeout(() => {
    if (loadingScreen) loadingScreen.classList.add('hidden');
  }, 300);

  if (typeof initPageTransition === 'function') {
    initPageTransition();
  }

  function showSaveSuccess() {
    const overlay = document.createElement('div');
    overlay.className = 'save-success-overlay';
    overlay.innerHTML = `
      <div class="save-success">
        <div class="save-success__circle">
          <div class="save-success__glow"></div>
          <svg class="save-success__check" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="25"/>
            <path d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <span class="save-success__emoji">❤️</span>
        <span class="save-success__text">Done!</span>
        <span class="save-success__subtext">Your entry has been saved beautifully</span>
      </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));

    setTimeout(() => {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 400);
    }, 2200);
  }

});