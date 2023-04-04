var express = require('express');
var router = express.Router();
const SportCard = require('../models/sports/SportCard.model');
const SportGenre = require('../models/sports/SportGenre.model');
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
  SportPlayer.findById(req.params.playerId)
  .populate('cards_id')
  .then((foundPlayer) => {
    res.json(foundPlayer);
  })
  .catch((err) => {
    console.log(err);
  })
});

router.get('/genre', function(req, res) {
    SportGenre.find()
    .then((foundGenres) => {
      res.json(foundGenres)
    })
    .catch((err) => {
      console.log(err);
    })
});
  
router.get('/genre/:genreId', function(req, res) {
    SportGenre.findById(req.params.genreId)
    .populate('cards_id')
    .then((foundGenre) => {
      res.json(foundGenre);
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