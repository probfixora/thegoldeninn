/* ═══════════════════════════
   THE GOLDEN INN — SCRIPT.JS
═══════════════════════════ */

// ── Footer year ──
document.getElementById('yr').textContent = new Date().getFullYear();

// ── Sticky header scroll effect ──
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('back-top').hidden = window.scrollY < 400;
}, { passive: true });

// ── Back to top ──
document.getElementById('back-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Mobile menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id], div[id="home"]');
const navLinks = document.querySelectorAll('.nav-links a');

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('section[id]').forEach(s => io.observe(s));

// ── Gallery Lightbox ──
const gallery = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-cap');
const lbClose = document.getElementById('lb-close');
const lbNext = document.getElementById('lb-next');
const lbPrev = document.getElementById('lb-prev');
const lbBackdrop = document.getElementById('lb-backdrop');

const galleryImages = [];
gallery.querySelectorAll('figure img').forEach((img, i) => {
  galleryImages.push({ src: img.src, alt: img.alt, cap: img.closest('figure').querySelector('figcaption')?.textContent || '' });
});

let currentLbIdx = 0;

function openLightbox(idx) {
  currentLbIdx = idx;
  const item = galleryImages[idx];
  lbImg.src = item.src;
  lbImg.alt = item.alt;
  lbCap.textContent = item.cap;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lbImg.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

function nextLb() {
  currentLbIdx = (currentLbIdx + 1) % galleryImages.length;
  openLightbox(currentLbIdx);
}

function prevLb() {
  currentLbIdx = (currentLbIdx - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentLbIdx);
}

gallery.querySelectorAll('figure img').forEach((img, i) => {
  img.addEventListener('click', () => openLightbox(i));
  img.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); } });
});

lbClose.addEventListener('click', closeLightbox);
lbBackdrop.addEventListener('click', closeLightbox);
lbNext.addEventListener('click', nextLb);
lbPrev.addEventListener('click', prevLb);

document.addEventListener('keydown', e => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextLb();
  if (e.key === 'ArrowLeft') prevLb();
});
