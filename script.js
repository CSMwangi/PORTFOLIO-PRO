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
    const body = document.body;

    // Debug: Check what buttons are found
    console.log('Hero buttons found:', heroButtons.length);
    heroButtons.forEach((btn, index) => {
        console.log(`Button ${index}:`, btn.textContent.trim());
        console.log(`Button ${index} data-section:`, btn.getAttribute('data-section'));
        console.log(`Button ${index} href:`, btn.getAttribute('href'));
    });

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

    // Header color switching
    function updateHeaderColor(sectionId) {
        // Remove all section classes from body
        body.classList.remove('home-active', 'about-active', 'expertise-active', 'projects-active', 'labs-active', 'contact-active');
        
        // Add current section class
        body.classList.add(`${sectionId}-active`);
    }

    // Show specific section - MODIFIED FOR TRUE PAGE ISOLATION
    function showSection(sectionId) {
        console.log('Showing section:', sectionId);
        
        // COMPLETELY HIDE ALL PAGES FIRST
        pages.forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none'; // Force hide all pages
        });
        
        // SHOW ONLY THE TARGET PAGE
        const targetPage = document.getElementById(sectionId);
        if (targetPage) {
            targetPage.style.display = 'block'; // Make it visible
            // Small delay to ensure display change before adding active class
            setTimeout(() => {
                targetPage.classList.add('active');
            }, 10);
        }
        
        // Update active nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Update header color
        updateHeaderColor(sectionId);
        
        // Update navigation indicator
        updateNavIndicator();
        
        // Close mobile menu
        closeMobileMenu();
        
        // SCROLL TO TOP - ADD THIS FOR PAGE-LIKE BEHAVIOR
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Update URL hash without triggering scroll
        history.replaceState(null, null, `#${sectionId}`);
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

    // FIXED: Hero buttons click events - More robust approach
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Hero button clicked:', this.textContent.trim());
            
            // Method 1: Check data-section attribute
            let sectionId = this.getAttribute('data-section');
            
            // Method 2: Check href attribute
            if (!sectionId) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    sectionId = href.substring(1);
                }
            }
            
            // Method 3: Check button text content as fallback
            if (!sectionId) {
                const buttonText = this.textContent.trim();
                if (buttonText.includes('Projects') || buttonText.includes('View My Projects')) {
                    sectionId = 'projects';
                } else if (buttonText.includes('Contact') || buttonText.includes('Contact Me')) {
                    sectionId = 'contact';
                }
            }
            
            console.log('Determined section:', sectionId);
            
            if (sectionId && sectionId !== '#') {
                showSection(sectionId);
            }
        });
    });

    // ADDITIONAL FIX: Direct event delegation as backup
    document.addEventListener('click', function(e) {
        // Check if click came from a hero button
        const heroButton = e.target.closest('.hero-buttons .btn');
        if (heroButton) {
            e.preventDefault();
            
            const buttonText = heroButton.textContent.trim();
            let sectionId = null;
            
            if (buttonText.includes('Projects')) {
                sectionId = 'projects';
            } else if (buttonText.includes('Contact')) {
                sectionId = 'contact';
            }
            
            if (sectionId) {
                console.log('Backup handler - Navigating to:', sectionId);
                showSection(sectionId);
            }
        }
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

    // Handle initial page load - MODIFIED FOR TRUE PAGE ISOLATION
    const hash = window.location.hash.substring(1);
    const validSections = ['home', 'about', 'expertise', 'projects', 'labs', 'contact'];
    
    // HIDE ALL PAGES ON INITIAL LOAD
    pages.forEach(page => {
        page.style.display = 'none';
    });
    
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
