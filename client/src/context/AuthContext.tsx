import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

interface User {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  handleGoogleLogin: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('astro_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('astro_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('astro_user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Firebase signout error', e);
    }
    setUser(null);
    localStorage.removeItem('astro_user');
    window.location.href = '/';
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      
      const userData: User = {
        id: googleUser.uid,
        name: googleUser.displayName || 'Google User',
        email: googleUser.email || '',
        photoURL: googleUser.photoURL || undefined,
      };

      login(userData);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, handleGoogleLogin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
