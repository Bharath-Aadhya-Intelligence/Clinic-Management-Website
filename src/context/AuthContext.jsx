import React, { createContext, useContext, useState, useEffect } from 'react';

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

  const login = (email, password) => {
    // Mock login
    if (email === 'admin@homeopathy.com' && password === 'admin123') {
      const mockToken = 'mock-jwt-token';
      localStorage.setItem('admin_token', mockToken);
      setUser({ role: 'admin' });
      return true;
    }
    return false;
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
