const robustStyles = document.createElement('link');
robustStyles.rel = 'stylesheet';
robustStyles.href = 'robust.css';
document.head.appendChild(robustStyles);

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '×' : '☰';
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
    menuButton?.focus();
  }
});

document.querySelector('[data-share]')?.addEventListener('click', async () => {
  const shareData = {
    title: 'Edi Ki Acción',
    text: 'Conoce esta propuesta para organizar voluntariado y acciones comunitarias en Graneros.',
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    alert('Enlace copiado al portapapeles.');
  } catch (error) {
    if (error.name !== 'AbortError') console.error('No fue posible compartir:', error);
  }
});

const supportType = document.querySelector('#support-type');
document.querySelectorAll('[data-support]').forEach((card) => {
  card.addEventListener('click', () => {
    const selected = card.dataset.support;
    if (supportType && selected) supportType.value = selected;
  });
});

const pressGrid = document.querySelector('#prensa .media-grid');
const socialCard = pressGrid?.querySelector('.social-card');

if (socialCard) {
  socialCard.href = 'https://www.instagram.com/reel/DaiTbjpOJEk/';
  const label = socialCard.querySelector('span');
  const title = socialCard.querySelector('h3');
  const copy = socialCard.querySelector('p');
  const action = socialCard.querySelector('b');
  if (label) label.textContent = 'REEL ORIGINAL · INSTAGRAM';
  if (title) title.textContent = 'La jornada que puso a Graneros en conversación';
  if (copy) copy.textContent = 'Registro original publicado por Edi Ki junto a sus amigos durante la limpieza del sector ferroviario.';
  if (action) action.textContent = 'Ver publicación original ↗';
}

if (pressGrid) {
  const sources = document.createElement('div');
  sources.className = 'source-library';
  sources.innerHTML = `
    <p class="eyebrow">Biblioteca pública</p>
    <div class="source-links">
      <a href="https://www.instagram.com/edi_ki_san/" target="_blank" rel="noopener noreferrer"><strong>Instagram asociado</strong><span>@edi_ki_san ↗</span></a>
      <a href="https://www.instagram.com/reel/DaiTbjpOJEk/" target="_blank" rel="noopener noreferrer"><strong>Registro original de la limpieza</strong><span>Ver reel ↗</span></a>
      <a href="https://www.adnradio.cl/2026/07/08/y-cuando-limpia-efe-la-aplaudida-leccion-ciudadana-de-un-influencer-en-las-vias-del-tren-que-arrasa-en-redes/" target="_blank" rel="noopener noreferrer"><strong>Cobertura periodística</strong><span>ADN Radio ↗</span></a>
      <a href="https://urbanflowenergydrink.cl/" target="_blank" rel="noopener noreferrer"><strong>Referencia en cultura urbana</strong><span>Urban Flow ↗</span></a>
      <a href="https://music.apple.com/us/artist/edi-ki/1709557721" target="_blank" rel="noopener noreferrer"><strong>Catálogo musical asociado</strong><span>Apple Music ↗</span></a>
      <a href="https://open.spotify.com/artist/0bPt9eaaTm7LTUeW4XCjzD" target="_blank" rel="noopener noreferrer"><strong>Perfil musical asociado</strong><span>Spotify ↗</span></a>
    </div>
    <p class="source-note">Las publicaciones permanecen alojadas en sus fuentes originales. Los perfiles musicales y la biografía definitiva deben ser confirmados por Edi Ki.</p>
  `;
  pressGrid.insertAdjacentElement('afterend', sources);
}

const sourceStyles = document.createElement('style');
sourceStyles.textContent = `.source-library{margin-top:28px;padding:30px;border:1px solid var(--line);border-radius:18px;background:#f7faf4}.source-links{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.source-links a{display:flex;min-height:118px;flex-direction:column;justify-content:space-between;padding:18px;border:1px solid #d9e2d5;border-radius:12px;background:#fff;color:var(--text);text-decoration:none;transition:.2s}.source-links a:hover{transform:translateY(-2px);border-color:#9bcf59;box-shadow:0 12px 30px rgba(30,50,20,.07)}.source-links strong{font-size:.95rem;line-height:1.25}.source-links span{color:#5f8b2e;font-size:.75rem;font-weight:800}.source-note{margin:18px 0 0;color:#6c7469;font-size:.76rem}@media(max-width:850px){.source-links{grid-template-columns:1fr 1fr}}@media(max-width:560px){.source-links{grid-template-columns:1fr}.source-library{padding:22px}}`;
document.head.appendChild(sourceStyles);

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.removeAttribute('aria-current'));
      const current = navLinks.find((link) => link.getAttribute('href') === `#${entry.target.id}`);
      current?.setAttribute('aria-current', 'location');
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => observer.observe(section));
}
