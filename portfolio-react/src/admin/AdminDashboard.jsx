import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, getMessages } from '../services/firebase/firestore';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ projects: 0, messages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, messages] = await Promise.all([
          getProjects(),
          getMessages()
        ]);
        setStats({
          projects: projects.length,
          messages: messages.length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-semibold text-black tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-2 text-sm">Overview of your portfolio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Projects Card */}
        <Link to="/admin/projects" className="admin-glass-card admin-stat-card p-8 animate-fade-in animate-delay-1 group cursor-pointer">
          <div className="flex items-start justify-between mb-6">
            <div className="p-3 bg-black/5 rounded-xl">
              <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <svg className="w-5 h-5 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div>
            <div className="text-5xl font-bold text-black mb-1">{stats.projects}</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">Projects</div>
          </div>
        </Link>

        {/* Messages Card */}
        <Link to="/admin/messages" className="admin-glass-card admin-stat-card p-8 animate-fade-in animate-delay-2 group cursor-pointer">
          <div className="flex items-start justify-between mb-6">
            <div className="p-3 bg-black/5 rounded-xl">
              <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <svg className="w-5 h-5 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div>
            <div className="text-5xl font-bold text-black mb-1">{stats.messages}</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">Messages</div>
          </div>
        </Link>

        {/* Quick Actions Card */}
        <div className="admin-glass-card p-8 animate-fade-in animate-delay-3">
          <div className="flex items-start justify-between mb-6">
            <div className="p-3 bg-black/5 rounded-xl">
              <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-black mb-1">Quick Actions</div>
            <div className="text-sm text-gray-500 mb-6">Manage your content</div>
            <Link 
              to="/admin/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-black hover:underline transition-colors"
            >
              Add New Project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
