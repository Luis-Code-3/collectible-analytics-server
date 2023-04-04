var express = require('express');
var router = express.Router();
const VideoConsole = require('../models/games/VideoConsole.model');
const VideoGame = require('../models/games/VideoGame.model');
const VideoTransactions = require('../models/games/VideoTransactions.model');

/* GET users listing. */
router.get('/console', function(req, res) {
  VideoConsole.find()
  .then((foundConsoles) => {
    res.json(foundConsoles)
  })
  .catch((err) => {
    console.log(err);
  })
});

router.get('/console/:consoleId', function(req, res) {
  VideoConsole.findById(req.params.consoleId)
  .then((foundConsole) => {
    res.json(foundConsole);
  })
  .catch((err) => {
    console.log(err);
  })
});

router.get('/console-games/:consoleId', function(req, res) {
    VideoGame.find({consoleId: req.params.consoleId})
    .then((foundGames) => {
        res.json(foundGames);
    })
    .catch((err) => {
        console.log(err);
    })
});

router.get('/game/:gameId', function(req, res) {
    VideoGame.findById(req.params.gameId)
    .then((foundGame) => {
        res.json(foundGame);
    })
    .catch((err) => {
        console.log(err);
    })
});

router.get('/game-sales/:gameId', function(req, res) {
    VideoTransactions.find({game_id: req.params.gameId})
    .then((foundTransactions) => {
        res.json(foundTransactions)
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;