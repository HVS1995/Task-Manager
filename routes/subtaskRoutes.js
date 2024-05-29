const express = require('express');
const router = express.Router({ mergeParams: true});   // mergeParams allows access to taskId from parent route
const subtaskController = require('../controllers/subtaskController');
const authMiddleware = require('../middleware/authMiddleware');

//apply authMiddleware
// router.use(authMiddleware);


// Define routes for subtask CRUD operations
router.get('/:taskId/subtasks', subtaskController.getAllSubtasksFortask);
router.put('/:taskId/subtasks', subtaskController.updateOrCreateSubtasksFortask);
// router.put('/tasks/:taskId/updatesubtasks', subtaskController.updateSubtask);


module.exports = router;
