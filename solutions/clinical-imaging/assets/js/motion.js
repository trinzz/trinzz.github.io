/**
 * Trinzz subtle motion system (Scale-like feel, lightweight, no libs)
 * - Scroll reveal (fade + rise)
 * - Gentle parallax on hero cards
 * - Button micro-interactions
 * - Card tilt on hover (desktop only)
 * - Respect prefers-reduced-motion
 */
(function () {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // ---- Scroll reveal ----
  const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
  revealEls.forEach(el => io.observe(el));

  // ---- Hero parallax ----
  const hero = document.querySelector('.hero');
  if (hero) {
    const par = hero.querySelectorAll('[data-parallax]');
    let raf = null;
    const onMove = (ev) => {
      if (!par.length) return;
      const rect = hero.getBoundingClientRect();
      const x = (ev.clientX - rect.left) / rect.width - 0.5;
      const y = (ev.clientY - rect.top) / rect.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        par.forEach((el) => {
          const strength = parseFloat(el.getAttribute('data-parallax')) || 8;
          el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
        });
      });
    };
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', () => {
      par.forEach((el) => el.style.transform = 'translate3d(0,0,0)');
    });
  }

  // ---- Hover tilt for cards (desktop) ----
  const canTilt = window.matchMedia && window.matchMedia('(hover: hover)').matches;
  if (canTilt) {
    const tiltCards = Array.from(document.querySelectorAll('[data-tilt]'));
    tiltCards.forEach((card) => {
      let r = null;
      const on = (ev) => {
        const rect = card.getBoundingClientRect();
        const x = (ev.clientX - rect.left) / rect.width - 0.5;
        const y = (ev.clientY - rect.top) / rect.height - 0.5;
        if (r) cancelAnimationFrame(r);
        r = requestAnimationFrame(() => {
          card.style.transform = `perspective(900px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateY(-2px)`;
        });
      };
      card.addEventListener('mousemove', on);
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ---- Navbar shadow on scroll ----
  const header = document.querySelector('.header');
  if (header) {
    const set = () => {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    set();
    window.addEventListener('scroll', set, { passive: true });
  }
})();