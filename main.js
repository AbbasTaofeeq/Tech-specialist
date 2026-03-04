// ── SCROLL REVEAL ──────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target); // Only animate once
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el)); 

// ── BAR FILLS ──────────────────────────────────────
const pvEl = document.getElementById('pv');
if (pvEl) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-fill').forEach(bar => bar.classList.add('go'));
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  barObserver.observe(pvEl);
}

// ── STICKY CTA ─────────────────────────────────────
const stickyEl = document.getElementById('sticky');
const stickyX = document.getElementById('sticky-x');
let dismissed = false;

function handleStickyScroll() {
  if (!dismissed) {
    stickyEl.classList.toggle('show', window.scrollY > 700);
  }
}

window.addEventListener('scroll', handleStickyScroll, { passive: true });

stickyX.addEventListener('click', () => {
  dismissed = true;
  stickyEl.classList.remove('show');
});

 
 // ── Service 4 code typing: start when in view ───────────────
  // const softwareSection = document.getElementById('service-software');
  // if (softwareSection) {
  //   const softwareVisual = softwareSection.querySelector('.vis-software');

  //   if (softwareVisual && 'IntersectionObserver' in window) {
  //     const observer = new IntersectionObserver(
  //       (entries, obs) => {
  //         entries.forEach(entry => {
  //           if (entry.isIntersecting) {
  //             softwareVisual.classList.add('code-anim-active');
  //             // Trigger only once per page load
  //             obs.unobserve(entry.target);
  //           }
  //         });
  //       },
  //       {
  //         threshold: 0.35,
  //       },
  //     );

  //     observer.observe(softwareSection);
  //   } else if (softwareVisual) {
  //     // Fallback: if IntersectionObserver is not supported, keep animation running
  //     softwareVisual.classList.add('code-anim-active');
  //   }
  // }