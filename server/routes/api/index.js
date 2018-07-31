const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const gameRouter = require('./gameRouter');
const chatRouter = require('./chatRouter');

router.use('/user', userRouter);
router.use('/game', gameRouter);
router.use('/chat/', chatRouter);

module.exports = router;