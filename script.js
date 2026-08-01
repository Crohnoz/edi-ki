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
      <a href="https://www.adnradio.cl/2026/07/08/y-cuando-limpia-efe-la-aplaudida-leccion-ciudadana-de-un-influencer-en-las-vias-del-tren-que-arrasa-en-redes/" target="_blank" rel="noopener"><strong>Cobertura periodística</strong><span>ADN Radio · 8 julio 2026 ↗</span></a>
      <a href="https://urbanflowenergydrink.cl/" target="_blank" rel="noopener"><strong>Referencia en cultura urbana</strong><span>Urban Flow ↗</span></a>
      <a href="https://music.apple.com/us/artist/edi-ki/1709557721" target="_blank" rel="noopener"><strong>Catálogo musical asociado</strong><span>Apple Music ↗</span></a>
      <a href="https://open.spotify.com/artist/0bPt9eaaTm7LTUeW4XCjzD" target="_blank" rel="noopener"><strong>Perfil musical asociado</strong><span>Spotify ↗</span></a>
    </div>
    <p class="source-note">Las fotografías y publicaciones permanecen alojadas en sus fuentes originales. La identidad definitiva de los perfiles musicales debe ser confirmada por Edi Ki.</p>
  `;
  pressGrid.insertAdjacentElement('afterend', sources);
}
