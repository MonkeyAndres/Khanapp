const express = require('express');
const _ = require('lodash');
const router = express.Router();

const Game = require('../../models/Game');
const User = require('../../models/User');
const Challenge = require('../../models/Challenge');

router.get('/', (req, res, next) => {
    Challenge.find()
    .then(challenges => res.status(200).json(challenges))
    .catch(err => next(err));
})

router.post('/', (req, res, next) => {
    let { title, description, time, difficulty } = req.body;

    const newChallenge = new Challenge({
        title,
        description,
        difficulty,
        time
    });

    newChallenge.save()
    .then(challenge => {
        res.status(200).json(challenge);
    })
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
    const challengeId = req.params.id;
    let { title, description, time, difficulty } = req.body;

    let editedChallenge = { title, description, time, difficulty };
    editedChallenge = _.pickBy(editedChallenge, _.identity);

    Challenge.findByIdAndUpdate(challengeId, editedChallenge, {new: true})
    .then(challenge => {
        res.status(200).json(challenge);
    })
    .catch(err => next(err));
})

router.delete('/:id', (req, res, next) => {
    const challengeId = req.params.id;

    Challenge.findByIdAndRemove(challengeId)
    .then(challenge => {
        res.status(200).json({ message: "Challenge Deleted" });
    })
    .catch(err => next(err));
})

module.exports = router;