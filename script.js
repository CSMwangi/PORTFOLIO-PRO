// Navigation functionality with active indicator
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    // Navigation Active Indicator Function
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

    // Function to show a specific section
    function showSection(sectionId) {
        console.log('Showing section:', sectionId);
        
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the selected page
        const targetPage = document.getElementById(sectionId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Update navigation indicator
        updateNavIndicator();
        
        // Close mobile menu if open
        closeMobileMenu();
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

    // Mobile menu functionality
    if (mobileMenu && navLinksContainer) {
        mobileMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            navLinksContainer.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            const menuIcon = mobileMenu.querySelector('i');
            if (menuIcon) {
                if (navLinksContainer.classList.contains('active')) {
                    menuIcon.className = 'fas fa-times';
                } else {
                    menuIcon.className = 'fas fa-bars';
                }
            }
        });
    }

    // Simple event listeners for nav links - NO CLONING
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinksContainer && navLinksContainer.classList.contains('active') && 
            !e.target.closest('nav') && !e.target.closest('.mobile-menu')) {
            closeMobileMenu();
        }
    });

    // Initialize navigation indicator
    updateNavIndicator();
    
    // Initialize typing effect
    initTypingEffect();

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('about');
        });
    }

    // Update indicator on window resize
    window.addEventListener('resize', updateNavIndicator);
});

// Enhanced typing effect function
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const texts = [
        "Data & AI",
        "IT Support",
        "Cybersecurity"
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

// Global closeMobileMenu function
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
