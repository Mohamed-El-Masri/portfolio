document.addEventListener('DOMContentLoaded', function() {
    // Initialize the projects slider
    loadProjects();
});

// Function to load projects from JSON
async function loadProjects() {
    const projectsSection = document.querySelector('.projects-section');
    
    try {
        const response = await fetch('assets/js/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const projects = await response.json();
        
        // Check if we have any projects
        if (!projects || !Array.isArray(projects) || projects.length === 0) {
            throw new Error('No projects found or invalid project data');
        }
        
        renderProjects(projects);
        
        // After rendering projects, initialize the slider functionality
        initializeProjectSlider();
        
        // Initialize the image modal functionality
        initializeImageModal();
        
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsSection.innerHTML = `
            <div class="error-message">
                <h2 class="section-title">Projects</h2>
                <p>Failed to load projects. Please try again later.</p>
                <p class="error-details">Error: ${error.message}</p>
            </div>
        `;
    }
}

// Function to render projects from JSON data
function renderProjects(projects) {
    const projectsContainer = document.querySelector('.projects-section');
    
    // Clear any existing content
    projectsContainer.innerHTML = '<h2 class="section-title">Projects</h2>';
    
    // Create projects container
    const projectsWrapper = document.createElement('div');
    projectsWrapper.className = 'projects-wrapper';
    
    // Loop through projects and create project cards
    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsWrapper.appendChild(projectCard);
    });
    
    projectsContainer.appendChild(projectsWrapper);
}

// Function to create a project card
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.index = index;
    
    // Only show the first project initially
    if (index !== 0) {
        card.style.display = 'none';
    }
    
    // Project title
    const title = document.createElement('h3');
    title.textContent = project.title || 'Untitled Project';
    
    // Project description
    const description = document.createElement('p');
    description.textContent = project.description || 'No description available';
    
    // Project image container with click hint
    const imageContainer = document.createElement('div');
    imageContainer.className = 'project-image';
    
    // Project image
    const image = document.createElement('img');
    image.src = project.image || 'assets/images/placeholder.jpg';
    image.alt = project.title || 'Project image';
    
    // Create image click hint overlay
    const clickHint = document.createElement('div');
    clickHint.className = 'image-click-hint';
    clickHint.innerHTML = `
        <i class="fas fa-search-plus"></i>
        <p>Click to view full image</p>
    `;
    
    // Add image and click hint to image container
    imageContainer.appendChild(image);
    imageContainer.appendChild(clickHint);
    
    // Project actions (links) - Enhanced with icons
    const actions = document.createElement('div');
    actions.className = 'project-actions';
    
    if (project.links.live) {
        const demoLink = document.createElement('a');
        demoLink.href = project.links.live;
        demoLink.target = '_blank';
        demoLink.innerHTML = '<i class="fas fa-globe"></i> Live Demo';
        actions.appendChild(demoLink);
    }

    if (project.links.code) {
        const repoLink = document.createElement('a');
        repoLink.href = project.links.code;
        repoLink.target = '_blank';
        repoLink.innerHTML = '<i class="fab fa-github"></i> GitHub Repo';
        actions.appendChild(repoLink);
    }
    
    // Project tags - Enhanced with icons where applicable
    const tags = document.createElement('div');
    tags.className = 'project-tags';

    // Check if tags array exists before iterating
    if (project.tags && Array.isArray(project.tags)) {
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            // Add icons for common technologies
            const iconClass = getTechIcon(tag);
            if (iconClass) {
                tagElement.innerHTML = `<i class="${iconClass}"></i> ${tag}`;
            } else {
                tagElement.textContent = tag;
            }

            tags.appendChild(tagElement);
        });
    }
    
    // Assemble the card
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(imageContainer);
    card.appendChild(actions);
    card.appendChild(tags);
    
    return card;
}

