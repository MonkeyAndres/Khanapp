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
        let userId;
        let user;

        try{
            userId = socket.request.session.passport.user;
            user = await User.findById(userId);
        } catch (err) {
            console.log('Can\'t found the user.');
            return;
        }

        // const games = await getGames(userId);

        // for(let game of games){
        //     await joinRoom(game.title, socket, user.username);
        // }

        socket.on('joinRoom', (room) => joinRoom(room, socket));
        socket.on('joinGameboard', joinGameboard.bind(null, user.username, socket));
        socket.on('position', sendPositionToRoom.bind(null, user.username));
    });
};

const joinRoom = async (room, socket) => {
    await socket.join(room);
    io.sockets.adapter.rooms[room].positions = {};
    console.log(`> ${socket.id} joined ${room} Room.`);
}

// const getGames = async (userId) => {
//     const today = moment();
//     const endDate = moment().add(1, 'week');

//     const query = {
//         players: userId,
//         date: {
//             "$gte": today.toDate(),
//             "$lt": endDate.toDate()
//         }
//     }

//     const game = await Game.find(query);
//     return game;
// }

const joinGameboard = async (userId, socket, room) => {
    await joinRoom(room, socket, userId);
    console.log(`> ${userId} has joined the game ${room}.`);
}

const sendPositionToRoom = (username, coords, room) => {
    // console.log(io.sockets.adapter.rooms[room].positions);
    const positions = io.sockets.adapter.rooms[room].positions;
    positions[username] = coords;

    io.in(room).emit('usersPosition', positions);
    console.log(`> ${room} positions \n`, positions);
}

module.exports = khanaServer;