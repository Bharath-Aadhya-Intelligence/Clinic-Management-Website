import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin } from '../api/auth';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      // In a real app, we'd decode and verify the token
      setUser({ role: 'admin' });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const data = await loginAdmin(username, password);
      if (data.access_token) {
        localStorage.setItem('admin_token', data.access_token);
        setUser({ role: 'admin' });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };


  const logout = () => {
    localStorage.removeItem('admin_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
