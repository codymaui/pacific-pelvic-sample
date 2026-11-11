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
