const Challenge = require('../models/Challenge');

module.exports = {
    getChallenge(req, res, next) {
        Challenge.findById(req.params.id)
        .then(challenges => res.status(200).json(challenges))
        .catch(err => next(err));
    }
}