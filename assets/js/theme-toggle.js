document.addEventListener('DOMContentLoaded', function() {
    // Get the theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check if user has a saved preference, otherwise default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
    
    // Add click event to toggle theme
    themeToggle.addEventListener('click', function() {
        // Get the current theme
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        // Toggle theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Apply the new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save preference to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update the icon
        updateIcon(newTheme);
    });
    
    // Function to update icon based on theme
    function updateIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
});
