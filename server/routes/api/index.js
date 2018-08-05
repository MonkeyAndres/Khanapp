const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const gameRouter = require('./gameRouter');
const challengeRouter = require('./challengeRouter');
const authRoutes = require('./authRoutes');

const loggedIn = (req, res, next) => {
    if(req.user) {
        next();
    } else {
        throw new Error('Unauthorized');
    }
}

router.use('/user', loggedIn, userRouter);
router.use('/game', loggedIn, gameRouter);
router.use('/challenge/', loggedIn, challengeRouter);
router.use('/auth', authRoutes);

module.exports = router;