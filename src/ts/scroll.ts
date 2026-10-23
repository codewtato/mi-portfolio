const capsula = document.querySelector<HTMLElement>('.capsula');
const secciones = document.querySelectorAll<HTMLElement>('section, footer');

if (capsula && secciones.length > 0) {

  capsula.innerHTML = '';

  // Un indicador relleno se desliza hasta el punto activo (como el selector
  // de paginas de un celular), en vez de rellenar cada punto de golpe.
  const indicador = document.createElement('div');
  indicador.classList.add('capsula-indicador');
  capsula.appendChild(indicador);

  const puntos: HTMLElement[] = [];

  secciones.forEach((seccion) => {
    const punto = document.createElement('div');
    punto.classList.add('punto-capsula');

    punto.addEventListener('click', () => {
      seccion.scrollIntoView({ behavior: 'smooth' });
    });

    capsula.appendChild(punto);
    puntos.push(punto);
  });

  let indiceActivo = 0;

  const moverIndicador = () => {
    const punto = puntos[indiceActivo];
    if (!punto) return;
    const destino = punto.offsetTop + punto.offsetHeight / 2 - indicador.offsetHeight / 2;
    indicador.style.transform = `translate(-50%, ${destino}px)`;
  };

  const observador = new IntersectionObserver(
    (entradas) => {
      const entradaActiva = entradas
        .filter((entrada) => entrada.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!entradaActiva) return;

      const indice = Array.from(secciones).indexOf(entradaActiva.target as HTMLElement);
      if (indice === -1) return;

      indiceActivo = indice;

      const esPar = indice % 2 === 0;

      const colorPista = esPar
        ? 'rgba(229, 220, 207, 0.85)'
        : 'rgba(15, 15, 15, 0.85)';

      const colorActivo = esPar
        ? 'rgba(15, 15, 15, 0.85)'
        : 'rgba(229, 220, 207, 0.85)';

      capsula.style.backgroundColor = colorPista;
      indicador.style.backgroundColor = colorActivo;

      puntos.forEach((punto) => {
        punto.style.borderColor = colorActivo;
      });

      moverIndicador();
    },
    {
      threshold: 0.5
    }
  );

  secciones.forEach((seccion) => {
    observador.observe(seccion);
  });

  window.addEventListener('resize', moverIndicador);
}