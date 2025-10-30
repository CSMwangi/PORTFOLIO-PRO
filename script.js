// Main Navigation and Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTypingEffect();
    initializeScrollIndicator();
    initializeImageHandling();
});

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    // Update navigation indicator position
    function updateNavIndicator() {
        const activeLink = document.querySelector('.nav-link.active');
        const navIndicator = document.querySelector('.nav-indicator');
        
        if (activeLink && navIndicator) {
            const linkRect = activeLink.getBoundingClientRect();
            const navRect = activeLink.closest('nav').getBoundingClientRect();
            
            navIndicator.style.width = `${linkRect.width}px`;
            navIndicator.style.left = `${linkRect.left - navRect.left}px`;
        }
    }

    // Show specific section
    function showSection(sectionId) {
        console.log('Switching to section:', sectionId);
        
        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));
        
        // Show target page
        const targetPage = document.getElementById(sectionId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update active nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Update navigation indicator
        updateNavIndicator();
        
        // Close mobile menu
        closeMobileMenu();
        
        // Update URL
        window.history.pushState(null, null, `#${sectionId}`);
    }

    // Close mobile menu
    function closeMobileMenu() {
        if (navLinksContainer && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                const menuIcon = mobileMenu.querySelector('i');
                if (menuIcon) {
                    menuIcon.className = 'fas fa-bars';
                }
            }
        }
    }

    // Add click events to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Mobile menu functionality
    if (mobileMenu && navLinksContainer) {
        mobileMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpening = !navLinksContainer.classList.contains('active');
            navLinksContainer.classList.toggle('active');
            this.classList.toggle('active');
            
            const menuIcon = this.querySelector('i');
            if (menuIcon) {
                menuIcon.className = isOpening ? 'fas fa-times' : 'fas fa-bars';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu')) {
            closeMobileMenu();
        }
    });

    // Handle URL hash on page load
    function handleInitialLoad() {
        const hash = window.location.hash.substring(1);
        const validSections = ['home', 'about', 'expertise', 'projects', 'labs', 'contact'];
        
        if (hash && validSections.includes(hash)) {
            showSection(hash);
        } else {
            showSection('home');
        }
    }

    // Initialize
    handleInitialLoad();
    
    // Update indicator on window resize
    window.addEventListener('resize', updateNavIndicator);
}

function initializeTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const texts = ["Cybersecurity", "AI & Machine Learning", "Data Analytics"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Check if we've reached the end of the current text
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at the end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect after a delay
    setTimeout(type, 1000);
}

function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                // Find the nav link for about section and trigger click
                const aboutLink = document.querySelector('.nav-link[data-section="about"]');
                if (aboutLink) {
                    aboutLink.click();
                }
            }
        });
    }
}

function initializeImageHandling() {
    const profileImage = document.querySelector('.profile-pic');
    const placeholder = document.querySelector('.image-placeholder');
    
    if (profileImage && placeholder) {
        // Check if image loads successfully
        profileImage.onload = function() {
            placeholder.style.display = 'none';
            profileImage.style.display = 'block';
        };
        
        profileImage.onerror = function() {
            placeholder.style.display = 'flex';
            profileImage.style.display = 'none';
        };
        
        // Trigger check for cached images
        if (profileImage.complete) {
            profileImage.onload();
        } else {
            // Show placeholder while image loads
            placeholder.style.display = 'flex';
            profileImage.style.display = 'none';
        }
    }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    const hash = window.location.hash.substring(1);
    const validSections = ['home', 'about', 'expertise', 'projects', 'labs', 'contact'];
    
    if (hash && validSections.includes(hash)) {
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');
        
        // Update active states
        pages.forEach(page => page.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));
        
        const targetPage = document.getElementById(hash);
        const targetLink = document.querySelector(`.nav-link[data-section="${hash}"]`);
        
        if (targetPage) targetPage.classList.add('active');
        if (targetLink) targetLink.classList.add('active');
        
        // Update navigation indicator
        const navIndicator = document.querySelector('.nav-indicator');
        if (targetLink && navIndicator) {
            const linkRect = targetLink.getBoundingClientRect();
            const navRect = targetLink.closest('nav').getBoundingClientRect();
            
            navIndicator.style.width = `${linkRect.width}px`;
            navIndicator.style.left = `${linkRect.left - navRect.left}px`;
        }
    }
});
