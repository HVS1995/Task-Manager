const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const taskSchema = new mongoose.Schema({
    task_id: {
        type: String,
        default: uuidv4,
        unique: true
    },

    subject: {
        type: String,
        required: true
    },
    lastDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    subtasks: [{
        type: String,
        ref: 'Subtask'
    }]
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
