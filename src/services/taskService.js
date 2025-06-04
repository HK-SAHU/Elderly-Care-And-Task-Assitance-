import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const getAuthHeader = () => ({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export const taskService = {
  async getAllTasks() {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
  },

  async createTask(taskData) {
    const response = await axios.post(API_URL, taskData, getAuthHeader());
    return response.data;
  },

  async updateTask(id, taskData) {
    const response = await axios.put(`${API_URL}/${id}`, taskData, getAuthHeader());
    return response.data;
  },

  async deleteTask(id) {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
  }
};