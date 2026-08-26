import { app } from '../config/firebase-config.js';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-storage.js";

const storage = getStorage(app);

export {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
};
