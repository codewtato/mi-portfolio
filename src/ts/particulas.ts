const canvas = document.getElementById('particulas') as HTMLCanvasElement;

const nucleosCPU = navigator.hardwareConcurrency || 4;
const modoAhorro = nucleosCPU <= 4 || window.innerWidth <= 768;

if (!modoAhorro && canvas) {
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const width = rect?.width ?? window.innerWidth;
      const height = rect?.height ?? window.innerHeight;

      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // El desenfoque se precalcula una sola vez sobre un sprite reutilizable.
    // Aplicar ctx.filter = 'blur()' por particula y por frame es muy costoso
    // en CPU; con drawImage el costo pasa a ser casi gratis.
    const RADIO_SPRITE = 450; // cubre el radiusX maximo posible (150 + 300)
    const MARGEN_BLUR = 100;
    const TAMANIO_SPRITE = (RADIO_SPRITE + MARGEN_BLUR) * 2;

    const sprite = document.createElement('canvas');
    sprite.width = TAMANIO_SPRITE;
    sprite.height = TAMANIO_SPRITE;
    const spriteCtx = sprite.getContext('2d');

    if (spriteCtx) {
      const centro = TAMANIO_SPRITE / 2;
      spriteCtx.filter = 'blur(25px)';

      const gradient = spriteCtx.createRadialGradient(centro, centro, 0, centro, centro, RADIO_SPRITE);
      gradient.addColorStop(0, 'rgb(255, 196, 85)');
      gradient.addColorStop(0.4, 'rgb(249, 156, 94)');
      gradient.addColorStop(1, 'rgba(255, 80, 0, 0.0)');

      spriteCtx.fillStyle = gradient;
      spriteCtx.beginPath();
      spriteCtx.arc(centro, centro, RADIO_SPRITE, 0, Math.PI * 2);
      spriteCtx.fill();
    }

    class Particle {
      x: number;
      y: number;
      radiusX: number;
      radiusY: number;
      speedX: number;
      speedY: number;
      alpha: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.radiusX = Math.random() * 300 + 150;
        this.radiusY = Math.random() * 15 + 5;

        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = Math.random() * 0.5 + 0.15;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.rotation = Math.random() * Math.PI;

        this.rotationSpeed = (Math.random() - 0.5) * 0.005;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y - this.radiusY > canvas.height) {
          this.y = -this.radiusY - 20;
          this.x = Math.random() * canvas.width;
        }

        if (this.x < -this.radiusX) {
          this.x = canvas.width + this.radiusX;
        }

        if (this.x > canvas.width + this.radiusX) {
          this.x = -this.radiusX;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.alpha;

        const scaleY = this.radiusY / this.radiusX;
        ctx.scale(1, scaleY);

        // Nunca se agranda el sprite mas alla de su resolucion nativa, solo se achica
        const escalaSprite = this.radiusX / RADIO_SPRITE;
        const lado = TAMANIO_SPRITE * escalaSprite;
        ctx.drawImage(sprite, -lado / 2, -lado / 2, lado, lado);

        ctx.restore();
      }
    }

    let particles: Particle[] = [];

    const savedParticles = localStorage.getItem('particulasHero');

    if (savedParticles) {
      const parsedData = JSON.parse(savedParticles);
      particles = parsedData.map((data: any) => {
        const p = new Particle();
        Object.assign(p, data);
        return p;
      });
    } else {
      particles = Array.from({ length: 18 }, () => new Particle());
    }

    window.addEventListener('beforeunload', () => {
      const dataToSave = particles.map(p => ({
        x: p.x,
        y: p.y,
        radiusX: p.radiusX,
        radiusY: p.radiusY,
        speedX: p.speedX,
        speedY: p.speedY,
        alpha: p.alpha,
        rotation: p.rotation,
        rotationSpeed: p.rotationSpeed
      }));
      localStorage.setItem('particulasHero', JSON.stringify(dataToSave));
    });

    // Se pausa el loop cuando el hero sale de pantalla (scrolleado), para no
    // seguir dibujando de fondo mientras el usuario mira otra seccion.
    let visible = true;
    new IntersectionObserver(([entrada]) => {
      visible = entrada.isIntersecting;
    }).observe(canvas);

    const animate = () => {
      if (visible) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });
      }

      requestAnimationFrame(animate);
    };

    animate();
  }
} else if (canvas) {
  canvas.style.display = 'none';
}
