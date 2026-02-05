import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';


function PublicPortfolio() {
  const [theme, setTheme] = useState('light');

  // Theme Toggle Logic
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Scroll Animation Logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Initial animation for Hero elements
    const heroElements = document.querySelectorAll('.hero .texts h1, .hero .texts h2, .hero .texts p, .hero .texts .skills a, .hero img');
    heroElements.forEach((element, index) => {
      element.classList.add('animate-element');
      const delay = index * 150;
      element.style.animationDelay = `${delay}ms`;
      setTimeout(() => {
        element.classList.add('animate-in');
      }, delay);
    });

    // Observe other elements on scroll
    const scrollElements = document.querySelectorAll('.about h2, .about .text, .cell, .projects h2, .project-card, .contact h2, .contact-description, .contact-card, .social-links h3, .social-link');
    scrollElements.forEach((element, index) => {
      element.classList.add('animate-element');
      const delay = (index % 5) * 100;
      element.style.animationDelay = `${delay}ms`;
      observer.observe(element);
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  // Smooth Scroll & Scroll Progress
  useEffect(() => {
     // Scroll Progress Bar
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
     
     const handleScroll = () => {
       const scrollTop = window.pageYOffset;
       const docHeight = document.body.scrollHeight - window.innerHeight;
       const scrollPercent = (scrollTop / docHeight) * 100;
       progressBar.style.width = scrollPercent + '%';
     };
 
     window.addEventListener('scroll', handleScroll);

     return () => {
        window.removeEventListener('scroll', handleScroll);
        if(document.body.contains(progressBar)){
            document.body.removeChild(progressBar);
        }
     }
  }, []);

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
}

export default PublicPortfolio;
