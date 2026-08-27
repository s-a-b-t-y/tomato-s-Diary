const CACHE_NAME = 'tomato-diary-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles/shared/variables.css',
  '/styles/shared/base.css',
  '/styles/shared/animations.css',
  '/styles/shared/utilities.css',
  '/components/navbar/navbar.css',
  '/components/navbar/navbar.js',
  '/components/buttons/buttons.css',
  '/components/buttons/buttons.js',
  '/components/loading/loading.css',
  '/components/loading/loading.js',
  '/components/page-transition/page-transition.css',
  '/components/page-transition/page-transition.js',
  '/pages/home/home.html',
  '/pages/home/home.js',
  '/pages/diary/diary.html',
  '/pages/diary/diary.js',
  '/pages/entries/entries.html',
  '/pages/entries/entries.js',
  '/pages/view-entry/view-entry.html',
  '/pages/view-entry/view-entry.js',
  '/pages/not-found/not-found.html',
  '/components/mood-selector/mood-selector.css',
  '/components/mood-selector/mood-selector.js',
  '/components/toast/toast.css',
  '/components/toast/toast.js',
  '/components/modals/modal.css',
  '/components/modals/modal.js',
  '/components/cards/diary-card.css',
  '/components/cards/diary-card.js',
  '/components/date-picker/date-picker.css',
  '/components/date-picker/date-picker.js',
  '/components/empty-state/empty-state.css',
  '/components/empty-state/empty-state.js',
  '/components/forms/forms.css',
  '/components/footer/footer.css',
  '/components/skeleton/skeleton.css',
  '/components/skeleton/skeleton.js',
  '/assets/icons/Logo.png',
  '/assets/images/Pic1.png',
  '/assets/images/pic2.jpg',
  '/assets/images/pic3.jpg',
  '/assets/images/pic4.jpg',
  '/assets/images/pic5.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

self.addEventListener('activate', (event) => {
  const currentCACHE = CACHE_NAME;
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== currentCACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        return networkResponse;
      });
    })
  );
});