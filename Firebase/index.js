export { app, analytics } from './config/firebase-config.js';
export {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup
} from './auth/auth.js';
export {
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from './firestore/firestore.js';
export {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from './storage/storage.js';
