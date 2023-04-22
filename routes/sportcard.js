var express = require('express');
var router = express.Router();
const SportCard = require('../models/sports/SportCard.model');
const SportPlayer = require('../models/sports/SportPlayer.model');
const SportTransactions = require('../models/sports/SportTransactions.model');

/* GET users listing. */
router.get('/players', function(req, res) {
  SportPlayer.find()
  .then((foundPlayers) => {
    res.json(foundPlayers)
  })
  .catch((err) => {
    console.log(err);
  })
});

router.get('/players/:playerId', function(req, res) {
  SportPlayer.find({playerName: req.params.playerId.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())})
  .then((foundPlayer) => {
    res.json(foundPlayer);
  })
  .catch((err) => {
    console.log(err);
  })
});

router.get('/player-cards/:playerId', function(req, res) {
    SportCard.find({playerName: req.params.playerId.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())})
    .then((foundCards) => {
        res.json(foundCards);
    })
    .catch((err) => {
        console.log(err);
    })
});

router.get('/card/:cardId', function(req, res) {
    SportCard.findById(req.params.cardId)
    .then((foundCard) => {
        res.json(foundCard);
    })
    .catch((err) => {
        console.log(err);
    })
});

router.get('/card-sales/:cardId', function(req, res) {
    SportTransactions.find({card_id: req.params.cardId})
    .then((foundTransactions) => {
        res.json(foundTransactions)
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;