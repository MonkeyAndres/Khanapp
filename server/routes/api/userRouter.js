const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();

const User = require('../../models/User');

router.get('/:username', (req, res, next) => {
    User.findOne({username: req.params.username})
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => next(err));
})

router.post('/', (req, res, next) => {
    const { username, password, email } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
        username,
        password: hashPass,
        email
    });

    newUser.save()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
    const userId = req.params.id;
    const { username, password, email } = req.body;

    let editedUser = { username, password, email };
    editedUser = _.pickBy(editedUser, _.identity);

    User.findByIdAndUpdate(userId, editedUser, {new: true})
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => next(err));
})

router.delete('/:id', (req, res, next) => {
    const userId = req.params.id;

    User.findByIdAndRemove(userId)
    .then(user => {
        res.status(200).json({ message: "User Deleted" });
    })
    .catch(err => next(err));
})


module.exports = router;