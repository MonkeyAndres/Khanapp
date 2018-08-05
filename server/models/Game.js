const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./User');
const Challenge = require('./Challenge');

const gameSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: String,
    difficulty: Number,
    date: Date,
    middlePos: {
        type: {
            type: String,
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    gameArea: {
        type: {
            type: String,
            enum: ['Polygon'],
            required: true
        },
        coordinates: {
            type: [[[Number]]],
            required: true
        }
    },
    players: [ User ],
    challenges: [ {type: Schema.Types.ObjectId, ref: "Challenge"} ],
    creator: User
})

module.exports = mongoose.model('Game', gameSchema);