// Typing effect for hero section
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

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Scroll animations
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
  fadeInObserver.observe(element);
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

// Image handling - Show placeholder if image fails to load
document.addEventListener('DOMContentLoaded', () => {
  const profilePic = document.querySelector('.profile-pic');
  const placeholder = document.querySelector('.image-placeholder');
  
  // Check if image exists and loads properly
  if (profilePic) {
    profilePic.addEventListener('load', () => {
      // Image loaded successfully, hide placeholder
      if (placeholder) {
        placeholder.style.display = 'none';
      }
    });
    
    profilePic.addEventListener('error', () => {
      // Image failed to load, show placeholder
      if (placeholder) {
        placeholder.style.display = 'flex';
      }
    });
    
    // Trigger check for cached images
    if (profilePic.complete) {
      if (profilePic.naturalHeight === 0) {
        // Image is broken
        if (placeholder) {
          placeholder.style.display = 'flex';
        }
      } else {
        // Image is loaded
        if (placeholder) {
          placeholder.style.display = 'none';
        }
      }
    }
  }
  
  // Start typing effect
  setTimeout(type, 1000);
});
