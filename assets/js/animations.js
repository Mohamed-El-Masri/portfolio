document.addEventListener('DOMContentLoaded', () => {
    // Fade in effect for the main content
    const mainContent = document.querySelector('.main-content');
    mainContent.style.opacity = 0;
    mainContent.style.transition = 'opacity 1s ease-in-out';
    mainContent.style.opacity = 1;

    // Add fade-in animation to sections when they come into view
    const sections = document.querySelectorAll('section');
    
    const fadeInOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    sections.forEach(section => {
        section.classList.add('hidden');
        fadeInObserver.observe(section);
    });
    
    // Animate project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    const projectOptions = {
        root: null,
        threshold: 0.1,
    };
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
                projectObserver.unobserve(entry.target);
            }
        });
    }, projectOptions);
    
    projectCards.forEach(card => {
        card.classList.add('hidden');
        projectObserver.observe(card);
    });

    // Add animation to tech stack items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('scale-up');
    });
    
    // Button hover animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('hover');
        });
        button.addEventListener('mouseleave', () => {
            button.classList.remove('hover');
        });
    });

    // Add hover animations to links and buttons
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.classList.add('hover');
        });
        
        link.addEventListener('mouseleave', () => {
            link.classList.remove('hover');
        });
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: 'smooth'
            });
        });
    });

    // Fix for education timeline items visibility on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, timelineOptions);
    
    timelineItems.forEach(item => {
        // Set initial state programmatically to ensure it works
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
});