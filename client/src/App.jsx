import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Navbar } from '@/components';
import { AuthProvider } from '@/context/AuthContext';
import { HomePage, LoginPage, ProfilePage, RegisterPage, TaskFormPage, TasksPage } from '@/pages';
import { PrivateRoute, PublicRoute } from '@/routes';

export const App = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Navbar />

        <div className="flex h-[calc(100vh-8vh)] items-center justify-center">
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<PublicRoute />}>
              <Route element={<LoginPage />} path="/login" />
              <Route element={<RegisterPage />} path="/register" />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route element={<TasksPage />} path="/tasks" />
              <Route element={<TaskFormPage />} path="/add-task" />
              <Route element={<TaskFormPage />} path="/task/:id" />
              <Route element={<ProfilePage />} path="/profile" />
            </Route>

            <Route element={<Navigate replace to="/" />} path="*" />
          </Routes>
        </div>
      </HashRouter>
    </AuthProvider>
  );
};
