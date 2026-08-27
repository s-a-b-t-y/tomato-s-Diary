# Tomato's Diary - Mobile Application Installation Guide

## Overview
This guide explains how to install and run Tomato's Diary as a Progressive Web App (PWA) on mobile devices (iOS and Android). The app can be installed directly from your mobile browser to your home screen.

---

## Prerequisites

### What you'll need:
- A mobile device (iPhone or Android phone)
- A modern mobile browser (Chrome, Safari, Firefox, or Edge)
- Internet connection (initial setup only; app works offline after installation)

### Optional (for full features):
- Firebase account (for cloud sync, optional - app works with localStorage)
- The `Mobile-App` folder created in this project

---

## Installation Methods

### Method 1: Add to Home Screen (Recommended)

#### For Android (Chrome):
1. **Open the browser** on your Android phone
2. **Navigate to the app** by opening:
   - If files are local: `file:///S:/Cyber/1.Programming/Projects/Tomato's%20Diary/Mobile-App/index.html`
   - Or if hosted: your domain URL pointing to the Mobile-App folder
3. **Tap the Chrome menu** (three dots ✝️ in the top-right corner)
4. **Select "Add to Home screen"** from the dropdown menu
5. **Edit the name** if desired (e.g., "Tomato's Diary" or "Cutie Pie J&I")
6. **Tap "Add"** 

The app icon will now appear on your home screen! Tap it to launch the diary.

#### For Android (Safari/Edge):
- Same process - look for "Add to Home screen" in the share menu

#### For iPhone (Safari):
1. **Open Safari** on your iPhone
2. **Navigate to the app** (same as above)
3. **Tap the Share button** (square with arrow pointing up 📤) at the bottom
4. **Scroll down** and tap **"Add to Home Screen"**
5. **Tap "Add"** in the top-right corner
6. The app will appear on your home screen with the diary logo

#### For Any Browser (Share Menu):
1. Tap share button
2. Look for "Add to Home Screen" or "Install App"
3. Follow browser-specific prompts

---

### Method 2: QR Code Installation

If you want to install via QR code:

1. **Generate a QR code** pointing to your app URL
   - Use any online QR code generator
   - Point it to: `file:///S:/Cyber/1.Programming/Projects/Tomato's%20Diary/Mobile-App/index.html`
   
2. **Scan the QR code** with your phone's camera

3. **Follow the prompt** that appears (usually "Open in browser" → "Add to Home Screen")

---

## First-Time Usage

### Opening the App:
1. **Tap the app icon** on your home screen
2. **Loading screen** will appear (book opening animation)
3. **Home page** loads with the inspirational quote and favorite album

### Using the Diary:
- **Write**: Tap "Start Writing" → enters diary writing mode
- **Past Notes**: Tap "Read Past Notes" → views all your entries
- **Theme**: Toggle dark/pink theme via the navbar moon/sun icon
- **Mood**: Select how you're feeling via the mood selector
- **Date**: Change dates using the calendar picker

### Offline Usage:
- After first launch, the app **caches all assets**
- Works fully **offline** (no internet needed)
- New entries save to **localStorage**
- Data persists across app restarts

---

## Folder Structure Overview

Your `Mobile-App` folder contains:

```
Mobile-App/
├── index.html          (main entry point - PWA enabled)
├── manifest.json       (PWA manifest for install)
├── service-worker.js   (offline caching)
├── styles/             (all CSS - glassmorphism, themes, responsive)
├── components/         (30+ UI components)
├── pages/              (diary, entries, view-entry, not-found)
├── utilities/          (helpers, data, service)
├── services/           (DiaryService CRUD, Firebase-ready)
├── assets/             (icons, images, fonts)
│   ├── fonts/
│   ├── icons/          (Logo.png)
│   └── images/         (5 diary photos: Pic1.png - Pic5.png)
└── installation_Manual.md  (this file)
```

---

## Firebase Cloud Database (Optional)

If you want to use cloud storage instead of localStorage:

1. **Create a Firebase project** at https://console.firebase.google.com
2. **Enable Authentication** (Email/Password or Google)
3. **Enable Firestore Database**
4. **Copy your Firebase config**:

```javascript
// Add to .env file in Mobile-App folder:
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

5. **Update `utilities/service.js`** to use Firebase instead of localStorage
6. **Redeploy/refresh** the app

*Note: The app works perfectly with localStorage. Firebase is optional for syncing across devices.*

---

## Troubleshooting

### App won't install?
- Ensure you're using a modern browser (Chrome 87+, Safari 14+, Firefox 88+)
- The site must be served over HTTPS (for real deployment) or via file:// for testing
- Check that `manifest.json` is accessible at the root URL

### Data not saving?
- localStorage is device-specific - data won't sync to other phones
- Clear browser data only if you want to reset
- For cloud sync, set up Firebase as described above

### Pink theme not working?
- The theme toggle is in the navbar (moon/sun icon)
- Or set `localStorage.setItem('tomato_diary_theme', 'pink')` in browser console

### Offline not working?
- Ensure the app was loaded once with internet connection
- Service worker caches assets on first load
- Check browser allows service workers

---

## Customization

### Change the app name/colors:
- Edit `manifest.json` - modify `name`, `short_name`, `theme_color`, `background_color`
- Edit `variables.css` - modify CSS variables for colors
- Edit `index.html` - modify the theme toggle logic

### Add more features:
- The codebase is well-documented and modular
- New components can be added to `components/`
- Pages can be added to `pages/`
- Firebase integration is partially implemented (services stubs exist)

---

## Deployment Options

### Option A: Local Testing (Recommended for personal use)
- Simply open `Mobile-App/index.html` in any browser
- Works immediately, no server needed
- All data stored in localStorage

### Option B: GitHub Pages
1. Push `Mobile-App` folder to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Site deploys at `https://yourusername.github.io/reponame/`
4. Installable as PWA from there

### Option C: Netlify/Vercel
1. Connect `Mobile-App` folder to Netlify/Vercel
2. Deploy with one click
3. Automatic HTTPS + PWA support

### Option D: Custom Domain
- Deploy anywhere, configure DNS
- Ensure `manifest.json` and `service-worker.js` are accessible
- Install via browser's "Add to Home Screen"

---

## Support & Feedback

This is a complete digital diary application with:
- ✅ Full offline capability
- ✅ Home screen installation
- ✅ Dark & pink themes
- ✅ Mood tracking
- ✅ Page auto-splitting
- ✅ Search and filter
- ✅ Toast notifications
- ✅ Modals and interactions
- ✅ Responsive design (all screen sizes)

For issues or questions, refer to the code comments throughout the `Mobile-App` folder, or consult the original project at the parent directory.

---
*Generated: August 27, 2026*