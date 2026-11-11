(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  const nav = document.getElementById('nav');
  if (nav) {
    let raf;
    const sync = () => nav.classList.toggle('is-solid', window.scrollY > 24);
    sync();
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = null; sync(); });
    }, { passive: true });
  }

  function isHomePage() {
    const path = (location.pathname || '').replace(/\/+$/, '');
    return path === '' || path.endsWith('/index.html') || /\/pacific-pelvic-sample$/.test(path) || path.endsWith('/');
  }

  function goHomeTop(smooth) {
    if (location.hash) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: smooth ? 'smooth' : 'auto' });
    if (nav) nav.classList.remove('is-solid');
  }

  const logo = document.querySelector('.nav-brand');
  if (logo) {
    logo.setAttribute('href', 'index.html');
    logo.addEventListener('click', (e) => {
      if (!isHomePage()) return;
      e.preventDefault();
      goHomeTop(true);
      const btn = document.getElementById('navMenuBtn');
      const drawer = document.getElementById('navDrawer');
      const backdrop = document.getElementById('navBackdrop');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (drawer) drawer.hidden = true;
      if (backdrop) backdrop.hidden = true;
      document.body.classList.remove('nav-menu-open');
      if (nav) nav.classList.remove('is-menu-open');
    });
  }

  if (isHomePage() && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  function navigationType() {
    const entry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    if (entry && entry.type) return entry.type;
    if (performance.navigation) {
      if (performance.navigation.type === 1) return 'reload';
    }
    return 'navigate';
  }

  if (isHomePage() && navigationType() === 'reload') {
    goHomeTop(false);
  }

  const btn = document.getElementById('navMenuBtn');
  const drawer = document.getElementById('navDrawer');
  const backdrop = document.getElementById('navBackdrop');
  if (!btn || !drawer) return;

  function setOpen(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    drawer.hidden = !open;
    if (backdrop) backdrop.hidden = !open;
    document.body.classList.toggle('nav-menu-open', open);
    if (nav) nav.classList.toggle('is-menu-open', open);
  }

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    setOpen(open);
  });
  if (backdrop) backdrop.addEventListener('click', () => setOpen(false));
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();
