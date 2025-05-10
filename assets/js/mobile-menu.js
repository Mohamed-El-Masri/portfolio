document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('profile-sidebar');
    
    // Create mobile menu overlay
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'mobile-menu-overlay';
    document.body.appendChild(menuOverlay);
    
    // Create close button for sidebar (only shown on mobile)
    const closeButton = document.createElement('button');
    closeButton.className = 'close-sidebar';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    sidebar.appendChild(closeButton);
    
    // Toggle sidebar on menu button click
    mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        document.body.classList.add('mobile-menu-active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Close sidebar function
    function closeSidebar() {
        sidebar.classList.remove('active');
        document.body.classList.remove('mobile-menu-active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Close sidebar when close button is clicked
    closeButton.addEventListener('click', closeSidebar);
    
    // Close sidebar when overlay is clicked
    menuOverlay.addEventListener('click', closeSidebar);
    
    // Close sidebar when clicking on a link (for mobile)
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });
    
    // Update sidebar visibility on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });
    
    // Add active class to nav links based on scroll position
    function setActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.sidebar-nav a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }
    
    // Run on scroll
    window.addEventListener('scroll', setActiveNav);
    
    // Run once on load
    setActiveNav();
});
