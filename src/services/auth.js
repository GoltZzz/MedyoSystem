import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Accept': 'application/json'
  }
});

// Add request interceptor for auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    
    if (response.data.token) {
      // Store token and user separately
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Set default auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    if (error.response?.data?.errors) {
      const messages = error.response.data.errors.map(err => err.message).join(', ');
      throw new Error(messages);
    }
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
};

export const register = async (formData) => {
  try {
    // Log form data contents (excluding password)
    for (let [key, value] of formData.entries()) {
      if (key !== 'password') {
        if (value instanceof File) {
          console.log(`Form data - ${key}:`, {
            name: value.name,
            type: value.type,
            size: value.size
          });
        } else {
          console.log(`Form data - ${key}:`, value);
        }
      }
    }

    const response = await api.post('/auth/register', formData);

    console.log('Registration response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Registration error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    if (error.response?.data?.errors) {
      const messages = error.response.data.errors.map(err => err.message).join('\n');
      throw new Error(messages);
    }

    throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete api.defaults.headers.common['Authorization'];
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
