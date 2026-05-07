import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const client = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Simple client-side rate limiting
const requestCounts = new Map();
const RATE_LIMIT = 30; // Max 30 requests per minute
const LIMIT_WINDOW = 60000; // 1 minute in ms

client.interceptors.request.use(
  (config) => {
    const now = Date.now();
    const minuteAgo = now - LIMIT_WINDOW;
    
    // Clean up old counts
    for (const [time] of requestCounts) {
      if (time < minuteAgo) requestCounts.delete(time);
    }
    
    if (requestCounts.size >= RATE_LIMIT) {
      toast.error('Too many requests. Please wait a moment.');
      return Promise.reject(new Error('Rate limit exceeded'));
    }
    
    requestCounts.set(now, true);
    
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
          // Use a direct axios call to avoid circular dependencies with auth.js
          const formData = new URLSearchParams();
          formData.append('refresh_token', refreshToken);
          
          const { data } = await axios.post(`${API_URL}/api/v1/auth/refresh`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
          
          if (data.access_token) {
            localStorage.setItem('admin_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          localStorage.removeItem('admin_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/admin/login';
        }
      }
    }
    
    const message = error.response?.data?.detail || error.message || 'Something went wrong';
    toast.error(message);
    return Promise.reject(error);
  }
);

export default client;
