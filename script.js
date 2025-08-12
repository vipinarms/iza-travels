document.addEventListener('DOMContentLoaded', function() {
  // Update current year in the footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
   const navLinks = document.querySelectorAll('.nav-link');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('show-nav');
    });
  }
    navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show-nav');
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Add active class to nav links based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const scrollPosition = window.scrollY + 100; // Offset to trigger sooner

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Listen for scroll events to update active nav link
  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink(); // Call once on page load

  // Optional: Add animation effects for elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .vehicle-card, .contact-card');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.8) {
        element.classList.add('animated');
      }
    });
  }

  // Add CSS class for animation to be applied in CSS
  document.querySelectorAll('.card, .vehicle-card, .contact-card').forEach(el => {
    el.classList.add('fade-in-element');
  });

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Call once on page load
});

// Add additional styles for animation
const style = document.createElement('style');
style.textContent = `
  .fade-in-element {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .fade-in-element.animated {
    opacity: 1;
    transform: translateY(0);
  }

  .nav-link.active {
    color: var(--primary);
    font-weight: 600;
  }
`;
document.head.appendChild(style);