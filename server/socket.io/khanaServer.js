require('dotenv').config();

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const moment = require('moment');
const chat = require('./chat');

const Game = require('../models/Game');
const User = require('../models/User');

// Initialize session middleware
var sessionMiddleware = session({
    secret: "imasecret",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
});

const khanaServer = async () => {

    console.log('Socket IO Started!!');

    /**
     * The next function get the cookies from the socket io request and search in mongoDB sessions
     * collection for the userID of this sessionID
     */
    io.use((socket, next) => {
        sessionMiddleware(socket.request, {}, next);
    })

    io.on("connection", async (socket) => {
        try{
            const userId = socket.request.session.passport.user; // Store user id
            const user = await User.findById(userId); // Get the user info

            // Game events
            socket.on('joinRoom', (room) => joinRoom(room, socket));
            socket.on('joinGameboard', joinGameboard.bind(null, user.username, socket));
            socket.on('position', sendPositionToRoom.bind(null, user.username));
            socket.on('challengeCompleted', removeChallenge.bind(null, user.username));

            // Chat Events
            socket.on('reciveMessage', chat.sendMessage.bind(chat));
        } catch (err) {
            console.log('Can\'t found the user.');
            return;
        }
    });
};

const joinRoom = async (room, socket) => {
    try {
        await socket.join(room); // Join the user to the game room
        initializePositions(room);
        chat.init(room);
        console.log(`> ${socket.id} joined ${room} Room.`);
    } catch (err) {
        console.log('Can\'t join the room.'); // If error print this
        return;
    }
}

const initializePositions = (room) => {
    if (!io.sockets.adapter.rooms[room].positions) {
        io.sockets.adapter.rooms[room].positions = {};
    }
}

const joinGameboard = async (username, socket, room) => {
    try {
        await joinRoom(room, socket);
        chat.sendMessage('Server', `${username} has joined the game.`, room);
        console.log(`> ${username} has joined the game ${room}.`);
    } catch (err) {
        console.log('Can\'t join the game.');
        return;
    }
}

const sendPositionToRoom = (username, coords, room) => {
    try {
        const positions = io.sockets.adapter.rooms[room].positions;
        positions[username] = coords;

        io.in(room).emit('usersPosition', positions);
        console.log(`> "${room}" Khana positions \n`, positions);
    } catch (err) {
        console.log('Cannot send the position to the rooms.');
    }
}

const removeChallenge = async (username, game, challengeId) => {
    const editedGame = await Game.findByIdAndUpdate(game._id, {$pull: {challenges: {challenge: challengeId}}}, {new: true});
    const challenges = editedGame.challenges;
    
    chat.sendMessage('Server', `${username} has resolve a challenge!`, room);
    io.in(game.title).emit('updateChallenges', challenges);
}

module.exports = khanaServer;