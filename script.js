(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     1. THEME SWITCHER (Dark / Light Mode)
  ------------------------------------------------------------------ */
  const themeToggle = document.getElementById('themeToggle');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#090a0f' : '#fafafc');
    }
  }

  function initTheme() {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const target = current === 'dark' ? 'light' : 'dark';
      applyTheme(target);
    });
  }

  initTheme();

  /* ------------------------------------------------------------------
     2. SCROLL PROGRESS BAR & NAVBAR SCROLL STATE
  ------------------------------------------------------------------ */
  const progressBar = document.getElementById('progressBar');
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Progress bar width
    if (progressBar) {
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    }

    // Scrolled class on navbar
    if (navbar) {
      if (scrollTop > 20) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    }

    // Back to top visibility
    if (backToTop) {
      if (scrollTop > 450) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------------------------------
     3. ACCESSIBLE MOBILE DRAWER MENU
  ------------------------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileMenuClose = document.getElementById('mobileMenuClose');

  function openMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.add('is-open');
    mobileOverlay.classList.add('is-open');
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove('is-open');
    mobileOverlay.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu && mobileMenu.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile drawer when clicking any link inside it
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  /* ------------------------------------------------------------------
     4. ACTIVE SECTION SCROLL SPY
  ------------------------------------------------------------------ */
  const navTabs = document.querySelectorAll('.navbar__tabs .tab');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveTab() {
    const scrollPos = window.scrollY + 180;
    let currentId = '';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === currentId) {
          tab.classList.add('is-active');
        } else {
          tab.classList.remove('is-active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveTab, { passive: true });
  updateActiveTab();

  /* ------------------------------------------------------------------
     5. PROGRESSIVE SCROLL REVEAL (INTERSECTION OBSERVER)
  ------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('[data-aos]');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-ready');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.04
    });

    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Only elements below the initial viewport get aos-init
      if (rect.top >= window.innerHeight - 20) {
        el.classList.add('aos-init');
        observer.observe(el);
      } else {
        el.classList.add('aos-visible');
      }
    });

    // Fallback: Reveal all after 1.5s in case user doesn't scroll
    setTimeout(() => {
      revealElements.forEach(el => el.classList.add('aos-visible'));
    }, 1500);
  }

  /* ------------------------------------------------------------------
     6. DYNAMIC COPYRIGHT YEAR
  ------------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
