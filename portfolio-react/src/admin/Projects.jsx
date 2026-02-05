import { useState, useEffect } from 'react';
import { getProjects, addProject, updateProject, deleteProject } from '../services/firebase/firestore';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    imageUrl: '',
    liveLink: '',
    githubLink: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

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

  const resetForm = () => {
    setFormData({ title: '', description: '', techStack: '', imageUrl: '', liveLink: '', githubLink: '' });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      techStack: project.techStack ? project.techStack.join(', ') : '',
      imageUrl: project.imageUrl || '',
      liveLink: project.liveLink || '',
      githubLink: project.githubLink || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const projectData = {
        ...formData,
        techStack: formData.techStack.split(',').map(item => item.trim()).filter(Boolean)
      };

      if (editingId) {
        await updateProject(editingId, projectData);
      } else {
        await addProject(projectData);
      }

      fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-black tracking-tight">Projects</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your portfolio projects</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="admin-btn-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="admin-glass-card p-12 text-center">
          <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-black mb-1">No projects yet</h3>
          <p className="text-gray-500 text-sm">Get started by adding your first project.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="admin-glass-card overflow-hidden group">
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg text-black mb-2">{project.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{project.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <span className="text-xs font-medium px-2 py-1 bg-black/5 rounded text-gray-600">
                    {project.techStack?.length || 0} Technologies
                  </span>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(project)} className="p-2 text-gray-400 hover:text-black hover:bg-black/5 rounded-lg transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-black/5 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold text-black">{editingId ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={resetForm} className="p-2 hover:bg-black/5 rounded-lg transition">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Project Title</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="admin-input w-full" 
                  placeholder="e.g. Modern Portfolio"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Description</label>
                <textarea 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="admin-input w-full h-32 resize-none" 
                  placeholder="Describe your project..."
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Tech Stack</label>
                <input 
                  type="text" 
                  value={formData.techStack} 
                  onChange={e => setFormData({...formData, techStack: e.target.value})}
                  className="admin-input w-full" 
                  placeholder="React, Firebase, Tailwind (comma separated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Cover Image URL</label>
                <input 
                  type="url" 
                  value={formData.imageUrl} 
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  className="admin-input w-full" 
                  placeholder="https://i.imgur.com/example.jpg"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Use <a href="https://imgur.com/upload" target="_blank" rel="noopener noreferrer" className="text-black underline">Imgur</a> or <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className="text-black underline">PostImages</a> to host your images for free
                </p>
                {formData.imageUrl && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-black/10">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-32 object-cover" onError={(e) => e.target.style.display='none'} />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Live Demo URL</label>
                  <input 
                    type="url" 
                    value={formData.liveLink} 
                    onChange={e => setFormData({...formData, liveLink: e.target.value})}
                    className="admin-input w-full" 
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">GitHub Repository</label>
                  <input 
                    type="url" 
                    value={formData.githubLink} 
                    onChange={e => setFormData({...formData, githubLink: e.target.value})}
                    className="admin-input w-full" 
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-6 border-t border-black/5">
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="px-5 py-2.5 border border-black/10 rounded-lg text-sm font-medium text-gray-600 hover:bg-black/5 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="admin-btn-primary disabled:opacity-50"
                >
                  {uploading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Saving...
                    </span>
                  ) : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
