import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../contexts/useAuth';

function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;