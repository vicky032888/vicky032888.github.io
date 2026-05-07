// =============================================
//  VICKY HU PORTFOLIO — JS v4
// =============================================

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Mobile menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ── Active nav highlight ──
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 130) current = sec.id; });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.skill-card, .campaign-card, .timeline-item, .edu-card, .cert-badge, .event-card, .creative-row').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ── LIGHTBOX ──
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');
const lbClose   = document.getElementById('lbClose');
const lbPrev    = document.getElementById('lbPrev');
const lbNext    = document.getElementById('lbNext');
let lbImages = [], lbIndex = 0;

function openLightbox(shots, startIndex = 0) {
  lbImages = shots.filter(s => s && s.trim());
  lbIndex  = startIndex;
  showLbSlide();
  if (lightbox) { lightbox.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function showLbSlide() {
  if (!lbImg) return;
  lbImg.src = lbImages[lbIndex];
  if (lbCounter) lbCounter.textContent = lbImages.length > 1 ? `${lbIndex + 1} / ${lbImages.length}` : '';
  if (lbPrev) lbPrev.classList.toggle('hidden', lbIndex === 0);
  if (lbNext) lbNext.classList.toggle('hidden', lbIndex === lbImages.length - 1);
}
function closeLightbox() {
  if (lightbox) { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
  if (lbImg) lbImg.src = '';
}

if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lbPrev)  lbPrev.addEventListener('click',  () => { if (lbIndex > 0) { lbIndex--; showLbSlide(); } });
if (lbNext)  lbNext.addEventListener('click',  () => { if (lbIndex < lbImages.length - 1) { lbIndex++; showLbSlide(); } });
if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

// Keyboard nav
document.addEventListener('keydown', e => {
  if (lightbox && lightbox.classList.contains('open')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft'  && lbIndex > 0) { lbIndex--; showLbSlide(); }
    if (e.key === 'ArrowRight' && lbIndex < lbImages.length - 1) { lbIndex++; showLbSlide(); }
  }
  if (videoModal && videoModal.classList.contains('open') && e.key === 'Escape') closeVideoModal();
});

// Campaign screenshot buttons
document.querySelectorAll('.btn-screenshots').forEach(btn => {
  btn.addEventListener('click', () => openLightbox(btn.dataset.shots.split(',')));
});
document.querySelectorAll('.campaign-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => openLightbox(thumb.dataset.shots.split(',')));
});

// Certificate badges
document.querySelectorAll('.cert-badge[data-cert]').forEach(badge => {
  badge.addEventListener('click', () => {
    const src = badge.dataset.cert;
    if (src) openLightbox([src]);
  });
});

// ── VIDEO MODAL ──
const videoModal = document.getElementById('videoModal');
const vmInner    = document.getElementById('vmInner');
const vmClose    = document.getElementById('vmClose');

function openVideoModal(src, type) {
  if (!vmInner || !videoModal) return;
  vmInner.innerHTML = type === 'youtube'
    ? `<iframe src="${src}?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>`
    : `<video src="${src}" controls autoplay></video>`;
  videoModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeVideoModal() {
  if (!videoModal || !vmInner) return;
  videoModal.classList.remove('open');
  vmInner.innerHTML = '';
  document.body.style.overflow = '';
}
if (vmClose)    vmClose.addEventListener('click', closeVideoModal);
if (videoModal) videoModal.addEventListener('click', e => { if (e.target === videoModal) closeVideoModal(); });

document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => openVideoModal(card.dataset.src, card.dataset.type));
});

// ── AUTO-LOAD: Photography slider ──
const photoSlider = document.getElementById('photoSlider');
if (photoSlider) {
  let hasPhotos = false;
  const total = 20;
  let pending = total;

  for (let i = 1; i <= total; i++) {
    const img = new Image();
    img.alt = `Photography by Yongwei Hu — ${i}`;

    img.onload = () => {
      hasPhotos = true;
      const ph = photoSlider.querySelector('.slider-placeholder');
      if (ph) ph.remove();
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s';
      photoSlider.appendChild(img);
      requestAnimationFrame(() => { img.style.opacity = '1'; });
      // click to lightbox
      img.addEventListener('click', () => openLightbox(
        [...photoSlider.querySelectorAll('img')].map(im => im.src),
        [...photoSlider.querySelectorAll('img')].indexOf(img)
      ));
      pending--;
    };
    img.onerror = () => { pending--; };
    img.src = `images/gallery/photo-${i}.jpg`;
  }
}

// Photography slider arrows + drag
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
if (sliderPrev && photoSlider) sliderPrev.addEventListener('click', () => { photoSlider.scrollBy({ left: -460, behavior: 'smooth' }); });
if (sliderNext && photoSlider) sliderNext.addEventListener('click', () => { photoSlider.scrollBy({ left: 460, behavior: 'smooth' }); });

// Drag-to-scroll for photo slider
if (photoSlider) {
  let isDragging = false, startX = 0, scrollLeft = 0;
  photoSlider.addEventListener('mousedown', e => { isDragging = true; startX = e.pageX - photoSlider.offsetLeft; scrollLeft = photoSlider.scrollLeft; });
  photoSlider.addEventListener('mouseleave', () => isDragging = false);
  photoSlider.addEventListener('mouseup',   () => isDragging = false);
  photoSlider.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - photoSlider.offsetLeft;
    photoSlider.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
}

// ── AUTO-LOAD: Poster carousel ──
function loadCarousel(trackId, folder, prefix, count, prevId, nextId) {
  const track = document.getElementById(trackId);
  if (!track) return;
  let loaded = 0;

  for (let i = 1; i <= count; i++) {
    const img = new Image();
    img.alt = `${prefix} ${i}`;
    img.onload = () => {
      loaded++;
      const ph = track.querySelector('.carousel-placeholder');
      if (ph) ph.remove();
      track.appendChild(img);
      img.addEventListener('click', () => openLightbox(
        [...track.querySelectorAll('img')].map(im => im.src),
        [...track.querySelectorAll('img')].indexOf(img)
      ));
    };
    img.onerror = () => {};
    img.src = `${folder}${i}.jpg`;
  }

  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  if (prev && track) prev.addEventListener('click', () => track.scrollBy({ left: -300, behavior: 'smooth' }));
  if (next && track) next.addEventListener('click', () => track.scrollBy({ left: 300, behavior: 'smooth' }));
}

loadCarousel('posterTrack', 'images/posters/poster-', 'Poster', 10, 'posterPrev', 'posterNext');
loadCarousel('pptTrack',    'images/ppt/ppt-',        'Slide',  5,  'pptPrev',    'pptNext');

// ── AUTO-LOAD: Event photos ──
function loadEventPhotos(containerId, folder, prefix, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let loaded = 0;

  for (let i = 1; i <= count; i++) {
    const img = new Image();
    img.alt = `${prefix} event photo ${i}`;
    img.onload = () => {
      loaded++;
      const ph = container.querySelector('.event-photos-placeholder');
      if (ph) ph.remove();
      container.appendChild(img);
      img.addEventListener('click', () => openLightbox(
        [...container.querySelectorAll('img')].map(im => im.src),
        [...container.querySelectorAll('img')].indexOf(img)
      ));
    };
    img.onerror = () => {};
    img.src = `${folder}${i}.jpg`;
  }
}

loadEventPhotos('photoclubPhotos',  'images/events/photoclub-',  'Photography Club', 5);
loadEventPhotos('manzPhotos',       'images/events/manz-',       'MANZ',             4);
loadEventPhotos('premastersPhotos', 'images/events/premasters-', 'Pre-Masters',      4);
