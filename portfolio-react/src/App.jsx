import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import PublicPortfolio from './components/PublicPortfolio';
import Login from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import Projects from './admin/Projects';
import Messages from './admin/Messages';
import About from './admin/About';
import { seedProjects } from './seedProjects';

function App() {
  // TEMPORARY: Remove this useEffect after running once to seed old projects
  useEffect(() => {
    const hasSeeded = localStorage.getItem('projects_seeded');
    if (!hasSeeded) {
      seedProjects().then(() => {
        localStorage.setItem('projects_seeded', 'true');
        console.log('Old projects have been migrated to Firestore!');
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicPortfolio />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="messages" element={<Messages />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
