import './particulas';
import './apodo.ts';
import './scroll.ts';
import './footer-form.ts';

const nucleosCPU = navigator.hardwareConcurrency || 4;

if (nucleosCPU <= 4 || window.innerWidth <= 768) {
    document.body.classList.add('modo-ahorro');
}
