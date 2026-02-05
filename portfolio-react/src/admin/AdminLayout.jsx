import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../services/firebase/auth';
import AdminNavbar from './AdminNavbar';
import './admin.css';

const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="admin-panel min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-500 text-sm">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/admin/login" />;

  return (
    <div className="admin-panel min-h-screen">
      <AdminNavbar />
      <main className="max-w-7xl mx-auto px-8 py-12">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
