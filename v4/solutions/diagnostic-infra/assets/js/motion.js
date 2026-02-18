(function () {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

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

  const hero = document.querySelector('.hero');
  if (hero) {
    const art = hero.querySelector('.heroArt');
    if (art && window.matchMedia('(hover:hover)').matches) {
      let raf = null;
      hero.addEventListener('mousemove', (ev) => {
        const rect = hero.getBoundingClientRect();
        const x = (ev.clientX - rect.left) / rect.width - 0.5;
        const y = (ev.clientY - rect.top) / rect.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          art.style.transform = `perspective(900px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*4).toFixed(2)}deg) translateY(-2px)`;
        });
      }, { passive:true });
      hero.addEventListener('mouseleave', () => art.style.transform = '');
    }
  }

  const header = document.querySelector('.header');
  if (header) {
    const set = () => window.scrollY > 8 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
    set();
    window.addEventListener('scroll', set, { passive: true });
  }
})();
// Accordion (committee packet / FAQ style)
(function(){
  const accs = document.querySelectorAll('[data-accordion] .accItem');
  accs.forEach((item) => {
    const btn = item.querySelector('.accBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');
      // close siblings
      const parent = item.parentElement;
      parent.querySelectorAll('.accItem.open').forEach(x => x.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
})();