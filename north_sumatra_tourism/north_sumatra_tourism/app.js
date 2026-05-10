/**
 * NORTH SUMATRA TOURISM — OOP JavaScript
 * All features organized into classes for clean, maintainable code.
 */

'use strict';

/* =========================================
   DATA — Destination & Gallery Info
   ========================================= */
const DESTINATIONS = [
  {
    id: 'danau-toba',
    name: 'Danau Toba',
    type: 'Danau Vulkanik',
    elevation: '905 m dpl',
    image: 'images/danau_toba.jpg',
    badge: 'Ikon Sumut',
    description:
      'Danau vulkanik terbesar di Asia Tenggara dan terbesar di dunia, terbentuk dari letusan supervulkan dahsyat sekitar 74.000 tahun lalu. Danau seluas 1.145 km² ini menyimpan Pulau Samosir di tengahnya — pulau di dalam danau yang unik di dunia — dengan budaya Batak yang kaya, air biru jernih, dan pemandangan tebing kaldera yang dramatis.',
  },
  {
    id: 'gunung-sibayak',
    name: 'Gunung Sibayak',
    type: 'Gunung Berapi Aktif',
    elevation: '2.212 m dpl',
    image: 'images/gunung_sibayak.jpg',
    badge: 'Pendakian Populer',
    description:
      'Dijuluki "Gunung Dewa" oleh masyarakat Karo, Sibayak adalah stratovolcano aktif yang menjadi favorit para pendaki. Kawahnya yang mengeluarkan asap belerang menciptakan pemandangan mistis dan dramatis. Dari puncaknya, Anda bisa menyaksikan panorama Kota Berastagi, hamparan kebun sayur, hingga Gunung Sinabung di kejauhan.',
  },
  {
    id: 'gunung-sinabung',
    name: 'Gunung Sinabung',
    type: 'Gunung Berapi Aktif',
    elevation: '2.460 m dpl',
    image: 'images/gunung_sinabung.jpg',
    badge: 'Vulkan Legendaris',
    description:
      'Salah satu gunung berapi paling aktif di Indonesia, Sinabung kembali bangkit pada 2010 setelah tidur selama 400 tahun dan terus memperlihatkan aktivitasnya. Keindahan yang megah dan sedikit misterius membuatnya menjadi daya tarik fotografi yang luar biasa — lautan awan yang mengelilingi puncaknya menjadi pemandangan yang tak terlupakan.',
  },
  {
    id: 'lau-kawar',
    name: 'Danau Lau Kawar',
    type: 'Danau Kaki Gunung',
    elevation: '1.400 m dpl',
    image: 'images/lau_kawar.jpg',
    badge: 'Tersembunyi & Asri',
    description:
      'Berlokasi di kaki Gunung Sinabung, Lau Kawar adalah danau permai yang dikelilingi hutan tropis lebat dan rimbun. Airnya yang tenang mencerminkan bayangan gunung dan langit biru — menciptakan efek cermin alam yang menakjubkan. Destinasi sempurna untuk camping, memancing, dan menikmati kesunyian alam yang masih terjaga alami.',
  },
];

const GALLERY_IMAGES = [
  { src: 'images/danau_toba.jpg',      caption: 'Danau Toba — Keajaiban Kaldera Purba' },
  { src: 'images/gunung_sinabung.jpg', caption: 'Gunung Sinabung — Sang Penjaga Tanah Karo' },
  { src: 'images/gunung_sibayak.jpg',  caption: 'Gunung Sibayak — Gunung Dewa Berastagi' },
  { src: 'images/lau_kawar.jpg',       caption: 'Lau Kawar — Cermin Alam Nan Damai' },
];


/* =========================================
   CLASS: Navbar
   ========================================= */
class Navbar {
  constructor(navbarId, hamburgerID, mobileMenuId) {
    this.navbar     = document.getElementById(navbarId);
    this.hamburger  = document.getElementById(hamburgerID);
    this.mobileMenu = document.getElementById(mobileMenuId);
    this.isOpen     = false;

    this._init();
  }

