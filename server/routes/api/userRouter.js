const express = require('express');
const bcrypt = require('bcrypt');
const upload = require('../../config/cloudinary');
const _ = require('lodash');
const router = express.Router();
const loggedIn = require('../../middleware/loggedIn');

const User = require('../../models/User');

const encrypt = (str) => {
    const salt = bcrypt.genSaltSync(10);
    const hashStr = bcrypt.hashSync(str, salt);
    return hashStr;
}

router.get('/:username', loggedIn, (req, res, next) => {
    User.findOne({username: req.params.username})
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => next(err));
})

router.post('/', (req, res, next) => {
    const { username, password, email } = req.body;

    const newUser = User({
        username,
        password: encrypt(password),
        email
    });

    newUser.save()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => next(err));
});

router.put('/', loggedIn, (req, res, next) => {
    const userId = req.user._id;
    const { bio, password, newPassword, email } = req.body;

    let editedUser = { bio, password, newPassword, email };
    editedUser = _.pickBy(editedUser, _.identity);

    if (bcrypt.compareSync(editedUser.password, req.user.password)){
        editedUser.password = encrypt(editedUser.newPassword);
        delete editedUser.newPassword;
    }

    User.findByIdAndUpdate(userId, editedUser, {new: true})
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => next(err));

})

router.delete('/', loggedIn, (req, res, next) => {
    const userId = req.user._id;

    User.findByIdAndRemove(userId)
    .then(user => {
        res.status(200).json({ message: "User Deleted" });
    })
    .catch(err => next(err));
})


module.exports = router;