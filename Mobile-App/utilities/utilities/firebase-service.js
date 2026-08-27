// ============================================
// Firebase Service — Global Layer
// Works with plain <script> tags (no ES modules)
// ============================================

const FireDB = {
  app: null,
  auth: null,
  db: null,
  storage: null,
  _ready: false,
  _syncInterval: null,

  // ===== INITIALIZE =====
  async init() {
    if (this._ready) return;
    try {
      this.app = firebase.app();
    } catch {
      const config = {
        apiKey: "AIzaSyDMSLW_8pgGFBaUeCAwvs4StoSmPRd3Ixs",
        authDomain: "tomatos-diary.firebaseapp.com",
        projectId: "tomatos-diary",
        storageBucket: "tomatos-diary.firebasestorage.app",
        messagingSenderId: "579115848755",
        appId: "1:579115848755:web:8f49c0e9a1d9befcfe3f46"
      };
      this.app = firebase.initializeApp(config);
    }
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.storage = firebase.storage();
    this._ready = true;
    console.log('[FireDB] Firebase initialized');
  },

  // ===== AUTH =====
  async signup(name, username, email, password) {
    await this.init();
    const cred = await this.auth.createUserWithEmailAndPassword(email, password);
    await cred.user.updateProfile({ displayName: name });
    await this.db.collection('users').doc(cred.user.uid).set({
      name: name,
      username: username,
      email: email,
      provider: 'local',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return { success: true, uid: cred.user.uid };
  },

  async login(email, password) {
    await this.init();
    const cred = await this.auth.signInWithEmailAndPassword(email, password);
    const snap = await this.db.collection('users').doc(cred.user.uid).get();
    const userData = snap.exists ? snap.data() : {};
    return {
      success: true,
      uid: cred.user.uid,
      name: userData.name || cred.user.displayName || '',
      username: userData.username || '',
      email: cred.user.email
    };
  },

  async logout() {
    await this.init();
    await this.auth.signOut();
  },

  getCurrentUser() {
    return this.auth ? this.auth.currentUser : null;
  },

  // ===== USERS COLLECTION =====
  async saveUser(uid, data) {
    await this.init();
    await this.db.collection('users').doc(uid).set(data, { merge: true });
  },

  async getUser(uid) {
    await this.init();
    const snap = await this.db.collection('users').doc(uid).get();
    return snap.exists ? { id: snap.id, ...snap.data() } : null;
  },

  async getUserByUsername(username) {
    await this.init();
    const snap = await this.db.collection('users')
      .where('username', '==', username).limit(1).get();
    return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
  },

  // ===== ENTRIES COLLECTION =====
  async saveEntry(uid, entry) {
    await this.init();
    const entryData = {
      uid: uid,
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      date: entry.date,
      createdAt: entry.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (entry.id && entry.id.startsWith('fs_')) {
      await this.db.collection('entries').doc(entry.id).set(entryData, { merge: true });
      return entry.id;
    } else {
      const ref = await this.db.collection('entries').add(entryData);
      return ref.id;
    }
  },

  async getEntries(uid) {
    await this.init();
    const snap = await this.db.collection('entries')
      .where('uid', '==', uid)
      .orderBy('date', 'desc').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async getEntry(entryId) {
    await this.init();
    const snap = await this.db.collection('entries').doc(entryId).get();
    return snap.exists ? { id: snap.id, ...snap.data() } : null;
  },

  async updateEntry(entryId, data) {
    await this.init();
    data.updatedAt = new Date().toISOString();
    await this.db.collection('entries').doc(entryId).set(data, { merge: true });
  },

  async deleteEntry(entryId) {
    await this.init();
    await this.db.collection('entries').doc(entryId).delete();
  },

  // ===== PROFILES COLLECTION =====
  async saveProfile(uid, data) {
    await this.init();
    await this.db.collection('profiles').doc(uid).set(data, { merge: true });
  },

  async getProfile(uid) {
    await this.init();
    const snap = await this.db.collection('profiles').doc(uid).get();
    return snap.exists ? snap.data() : null;
  },

  // ===== AUTO-SYNC: localStorage → Firestore =====
  startAutoSync(uid, intervalMs) {
    if (this._syncInterval) clearInterval(this._syncInterval);
    intervalMs = intervalMs || 45000;
    this._syncInterval = setInterval(() => this.syncNow(uid), intervalMs);
    console.log('[FireDB] Auto-sync started every ' + (intervalMs / 1000) + 's');
  },

  stopAutoSync() {
    if (this._syncInterval) {
      clearInterval(this._syncInterval);
      this._syncInterval = null;
      console.log('[FireDB] Auto-sync stopped');
    }
  },

  async syncNow(uid) {
    if (!uid) return;
    try {
      await this._syncEntries(uid);
      await this._syncUsers(uid);
      console.log('[FireDB] Sync complete at ' + new Date().toLocaleTimeString());
    } catch (err) {
      console.warn('[FireDB] Sync error:', err.message);
    }
  },

  async _syncEntries(uid) {
    const localEntries = JSON.parse(localStorage.getItem('tomato_diary_entries') || '[]');
    const remoteEntries = await this.getEntries(uid);
    const remoteMap = {};
    remoteEntries.forEach(e => { remoteMap[e.id] = e; });

    for (const entry of localEntries) {
      if (!entry.id || entry.id.startsWith('fs_')) {
        const fsId = await this.saveEntry(uid, entry);
        entry.id = fsId;
      } else if (!remoteMap[entry.id]) {
        const fsId = await this.saveEntry(uid, { ...entry, id: 'fs_' + entry.id });
        entry.id = fsId;
      } else {
        const remote = remoteMap[entry.id];
        const localUpdated = entry.updatedAt || entry.createdAt || '';
        const remoteUpdated = remote.updatedAt || remote.createdAt || '';
        if (localUpdated > remoteUpdated) {
          await this.saveEntry(uid, entry);
        }
      }
    }
    localStorage.setItem('tomato_diary_entries', JSON.stringify(localEntries));

    for (const remote of remoteEntries) {
      if (!localEntries.find(e => e.id === remote.id)) {
        localEntries.push(remote);
      }
    }
    localStorage.setItem('tomato_diary_entries', JSON.stringify(localEntries));
  },

  async _syncUsers(uid) {
    const users = JSON.parse(localStorage.getItem('tomato_diary_users') || '[]');
    const user = users.find(u => {
      const session = JSON.parse(localStorage.getItem('tomato_diary_session') || '{}');
      return u.username === session.username;
    });
    if (user) {
      await this.saveUser(uid, {
        name: user.name,
        username: user.username,
        email: user.email,
        provider: user.provider || 'local'
      });
    }
  }
};

window.FireDB = FireDB;
