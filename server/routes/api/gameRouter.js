const express = require('express');
const _ = require('lodash');
const moment = require('moment');
const schedule = require('node-schedule');

const router = express.Router();

const pickRandomChallenges = require('../utils/pickRandomChallenges');
const randomPointsPolygon = require('../utils/randomPointsPolygon');
const buildChallenges = require('../utils/buildChallenges');

const sendNotification = require('../../socket.io/notifications');

const Game = require('../../models/Game');
const User = require('../../models/User');

const changeGameStatus = (gameId) => {
    return Game.findByIdAndUpdate(gameId, {status: true})
}

router.get('/', (req, res, next) => {
    Game.find()
    .then(games => res.status(200).json(games))
    .catch(err => next(err));
})

router.get('/next', (req, res, next) => {
    const today = moment();
    const endDate = moment().add(1, 'week'); 

    const query = {
        players: req.user._id,
        date: {"$gte": today.toDate(), "$lt": endDate.toDate()}
    }

    Game.find(query)
    .then(games => res.status(200).json(games))
    .catch(err => next(err))
})

router.get('/played/:username', (req, res, next) => {
    User.findOne({ username: req.params.username })
    .then(user => {
        return Game.find({players: user._id, date: {"$lt": moment().toDate()}});
    })
    .then(games => res.status(200).json(games))
    .catch(err => next(err));
})

router.get('/:id', (req, res, next) => {
    Game.findById(req.params.id)
    .populate('players')
    .populate({path: 'challenges.challenge', populate: {path:'challenge'}})
    .then(games => res.status(200).json(games))
    .catch(err => next(err));
})

router.post('/', async (req, res, next) => {
    let { 
        title, 
        description, 
        difficulty, 
        date, 
        middlePos, 
        numberOfChallenges,
        topic,
        gameArea 
    } = req.body;

    const randomChallenges = await pickRandomChallenges(numberOfChallenges, topic, difficulty);
    const randomPoints = randomPointsPolygon(numberOfChallenges, gameArea);

    const challenges = buildChallenges(randomChallenges, randomPoints);

    const newGame = new Game({
        title,
        description,
        date,
        difficulty,
        topic,
        challenges,
        middlePos,
        gameArea,
        creator: req.user._id,
        players: [req.user._id]
    });

    newGame.save()
    .then(game => {
        console.log(game._id);
        User.findByIdAndUpdate(req.user._id, {$push: {createdGames: game._id}})
        .then(user => {
            // CronJob makes notification and change game status
            schedule.scheduleJob(game.date, function(game){
                changeGameStatus(game._id)
                .then(game => {
                    console.log(`${game.title} Khana has started!`);
                    sendNotification(game);
                })
            }.bind(this, game));

            // Response
            res.status(200).json(game);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
    const gameId = req.params.id;
    let { title, description, difficulty, date } = req.body;

    let editedGame = { title, description, difficulty };
    editedGame = _.pickBy(editedGame, _.identity);

    Game.findByIdAndUpdate(gameId, editedGame, {new: true})
    .then(game => {
        res.status(200).json(game);
    })
    .catch(err => next(err));
})

router.delete('/:id', (req, res, next) => {
    const gameId = req.params.id;

    Game.findByIdAndRemove(gameId)
    .then(game => {
        return User.findByIdAndUpdate(game.creator, {$pull: {createdGames: gameId}});
    })
    .then(user => {
        res.status(200).json({ message: "Game Deleted" });
    })
    .catch(err => next(err));
})

router.post('/near', (req, res, next) => {
    const { coordinates } = req.body;

    const query = {
        middlePos: {
            $near : {
                $geometry: { type: "Point",  coordinates },
                $maxDistance: 5000
            }
        }
    }

    Game.find(query)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => next(err))
})

router.post('/:gameId/:playerId', (req, res, next) => {
    const { gameId, playerId } = req.params;

    Game.findByIdAndUpdate(gameId, {$push: {players: playerId}}, {new: true})
    .then(game => { 
        res.status(200).json({ message: "Player Added" });
    })
})

module.exports = router;