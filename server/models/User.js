const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = require('./Game');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: String,
    email: {type: String, required: true, unique: true},
    createdGames: [ {type: Schema.Types.ObjectId, ref: "Game"} ],
    // location: {
    //     type: {
    //         type: String,
    //         enum: ['Point'],
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // },
})

module.exports = mongoose.model('User', userSchema);