const apodo = document.getElementById('apodo');

if (apodo) {
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