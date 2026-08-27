import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMSLW_8pgGFBaUeCAwvs4StoSmPRd3Ixs",
  authDomain: "tomatos-diary.firebaseapp.com",
  projectId: "tomatos-diary",
  storageBucket: "tomatos-diary.firebasestorage.app",
  messagingSenderId: "579115848755",
  appId: "1:579115848755:web:dc46bebce1ca30c1fe3f46",
  measurementId: "G-XCC1SDEPF5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
