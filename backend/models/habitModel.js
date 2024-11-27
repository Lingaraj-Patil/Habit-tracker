const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    frequency: {type: String, enum: ['daily', 'weekly', 'monthly'], required: true},
    startDate: {type: Date, required: true},
    progress: [{type: Date}],
    isActive: {type: Boolean, default: true},
    category: {type: String},
    goal: {type: Number},
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
})


module.exports = mongoose.model('Habit',habitSchema);