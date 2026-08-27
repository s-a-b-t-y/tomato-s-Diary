document.addEventListener('DOMContentLoaded', () => {
  const session = getSession();
  if (!session) {
    window.location.href = 'Login/login.html';
    return;
  }

  // Start Firebase auto-sync
  if (window.FireDB) {
    FireDB.init().then(() => {
      const uid = session.firebaseUid || session.id;
      if (uid) {
        FireDB.startAutoSync(uid, 45000);
        DiaryService.loadFromCloud();
      }
    });
  }

  const app = document.getElementById('app');
  const loadingScreen = document.getElementById('loadingScreen');

  const navbar = Navbar('home');
  app.insertBefore(navbar, app.firstChild);

  initNavbar();

  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
  }

  if (typeof showInitialTransition === 'function') {
    showInitialTransition();
  }

  if (typeof initPageTransition === 'function') {
    initPageTransition();
  }

  const favAlbum = document.getElementById('favAlbum');
  if (favAlbum) {
    const imgs = favAlbum.querySelectorAll('.fav-album__img');
    const dots = favAlbum.querySelectorAll('.fav-album__dot');
    const prevBtn = document.getElementById('favPrev');
    const nextBtn = document.getElementById('favNext');
    let current = 0;
    let autoTimer = null;

    function goToSlide(index) {
      imgs[current].classList.remove('fav-album__img--active');
      dots[current].classList.remove('fav-album__dot--active');
      current = (index + imgs.length) % imgs.length;
      imgs[current].classList.add('fav-album__img--active');
      dots[current].classList.add('fav-album__dot--active');
    }

    function nextSlide() {
      goToSlide(current + 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoTimer = setInterval(nextSlide, 3000);
    }

    function stopAutoPlay() {
      if (autoTimer) clearInterval(autoTimer);
    }

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      startAutoPlay();
    });

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(current - 1);
      startAutoPlay();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        startAutoPlay();
      });
    });

    favAlbum.addEventListener('mouseenter', () => {
      if (modal && !modal.classList.contains('gallery-modal--open')) {
        stopAutoPlay();
      }
    });
    
    favAlbum.addEventListener('mouseleave', () => {
      if (modal && !modal.classList.contains('gallery-modal--open')) {
        startAutoPlay();
      }
    });

    const expandBtn = document.getElementById('favExpand');
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.getElementById('galleryClose');
    const backdrop = document.getElementById('galleryBackdrop');

    if (expandBtn && modal) {
      expandBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stopAutoPlay();
        modal.classList.add('gallery-modal--open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });

      const closeModal = () => {
        modal.classList.remove('gallery-modal--open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        startAutoPlay();
      };

      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (backdrop) backdrop.addEventListener('click', closeModal);

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('gallery-modal--open')) {
          closeModal();
        }
      });
    }

    startAutoPlay();
  }
});
