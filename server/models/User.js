const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = require('./Game');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: String,

    email: {type: String, required: true, unique: true},
    bio: String,

    // Easy way to put a default profile picture
    profilePicture: {type: String, default: 'https://res.cloudinary.com/khanapp/image/upload/v1533832152/ProfilePhotos/default.jpg'},

    createdGames: [ {type: Schema.Types.ObjectId, ref: "Game"} ],
})

module.exports = mongoose.model('User', userSchema);