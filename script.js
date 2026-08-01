const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
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

const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
  .source-library{margin-top:28px;padding:30px;border:1px solid var(--line);border-radius:18px;background:#f7faf4}
  .source-links{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
  .source-links a{display:flex;min-height:118px;flex-direction:column;justify-content:space-between;padding:18px;border:1px solid #d9e2d5;border-radius:12px;background:#fff;color:var(--text);text-decoration:none;transition:.2s}
  .source-links a:hover{transform:translateY(-2px);border-color:#9bcf59;box-shadow:0 12px 30px rgba(30,50,20,.07)}
  .source-links strong{font-size:.95rem;line-height:1.25}
  .source-links span{color:#5f8b2e;font-size:.75rem;font-weight:800}
  .source-note{margin:18px 0 0;color:#6c7469;font-size:.76rem}
  @media(max-width:850px){.source-links{grid-template-columns:1fr 1fr}}
  @media(max-width:560px){.source-links{grid-template-columns:1fr}.source-library{padding:22px}}
`;
document.head.appendChild(dynamicStyles);

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
    <p class="eyebrow">Enlaces y perfiles públicos</p>
    <div class="source-links">
      <a href="https://www.instagram.com/edi_ki_san/" target="_blank" rel="noopener"><strong>Instagram oficial asociado</strong><span>@edi_ki_san ↗</span></a>
      <a href="https://www.instagram.com/reel/DaiTbjpOJEk/" target="_blank" rel="noopener"><strong>Publicación original de la limpieza</strong><span>Ver reel ↗</span></a>
      <a href="https://www.adnradio.cl/2026/07/08/y-cuando-limpia-efe-la-aplaudida-leccion-ciudadana-de-un-influencer-en-las-vias-del-tren-que-arrasa-en-redes/" target="_blank" rel="noopener"><strong>Cobertura periodística</strong><span>ADN Radio · 8 julio 2026 ↗</span></a>
      <a href="https://urbanflowenergydrink.cl/" target="_blank" rel="noopener"><strong>Referencia en cultura urbana</strong><span>Urban Flow ↗</span></a>
      <a href="https://music.apple.com/us/artist/edi-ki/1709557721" target="_blank" rel="noopener"><strong>Catálogo musical asociado</strong><span>Apple Music ↗</span></a>
      <a href="https://open.spotify.com/artist/0bPt9eaaTm7LTUeW4XCjzD" target="_blank" rel="noopener"><strong>Perfil musical asociado</strong><span>Spotify ↗</span></a>
    </div>
    <p class="source-note">Las fotografías y publicaciones permanecen alojadas en sus fuentes originales. La identidad definitiva de los perfiles musicales debe ser confirmada por Edi Ki.</p>
  `;
  pressGrid.insertAdjacentElement('afterend', sources);
}
