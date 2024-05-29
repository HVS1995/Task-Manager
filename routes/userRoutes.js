const express = require('express');
const router = express.Router();
const User = require('../models/user');

const userController = require('../controllers/userController');

// Route to get all users
router.get('/all-user', userController.getAllUsers);

// Route to create a new user
router.post('/create-user', userController.createUser);

// Route to get a single user by ID
router.get('/users/:id', userController.getUserById);



module.exports = router;
