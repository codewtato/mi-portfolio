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