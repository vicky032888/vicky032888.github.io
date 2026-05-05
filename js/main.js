// =============================================
//  VICKY HU PORTFOLIO — JavaScript
// =============================================

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// --- Mobile menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- Scroll reveal ---
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.skill-card, .campaign-card, .creative-card, .timeline-item, .edu-card, .cert-badge, .about-text, .about-photo, .section-label, h2'
).forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// --- Dynamic photo gallery ---
// Tries to load images named photo-1.jpg through photo-20.jpg from images/gallery/
const gallery = document.getElementById('photoGallery');
if (gallery) {
  let found = 0;
  const total = 20;
  let checked = 0;

  for (let i = 1; i <= total; i++) {
    const img = new Image();
    img.onload = () => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      gallery.appendChild(img);
      setTimeout(() => img.style.opacity = '1', 50);
      found++;
      // hide placeholder if at least one image loaded
      const ph = gallery.querySelector('.gallery-placeholder');
      if (ph) ph.style.display = 'none';
    };
    img.onerror = () => {
      checked++;
    };
    img.src = `images/gallery/photo-${i}.jpg`;
    img.alt = `Photography by Yongwei Hu — ${i}`;
    img.loading = 'lazy';
  }
}

// --- Lightbox ---
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');
const lbClose   = document.getElementById('lbClose');
const lbPrev    = document.getElementById('lbPrev');
const lbNext    = document.getElementById('lbNext');
let lbImages = [], lbIndex = 0;

function openLightbox(shots, startIndex = 0) {
  // Filter to only the images that actually exist (skip missing ones)
  lbImages = shots.filter(s => s.trim());
  lbIndex = startIndex;
  showLbImage();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLbImage() {
  lbImg.src = lbImages[lbIndex];
  lbCounter.textContent = lbImages.length > 1 ? `${lbIndex + 1} / ${lbImages.length}` : '';
  lbPrev.classList.toggle('hidden', lbIndex === 0);
  lbNext.classList.toggle('hidden', lbIndex === lbImages.length - 1);
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => { if (lbIndex > 0) { lbIndex--; showLbImage(); } });
lbNext.addEventListener('click', () => { if (lbIndex < lbImages.length - 1) { lbIndex++; showLbImage(); } });
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft' && lbIndex > 0) { lbIndex--; showLbImage(); }
  if (e.key === 'ArrowRight' && lbIndex < lbImages.length - 1) { lbIndex++; showLbImage(); }
});

// "View Screenshots" buttons
document.querySelectorAll('.btn-screenshots').forEach(btn => {
  btn.addEventListener('click', () => {
    const shots = btn.dataset.shots.split(',');
    openLightbox(shots, 0);
  });
});

// Thumbnail click also opens lightbox
document.querySelectorAll('.campaign-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    const shots = thumb.dataset.shots.split(',');
    openLightbox(shots, 0);
  });
});

// --- Active nav link highlight on scroll ---
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
}, { passive: true });
