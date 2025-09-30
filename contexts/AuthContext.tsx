import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { User } from '../types';
import { useSettings } from './SettingsContext';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (pin: string) => User | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { settings } = useSettings();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (pin: string): User | null => {
    const user = settings.users.find(u => u.pin === pin);
    if (user) {
      setCurrentUser(user);
      return user;
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isAuthenticated = useMemo(() => !!currentUser, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
