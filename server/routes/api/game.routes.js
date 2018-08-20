const express = require('express');
const controller = require('../../controllers/game.controller');

const router = express.Router();

router.get('/', controller.getAllGames);

router.get('/next', controller.getNextWeekGames);

router.get('/played/:username', controller.getGamesPlayedByUsername);

router.get('/:id', controller.getGameInfo);

router.post('/', controller.saveGame.bind(controller));

router.put('/:id', controller.editGame);

router.delete('/:id', controller.deleteGame);

router.post('/near', controller.getNearGames);

router.post('/:gameId/:playerId', controller.addPlayerToGame);

module.exports = router;