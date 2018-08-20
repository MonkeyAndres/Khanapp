const express = require('express');
const router = express.Router();
const loggedIn = require('../../middleware/loggedIn');

const userRouter = require('./user.routes');
const gameRouter = require('./game.routes');
const challengeRouter = require('./challenge.routes');
const authRouter = require('./auth.routes');

router.use('/user', userRouter);
router.use('/game', loggedIn, gameRouter);
router.use('/challenge/', loggedIn, challengeRouter);
router.use('/auth', authRouter);

module.exports = router;