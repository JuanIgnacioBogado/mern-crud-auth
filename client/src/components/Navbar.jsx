import { useEffect, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useAuthContext } from '@/context/AuthContext';

const routes = [
  {
    name: 'Home',
    path: '/',
    isPrivate: false
  },
  {
    name: 'Login',
    path: '/login',
    isPrivate: false
  },
  {
    name: 'Register',
    path: '/register',
    isPrivate: false
  },
  {
    name: 'Profile',
    path: '/profile',
    isPrivate: true
  },
  {
    name: 'Tasks',
    path: '/tasks',
    isPrivate: true
  },
  {
    name: 'Add Task',
    path: '/add-task',
    isPrivate: true
  }
];

export const Navbar = () => {
  const { isAuthenticated, isLoading, user, signOut } = useAuthContext();
  const { pathname, search } = useLocation();

  const routesFiltered = useMemo(
    () => routes.filter(({ isPrivate }) => isAuthenticated === isPrivate),
    [isAuthenticated]
  );

  useEffect(() => {
    if (isAuthenticated) {
      const lastPath = pathname + search;

      localStorage.setItem('lastPath', lastPath);
    }
  }, [pathname, search]);

  return (
    <nav className="flex h-[8vh] w-screen items-center justify-around bg-zinc-700">
      <h1 className="text-2xl font-extrabold">
        <NavLink to="/">Task Manager</NavLink>
      </h1>

      <div className="flex items-center gap-x-10">
        {isAuthenticated && <span className="font-semibold capitalize">welcome {user?.username}</span>}
        {!isLoading &&
          routesFiltered.map(({ name, path }) => (
            <NavLink
              key={name}
              className={({ isActive }) => `hover:underline font-light ${isActive ? 'text-sky-400' : ''}`}
              to={path}
            >
              {name}
            </NavLink>
          ))}
        {isAuthenticated && (
          <button
            className="rounded-md bg-sky-500 px-2 py-1 transition-colors hover:bg-white hover:text-sky-500"
            onClick={signOut}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
