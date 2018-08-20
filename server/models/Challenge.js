const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
    category: String,
    difficulty: String,
    
    type: String,
    time: String,

    question: {type: String, required: true, unique: true},
    correct_answer: String,
    incorrect_answers: [String],
});

module.exports = mongoose.model('Challenge', challengeSchema);