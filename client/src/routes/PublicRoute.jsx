import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '@/context/AuthContext';

export const PublicRoute = () => {
  const { isAuthenticated } = useAuthContext();

  return !isAuthenticated ? <Outlet /> : <Navigate replace to={localStorage.getItem('lastPath') || '/tasks'} />;
};
