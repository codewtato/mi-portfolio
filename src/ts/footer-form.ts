const secciones = Array.from(
  document.querySelectorAll<HTMLElement>('section, footer')
);

const contacto = `
  <div class="contacto">
    <p class="cal-sans-regular">M</p>
    <p class="castoro-regular">codewtato@gmail.com</p>
    <p class="cal-sans-regular">T</p>
    <p class="castoro-regular">+54 9 343 501 5897</p>
  </div>
`;

document.querySelectorAll<HTMLElement>('.contenedor-contacto').forEach((contenedor) => {
  contenedor.innerHTML = contacto;

  const elementoContacto = contenedor.querySelector<HTMLElement>('.contacto');
  const seccion = contenedor.closest<HTMLElement>('section, footer');

  if (!elementoContacto || !seccion) return;

  const indice = secciones.indexOf(seccion);
  elementoContacto.classList.toggle('contacto--oscuro', indice % 2 !== 0);
});

const NUMERO_WHATSAPP = '5493435015897';

const formulario = document.querySelector<HTMLFormElement>('#form-contacto');

formulario?.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const datos = new FormData(formulario);
  const nombre = (datos.get('nombre') as string) ?? '';
  const email = (datos.get('email') as string) ?? '';
  const numero = (datos.get('numero') as string) ?? '';
  const asunto = (datos.get('asunto') as string) ?? '';
  const mensaje = (datos.get('mensaje') as string) ?? '';

  const lineas = [
    `Hola Matias, soy ${nombre}.`,
    asunto && `Asunto: ${asunto}`,
    mensaje,
    `Email: ${email}`,
    numero && `Número: ${numero}`,
  ].filter(Boolean);

  const texto = encodeURIComponent(lineas.join('\n'));
  window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${texto}`, '_blank', 'noopener');
  formulario.reset();
});

const botonCerrar = document.querySelector<HTMLButtonElement>('#cerrar-contacto');

botonCerrar?.addEventListener('click', () => {
  document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
});