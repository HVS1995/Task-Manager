const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const subtaskController = require('../controllers/subtaskController');

//Apply authMiddleware
// router.use(authMiddleware);

// Define routes for task CRUD operations
router.get('', taskController.getAllTasks);
router.get('/user/:userId', taskController.getAllTasksByUserId);
router.post('', taskController.createTask);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);





module.exports = router;
