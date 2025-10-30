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

    console.log('Initializing... Found hero buttons:', heroButtons.length);

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
        body.classList.remove('home-active', 'about-active', 'expertise-active', 'projects-active', 'labs-active', 'contact-active');
        body.classList.add(`${sectionId}-active`);
    }

    // Show specific section
    function showSection(sectionId) {
        console.log('Navigating to:', sectionId);
        
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
        });
        
        // Show target page
        const targetPage = document.getElementById(sectionId);
        if (targetPage) {
            targetPage.style.display = 'block';
            setTimeout(() => {
                targetPage.classList.add('active');
            }, 10);
        }
        
        // Update navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
        
        updateHeaderColor(sectionId);
        updateNavIndicator();
        closeMobileMenu();
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
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

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Hero buttons with direct event handling
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Hero button clicked:', this.textContent.trim());
            
            // Get section from data-section attribute
            const sectionId = this.getAttribute('data-section');
            console.log('Section to navigate:', sectionId);
            
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });

    // BACKUP: Global click handler for hero buttons
    document.addEventListener('click', function(e) {
        const heroButton = e.target.closest('.hero-buttons .btn');
        if (heroButton) {
            e.preventDefault();
            const sectionId = heroButton.getAttribute('data-section') || 
                             heroButton.getAttribute('href')?.replace('#', '');
            if (sectionId) {
                console.log('Backup handler - Going to:', sectionId);
                showSection(sectionId);
            }
        }
    });

    // Mobile menu
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

    // Initialize
    const hash = window.location.hash.substring(1);
    const validSections = ['home', 'about', 'expertise', 'projects', 'labs', 'contact'];
    
    // Hide all pages initially
    pages.forEach(page => {
        page.style.display = 'none';
    });
    
    if (hash && validSections.includes(hash)) {
        showSection(hash);
    } else {
        showSection('home');
    }

    window.addEventListener('resize', updateNavIndicator);
}

// ULTIMATE FIX - Add this at the end as backup
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const viewProjectsBtn = document.querySelector('a[href="#projects"]');
        const contactMeBtn = document.querySelector('a[href="#contact"]');
        
        if (viewProjectsBtn) {
            viewProjectsBtn.onclick = function(e) {
                e.preventDefault();
                document.querySelectorAll('.page').forEach(p => {
                    p.classList.remove('active');
                    p.style.display = 'none';
                });
                document.getElementById('projects').style.display = 'block';
                document.getElementById('projects').classList.add('active');
                window.scrollTo(0, 0);
            };
        }
        
        if (contactMeBtn) {
            contactMeBtn.onclick = function(e) {
                e.preventDefault();
                document.querySelectorAll('.page').forEach(p => {
                    p.classList.remove('active');
                    p.style.display = 'none';
                });
                document.getElementById('contact').style.display = 'block';
                document.getElementById('contact').classList.add('active');
                window.scrollTo(0, 0);
            };
        }
    }, 1000);
});
