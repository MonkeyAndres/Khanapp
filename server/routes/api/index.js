const express = require('express');
const router = express.Router();
const loggedIn = require('../../middleware/loggedIn');

const userRouter = require('./userRouter');
const gameRouter = require('./gameRouter');
const challengeRouter = require('./challengeRouter');
const authRoutes = require('./authRoutes');

router.use('/user', userRouter);
router.use('/game', loggedIn, gameRouter);
// router.use('/challenge/', loggedIn, challengeRouter);
router.use('/auth', authRoutes);

module.exports = router;