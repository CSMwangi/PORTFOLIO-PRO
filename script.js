// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // Function to show a specific section
    function showSection(sectionId) {
        console.log('Showing section:', sectionId); // Debug log
        
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the selected page
        const targetPage = document.getElementById(sectionId);
        if (targetPage) {
            targetPage.classList.add('active');
        } else {
            console.error('Target page not found:', sectionId);
        }
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId || link.getAttribute('href') === '#' + sectionId) {
                link.classList.add('active');
            }
        });
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        if (navLinksContainer) {
            navLinksContainer.classList.remove('active');
        }
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            const menuIcon = mobileMenu.querySelector('i');
            if (menuIcon) {
                menuIcon.className = 'fas fa-bars';
            }
        }
        document.body.classList.remove('menu-open');
    }
    
    // Enhanced mobile menu functionality
    if (mobileMenu && navLinksContainer) {
        const handleMobileMenu = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpening = !navLinksContainer.classList.contains('active');
            
            // Toggle active class
            navLinksContainer.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Change menu icon
            const menuIcon = mobileMenu.querySelector('i');
            if (menuIcon) {
                if (navLinksContainer.classList.contains('active')) {
                    menuIcon.className = 'fas fa-times';
                } else {
                    menuIcon.className = 'fas fa-bars';
                }
            }
        };
        
        mobileMenu.addEventListener('click', handleMobileMenu);
        mobileMenu.addEventListener('touchstart', handleMobileMenu, { passive: false });
    }
    
    // Enhanced event listener for nav links (works for both click and touch)
    navLinks.forEach(link => {
        // Remove existing event listeners to prevent duplicates
        link.replaceWith(link.cloneNode(true));
    });
    
    // Re-select links after cloning
    const freshNavLinks = document.querySelectorAll('.nav-link');
    
    freshNavLinks.forEach(link => {
        const handleNavigation = function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            
            let sectionId;
            // Try multiple ways to get the section ID
            if (this.getAttribute('data-section')) {
                sectionId = this.getAttribute('data-section');
            } else if (this.getAttribute('href')) {
                sectionId = this.getAttribute('href').substring(1);
            } else {
                console.error('No section identifier found on link:', this);
                return;
            }
            
            console.log('Navigation clicked:', sectionId); // Debug
            showSection(sectionId);
        };
        
        // Add both click and touchstart events for mobile compatibility
        link.addEventListener('click', handleNavigation);
        link.addEventListener('touchstart', handleNavigation, { passive: false });
    });
    
    // Enhanced close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinksContainer && navLinksContainer.classList.contains('active') && 
            !e.target.closest('nav') && !e.target.closest('.mobile-menu')) {
            closeMobileMenu();
        }
    });
    
    // Also handle touch events for closing menu
    document.addEventListener('touchstart', function(e) {
        if (navLinksContainer && navLinksContainer.classList.contains('active') && 
            !e.target.closest('nav') && !e.target.closest('.mobile-menu')) {
            closeMobileMenu();
        }
    });
    
    // Initialize profile image
    initProfileImage();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        const handleScrollIndicator = function(e) {
            e.preventDefault();
            showSection('about');
        };
        
        scrollIndicator.addEventListener('click', handleScrollIndicator);
        scrollIndicator.addEventListener('touchstart', handleScrollIndicator, { passive: false });
    }
    
    // Debug: Log initial state
    console.log('Navigation initialized');
    console.log('Nav links found:', navLinks.length);
    console.log('Pages found:', pages.length);
    console.log('Mobile menu found:', !!mobileMenu);
});

// Profile image loading handler
function initProfileImage() {
    const profileImage = document.getElementById('profile-image');
    const placeholder = document.getElementById('image-placeholder');
    
    if (profileImage && placeholder) {
        profileImage.onload = function() {
            // Image loaded successfully
            placeholder.style.display = 'none';
            profileImage.style.display = 'block';
        };
        
        profileImage.onerror = function() {
            // Image failed to load
            placeholder.style.display = 'flex';
            profileImage.style.display = 'none';
        };
        
        // Trigger initial check
        if (profileImage.complete) {
            profileImage.onload();
        } else {
            // If image is still loading, show placeholder temporarily
            placeholder.style.display = 'flex';
            profileImage.style.display = 'none';
        }
    }
}

// Enhanced typing effect function
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const texts = [
        "Data & AI Expert", 
        "Software Development", 
        "Cybersecurity - Ethical Hacking", 
        "Economic Analyst",
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}

// Handle page refresh and direct URL access
window.addEventListener('load', function() {
    // Check if there's a hash in the URL
    const hash = window.location.hash.substring(1);
    const validSections = ['home', 'about', 'expertise', 'projects', 'labs', 'contact'];
    
    if (hash && validSections.includes(hash)) {
        // Show the section from URL hash
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');
        
        // Hide all pages and remove active classes
        pages.forEach(page => page.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Show target page
        const targetPage = document.getElementById(hash);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Activate corresponding nav link
        const targetLink = document.querySelector(`.nav-link[data-section="${hash}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
    } else {
        // Default to home page
        const homePage = document.getElementById('home');
        const homeLink = document.querySelector('.nav-link[data-section="home"]');
        
        if (homePage && homeLink) {
            homePage.classList.add('active');
            homeLink.classList.add('active');
        }
    }
    
    // Close mobile menu on window resize (if mobile menu is open and we resize to desktop)
    window.addEventListener('resize', function() {
        const navLinksContainer = document.querySelector('.nav-links');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (window.innerWidth > 768 && navLinksContainer && navLinksContainer.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});

// Global closeMobileMenu function for resize events
function closeMobileMenu() {
    const navLinksContainer = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (navLinksContainer) {
        navLinksContainer.classList.remove('active');
    }
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        const menuIcon = mobileMenu.querySelector('i');
        if (menuIcon) {
            menuIcon.className = 'fas fa-bars';
        }
    }
    document.body.classList.remove('menu-open');
}

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    // Handle any broken images site-wide
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            // You could set a placeholder image here if needed
            // this.src = 'assets/images/placeholder.jpg';
        });
    });
});

// Performance optimization: Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced resize handler
window.addEventListener('resize', debounce(function() {
    // Handle any responsive behavior that needs debouncing
}, 250));
