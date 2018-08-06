const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
    category: String,
    type: String,
    difficulty: String,
    question: {type: String, required: true, unique: true},
    correct_answer: String,
    incorrect_answers: [String],
    time: String
    // location: {
    //     type: {
    //       type: String, 
    //       enum: ['Point'],
    //       required: true
    //     },
    //     coordinates: {
    //       type: [Number],
    //       required: true
    //     }
    // }
});

module.exports = mongoose.model('Challenge', challengeSchema);