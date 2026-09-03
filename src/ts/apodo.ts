const apodo = document.getElementById('apodo');

const nucleosCPU = navigator.hardwareConcurrency || 4;
const esPCViejita = (nucleosCPU <= 4 || window.innerWidth <= 768);

if (apodo && !esPCViejita) {
  apodo.addEventListener('mousemove', (e: MouseEvent) => {
    const x = e.offsetX;
    const y = e.offsetY;

    apodo.style.setProperty('--mouse-x', `${x}px`);
    apodo.style.setProperty('--mouse-y', `${y}px`);
  });

  apodo.addEventListener('mouseleave', () => {
    apodo.style.setProperty('--mouse-x', '-1000px');
    apodo.style.setProperty('--mouse-y', '-1000px');
  });
}