  _init() {
    window.addEventListener('scroll', () => this._onScroll());
    this.hamburger.addEventListener('click', () => this._toggleMenu());

    // Close menu when a link is clicked
    this.mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this._closeMenu());
    });

    this._onScroll(); // Run on load
  }

  _onScroll() {
    if (window.scrollY > 60) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  _toggleMenu() {
    this.isOpen ? this._closeMenu() : this._openMenu();
  }

  _openMenu() {
    this.isOpen = true;
    this.mobileMenu.classList.add('open');
    this.hamburger.setAttribute('aria-expanded', 'true');
  }

  _closeMenu() {
    this.isOpen = false;
    this.mobileMenu.classList.remove('open');
    this.hamburger.setAttribute('aria-expanded', 'false');
  }
}


/* =========================================
   CLASS: HeroSlider
   ========================================= */
class HeroSlider {
  constructor(imgSelector, dotSelector, interval = 5000) {
    this.images   = document.querySelectorAll(imgSelector);
    this.dots     = document.querySelectorAll(dotSelector);
    this.current  = 0;
    this.interval = interval;
    this.timer    = null;

    this._init();
  }

  _init() {
    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        this._goTo(i);
        this._restart();
      });
    });

    this._start();
  }

  _goTo(index) {
    this.images[this.current].classList.remove('active');
    this.dots[this.current].classList.remove('active');

    this.current = (index + this.images.length) % this.images.length;

    this.images[this.current].classList.add('active');
    this.dots[this.current].classList.add('active');
  }

  _next() {
    this._goTo(this.current + 1);
  }

  _start() {
    this.timer = setInterval(() => this._next(), this.interval);
  }

  _restart() {
    clearInterval(this.timer);
    this._start();
  }
}


/* =========================================
   CLASS: DestinationCard (renders a single card)
   ========================================= */
class DestinationCard {
  constructor(data, delayIndex) {
    this.data  = data;
    this.delay = delayIndex;
  }

  render() {
    const article = document.createElement('article');
    article.className = `dest-card reveal reveal-delay-${this.delay + 1}`;

    article.innerHTML = `
      <div class="dest-card-img-wrap">
        <img
          class="dest-card-img"
          src="${this.data.image}"
          alt="${this.data.name}"
          loading="lazy"
        />
        <span class="dest-card-badge">${this.data.badge}</span>
      </div>
      <div class="dest-card-body">
        <h3 class="dest-card-title">${this.data.name}</h3>
        <p class="dest-card-meta">📍 ${this.data.type}</p>
        <p class="dest-card-desc">${this.data.description}</p>
        <div class="dest-card-footer">
          <span class="dest-card-elev">⛰ ${this.data.elevation}</span>
          <span class="dest-card-link">Selengkapnya →</span>
        </div>
      </div>
    `;

    return article;
  }
}


/* =========================================
   CLASS: DestinationsRenderer
   ========================================= */
class DestinationsRenderer {
  constructor(containerId, destinations) {
    this.container    = document.getElementById(containerId);
    this.destinations = destinations;
  }

  render() {
    this.destinations.forEach((data, i) => {
      const card = new DestinationCard(data, i % 4);
      this.container.appendChild(card.render());
    });
  }
}


/* =========================================
   CLASS: GalleryItem (renders a single gallery tile)
   ========================================= */
class GalleryItem {
  constructor(data, index, onClickCallback) {
    this.data    = data;
    this.index   = index;
    this.onClick = onClickCallback;
  }

  render() {
    const div = document.createElement('div');
    div.className = 'gallery-item reveal';

    div.innerHTML = `
      <img src="${this.data.src}" alt="${this.data.caption}" loading="lazy" />
      <div class="gallery-item-overlay">
        <span class="gallery-item-name">${this.data.caption.split(' — ')[0]}</span>
      </div>
    `;

    div.addEventListener('click', () => this.onClick(this.index));
    return div;
  }
}


/* =========================================
   CLASS: GalleryRenderer
   ========================================= */
