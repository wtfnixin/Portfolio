function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");

  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    themeIcon.className = "fa-solid fa-sun";
  } else {
    themeIcon.className = "fa-solid fa-moon";
  }
}

// Typewriter effect function
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typewriter effect
function initTypewriter() {
  const nameElement = document.getElementById('typewriter');
  if (nameElement) {
    const nameText = ' Nitin Kumar';
    // Start typewriter effect after a short delay
    setTimeout(() => {
      typeWriter(nameElement, nameText, 150);
    }, 500);
  }
}

// Enhanced smooth scrolling for all navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for all anchor links
  const allLinks = document.querySelectorAll('a[href^="#"]');
  
  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Enhanced animation on scroll for all elements
function animateOnScroll() {
  // Hero elements that should animate immediately on page load
  const heroElements = document.querySelectorAll(`
    .hero .texts h1,
    .hero .texts h2,
    .hero .texts p,
    .hero .texts .skills a,
    .hero img
  `);
  
  // Other elements that animate on scroll (excluding hero elements)
  const scrollElements = document.querySelectorAll(`
    .about h2,
    .about .text,
    .cell,
    .projects h2,
    .project-card,
    .contact h2,
    .contact-description,
    .contact-card,
    .social-links h3,
    .social-link
  `);
  
  // Intersection Observer options
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  // Create observer for scroll elements only
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Animate hero elements immediately on page load (no observer needed)
  heroElements.forEach((element, index) => {
    element.classList.add('animate-element');
    // Staggered delay for hero elements
    const delay = index * 150; // 150ms between each hero element
    element.style.animationDelay = `${delay}ms`;
    
    // Animate immediately without observer
    setTimeout(() => {
      element.classList.add('animate-in');
    }, delay);
  });
  
  // Apply scroll-based animation to non-hero elements only
  scrollElements.forEach((element, index) => {
    element.classList.add('animate-element');
    // Add staggered delay for elements in the same section
    const delay = (index % 5) * 100; // Stagger by 100ms for every 5 elements
    element.style.animationDelay = `${delay}ms`;
    
    // Only observe non-hero elements
    observer.observe(element);
  });
}

// Smooth scroll behavior for the entire page
function addSmoothScrolling() {
  // Add smooth scrolling CSS if not already present
  if (!document.querySelector('#smooth-scroll-style')) {
    const style = document.createElement('style');
    style.id = 'smooth-scroll-style';
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      /* Animation classes for scroll effects */
      .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Special animations for different element types */
      .hero .texts h1.animate-element {
        transform: translateX(-50px);
      }
      
      .hero .texts h1.animate-in {
        transform: translateX(0);
      }
      
      .hero img.animate-element {
        transform: translateY(30px);
        opacity: 0;
      }
      
      .hero img.animate-in {
        transform: translateY(0);
        opacity: 1;
      }
      
      .cell.animate-element {
        transform: translateY(20px) scale(0.9);
      }
      
      .cell.animate-in {
        transform: translateY(0) scale(1);
      }
      
      .project-card.animate-element {
        transform: translateY(40px) scale(0.95);
      }
      
      .project-card.animate-in {
        transform: translateY(0) scale(1);
      }
      
      .contact-card.animate-element {
        transform: translateY(30px) rotateY(10deg);
      }
      
      .contact-card.animate-in {
        transform: translateY(0) rotateY(0deg);
      }
      
      .social-link.animate-element {
        transform: translateY(20px) scale(0.8);
      }
      
      .social-link.animate-in {
        transform: translateY(0) scale(1);
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize all animations and smooth scrolling when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  addSmoothScrolling();
  animateOnScroll();
  initTypewriter();
});

// Add scroll progress indicator
function addScrollProgress() {
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    z-index: 1000;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  // Update progress on scroll
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', addScrollProgress);
