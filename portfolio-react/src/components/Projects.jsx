import { useState, useEffect } from 'react';
import { getProjects } from '../services/firebase/firestore';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="projects">
        <h2>Projects</h2>
        <div className="projects-grid">
          <div className="project-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="projects">
        <h2>Projects</h2>
        <div className="projects-grid">
          <div className="project-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
            <p>No projects yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <div 
              className="card-image" 
              style={project.imageUrl ? { 
                backgroundImage: `url(${project.imageUrl})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              } : undefined}
            ></div>
            
            <div className="card-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">
                {project.description}
              </p>
              <div className="tech-stack">
                {project.techStack?.map((tech, techIndex) => (
                  <span className="tech-tag" key={techIndex}>{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.liveLink && (
                  <a href={project.liveLink} className="project-link live-link" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-external-link-alt"></i>
                    Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} className="project-link github-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
