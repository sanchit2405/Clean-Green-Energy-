/* ---------------------- SIDEBAR HOVER TOGGLE ---------------------- */
const hamburger = document.getElementById('hamburger');
const sideNav = document.getElementById('side-nav');
const mainContent = document.querySelector('main.container');

let hoverTimeout;

// When mouse hovers over hamburger → open sidebar
hamburger.addEventListener('mouseenter', () => {
  clearTimeout(hoverTimeout);
  hamburger.classList.add('active');
  sideNav.classList.add('open');
  mainContent.classList.add('shift');
});

// When mouse leaves hamburger → check if not over sidebar → close after delay
hamburger.addEventListener('mouseleave', () => {
  hoverTimeout = setTimeout(() => {
    if (!sideNav.matches(':hover')) {
      sideNav.classList.remove('open');
      hamburger.classList.remove('active');
      mainContent.classList.remove('shift');
    }
  }, 200);
});

// When mouse leaves sidebar → close after small delay
sideNav.addEventListener('mouseleave', () => {
  hoverTimeout = setTimeout(() => {
    sideNav.classList.remove('open');
    hamburger.classList.remove('active');
    mainContent.classList.remove('shift');
  }, 200);
});

// Prevent accidental closing when moving from hamburger → sidebar
sideNav.addEventListener('mouseenter', () => clearTimeout(hoverTimeout));


/* ---------------------- PARTICLE BACKGROUND ---------------------- */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Resize canvas to full window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around edges
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }
  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Initialize particles
function initParticles() {
  particlesArray = [];
  const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}
initParticles();

// Animate particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
