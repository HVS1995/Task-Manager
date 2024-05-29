const Task = require('../models/task');
const Subtask = require('../models/subtask');


// Controller functions for CRUD operations
exports.getAllSubtasksFortask = async (req, res) => {
    // Logic to get all subtasks for a specific task
    try {
        const { taskId } = req.params;

        
        // Find the task by ID and populate its subtasks
        const task = await Task.findOne({ task_id: taskId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const subTasks = await Subtask.find({ subtask_id : {$in:task.subtasks}, deleted: false });

        // Return the list of subtasks in the response
        res.json(subTasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logic to update subtasks for a specific task

exports.updateOrCreateSubtasksFortask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const subtasks = req.body.subtasks;

        if (!Array.isArray(subtasks)) {
            return res.status(400).json({ message: 'Subtasks must be an array' });
        }

        // Find the task by ID
        const task = await Task.findOne({ task_id: taskId });
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        // Update the subtasks for the task
        const updatedSubtasks = await Promise.all(subtasks.map(async (subtaskData) => {
            if (subtaskData.subtask_id) {
                if (!task.subtasks.includes(subtaskData.subtask_id)){
                    return res.status(404).json({ message: 'Subtask not present in Task' });;
                }
                // Find the subtask by ID and update it
                const updatedSubtask = await Subtask.findOneAndUpdate(
                    { subtask_id: subtaskData.subtask_id },
                    subtaskData,
                    { new: true }
                );
                if (!updatedSubtask) {
                    return res.status(404).json({ message: 'Subtask not found' });
                }
                return updatedSubtask;
            } else {
                // Create new subtask
                const newSubtask = new Subtask(subtaskData);
                await newSubtask.save();
                return newSubtask;
            }
        }));

        // Update task's subtasks array
        filteredSubtasks = updatedSubtasks.filter(subtask => !task.subtasks.includes(subtask.subtask_id));
        filteredSubtasksIds = filteredSubtasks.map(subtask => subtask.subtask_id);
        task.subtasks=task.subtasks.concat(filteredSubtasksIds);
        await task.save();

        // Return the updated list of subtasks in the response
        res.json(updatedSubtasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};