const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const volunteerRoutes = require('./routes/volunteers');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const healthLogRoutes = require('./routes/healthLogs');
const groceryRoutes = require('./routes/grocery');
const medicationRoutes = require('./routes/medications');
const emergencyRoutes = require('./routes/emergency');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/health-logs', healthLogRoutes);
app.use('/api/grocery', groceryRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/emergency', emergencyRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Senior Assist API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});