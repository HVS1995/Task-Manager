const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const subtaskSchema = new mongoose.Schema({
    subtask_id: {
        type: String,
        default: uuidv4,
        unique: true
    },

    subject: {
        type: String,
        required: true
    },
    deadline: {
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
    }
});

const Subtask = mongoose.model('Subtask', subtaskSchema);

module.exports = Subtask;
