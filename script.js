// ── Navbar scroll shadow ──────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 16) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ── Mobile hamburger toggle ───────────────
  const hamBtn    = document.getElementById('ham-btn');
  const drawer    = document.getElementById('mobile-drawer');
  let   isOpen    = false;

  hamBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    hamBtn.setAttribute('aria-expanded', isOpen);
    hamBtn.classList.toggle('ham-open', isOpen);
    drawer.classList.toggle('open', isOpen);
  });

  // Close drawer on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !navbar.contains(e.target)) {
      isOpen = false;
      hamBtn.setAttribute('aria-expanded', false);
      hamBtn.classList.remove('ham-open');
      drawer.classList.remove('open');
    }
  });

  // Close drawer on drawer link click
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      isOpen = false;
      hamBtn.setAttribute('aria-expanded', false);
      hamBtn.classList.remove('ham-open');
      drawer.classList.remove('open');
    });
  });

  // ── Service 4 code typing: start when in view ───────────────
  const softwareSection = document.getElementById('service-software');
  if (softwareSection) {
    const softwareVisual = softwareSection.querySelector('.vis-software');

    if (softwareVisual && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              softwareVisual.classList.add('code-anim-active');
              // Trigger only once per page load
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.35,
        },
      );

      observer.observe(softwareSection);
    } else if (softwareVisual) {
      // Fallback: if IntersectionObserver is not supported, keep animation running
      softwareVisual.classList.add('code-anim-active');
    }
  }