import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, getAllUsers } from '../utils/AsyncStorageUtils'; 

interface AuthContextData {
  user: User | null;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const USER_STORAGE_KEY = 'loggedInUser';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUserJson = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUserJson) {
          const storedUser: User = JSON.parse(storedUserJson);
          const allUsers = await getAllUsers();
          const userStillExists = allUsers.some(u => u.id === storedUser.id);

          if (userStillExists) {
            setUser(storedUser);
          } else {
            
            setUser(null);
            await AsyncStorage.removeItem(USER_STORAGE_KEY);
            console.log('Usuário logado não encontrado na lista de usuários, sessão limpa.');
          }
        }
      } catch (e) {
        console.error("Erro ao carregar ou validar usuário do AsyncStorage:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (userData: User) => {
    const { password, ...userToStore } = userData;
    setUser(userToStore as User);
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userToStore));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;}