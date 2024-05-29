const Task = require('../models/task');
const User = require('../models/user');

// Controller functions for CRUD operations
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ deleted: false });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTasksByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const tasks = await Task.find({ task_id : {$in:user.tasks}, deleted: false });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { subject, lastDate, status, userId } = req.body;
        const newTask = new Task({
            subject,
            lastDate,
            status
        });
        const savedTask = await newTask.save();
        
        // Add the task to the user's task array
        const currUser = await User.findOne({user_id:userId});
        
         if (!currUser) {
             return res.status(404).json({ message: 'User not found' });
         }
         currUser.tasks.push(savedTask.task_id);
         await currUser.save(); 
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const payload = req.body;
        const updatedTask = await Task.findOneAndUpdate(
            { task_id: taskId },
            payload,
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    const taskId = req.params.taskId;
    
    try {
         const deletedTask = await Task.findOneAndUpdate(
            { task_id: taskId },
            { deleted: true },
            { new: true }
        );
        
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
