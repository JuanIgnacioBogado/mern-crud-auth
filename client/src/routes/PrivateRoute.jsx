import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '@/context/AuthContext';
import { TaskProvider } from '@/context/TaskContext';

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) return <h2 className="text-center">Loading...</h2>;

  return isAuthenticated ? (
    <TaskProvider>
      <Outlet />
    </TaskProvider>
  ) : (
    <Navigate replace to="/login" />
  );
};
