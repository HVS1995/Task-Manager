const express = require('express');
const app = express();
require('dotenv').config(); // Load environment variables

// Database connection
require('./db');

// Middleware setup
app.use(express.json());

// Routes setup
const taskRoutes = require('./routes/taskRoutes');
const subtaskRoutes = require('./routes/subtaskRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/tasks', taskRoutes);
app.use('/tasks', subtaskRoutes);
app.use('/users', userRoutes);


// Error handling middleware
const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

