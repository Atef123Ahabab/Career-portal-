import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1008';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Exposing a named export so App.jsx can use apiRequest
export const apiRequest = async (path, options = {}) => {
  try {
    const response = await api({
      url: path,
      method: options.method || 'GET',
      data: options.body,
    });
    return response.data; // App.jsx expects the raw data back
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

export default api;
