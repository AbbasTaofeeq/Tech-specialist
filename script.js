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