import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_QUERY } from '../graphql/queries';
import { Administrador, AuthContextType } from '../types';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Administrador | null>(null);

  const [loginQuery, { loading }] = useLazyQuery(LOGIN_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.login) {
        const admin = data.login;
        setUser(admin);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(admin));
        localStorage.setItem('auth-token', btoa(`${admin.usuario}:${admin.id}`));
        toast.success('Inicio de sesión exitoso');
      } else {
        toast.error('Credenciales incorrectas');
      }
    },
    onError: (error) => {
      console.error('Error en login:', error);
      toast.error('Usuario o contraseña incorrectos');
    }
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (usuario: string, contrasena: string): Promise<boolean> => {
    try {
      const result = await loginQuery({
        variables: { usuario, contrasena }
      });
      
      if (result.data?.login) {
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error en login:', err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('auth-token');
    toast.success('Sesión cerrada correctamente');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
