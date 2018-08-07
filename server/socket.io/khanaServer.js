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

const khanaServer = async () => {

    console.log('Socket IO Started!!');

    io.use((socket, next) => {
        sessionMiddleware(socket.request, {}, next);
    })

    io.on("connection", async (socket) => {
        const userId = socket.request.session.passport.user;

        const games = await getGames(userId);

        for(let game of games){
            socket.join(game.title);
            console.log(`${userId} joined ${game.title}`);
        }
    });
};

const getGames = async (userId) => {
    const today = moment();
    const endDate = moment().add(1, 'week');

    const query = {
        players: userId,
        date: {
            "$gte": today.toDate(),
            "$lt": endDate.toDate()
        }
    }

    const game = await Game.find(query);
    return game;
}

module.exports = khanaServer;