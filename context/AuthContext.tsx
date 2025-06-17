import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { initDatabase } from '../services/database';

interface AuthContextData {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function setup() {
      try {
        await initDatabase(); 
      } catch (e) {
        console.error("Falha ao inicializar o banco de dados", e);
      } finally {
        setIsLoading(false); 
      }
    }
    setup();
  }, []);

  const login = (userData: User) => {
    const { password, ...userToStore } = userData;
    setUser(userToStore as User);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}