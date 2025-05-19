document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Set canvas size to fill the window
    canvas.width = width;
    canvas.height = height;
    
    // Resize canvas when window resizes
    window.addEventListener('resize', function() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });
    
    // Particle class for bubbles and floating elements
    class Particle {
        constructor(options) {
            this.x = options.x || Math.random() * width;
            this.y = options.y || Math.random() * height;
            this.size = options.size || Math.random() * 5 + 1;
            this.speedX = options.speedX || (Math.random() - 0.5) * 0.5;
            this.speedY = options.speedY || (Math.random() - 0.5) * 0.5;
            this.opacity = options.opacity || Math.random() * 0.5 + 0.1;
            this.color = options.color || getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
            this.shape = options.shape || (Math.random() > 0.7 ? 'circle' : Math.random() > 0.5 ? 'square' : 'triangle');
        }
        
        update() {
            // Move particle
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around screen edges
            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.globalAlpha = this.opacity;
            
            if (this.shape === 'circle') {
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            } else if (this.shape === 'square') {
                ctx.rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
            } else if (this.shape === 'triangle') {
                ctx.moveTo(this.x, this.y - this.size);
                ctx.lineTo(this.x + this.size, this.y + this.size);
                ctx.lineTo(this.x - this.size, this.y + this.size);
                ctx.closePath();
            }
            
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = Math.min(100, width * height / 10000); // Adjust based on screen size
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle({
            color: getRandomColor()
        }));
    }
    
    // Generate colors based on theme
    function getRandomColor() {
        const theme = document.documentElement.getAttribute('data-theme');
        const colors = theme === 'light' 
            ? ['#6366f1', '#4f46e5', '#818cf8', '#93c5fd', '#a5b4fc']  // Light theme colors
            : ['#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81']; // Dark theme colors
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Connect particles with lines if they're close enough
    function connectParticles() {
        const maxDistance = 150;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    // Set line opacity based on distance
                    const opacity = 1 - (distance / maxDistance);
                    ctx.beginPath();
                    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
                    ctx.globalAlpha = opacity * 0.2;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        // Clear canvas with semi-transparent background for trailing effect
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        // Connect particles with lines
        connectParticles();
        
        requestAnimationFrame(animate);
    }
    
    // Update particle colors when theme changes
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        setTimeout(() => {
            particles.forEach(particle => {
                particle.color = getRandomColor();
            });
        }, 300);
    });
    
    // Start animation
    animate();
});
