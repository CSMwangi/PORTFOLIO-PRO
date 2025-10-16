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
        if (navLinksContainer && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
        }
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
    
    // Enhanced mobile menu functionality
    if (mobileMenu && navLinksContainer) {
        const handleMobileMenu = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu clicked'); // Debug
            navLinksContainer.classList.toggle('active');
        };
        
        mobileMenu.addEventListener('click', handleMobileMenu);
        mobileMenu.addEventListener('touchstart', handleMobileMenu, { passive: false });
    }
    
    // Enhanced close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinksContainer && navLinksContainer.classList.contains('active') && 
            !e.target.closest('nav') && !e.target.closest('.mobile-menu')) {
            navLinksContainer.classList.remove('active');
        }
    });
    
    // Also handle touch events for closing menu
    document.addEventListener('touchstart', function(e) {
        if (navLinksContainer && navLinksContainer.classList.contains('active') && 
            !e.target.closest('nav') && !e.target.closest('.mobile-menu')) {
            navLinksContainer.classList.remove('active');
        }
    });
    
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

// Enhanced typing effect function
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const texts = [
        "Data & AI Expert", 
        "Software Develpment", 
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
