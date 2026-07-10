function Footer() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.setAttribute('role', 'contentinfo');

  const year = new Date().getFullYear();

  footer.innerHTML = `
    <div class="container footer__inner">
      <div class="footer__brand">
        <span class="footer__text">Made with <span class="footer__heart" aria-label="love">♥</span> for quiet moments</span>
      </div>
      <div class="footer__links">
        <a href="index.html" class="footer__link">Home</a>
        <a href="pages/entries/entries.html" class="footer__link">Entries</a>
      </div>
      <span class="footer__text">© ${year} Tomato's Dairy</span>
    </div>
  `;

  return footer;
}
