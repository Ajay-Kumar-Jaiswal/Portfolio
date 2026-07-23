/* ==========================================================================
   Ajay Jaiswal — PORTFOLIO
   Vanilla JS — no dependencies.
   Sections: Loader, Progress bar, Cursor glow, Particles, Navbar behavior,
   Mobile menu, Typing animation, Scroll reveal, Skill bars, Counters,
   Timeline fill, Testimonial slider, Contact form, Ripple, Back-to-top.
   ========================================================================== */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     1. LOADING SCREEN
  ------------------------------------------------------------------ */
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  const loaderText = document.getElementById('loaderText');

  const loaderMessages = [
    'installing_dependencies…',
    'compiling_portfolio.js',
    'optimizing_assets…',
    'ready.'
  ];

  function runLoader() {
    let progress = 0;
    let msgIndex = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 22 + 8;
      if (progress >= 100) progress = 100;
      loaderFill.style.width = progress + '%';

      const targetMsg = Math.min(
        Math.floor((progress / 100) * loaderMessages.length),
        loaderMessages.length - 1
      );
      if (targetMsg !== msgIndex) {
        msgIndex = targetMsg;
        loaderText.textContent = loaderMessages[msgIndex];
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add('is-hidden');
          document.body.style.overflow = '';
        }, 300);
      }
    }, 160);
  }

  document.body.style.overflow = 'hidden';
  window.addEventListener('load', () => {
    setTimeout(runLoader, 250);
  });
  // Fallback in case 'load' already fired or takes too long
  setTimeout(() => {
    if (!loader.classList.contains('is-hidden') && loaderFill.style.width === '') {
      runLoader();
    }
  }, 1200);

  /* ------------------------------------------------------------------
     2. SCROLL PROGRESS BAR
  ------------------------------------------------------------------ */
  const progressBar = document.getElementById('progressBar');
  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ------------------------------------------------------------------
     3. CURSOR GLOW (desktop / hover-capable devices only)
  ------------------------------------------------------------------ */
  const cursorGlow = document.getElementById('cursorGlow');
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (canHover && !prefersReducedMotion) {
    let glowX = window.innerWidth / 2;
    let glowY = window.innerHeight / 2;
    let curX = glowX, curY = glowY;

    window.addEventListener('mousemove', (e) => {
      glowX = e.clientX;
      glowY = e.clientY;
    });

    function animateGlow() {
      curX += (glowX - curX) * 0.12;
      curY += (glowY - curY) * 0.12;
      cursorGlow.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  } else {
    cursorGlow.style.display = 'none';
  }

  /* ------------------------------------------------------------------
     4. FLOATING PARTICLES (canvas)
  ------------------------------------------------------------------ */
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let canvasW, canvasH;

  function resizeCanvas() {
    canvasW = canvas.width = window.innerWidth;
    canvasH = canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = window.innerWidth < 700 ? 26 : 55;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvasW,
      y: Math.random() * canvasH,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.5 + 0.15,
      hue: Math.random() > 0.5 ? '110,86,207' : '34,211,238'
    }));
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvasW, canvasH);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvasW;
      if (p.x > canvasW) p.x = 0;
      if (p.y < 0) p.y = canvasH;
      if (p.y > canvasH) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue}, ${p.alpha})`;
      ctx.fill();
    });
    if (!prefersReducedMotion) requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  createParticles();
  if (!prefersReducedMotion) {
    drawParticles();
  } else {
    // draw a single static frame
    drawParticlesStatic();
  }
  function drawParticlesStatic() {
    ctx.clearRect(0, 0, canvasW, canvasH);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue}, ${p.alpha})`;
      ctx.fill();
    });
  }

  window.addEventListener('resize', debounce(() => {
    resizeCanvas();
    createParticles();
    if (prefersReducedMotion) drawParticlesStatic();
  }, 200));

  /* ------------------------------------------------------------------
     5. NAVBAR: scrolled state + hide-on-scroll-down + active link
  ------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('main section[id]');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function handleNavbarScroll() {
    const currentY = window.scrollY;

    navbar.classList.toggle('is-scrolled', currentY > 40);

    if (currentY > lastScrollY && currentY > 160) {
      navbar.classList.add('is-hidden');
    } else {
      navbar.classList.remove('is-hidden');
    }
    lastScrollY = currentY;
  }

  function updateActiveSection() {
    let currentId = '';
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    tabs.forEach((tab) => {
      tab.classList.toggle('is-active', tab.dataset.tab === currentId);
    });
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleNavbarScroll();
        updateActiveSection();
        updateProgressBar();
        updateBackToTop();
        updateTimelineFill();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ------------------------------------------------------------------
     6. MOBILE MENU
  ------------------------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function toggleMobileMenu(forceClose) {
    const shouldOpen = forceClose === false ? false : !hamburger.classList.contains('is-active');
    hamburger.classList.toggle('is-active', shouldOpen);
    mobileMenu.classList.toggle('is-open', shouldOpen);
    hamburger.setAttribute('aria-expanded', String(shouldOpen));
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMobileMenu());
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  /* ------------------------------------------------------------------
     7. SMOOTH SCROLL FOR ALL ANCHOR LINKS
  ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });

  /* ------------------------------------------------------------------
     8. HERO TYPING ANIMATION
  ------------------------------------------------------------------ */
  const typedEl = document.getElementById('typedText');
  const typingStrings = [
    "'Web Developer';",
    "'Creative Engineer';",
    "'AI App Developer';",
    "'Problem Solver';",
    "'Data Analyst';"
  ];

  function typeLoop() {
    if (prefersReducedMotion) {
      typedEl.textContent = typingStrings[0];
      return;
    }
    let stringIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = typingStrings[stringIndex];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          stringIndex = (stringIndex + 1) % typingStrings.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }
  typeLoop();

  /* ------------------------------------------------------------------
     9. SCROLL REVEAL ([data-aos]) via IntersectionObserver
  ------------------------------------------------------------------ */
  const aosElements = document.querySelectorAll('[data-aos]');
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        entry.target.style.setProperty('--aos-delay', delay + 'ms');
        entry.target.classList.add('aos-visible');
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  aosElements.forEach((el) => aosObserver.observe(el));

  /* ------------------------------------------------------------------
     10. SKILL CARD HOVER GLOW + BAR FILL ON VISIBLE
  ------------------------------------------------------------------ */
  const skillCards = document.querySelectorAll('.skill-card');

  skillCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.skill-card__bar span');
        if (bar) {
          const width = bar.style.width;
          bar.style.width = '0';
          requestAnimationFrame(() => {
            setTimeout(() => { bar.style.width = width; }, 80);
          });
        }
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  skillCards.forEach((card) => skillObserver.observe(card));

  /* ------------------------------------------------------------------
     11. ANIMATED COUNTERS (statistics)
  ------------------------------------------------------------------ */
  const counters = document.querySelectorAll('.stat__value');

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1800;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(frame);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach((el) => counterObserver.observe(el));

  /* ------------------------------------------------------------------
     12. TIMELINE ANIMATED LINE FILL
  ------------------------------------------------------------------ */
  const timelineFill = document.getElementById('timelineFill');
  const timelineEl = document.querySelector('.timeline');

  function updateTimelineFill() {
    if (!timelineEl || !timelineFill) return;
    const rect = timelineEl.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const total = rect.height;
    const visible = Math.min(Math.max(viewportH * 0.75 - rect.top, 0), total);
    const pct = total > 0 ? (visible / total) * 100 : 0;
    timelineFill.style.height = pct + '%';
  }

  /* ------------------------------------------------------------------
     13. TESTIMONIAL SLIDER
  ------------------------------------------------------------------ */
  const track = document.getElementById('testimonialTrack');
  const slides = track ? Array.from(track.children) : [];
  const dotsContainer = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  let activeSlide = 0;
  let autoplayTimer;

  function buildDots() {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeSlide * 100}%)`;
    dotsContainer.querySelectorAll('button').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === activeSlide);
    });
    resetAutoplay();
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    if (!prefersReducedMotion) {
      autoplayTimer = setInterval(() => goToSlide(activeSlide + 1), 6000);
    }
  }

  if (track && slides.length) {
    buildDots();
    prevBtn.addEventListener('click', () => goToSlide(activeSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(activeSlide + 1));
    resetAutoplay();

    // Swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      if (deltaX > 50) goToSlide(activeSlide - 1);
      else if (deltaX < -50) goToSlide(activeSlide + 1);
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     14. CONTACT FORM (client-side validation + simulated send)
  ------------------------------------------------------------------ */
  // const form = document.getElementById('contactForm');
  // const submitBtn = document.getElementById('submitBtn');
  // const formNote = document.getElementById('formNote');

  // if (form) {
  //   form.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     const name = form.name.value.trim();
  //     const email = form.email.value.trim();
  //     const subject = form.subject.value.trim();
  //     const message = form.message.value.trim();
  //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //     if (!name || !email || !subject || !message) {
  //       formNote.textContent = 'Please fill in every field before sending.';
  //       formNote.classList.remove('is-success');
  //       return;
  //     }
  //     if (!emailPattern.test(email)) {
  //       formNote.textContent = 'That email address doesn\u2019t look right.';
  //       formNote.classList.remove('is-success');
  //       return;
  //     }

  //     submitBtn.disabled = true;
  //     submitBtn.querySelector('span').textContent = 'Sending…';

  //     // Simulated network delay — replace with a real endpoint call when ready.
  //     setTimeout(() => {
  //       formNote.textContent = `Thanks, ${name.split(' ')[0]} — your message is on its way. I\u2019ll reply within a day.`;
  //       formNote.classList.add('is-success');
  //       submitBtn.disabled = false;
  //       submitBtn.querySelector('span').textContent = 'Send Message';
  //       form.reset();
  //     }, 1100);
  //   });
  // }

  /* ------------------------------------------------------------------
     15. RIPPLE BUTTON EFFECT
  ------------------------------------------------------------------ */
  document.querySelectorAll('.ripple').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      if (prefersReducedMotion) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ------------------------------------------------------------------
     16. BACK TO TOP BUTTON
  ------------------------------------------------------------------ */
  const backToTop = document.getElementById('backToTop');
  function updateBackToTop() {
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
  }
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /* ------------------------------------------------------------------
     17. PARALLAX FOR BACKGROUND BLOBS (mouse-follow gradient)
  ------------------------------------------------------------------ */
  if (canHover && !prefersReducedMotion) {
    const blobs = document.querySelectorAll('.blob');
    window.addEventListener('mousemove', (e) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 2;
      blobs.forEach((blob, i) => {
        const strength = (i + 1) * 8;
        blob.style.marginLeft = `${xPct * strength}px`;
        blob.style.marginTop = `${yPct * strength}px`;
      });
    });
  }

  /* ------------------------------------------------------------------
     18. FOOTER YEAR
  ------------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     UTILITIES
  ------------------------------------------------------------------ */
  function debounce(fn, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), wait);
    };
  }

  // Initial call so state is correct if page loads mid-scroll (refresh w/ anchor)
  handleNavbarScroll();
  updateActiveSection();
  updateProgressBar();
  updateBackToTop();
  updateTimelineFill();

})();