class GalleryRenderer {
  constructor(containerId, images, lightbox) {
    this.container = document.getElementById(containerId);
    this.images    = images;
    this.lightbox  = lightbox;
  }

  render() {
    this.images.forEach((data, i) => {
      const item = new GalleryItem(data, i, (index) => this.lightbox.open(index));
      this.container.appendChild(item.render());
    });
  }
}


/* =========================================
   CLASS: Lightbox
   ========================================= */
class Lightbox {
  constructor(lightboxId, imgId, captionId, closeId, prevId, nextId, images) {
    this.lightbox = document.getElementById(lightboxId);
    this.img      = document.getElementById(imgId);
    this.caption  = document.getElementById(captionId);
    this.closeBtn = document.getElementById(closeId);
    this.prevBtn  = document.getElementById(prevId);
    this.nextBtn  = document.getElementById(nextId);
    this.images   = images;
    this.current  = 0;

    this._init();
  }

  _init() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.prevBtn.addEventListener('click',  () => this._navigate(-1));
    this.nextBtn.addEventListener('click',  () => this._navigate(1));

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     this.close();
      if (e.key === 'ArrowLeft')  this._navigate(-1);
      if (e.key === 'ArrowRight') this._navigate(1);
    });
  }

  open(index) {
    this.current = index;
    this._show();
    this.lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  _navigate(direction) {
    this.current = (this.current + direction + this.images.length) % this.images.length;
    this._show();
  }

  _show() {
    const data     = this.images[this.current];
    this.img.src   = data.src;
    this.img.alt   = data.caption;
    this.caption.textContent = data.caption;
  }
}


/* =========================================
   CLASS: ScrollReveal
   ========================================= */
class ScrollReveal {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
  }

  observe() {
    this.elements.forEach(el => this.observer.observe(el));
  }
}


/* =========================================
   CLASS: ContactForm
   ========================================= */
class ContactForm {
  constructor(formId, successId) {
    this.form    = document.getElementById(formId);
    this.success = document.getElementById(successId);

    this._init();
  }

  _init() {
    this.form.addEventListener('submit', (e) => this._onSubmit(e));
  }

  _onSubmit(e) {
    e.preventDefault();
    const btn = this.form.querySelector('button[type="submit"]');

    btn.textContent  = 'Mengirim...';
    btn.disabled     = true;

    // Simulate async send
    setTimeout(() => {
      this.success.classList.add('visible');
      this.form.reset();
      btn.textContent = 'Kirim Pesan';
      btn.disabled    = false;

      setTimeout(() => this.success.classList.remove('visible'), 5000);
    }, 1400);
  }
}


/* =========================================
   CLASS: App — Main Application Entry Point
   ========================================= */
class App {
  constructor() {
    this._boot();
  }

  _boot() {
    // Wait for DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this._init());
    } else {
      this._init();
    }
  }

  _init() {
    // 1. Navbar scroll & hamburger
    new Navbar('navbar', 'hamburger', 'mobileMenu');

    // 2. Hero image slider
    new HeroSlider('.hero-img', '.slide-dot', 5500);

    // 3. Lightbox (must instantiate before gallery so gallery can reference it)
    const lightbox = new Lightbox(
      'lightbox', 'lightboxImg', 'lightboxCaption',
      'lightboxClose', 'lightboxPrev', 'lightboxNext',
      GALLERY_IMAGES
    );

    // 4. Render destination cards
    new DestinationsRenderer('destGrid', DESTINATIONS).render();

    // 5. Render gallery tiles
    new GalleryRenderer('galleryGrid', GALLERY_IMAGES, lightbox).render();

    // 6. Scroll-reveal animations (after cards are injected to DOM)
    new ScrollReveal('.reveal').observe();

    // 7. Contact form
    new ContactForm('contactForm', 'formSuccess');

    // 8. Smooth scroll for nav CTA
    document.querySelector('.nav-cta').addEventListener('click', () => {
      document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
    });

    console.log('%c✦ North Sumatra Tourism App Loaded', 'color: #1abc9c; font-weight: bold; font-size: 14px;');
  }
}

// Boot the application
new App();
