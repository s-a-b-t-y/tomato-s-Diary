const DiaryService = {
  async saveDiary(entry) {
    // Future Backend Integration
    // POST /api/entries
    console.log('Save entry:', entry);
    return { success: true, id: generateId() };
  },

  async loadEntries(filters = {}) {
    // Future Backend Integration
    // GET /api/entries?mood=&sort=&page=
    console.log('Load entries with filters:', filters);
    return SAMPLE_ENTRIES;
  },

  async getEntryById(id) {
    // Future Backend Integration
    // GET /api/entries/:id
    console.log('Get entry by ID:', id);
    return SAMPLE_ENTRIES.find(e => e.id === id) || null;
  },

  async updateEntry(id, updates) {
    // Future Backend Integration
    // PUT /api/entries/:id
    console.log('Update entry:', id, updates);
    return { success: true };
  },

  async deleteEntry(id) {
    // Future Backend Integration
    // DELETE /api/entries/:id
    console.log('Delete entry:', id);
    return { success: true };
  },

  async searchEntries(query) {
    // Future Backend Integration
    // GET /api/entries/search?q=
    console.log('Search entries:', query);
    return SAMPLE_ENTRIES.filter(e =>
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.content.toLowerCase().includes(query.toLowerCase())
    );
  },

  async authenticateUser(credentials) {
    // Future Backend Integration
    // POST /api/auth/login
    console.log('Auth:', credentials);
    return { success: true };
  },

  async getUserProfile() {
    // Future Backend Integration
    // GET /api/user/profile
    console.log('Get user profile');
    return { name: 'Diary Owner' };
  },

  async syncToCloud() {
    // Future Backend Integration
    // POST /api/sync
    console.log('Cloud sync triggered');
    return { success: true };
  }
};
