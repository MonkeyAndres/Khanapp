const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = require('./Game');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: String,
    email: {type: String, required: true, unique: true},
    bio: String,
    profilePicture: {type: String, default: 'https://res.cloudinary.com/khanapp/image/upload/v1533832152/ProfilePhotos/default.jpg'},
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