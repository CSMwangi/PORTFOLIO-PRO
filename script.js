// Smooth scrolling for nav links
document.querySelectorAll('nav ul li a, .btn, .btn-contact').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60, // adjust for fixed header
        behavior: 'smooth'
      });
    }
  });
});

// Optional: Add shadow when scrolling
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
  } else {
    header.style.boxShadow = 'none';
  }
});
