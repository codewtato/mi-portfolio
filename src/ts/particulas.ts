const canvas = document.getElementById('particulas') as HTMLCanvasElement;

if (window.innerWidth > 768) {
  if (canvas) {
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

          ctx.filter = 'blur(25px)';

          const scaleY = this.radiusY / this.radiusX;
          ctx.scale(1, scaleY);

          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radiusX);

          gradient.addColorStop(0, 'rgb(255, 196, 85)');
          gradient.addColorStop(0.4, 'rgb(249, 156, 94)');
          gradient.addColorStop(1, 'rgba(255, 80, 0, 0.0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, this.radiusX, 0, Math.PI * 2);
          ctx.fill();
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

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });

        requestAnimationFrame(animate);
      };

      animate();
    }
  }
} else {
  const canvasParticulas = document.getElementById('particulas');
  if (canvasParticulas) {
    canvasParticulas.style.display = 'none';
  }
}