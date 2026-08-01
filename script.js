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
    text: 'Conoce esta propuesta de organización comunitaria para Graneros.',
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles.');
    }
  } catch (error) {
    if (error.name !== 'AbortError') console.error(error);
  }
});

const form = document.querySelector('#support-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = form.querySelector('.form-message');
  message.textContent = 'Gracias. Esta es una demostración; aún no se almacenan ni envían datos.';
  form.reset();
});
