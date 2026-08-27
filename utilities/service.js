const ENTRIES_KEY = 'tomato_diary_entries';

const DiaryService = {
  saveDiary(entry) {
    const entries = JSON.parse(localStorage.getItem(ENTRIES_KEY) || '[]');
    const newEntry = {
      id: entry.id || generateId(),
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      date: entry.date,
      createdAt: entry.createdAt || new Date().toISOString(),
      updatedAt: entry.updatedAt || new Date().toISOString()
    };
    entries.push(newEntry);
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
    return { success: true, id: newEntry.id };
  },

  loadEntries(filters = {}) {
    let entries = JSON.parse(localStorage.getItem(ENTRIES_KEY) || '[]');

    if (filters.mood && filters.mood !== 'all') {
      entries = entries.filter(e => e.mood === filters.mood);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      entries = entries.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.content.toLowerCase().includes(q)
      );
    }

    if (filters.sort) {
      switch (filters.sort) {
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
    }

    return entries;
  },

  getEntryById(id) {
    const entries = JSON.parse(localStorage.getItem(ENTRIES_KEY) || '[]');
    return entries.find(e => e.id === id) || null;
  },

  updateEntry(id, updates) {
    const entries = JSON.parse(localStorage.getItem(ENTRIES_KEY) || '[]');
    const index = entries.findIndex(e => e.id === id);
    if (index === -1) return { success: false };
    entries[index] = { ...entries[index], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
    return { success: true };
  },

  deleteEntry(id) {
    let entries = JSON.parse(localStorage.getItem(ENTRIES_KEY) || '[]');
    entries = entries.filter(e => e.id !== id);
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
    return { success: true };
  },

  searchEntries(query) {
    const entries = JSON.parse(localStorage.getItem(ENTRIES_KEY) || '[]');
    return entries.filter(e =>
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.content.toLowerCase().includes(query.toLowerCase())
    );
  },

  authenticateUser(credentials) {
    return { success: true };
  },

  getUserProfile() {
    return { name: 'Diary Owner' };
  },

  syncToCloud() {
    return { success: true };
  }
};
