import { useEffect, useRef } from 'react';

const Hero = () => {
  const nameRef = useRef(null);

  useEffect(() => {
    const typeWriter = (element, text, speed = 100) => {
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
    };

    if (nameRef.current) {
        const nameText = ' Nitin Kumar';
        // Start typewriter effect after a short delay
        const timer = setTimeout(() => {
          typeWriter(nameRef.current, nameText, 150);
        }, 500);

        return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="texts">
          <h1 className="greeting">
            Hi, I'm<span className="name" id="typewriter" ref={nameRef}></span>👋
          </h1>
          <h2>Engineering Student & Web Developer</h2>

          <p className="description">
            A passionate web developer with a knack for creating dynamic
            websites.
          </p>

          <div className="skills">
            <a href="#about">
              <i className="fa-solid fa-code"></i>
              <span>Skills</span>
            </a>

            <a href="#projects">
              <i className="fa-solid fa-folder"></i>
              <span>Projects</span>
            </a>

            <a href="#contact">
              <i className="fa-solid fa-envelope"></i>
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </div>

      <div className="links">
        <div className="photo">
          <img
            src="/assets/nixin.png.webp"
            alt="Nitin Kumar"
            title="Nitin Kumar"
            style={{ position: 'relative', zIndex: 2 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
