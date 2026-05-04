import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { loginAdmin } from '../api/auth';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser({ role: 'admin', username: decoded.sub });
        } else {
          const refreshToken = localStorage.getItem('refresh_token');
          if (!refreshToken) {
            localStorage.removeItem('admin_token');
            setUser(null);
          } else {
            setUser({ role: 'admin', username: decoded.sub });
          }
        }
      } catch (error) {
        localStorage.removeItem('admin_token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginAdmin(email, password);
      if (data.access_token) {
        localStorage.setItem('admin_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
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
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
