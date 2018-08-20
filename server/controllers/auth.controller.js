const passport = require('passport');

module.exports = {
    login(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(401).json(info);
            }

            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({
                        message: 'something went wrong :('
                    });
                }
                res.status(200).json(req.user);
            });
        })(req, res, next);
    },

    logOut(req, res) {
        req.logout();
        res.status(200).json({
            message: 'Success'
        });
    },

    loggedIn(req, res) {
        if (req.isAuthenticated()) {
            return res.status(200).json(req.user);
        }
    
        return res.status(403).json({
            message: 'Unauthorized'
        });
    }
}