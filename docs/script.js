const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

const closeMenu = () => {
  if (!menuToggle || !mobileNav) return;
  menuToggle.classList.remove('open');
  mobileNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
};

menuToggle?.addEventListener('click', () => {
  const opening = !mobileNav.classList.contains('open');
  menuToggle.classList.toggle('open', opening);
  mobileNav.classList.toggle('open', opening);
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('#mobileNav a').forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

document.addEventListener('click', event => {
  if (!mobileNav?.classList.contains('open')) return;
  if (mobileNav.contains(event.target) || menuToggle?.contains(event.target)) return;
  closeMenu();
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('show'));
}