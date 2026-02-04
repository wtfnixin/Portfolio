const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="contact-content">
        <h2>Get In Touch</h2>
        <p className="contact-description">
          Let's work together! Feel free to reach out for collaborations or just a friendly hello.
        </p>
        
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Email</h3>
              <p>nitinkumardontam@gmail.com</p>
              <a href="mailto:nitinkumardontam@gmail.com" className="contact-link">Send Email</a>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Let's Connect</h3>
              <p>Open to collaborations & opportunities</p>
              <a href="mailto:nitinkumardontam@gmail.com?subject=Let's Connect" className="contact-link">Get In Touch</a>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Location</h3>
              <p>Bengaluru, India</p>
              <a href="https://www.google.com/maps/place/JAIN+(Deemed-to-be-University),+Faculty+of+Engineering+and+Technology+(FET)/@12.6421815,77.4374215,17z/data=!4m14!1m7!3m6!1s0x3bae5ba739694f47:0x424bdd92f039db75!2sJAIN+(Deemed-to-be-University),+Faculty+of+Engineering+and+Technology+(FET)!8m2!3d12.6421763!4d77.4399964!16s%2Fg%2F11crxs1th4!3m5!1s0x3bae5ba739694f47:0x424bdd92f039db75!8m2!3d12.6421763!4d77.4399964!16s%2Fg%2F11crxs1th4?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D" className="contact-link" target="_blank" rel="noopener noreferrer">View Map</a>
            </div>
          </div>
        </div>
        
        <div className="social-links">
          <h3>Connect With Me</h3>
          <div className="social-icons">
            <a href="https://github.com/wtfnixin" className="social-link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/nitin-kumar69/" className="social-link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
            <a href="https://x.com/NITINKUMAR63913" className="social-link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
              <span>Twitter</span>
            </a>
            <a href="https://www.instagram.com/nixin.69/?next=%2F" className="social-link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
