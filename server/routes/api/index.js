const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const gameRouter = require('./gameRouter');
const challengeRouter = require('./challengeRouter');
const authRoutes = require('./authRoutes');

router.use('/user', userRouter);
router.use('/game', gameRouter);
router.use('/challenge/', challengeRouter);
router.use('/auth', authRoutes)

module.exports = router;