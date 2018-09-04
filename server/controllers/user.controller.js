const bcrypt = require('bcrypt');
const _ = require('lodash');

const User = require('../models/User');

module.exports = {
    encrypt(str) {
        const salt = bcrypt.genSaltSync(10);
        const hashStr = bcrypt.hashSync(str, salt);
        return hashStr;
    },
     
    getUserByUsername(req, res, next) {
        User.findOne({username: req.params.username})
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => next(err));
    },

    saveUser(req, res, next) {
        const { username, password, email } = req.body;

        const newUser = User({
            username,
            password: this.encrypt(password),
            email
        });
    
        newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            if(err.code === 11000) {
                next({message: 'User already exist.'})
            } else {next(err)}
        });
    },

    editUser(req, res, next) {
        const userId = req.user._id;
        const { bio, password, newPassword, email } = req.body;
    
        // Remove undefined fields
        let editedUser = { bio, password, newPassword, email };
        editedUser = _.pickBy(editedUser, _.identity);
    
        // Change Password
        if (editedUser.newPassword && bcrypt.compareSync(editedUser.password, req.user.password)){
            editedUser.password = this.encrypt(editedUser.newPassword);
            delete editedUser.newPassword;
        }
    
        // Update profile picture
        if (req.file) {
            editedUser.profilePicture = req.file.secure_url;
        }
    
        // Edit user
        User.findByIdAndUpdate(userId, editedUser, {new: true})
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => next(err));
    },

    deleteUser(req, res, next) {
        const userId = req.user._id;
    
        User.findByIdAndRemove(userId)
        .then(user => {
            res.status(200).json({ message: "User Deleted" });
        })
        .catch(err => next(err));
    }
}
