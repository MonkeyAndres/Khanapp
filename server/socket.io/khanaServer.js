require('dotenv').config();

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const moment = require('moment');

const Game = require('../models/Game');

var sessionMiddleware = session({
    secret: "imasecret",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
});

const khanaServer = async (io) => {

    console.log('Socket IO Started!!');

    io.use((socket, next) => {
        sessionMiddleware(socket.request, {}, next);
    })

    io.on("connection", async (socket) => {
        const userId = socket.request.session.passport.user;

        const game = await getGame(userId);
        
        if (game) { sendNotification(socket, game) }
    });

    // socket.emit('chatMessageToGuapo','hola');

    // // Receive the message
    // socket.on('chatMessageToGuapo', data => {
    //     console.log(data)
    //     console.log("Ho!");
    //     socket.broadcast.emit('chatMessageToGuapo',data);
    // });
};

const getGame = async (userId) => {
    const today = moment();
    const endDate = moment().add(10, 'minutes');

    const query = {
        players: userId,
        date: {
            "$gte": today.toDate(),
            "$lt": endDate.toDate()
        }
    }

    const game = await Game.findOne(query);
    if (game) { changeGameStatus(game) }

    return game;
}

const changeGameStatus = async (game) => {
    Game.findByIdAndUpdate(game._id, {status: true})
    .then(data => console.log('Now Game is Active!'));
}

const sendNotification = (socket, game) => {
    socket.emit('sendNotification', {
        title: `You have to join a Khana!!`,
        body: 'In less than 10 minutes you have a Khana.',
        link: `/gameboard/${game._id}`
    });
}

module.exports = khanaServer;