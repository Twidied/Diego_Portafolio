const elementos = document.querySelectorAll('.apare');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
elementos.forEach(el => obs.observe(el));

document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const fondo = document.querySelector('.inicio-fondo');
  if (fondo) fondo.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
});

const canvas = document.getElementById('fotoCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, parts = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particula() {
    this.reset = function () {
      this.x = Math.random() * W;
      this.y = H + Math.random() * 100;
      this.r = Math.random() * 2.5 + 0.5;
      this.vel = Math.random() * 0.6 + 0.2;
      this.drift = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.vida = 0;
      this.maxVida = Math.random() * 200 + 150;
      const cols = ['139,26,58', '184,48,96', '107,32,64', '196,96,122', '80,15,35'];
      this.color = cols[Math.floor(Math.random() * cols.length)];
    };
    this.reset();
    this.y = Math.random() * H;
  }

  for (let i = 0; i < 55; i++) parts.push(new Particula());

  function dibujar() {
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0e0509');
    bg.addColorStop(0.5, '#160a12');
    bg.addColorStop(1, '#0a0308');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const t = Date.now() * 0.0008;
    ctx.save();
    ctx.globalAlpha = 0.04;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(139,26,58,${0.6 - i * 0.1})`;
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += 3) {
        const y = H / 2 + Math.sin(x * 0.012 + t + i * 0.8) * (30 + i * 15)
          + Math.sin(x * 0.007 - t * 0.7) * 20;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();

    parts.forEach(p => {
      p.vida++;
      p.y -= p.vel;
      p.x += p.drift + Math.sin(p.vida * 0.03) * 0.3;

      const fade = p.vida < 30 ? p.vida / 30
        : p.vida > p.maxVida - 30 ? (p.maxVida - p.vida) / 30 : 1;

      ctx.beginPath();
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
      g.addColorStop(0, `rgba(${p.color},${p.alpha * fade})`);
      g.addColorStop(1, `rgba(${p.color},0)`);
      ctx.fillStyle = g;
      ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
      ctx.fill();

      if (p.vida >= p.maxVida || p.y < -20) p.reset();
    });

    requestAnimationFrame(dibujar);
  }

  resize();
  dibujar();
  window.addEventListener('resize', resize);
}