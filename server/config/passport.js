const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

const configure = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err, null));
    });

    passport.use(new LocalStrategy((username, password, next) => {
        User.findOne({username})
        .then(user => {
            if (!user) {
                return next(null, false, {
                    message: "Incorrect username"
                });
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return next(null, false, {
                    message: "Incorrect password"
                });
            }

            return next(null, user);
        })
        .catch(err => next(err));
    }));
}

module.exports = configure;