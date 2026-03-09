// ===================== CUSTOM CURSOR =====================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

function animateFollower() {
  followerX += (mouseX - followerX - 18) * 0.12;
  followerY += (mouseY - followerY - 18) * 0.12;
  follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .project-card, .social-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    follower.style.width = '60px';
    follower.style.height = '60px';
    follower.style.borderColor = 'rgba(139,26,58,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.width = '36px';
    follower.style.height = '36px';
    follower.style.borderColor = 'rgba(139,26,58,0.5)';
  });
});

// ===================== SCROLL REVEAL =====================
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// ===================== CONTACT FORM =====================
function handleSubmit() {
  const btn = document.querySelector('.form-submit');
  btn.textContent = '✓ Mensaje enviado';
  btn.style.background = 'linear-gradient(135deg, #8b1a3a, #a0485e)';
  btn.style.color = '#080808';
  btn.style.borderColor = 'transparent';
  setTimeout(() => {
    btn.textContent = 'Enviar mensaje →';
    btn.style.background = '';
    btn.style.color = '';
    btn.style.borderColor = '';
  }, 3000);
}

// ===================== HERO PARALLAX =====================
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const bg = document.querySelector('.hero-bg');
  if (bg) bg.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
});