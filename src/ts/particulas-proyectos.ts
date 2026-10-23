const canvasProyectos = document.getElementById('particulas-proyectos') as HTMLCanvasElement | null;

const nucleosCPU = navigator.hardwareConcurrency || 4;
const modoAhorro = nucleosCPU <= 4 || window.innerWidth <= 768;

if (canvasProyectos) {
  const ctx = canvasProyectos.getContext('2d');

  if (ctx) {
    let ancho = 0;
    let alto = 0;

    // Se dibuja a la resolucion real de la pantalla para que los puntos no salgan borrosos
    const resizeCanvas = () => {
      const rect = canvasProyectos.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      ancho = rect.width;
      alto = rect.height;
      canvasProyectos.width = ancho * dpr;
      canvasProyectos.height = alto * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cada particula baja por un remolino suelto tipo "cielo estrellado",
    // mas disperso que un anillo prolijo, pegado hacia la derecha de la seccion.
    // El remolino se proyecta en 3D, asi que los puntos de atras se ven mas chicos y apagados.
    class Particula {
      avance: number;
      velocidad: number;
      fase: number;
      ruidoFase: number;
      desvioRadio: number;
      desvioX: number;
      largo: number;
      brillo: number;
      disperso: boolean;

      constructor() {
        this.avance = Math.random();
        this.velocidad = 0.00025 + Math.random() * 0.00035;
        this.fase = Math.random() * Math.PI * 2;
        this.ruidoFase = Math.random() * 1000;

        this.disperso = Math.random() < 0.62;

        this.desvioRadio = this.disperso
          ? 0.35 + Math.random() * 1.25
          : 0.85 + Math.random() * 0.3;

        this.desvioX = (Math.random() - 0.5) * (this.disperso ? 0.8 : 0.12);

        this.largo = this.disperso
          ? Math.random() * 1.8 + 1
          : Math.random() * 3 + 1.8;

        this.brillo = Math.random() * 0.5 + 0.5;
      }

      update() {
        this.avance += this.velocidad;
        if (this.avance > 1) this.avance -= 1;
      }

      draw(tiempo: number) {
        if (!ctx) return;
        const s = this.avance;

        // El radio crece hacia abajo, con un ensanche fuerte en el ultimo tramo (el rulo)
        const radioBase = Math.min(ancho * 0.24, 130);
        const radio = radioBase * (0.3 + s * 0.65 + Math.pow(s, 4) * 1.5) * this.desvioRadio;

        const velocidadAngular = this.disperso ? 3.4 : 5;
        const angulo = s * Math.PI * velocidadAngular + this.fase + tiempo * 0.00022;
        const profundidad = Math.sin(angulo);

        // Un poco de temblor extra para que la nube no se vea como un anillo perfecto
        const jitter = this.disperso
          ? Math.sin(angulo * 1.7 + this.ruidoFase) * radio * 0.35
          : 0;

        // El eje del remolino va pegado a la derecha, con una leve curva hacia el medio
        const ejeX = ancho * 0.68 - Math.sin(s * Math.PI) * ancho * 0.06;
        const x = ejeX + Math.cos(angulo) * radio + jitter + this.desvioX * ancho;
        const y = -alto * 0.05 + s * alto * 0.92 + profundidad * radio * 0.4;

        const escala = 0.6 + (profundidad + 1) * 0.3;
        ctx.globalAlpha = this.brillo * (0.1 + (profundidad + 1) * 0.28);
        ctx.beginPath();
        ctx.ellipse(x, y, this.largo * escala, 1.4 * escala, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // En celulares o PCs con pocos nucleos se reduce bastante la cantidad:
    // son figuras simples (sin blur ni sombras) asi que el costo es bajo,
    // pero igual conviene aliviar el trabajo en hardware limitado.
    const cantidad = modoAhorro ? 140 : window.innerWidth > 1200 ? 480 : 340;
    const particulas = Array.from({ length: cantidad }, () => new Particula());

    let visible = false;
    new IntersectionObserver(([entrada]) => {
      visible = entrada.isIntersecting;
    }).observe(canvasProyectos);

    const animate = (tiempo: number) => {
      if (visible) {
        ctx.clearRect(0, 0, ancho, alto);
        ctx.fillStyle = 'rgb(229, 220, 207)';

        particulas.forEach((particula) => {
          particula.update();
          particula.draw(tiempo);
        });
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}
