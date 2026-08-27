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

  const params = new URLSearchParams(window.location.search);
  const entryId = params.get('id');

  async function loadEntry() {
    if (!entryId) {
      window.location.href = '../not-found/not-found.html';
      return;
    }

    const entry = await DiaryService.getEntryById(entryId);

    if (!entry) {
      window.location.href = '../not-found/not-found.html';
      return;
    }

    document.getElementById('entryMood').textContent = getMoodEmoji(entry.mood);
    document.getElementById('entryDate').textContent = formatDate(entry.date);
    document.getElementById('entryMoodTag').textContent = getMoodLabel(entry.mood);
    document.getElementById('entryTitle').textContent = entry.title;
    document.getElementById('entryText').textContent = entry.content;
    document.getElementById('entryReadingTime').innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      ${estimateReadingTime(entry.content)} · ${countWords(entry.content)} words
    `;

    document.getElementById('deleteBtn').addEventListener('click', () => {
      Modal({
        title: 'Delete this memory?',
        body: '<p>This action cannot be undone. The entry will be permanently removed from your diary.</p>',
        confirmText: 'Delete',
        cancelText: 'Keep It',
        danger: true,
        onConfirm: async () => {
          await DiaryService.deleteEntry(entryId);
          showToast('Memory deleted', 'success');
          setTimeout(() => {
            window.location.href = '../entries/entries.html';
          }, 1000);
        }
      });
    });

    document.getElementById('editBtn').addEventListener('click', () => {
      showToast('Editing will be available soon', 'info');
    });
  }

  loadEntry();

  setTimeout(() => {
    if (loadingScreen) loadingScreen.classList.add('hidden');
  }, 300);

  if (typeof initPageTransition === 'function') {
    initPageTransition();
  }
});
