// Simple Navigation with Active Indicator
document.addEventListener('DOMContentLoaded', function() {
    initializeEverything();
});

function initializeEverything() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');

    // Update navigation indicator
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
        console.log('Showing section:', sectionId);
        
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

    // Navigation links click events
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Hero buttons click events - FIX FOR BUTTONS
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            let sectionId = this.getAttribute('data-section');
            if (!sectionId) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    sectionId = href.substring(1);
                }
            }
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });

    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            e.preventDefault();
            navLinksContainer.classList.toggle('active');
            this.classList.toggle('active');
            
            const menuIcon = this.querySelector('i');
            if (menuIcon) {
                menuIcon.className = navLinksContainer.classList.contains('active') 
                    ? 'fas fa-times' 
                    : 'fas fa-bars';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu')) {
            closeMobileMenu();
        }
    });

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('about');
        });
    }

    // Initialize typing effect
    initTypingEffect();

    // Handle initial page load
    const hash = window.location.hash.substring(1);
    const validSections = ['home', 'about', 'expertise', 'projects', 'labs', 'contact'];
    
    if (hash && validSections.includes(hash)) {
        showSection(hash);
    } else {
        showSection('home');
    }

    // Update indicator on resize
    window.addEventListener('resize', updateNavIndicator);
}

function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const texts = ["Cybersecurity", "AI & Machine Learning", "Data Analytics"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500;
        }
        
        setTimeout(type, speed);
    }
    
    setTimeout(type, 1000);
}
