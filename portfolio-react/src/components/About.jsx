const About = () => {
    const skills = [
      { name: 'HTML', img: '/assets/html.png' },
      { name: 'CSS', img: '/assets/css.png' },
      { name: 'JAVASCRIPT', img: '/assets/javascript.png', className: 'javascript' },
      { name: 'Git', img: '/assets/git.png' },
      { name: 'React.js', img: '/assets/react.png' },
      { name: 'Python', img: '/assets/python.png' },
      { name: 'Google Cloud', img: '/assets/google cloud.png' },
    ];
  
    return (
      <section id="about" className="about">
        <h2>Skills</h2>
        <div className="text">
          Building modern web applications with a focus on clean design, smooth
          functionality, and great user experience.
        </div>
  
        <div className="cells">
          {skills.map((skill, index) => (
            <div className="cell" key={index}>
              <img 
                src={skill.img} 
                className={skill.className || ''} 
                alt={`${skill.name} logo`} 
              />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default About;
