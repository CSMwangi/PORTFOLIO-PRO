// Single Page Application Navigation
function showSection(sectionId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Remove active class from all nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  // Show selected page
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  // Add active class to clicked nav link
  const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

// Navigation click handlers
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    showSection(sectionId);
    
    // Close mobile menu if open
    if (navLinks.classList.contains('active')) {
      toggleMobileMenu();
    }
  });
});

// Initialize - show home page
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
  
  // Your existing typing effect code...
  const typingText = document.getElementById('typing-text');
  const roles = ['Data Scientist', 'Software Engineer', 'Cybersecurity Analyst', 'Economic Analyst'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 100 : 150);
    }
  }
  
  setTimeout(type, 1000);
});

// Keep your existing mobile menu and scroll effects...
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

function toggleMobileMenu() {
  navLinks.classList.toggle('active');
  const icon = mobileMenu.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
}

mobileMenu.addEventListener('click', toggleMobileMenu);

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    header.style.background = 'rgba(255, 255, 255, 0.98)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    header.style.background = 'rgba(255, 255, 255, 0.95)';
  }
});
