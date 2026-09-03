const capsula = document.querySelector<HTMLElement>('.capsula');
const secciones = document.querySelectorAll<HTMLElement>('section, footer');

if (capsula && secciones.length > 0) {
  
  capsula.innerHTML = ''; 
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

  const observador = new IntersectionObserver(
    (entradas) => {
      const entradaActiva = entradas
        .filter((entrada) => entrada.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!entradaActiva) return;

      const indice = Array.from(secciones).indexOf(entradaActiva.target as HTMLElement);
      if (indice === -1) return;

      capsula.style.top = 'calc(50% - 80px)';
      capsula.style.transform = 'none';

      const esPar = indice % 2 === 0;
      
      capsula.style.backgroundColor = esPar 
        ? 'rgba(229, 220, 207, 0.85)' 
        : 'rgba(15, 15, 15, 0.85)';
      
      const colorPuntos = esPar 
        ? 'rgba(15, 15, 15, 0.85)' 
        : 'rgba(229, 220, 207, 0.85)';

      puntos.forEach((punto, i) => {
        punto.style.borderColor = colorPuntos; 
        
        if (i === indice) {
          punto.style.backgroundColor = colorPuntos; 
        } else {
          punto.style.backgroundColor = 'transparent'; 
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  secciones.forEach((seccion) => {
    observador.observe(seccion);
  });
}