import axios from 'axios';
import toast from 'react-hot-toast';

const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for attaching JWT
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling and token refresh
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle unauthorized and retry with refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (refreshToken) {
        try {
          // Import refreshAccessToken here to avoid circular dependencies if needed
          // but usually auth.js is separate
          const { refreshAccessToken } = await import('./auth');
          const data = await refreshAccessToken(refreshToken);
          
          if (data.access_token) {
            localStorage.setItem('admin_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            client.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
            return client(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          localStorage.removeItem('admin_token');
          localStorage.removeItem('refresh_token');
          if (!window.location.pathname.includes('/admin/login')) {
            window.location.href = '/admin/login';
          }
        }
      }
    }
    
    const message = error.response?.data?.detail || error.message || 'Something went wrong';
    toast.error(message);
    return Promise.reject(error);
  }
);

export default client;
