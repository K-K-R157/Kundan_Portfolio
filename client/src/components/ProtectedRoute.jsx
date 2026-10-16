import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { token, admin, loading } = useAuth();

  if (loading) {
    return <div className="grid min-h-screen place-items-center text-slate-400">Checking session...</div>;
  }
  if (!token || !admin) return <Navigate to="/admin/login" replace />;
  return children;
}
