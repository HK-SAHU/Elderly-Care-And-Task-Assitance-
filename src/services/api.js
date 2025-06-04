import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      // Only store the token in localStorage, not the user data
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  logout: () => {
    // Only remove the token
    localStorage.removeItem('token');
  },
  
  getCurrentUser: async () => {
    // Fetch current user data from the database
    return await api.get('/auth/me');
  },
  
  register: async (userData) => {
    // Register user in the database
    try {
      const response = await api.post('/users', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  }
};

// User services
export const userService = {
  updateProfile: async (userId, userData) => {
    return await api.put(`/users/${userId}`, userData);
  },
  
  getProfile: async () => {
    return await api.get('/users/profile');
  },
  
  // Added language preference methods
  updateLanguagePreference: async (languageData) => {
    return await api.put('/users/language-preference', languageData);
  },
  
  getLanguagePreference: async () => {
    return await api.get('/users/language-preference');
  }
};

// Volunteer services
export const volunteerService = {
  getVolunteers: async () => {
    return await api.get('/volunteers');
  },
  
  getVolunteerById: async (id) => {
    return await api.get(`/volunteers/${id}`);
  },
  
  registerAsVolunteer: async (volunteerData) => {
    return await api.post('/volunteers', volunteerData);
  },
  
  updateVolunteerProfile: async (volunteerData) => {
    return await api.put('/volunteers', volunteerData);
  },
  
  // Added review methods
  addReview: async (volunteerId, reviewData) => {
    return await api.post(`/volunteers/${volunteerId}/reviews`, reviewData);
  },
  
  updateReview: async (volunteerId, reviewData) => {
    return await api.put(`/volunteers/${volunteerId}/reviews`, reviewData);
  },
  
  getUserRatingForVolunteer: async (volunteerId) => {
    return await api.get(`/volunteers/${volunteerId}/user-review`);
  },
  
  getVolunteerRatings: async (volunteerId) => {
    return await api.get(`/volunteers/${volunteerId}/reviews`);
  }
};

// Task services
export const taskService = {
  getAllTasks: async () => {
    return await api.get('/tasks');
  },
  
  getOpenTasks: async () => {
    return await api.get('/tasks/open');
  },
  
  getUserTasks: async () => {
    return await api.get('/tasks/user');
  },
  
  getVolunteerTasks: async () => {
    return await api.get('/tasks/volunteer');
  },
  
  createTask: async (taskData) => {
    return await api.post('/tasks', taskData);
  },
  
  // Added voice task method
  createVoiceTask: async (taskData) => {
    return await api.post('/tasks/voice', taskData);
  },
  
  acceptTask: async (taskId) => {
    return await api.put(`/tasks/${taskId}/accept`);
  },
  
  completeTask: async (taskId) => {
    return await api.put(`/tasks/${taskId}/complete`);
  },
  
  cancelTask: async (taskId) => {
    return await api.put(`/tasks/${taskId}/cancel`);
  }
};

// Location services
export const locationService = {
  checkIn: async (locationData) => {
    return await api.post('/location/check-in', locationData);
  },
  
  getCheckIns: async () => {
    return await api.get('/location/check-ins');
  },
  
  getCheckInById: async (id) => {
    return await api.get(`/location/check-ins/${id}`);
  },
  
  getRecentCheckIn: async () => {
    return await api.get('/location/recent');
  },
  
  deleteCheckIn: async (id) => {
    return await api.delete(`/location/check-ins/${id}`);
  }
};

// Health log services
export const healthLogService = {
  getUserHealthLogs: async () => {
    return await api.get('/health-logs');
  },
  
  getHealthLogById: async (id) => {
    return await api.get(`/health-logs/${id}`);
  },
  
  createHealthLog: async (healthLogData) => {
    return await api.post('/health-logs', healthLogData);
  },
  
  deleteHealthLog: async (id) => {
    return await api.delete(`/health-logs/${id}`);
  }
};

// Grocery services
export const groceryService = {
  getGroceryLists: async () => {
    return await api.get('/grocery');
  },
  
  getGroceryListById: async (id) => {
    return await api.get(`/grocery/${id}`);
  },
  
  createGroceryList: async (groceryData) => {
    return await api.post('/grocery', groceryData);
  },
  
  updateGroceryList: async (id, groceryData) => {
    return await api.put(`/grocery/${id}`, groceryData);
  },
  
  deleteGroceryList: async (id) => {
    return await api.delete(`/grocery/${id}`);
  }
};

// Medication services
export const medicationService = {
  getMedications: async () => {
    return await api.get('/medications');
  },
  
  getMedicationById: async (id) => {
    return await api.get(`/medications/${id}`);
  },
  
  createMedication: async (medicationData) => {
    return await api.post('/medications', medicationData);
  },
  
  updateMedication: async (id, medicationData) => {
    return await api.put(`/medications/${id}`, medicationData);
  },
  
  deleteMedication: async (id) => {
    return await api.delete(`/medications/${id}`);
  }
};

// Emergency contact services
export const emergencyService = {
  getEmergencyContacts: async () => {
    return await api.get('/emergency');
  },
  
  getEmergencyContactById: async (id) => {
    return await api.get(`/emergency/${id}`);
  },
  
  createEmergencyContact: async (contactData) => {
    return await api.post('/emergency', contactData);
  },
  
  updateEmergencyContact: async (id, contactData) => {
    return await api.put(`/emergency/${id}`, contactData);
  },
  
  deleteEmergencyContact: async (id) => {
    return await api.delete(`/emergency/${id}`);
  }
};

// Forum services
export const forumService = {
  getPosts: async () => {
    return await api.get('/forum');
  },
  
  getPostsByCategory: async (category) => {
    return await api.get(`/forum/category/${category}`);
  },
  
  getPostById: async (id) => {
    return await api.get(`/forum/${id}`);
  },
  
  createPost: async (postData) => {
    return await api.post('/forum', postData);
  },
  
  updatePost: async (id, postData) => {
    return await api.put(`/forum/${id}`, postData);
  },
  
  deletePost: async (id) => {
    return await api.delete(`/forum/${id}`);
  },
  
  addComment: async (postId, commentData) => {
    return await api.post(`/forum/comment/${postId}`, commentData);
  },
  
  deleteComment: async (postId, commentId) => {
    return await api.delete(`/forum/comment/${postId}/${commentId}`);
  },
  
  likePost: async (postId) => {
    return await api.put(`/forum/like/${postId}`);
  },
  
  unlikePost: async (postId) => {
    return await api.put(`/forum/unlike/${postId}`);
  }
};

export default api;