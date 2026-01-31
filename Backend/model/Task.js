const mongoose = require('mongoose');
const { Schema } = mongoose;

const TasksSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "TODO"
    }
})

module.exports = mongoose.model('Task', TasksSchema);