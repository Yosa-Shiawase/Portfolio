const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

let particlesArray;
let mouse = { x: null, y: null, radius: 150 };

// Cursor Interaction
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    cursorDot.style.left = e.x + 'px';
    cursorDot.style.top = e.y + 'px';
    cursorOutline.animate({ left: e.x + 'px', top: e.y + 'px' }, { duration: 500, fill: "forwards" });
});

// Name Animation Logic
window.addEventListener('DOMContentLoaded', () => {
    const spans = document.querySelectorAll('#animated-name span');
    spans.forEach((span, index) => {
        setTimeout(() => {
            span.classList.add('fade');
        }, index * 100);
    });
});

// Canvas Setup
function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000; /* */
    
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1; /* */
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        particlesArray.push({ x, y, directionX, directionY, size });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        // Bounce
        if (p.x > canvas.width || p.x < 0) p.directionX = -p.directionX;
        if (p.y > canvas.height || p.y < 0) p.directionY = -p.directionY;
        
        p.x += p.directionX;
        p.y += p.directionY;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    });
    
    // Connection Logic
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 150) {
                ctx.strokeStyle = `rgba(0, 212, 255, ${1 - dist/150})`; /* */
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();