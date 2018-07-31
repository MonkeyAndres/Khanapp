const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: String,
    time: String,
    difficulty: String,
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