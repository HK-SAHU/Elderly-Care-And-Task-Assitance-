import axios from 'axios';

export const authService = {
  async register(userData) {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async login(credentials) {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};