// Helper function to get icon classes for common technologies
function getTechIcon(tech) {
    const techIcons = {
        'HTML': 'fab fa-html5',
        'HTML5': 'fab fa-html5',
        'CSS': 'fab fa-css3-alt',
        'CSS3': 'fab fa-css3-alt',
        'JavaScript': 'fab fa-js',
        'JS': 'fab fa-js',
        'TypeScript': 'fab fa-js',
        'PHP': 'fab fa-php',
        'Python': 'fab fa-python',
        'Java': 'fab fa-java',
        'React': 'fab fa-react',
        'Vue': 'fab fa-vuejs',
        'Angular': 'fab fa-angular',
        'Node': 'fab fa-node',
        'Node.js': 'fab fa-node-js',
        'WordPress': 'fab fa-wordpress',
        'Sass': 'fab fa-sass',
        'Bootstrap': 'fab fa-bootstrap',
        'Git': 'fab fa-git-alt',
        'GitHub': 'fab fa-github',
        'Docker': 'fab fa-docker',
        'AWS': 'fab fa-aws',
        'API': 'fas fa-plug',
        'MongoDB': 'fas fa-database',
        'MySQL': 'fas fa-database',
        'SQL': 'fas fa-database',
        'Database': 'fas fa-database',
        'Responsive': 'fas fa-mobile-alt',
        'Responsive Design': 'fas fa-mobile-alt',
        'UI': 'fas fa-palette',
        'UX': 'fas fa-user',
        'Testing': 'fas fa-vial',
        'MVC': 'fas fa-project-diagram'
    };
    
    // Check for exact match first
    if (techIcons[tech]) {
        return techIcons[tech];
    }
    
    // Check for partial match
    const techLower = tech.toLowerCase();
    for (const key in techIcons) {
        if (techLower.includes(key.toLowerCase())) {
            return techIcons[key];
        }
    }
    
    // Default icon for other technologies
    return 'fas fa-code';
}

// Function to initialize the slider functionality
function initializeProjectSlider() {
    const projectsContainer = document.querySelector('.projects-section');
    if (!projectsContainer) return;
    
    const projectCards = projectsContainer.querySelectorAll('.project-card');
    if (projectCards.length <= 1) return; // No need for slider with only one project
    
    // Create slider navigation
    const sliderNav = document.createElement('div');
    sliderNav.className = 'slider-navigation';
    
    // Create previous button
    const prevButton = document.createElement('button');
    prevButton.className = 'slider-nav-button prev-button';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.setAttribute('aria-label', 'Previous project');
    
    // Create next button
    const nextButton = document.createElement('button');
    nextButton.className = 'slider-nav-button next-button';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.setAttribute('aria-label', 'Next project');
    
    // Create slider indicator to show current/total
    const sliderIndicator = document.createElement('div');
    sliderIndicator.className = 'slider-indicator';
    
    // Create slider helper text
    const sliderHelper = document.createElement('div');
    sliderHelper.className = 'slider-helper';
    sliderHelper.textContent = 'Use buttons to navigate through projects';
    
    // Add navigation elements to the slider
    sliderNav.appendChild(prevButton);
    sliderNav.appendChild(sliderIndicator);
    sliderNav.appendChild(nextButton);
    
    // Add the navigation and helper to the projects section
    projectsContainer.appendChild(sliderNav);
    projectsContainer.appendChild(sliderHelper);
    
    // Initialize slider state
    let currentIndex = 0;
    
    // Update the indicator text
    updateIndicator();
    
    // Navigation event listeners
    nextButton.addEventListener('click', () => {
        projectCards[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % projectCards.length;
        projectCards[currentIndex].style.display = 'block';
        
        // Animate the card entrance
        projectCards[currentIndex].classList.add('animate-slide-in');
        setTimeout(() => {
            projectCards[currentIndex].classList.remove('animate-slide-in');
        }, 500);
        
        updateIndicator();
    });
    
    prevButton.addEventListener('click', () => {
        projectCards[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + projectCards.length) % projectCards.length;
        projectCards[currentIndex].style.display = 'block';
        
        // Animate the card entrance
        projectCards[currentIndex].classList.add('animate-slide-in');
        setTimeout(() => {
            projectCards[currentIndex].classList.remove('animate-slide-in');
        }, 500);
        
        updateIndicator();
    });
    
    // Function to update the indicator text
    function updateIndicator() {
        sliderIndicator.textContent = `${currentIndex + 1} / ${projectCards.length}`;
    }
    
    // Show helper and hide after 5 seconds
    setTimeout(() => {
        sliderHelper.classList.add('fade-out');
        setTimeout(() => {
            sliderHelper.style.display = 'none';
        }, 1000);
    }, 5000);
}

// Function to initialize the image modal functionality
function initializeImageModal() {
    // Create modal element if it doesn't exist
    if (!document.querySelector('.project-image-modal')) {
        const modal = document.createElement('div');
        modal.className = 'project-image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img class="modal-image" src="" alt="Project full view">
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add event listener for closing modal
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', () => {
            modal.classList.remove('show-modal');
            document.body.style.overflow = ''; // Restore scrolling
        });
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('show-modal');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('show-modal')) {
                modal.classList.remove('show-modal');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
    
    // Add click event to project images (using event delegation)
    document.addEventListener('click', function(event) {
        const projectImage = event.target.closest('.project-image');
        if (projectImage) {
            const img = projectImage.querySelector('img');
            if (img) {
                const modal = document.querySelector('.project-image-modal');
                const modalImg = modal.querySelector('.modal-image');
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modal.classList.add('show-modal');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        }
    });
}
