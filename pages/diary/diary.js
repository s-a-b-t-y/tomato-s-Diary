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
  const wordCountEl = document.getElementById('wordCount');
  const charCountEl = document.getElementById('charCount');
  const readingTimeEl = document.getElementById('readingTime');
  const saveBtn = document.getElementById('saveBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const moodContainer = document.getElementById('moodSelector');

  let selectedMood = '';
  let selectedDate = new Date();

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

  const updateStats = debounce(() => {
    const text = contentArea.value;
    wordCountEl.textContent = countWords(text);
    charCountEl.textContent = countCharacters(text);
    readingTimeEl.textContent = estimateReadingTime(text);
  }, 150);

  contentArea.addEventListener('input', updateStats);

  contentArea.addEventListener('input', () => {
    contentArea.style.height = 'auto';
    contentArea.style.height = contentArea.scrollHeight + 'px';
  });

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

    showToast('Your entry has been saved beautifully', 'success');

    setTimeout(() => {
      titleInput.value = '';
      contentArea.value = '';
      selectedMood = '';
      selectedDate = new Date();
      updateDateDisplay();
      updateStats();
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
  }, 600);

  if (typeof initPageTransition === 'function') {
    initPageTransition();
  }
});
