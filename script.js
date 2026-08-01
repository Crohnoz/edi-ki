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
