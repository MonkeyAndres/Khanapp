const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * If you don't understand some model see mongoose geoJSON docs
 */

const gameSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: String,
    date: Date,
    
    status: {type: Boolean, default: false},
    difficulty: String,
    topic: String,

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
    players: [ {type: Schema.Types.ObjectId, ref: "User"} ],
    challenges: [
        {
            challenge: {type: Schema.Types.ObjectId, ref: "Challenge"},
            position: {
                type: {
                    type: String,
                    enum: ['Point'], 
                    required: true
                },
                coordinates: {
                    type: [Number],
                    required: true
                }
            }
        }
    ],
    creator: {type: Schema.Types.ObjectId, ref: "Challenge"}
})

gameSchema.index({middlePos: '2dsphere'}); // This line is for location based queries

module.exports = mongoose.model('Game', gameSchema);