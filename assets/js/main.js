// main.js

document.addEventListener("DOMContentLoaded", function() {
    // Apply saved theme if it exists
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Initialize smooth scrolling for sidebar navigation links
    initSmoothScrolling();
});

// Function to initialize smooth scrolling for sidebar navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset to account for any fixed headers
                const offset = 50;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Remove all form handling code from here - it should be in form-validation.js only

// Add animation delays to tech items
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Social media links hover effects
const socialLinks = document.querySelectorAll('.social-icon, .social-icons a');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = '';
    });
});