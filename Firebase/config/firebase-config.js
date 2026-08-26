import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMSLW_8pgGFBaUeCAwvs4StoSmPRd3Ixs",
  authDomain: "tomatos-diary.firebaseapp.com",
  projectId: "tomatos-diary",
  storageBucket: "tomatos-diary.firebasestorage.app",
  messagingSenderId: "579115848755",
  appId: "1:579115848755:web:8f49c0e9a1d9befcfe3f46",
  measurementId: "G-MQQYHL8D69"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
