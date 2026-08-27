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

    // Sync to Firestore in background
    this._syncEntryToFirestore(newEntry);

    return { success: true, id: newEntry.id };
  },

  async _syncEntryToFirestore(entry) {
    try {
      if (!window.FireDB || !window.FireDB._ready) return;
      const session = JSON.parse(localStorage.getItem('tomato_diary_session') || '{}');
      const uid = session.firebaseUid || session.id;
      if (!uid) return;
      const fsId = await FireDB.saveEntry(uid, entry);
      // Update local entry with Firestore ID
      const entries = JSON.parse(localStorage.getItem(ENTRIES_KEY) || '[]');
      const idx = entries.findIndex(e => e.id === entry.id);
      if (idx > -1) {
        entries[idx].id = fsId;
        entries[idx].firestoreId = fsId;
        localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
      }
    } catch (err) {
      console.warn('[DiaryService] Firestore sync error:', err.message);
    }
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

    // Sync update to Firestore
    this._updateEntryInFirestore(id, entries[index]);

    return { success: true };
  },

  async _updateEntryInFirestore(id, entry) {
    try {
      if (!window.FireDB || !window.FireDB._ready) return;
      const session = JSON.parse(localStorage.getItem('tomato_diary_session') || '{}');
      const uid = session.firebaseUid || session.id;
      if (!uid) return;
      const docId = entry.firestoreId || entry.id;
      await FireDB.updateEntry(docId, {
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        date: entry.date
      });
    } catch (err) {
      console.warn('[DiaryService] Firestore update error:', err.message);
    }
  },

  deleteEntry(id) {
    let entries = JSON.parse(localStorage.getItem(ENTRIES_KEY) || '[]');
    const entry = entries.find(e => e.id === id);
    entries = entries.filter(e => e.id !== id);
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));

    // Delete from Firestore
    if (entry) this._deleteEntryFromFirestore(entry);

    return { success: true };
  },

  async _deleteEntryFromFirestore(entry) {
    try {
      if (!window.FireDB || !window.FireDB._ready) return;
      const docId = entry.firestoreId || entry.id;
      await FireDB.deleteEntry(docId);
    } catch (err) {
      console.warn('[DiaryService] Firestore delete error:', err.message);
    }
  },

  searchEntries(query) {
    const entries = JSON.parse(localStorage.getItem(ENTRIES_KEY) || '[]');
    return entries.filter(e =>
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.content.toLowerCase().includes(query.toLowerCase())
    );
  },

  // Load entries from Firestore and merge with localStorage
  async loadFromCloud() {
    try {
      if (!window.FireDB || !window.FireDB._ready) return;
      const session = JSON.parse(localStorage.getItem('tomato_diary_session') || '{}');
      const uid = session.firebaseUid || session.id;
      if (!uid) return;

      const remoteEntries = await FireDB.getEntries(uid);
      if (!remoteEntries || remoteEntries.length === 0) return;

      const localEntries = JSON.parse(localStorage.getItem(ENTRIES_KEY) || '[]');
      const localMap = {};
      localEntries.forEach(e => { localMap[e.id] = e; });

      for (const remote of remoteEntries) {
        if (!localMap[remote.id]) {
          localEntries.push(remote);
        }
      }
      localStorage.setItem(ENTRIES_KEY, JSON.stringify(localEntries));
      console.log('[DiaryService] Cloud load complete, ' + remoteEntries.length + ' entries');
    } catch (err) {
      console.warn('[DiaryService] Cloud load error:', err.message);
    }
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
