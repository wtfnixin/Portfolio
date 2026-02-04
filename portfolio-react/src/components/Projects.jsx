const Projects = () => {
  const projects = [
    {
      title: 'Animated Stopwatch',
      description: 'A beautiful, responsive stopwatch with 3D tilt effects and glassmorphism design. Features precise timing lap functionality, and smooth animations',
      techStack: ['HTMl5', 'CSS3', 'Javascript', 'Vanilla Tilt.js'],
      liveLink: 'https://prodigywd02.vercel.app/',
      githubLink: 'https://github.com/wtfnixin/PRODIGY_WD_02',
      imageClass: 'web-app'
    },
    {
      title: 'TechVision Landing Page',
      description: 'Modern, responsive tech company website with particle animations, glassmorphism effects, and smooth scroll interactions.',
      techStack: ['JavaScript', 'HTML5', 'CSS3', 'Adobe Fonts'],
      liveLink: 'https://prodigywd01.vercel.app/',
      githubLink: 'https://github.com/wtfnixin/PRODIGY_WD_01',
      imageClass: 'mobile-app'
    },
    {
      title: 'Tic Tac Toe Game',
      description: 'Interactive Tic Tac Toe game with custom animations, sound effects, and meme celebrations. Features responsive design and engaging gameplay.',
      techStack: ['HTML5', 'CSS3', 'Javascript', 'Audio API'],
      liveLink: 'https://prodigywd03.vercel.app/',
      githubLink: 'https://github.com/wtfnixin/PRODIGY_WD_03',
      imageClass: 'portfolio'
    },
    {
      title: 'Multiplayer Quiz TIC-TAC-TOE',
      description: 'Trivia-based Tic-Tac-Toe where correct answers earn moves. Firebase real-time multiplayer with timed gameplay. Modern UI with cross-device compatibility.',
      techStack: ['HTML5', 'JavaScript', 'CSS3', 'Firebase'],
      liveLink: 'https://thecloudclub-tictactoe.vercel.app/',
      githubLink: 'https://github.com/wtfnixin/cloud-club',
      imageClass: 'tic-tac-toe'
    }
  ];

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <div className={`card-image ${project.imageClass}`}></div>
            
            <div className="card-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">
                {project.description}
              </p>
              <div className="tech-stack">
                {project.techStack.map((tech, techIndex) => (
                  <span className="tech-tag" key={techIndex}>{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.liveLink} className="project-link live-link" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-external-link-alt"></i>
                  Live Demo
                </a>
                <a href={project.githubLink} className="project-link github-link" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
