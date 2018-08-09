require('dotenv').config();

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const moment = require('moment');

const Game = require('../models/Game');
const User = require('../models/User');

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

    io.use((socket, next) => {
        sessionMiddleware(socket.request, {}, next);
    })

    io.on("connection", async (socket) => {
        try{
            const userId = socket.request.session.passport.user;
            const user = await User.findById(userId);

            socket.on('joinRoom', (room) => joinRoom(room, socket));
            socket.on('joinGameboard', joinGameboard.bind(null, user.username, socket));
            socket.on('position', sendPositionToRoom.bind(null, user.username));
        } catch (err) {
            console.log('Can\'t found the user.');
            return;
        }
    });
};

const joinRoom = async (room, socket) => {
    try {
        await socket.join(room);
        io.sockets.adapter.rooms[room].positions = {};
        console.log(`> ${socket.id} joined ${room} Room.`);
    } catch (err) {
        console.log('Can\'t join the room.');
        return;
    }
}

const joinGameboard = async (userId, socket, room) => {
    try {
        await joinRoom(room, socket, userId);
        console.log(`> ${userId} has joined the game ${room}.`);
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

module.exports = khanaServer;