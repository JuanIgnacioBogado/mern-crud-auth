import Cookie from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

import { loginRequest, logoutRequest, refreshTokenRequest, registerRequest } from '@/api/auth';
import { useErrors } from '@/hooks';

const AuthContext = createContext({
  errors: [],
  isAuthenticated: false,
  isLoading: true,
  user: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {}
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { errors, manageErrors } = useErrors();

  const signUp = async user => {
    try {
      const { data } = await registerRequest(user);

      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      manageErrors(error);
    }
  };

  const signIn = async user => {
    try {
      const { data } = await loginRequest(user);

      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      manageErrors(error);
    }
  };

  const signOut = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      manageErrors(error);
    }
  };

  const refreshToken = async () => {
    try {
      const { data } = await refreshTokenRequest();

      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      manageErrors(error);
      setUser(null);
      setIsAuthenticated(false);
      Cookie.remove('token');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Cookie.get('token') ? refreshToken() : setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        errors,
        isAuthenticated,
        isLoading,
        user,
        signIn,
        signOut,
        signUp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
