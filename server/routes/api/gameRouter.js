const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();

const Game = require('../../models/Game');
const Challenges = require('../../models/Challenge');

const pickRandonChallenges = n => {
    return new Promise((resolve, reject) => {
        Challenges.find().lean()
        .then(challenges => {
            let shuffledChallenges = _.shuffle()
            resolve(_.take(shuffledChallenges, n));
        })
        .catch(err => reject(err));
    }
)}

router.get('/', (req, res, next) => {
    Game.find()
    .then(games => res.status(200).json(games))
    .catch(err => next(err));
})

router.post('/', (req, res, next) => {
    let { title, description, difficulty, creator } = req.body;

    pickRandonChallenges(difficulty*3).then(challenges => challenges = challenges);

    const newGame = new Game({
        title,
        description,
        difficulty,
        challenges,
        creator
    });

    newGame.save()
    .then(game => {
        res.status(200).json(game);
    })
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
    const gameId = req.params.id;
    let { title, description, difficulty } = req.body;

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
        res.status(200).json({ message: "Game Deleted" });
    })
    .catch(err => next(err));
})


module.exports = router;