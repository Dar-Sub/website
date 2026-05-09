// ===========================
//  RIDWAN AKINFENWA — Portfolio JS
//  Enhanced with hero animations
// ===========================

(function () {
  'use strict';

  // ────────────────────────────────
  // Custom Cursor
  // ────────────────────────────────
  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');
  if (cursor && cursorTrail) {
    let mx = -200, my = -200, tx = -200, ty = -200;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function animateCursor() {
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
      tx += (mx - tx) * 0.14;
      ty += (my - ty) * 0.14;
      cursorTrail.style.left = tx + 'px';
      cursorTrail.style.top  = ty + 'px';
      requestAnimationFrame(animateCursor);
    })();
  }

  // ────────────────────────────────
  // Navbar scroll
  // ────────────────────────────────
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ────────────────────────────────
  // Mobile menu
  // ────────────────────────────────
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      const spans = menuToggle.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(4px,4px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px,-4px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ────────────────────────────────
  // Scroll reveal
  // ────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal-up');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObs.observe(el));

  // ────────────────────────────────
  // Animated counters
  // ────────────────────────────────
  function runCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    let current = 0, step = target / 55;
    const t = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(t);
    }, 28);
  }
  const statsWrap = document.getElementById('heroStats');
  if (statsWrap) {
    setTimeout(() => statsWrap.querySelectorAll('[data-target]').forEach(runCounter), 2000);
  }

  // ────────────────────────────────
  // Typewriter  (hero only)
  // ────────────────────────────────
  const twEl = document.getElementById('typewriterText');
  if (twEl) {
    const roles = [
      'Full Stack Engineer @ Creative Repute',
      'MBA in Artificial Intelligence',
      'Smart Contract Security Researcher',
      'AI / LLM Integration Engineer',
      'DeFi Protocol Engineer',
      'GIS & Forestry Technologist',
    ];
    let ri = 0, ci = 0, deleting = false;
    const speed = { type: 72, delete: 38, pause: 1800, pauseShort: 400 };

    function tick() {
      const word = roles[ri];
      if (!deleting) {
        twEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) {
          deleting = true;
          setTimeout(tick, speed.pause);
          return;
        }
      } else {
        twEl.textContent = word.slice(0, --ci);
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
          setTimeout(tick, speed.pauseShort);
          return;
        }
      }
      setTimeout(tick, deleting ? speed.delete : speed.type);
    }
    setTimeout(tick, 1400);
  }

  // ────────────────────────────────
  // Hero Canvas — particles + hex rings
  // ────────────────────────────────
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], hexRings = [];
    let mouseX = 0, mouseY = 0;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

    class Particle {
      constructor() { this.reset(true); }
      reset(initial) {
        this.x     = Math.random() * W;
        this.y     = initial ? Math.random() * H : (Math.random() > 0.5 ? -5 : H + 5);
        this.vx    = (Math.random() - 0.5) * 0.35;
        this.vy    = (Math.random() - 0.5) * 0.35;
        this.r     = Math.random() * 1.4 + 0.4;
        this.a     = Math.random() * 0.55 + 0.08;
        this.pulse = Math.random() * Math.PI * 2;
      }
      update() {
        this.pulse += 0.02;
        const dx = this.x - mouseX, dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.4;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }
        this.vx *= 0.99; this.vy *= 0.99;
        this.x += this.vx; this.y += this.vy;
        if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) this.reset(false);
      }
      draw() {
        const alpha = this.a * (0.75 + 0.25 * Math.sin(this.pulse));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,184,${alpha})`;
        ctx.fill();
      }
    }

    class HexRing {
      constructor(x, y, r, speed, color) {
        this.x = x; this.y = y; this.r = r; this.rot = 0;
        this.speed = speed; this.color = color;
        this.opacity = 0; this.target = 0.13 + Math.random() * 0.1;
      }
      update() {
        this.rot += this.speed;
        this.opacity += (this.target - this.opacity) * 0.02;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = i * Math.PI / 3;
          i === 0 ? ctx.moveTo(this.r * Math.cos(a), this.r * Math.sin(a))
                  : ctx.lineTo(this.r * Math.cos(a), this.r * Math.sin(a));
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(${this.color},${this.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }
    }

    const count = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 10000));
    for (let i = 0; i < count; i++) particles.push(new Particle());

    function initHexRings() {
      const hx = W * 0.72, hy = H * 0.44;
      hexRings = [
        new HexRing(hx,      hy,      180,  0.004,  '0,229,184'),
        new HexRing(hx,      hy,      120, -0.007,  '0,229,184'),
        new HexRing(hx,      hy,       70,  0.012,  '0,102,255'),
        new HexRing(hx,      hy,       30, -0.018,  '0,229,184'),
        new HexRing(hx + 80, hy - 60,  50,  0.009,  '0,102,255'),
      ];
    }
    initHexRings();
    window.addEventListener('resize', initHexRings);

    function drawConnections() {
      const maxD = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,184,${(1 - d / maxD) * 0.13})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      hexRings.forEach(h => { h.update(); h.draw(); });
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ────────────────────────────────
  // Parallax grid on mousemove
  // ────────────────────────────────
  const heroGrid = document.getElementById('heroGrid');
  if (heroGrid) {
    document.addEventListener('mousemove', e => {
      const rx = (e.clientX / window.innerWidth  - 0.5) * 20;
      const ry = (e.clientY / window.innerHeight - 0.5) * 20;
      heroGrid.style.transform = `translate(${rx}px, ${ry}px)`;
    }, { passive: true });
  }

  // ────────────────────────────────
  // Magnetic buttons
  // ────────────────────────────────
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      btn.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // ────────────────────────────────
  // Hero title glitch on click
  // ────────────────────────────────
  const htFirst = document.querySelector('.ht-first');
  if (htFirst) {
    htFirst.addEventListener('click', () => {
      htFirst.style.animation = 'none';
      void htFirst.offsetWidth;
      htFirst.style.animation = 'glitch 0.5s steps(2) forwards';
      setTimeout(() => { htFirst.style.animation = ''; }, 600);
    });
  }

  // ────────────────────────────────
  // Skill bars animation
  // ────────────────────────────────
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length) {
    const barObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute('data-width') + '%';
          barObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    skillBars.forEach(b => barObs.observe(b));
  }

  // ────────────────────────────────
  // Contact form
  // ────────────────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('.submit-btn');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#00e5b8';
        btn.style.color = '#080c10';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.style.background = btn.style.color = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ────────────────────────────────
  // Active nav link
  // ────────────────────────────────
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const p = link.getAttribute('data-page');
    link.classList.toggle('active',
      (page === 'index.html' && p === 'home') ||
      (page === ''           && p === 'home') ||
      (page === 'about.html'    && p === 'about') ||
      (page === 'projects.html' && p === 'projects') ||
      (page === 'skills.html'   && p === 'skills') ||
      (page === 'certifications.html' && p === 'certifications') ||
      (page === 'contact.html'  && p === 'contact')
    );
  });

})();
