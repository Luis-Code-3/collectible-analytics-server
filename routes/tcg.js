var express = require('express');
var router = express.Router();
const PokemonCard = require('../models/tcg/PokemonCard.model');
const PokemonSet = require('../models/tcg/PokemonSet.model');
const PokemonTransactions = require('../models/tcg/PokmemonTransactions.model');

/* GET users listing. */
router.get('/set', function(req, res) {
  PokemonSet.find()
  .then((foundSets) => {
    res.json(foundSets)
  })
  .catch((err) => {
    console.log(err);
  })
});

// router.get('/set/:setId', function(req, res) {
//   PokemonSet.findById(req.params.setId)
//   .then((foundSet) => {
//     res.json(foundSet);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// });

router.get('/set/:setId', function(req, res) {
    PokemonSet.find({setName: req.params.setId.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())})
    .then((foundSet) => {
      res.json(foundSet);
    })
    .catch((err) => {
      console.log(err);
    })
  });

router.get('/set-cards/:setId', function(req, res) {
    PokemonCard.find({setName: req.params.setId.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())})
    .then((foundCards) => {
        res.json(foundCards);
    })
    .catch((err) => {
        console.log(err);
    })
  });

router.get('/card/:cardId', function(req, res) {
    PokemonCard.findById(req.params.cardId)
    .then((foundCard) => {
        res.json(foundCard);
    })
    .catch((err) => {
        console.log(err);
    })
  });

router.get('/card-sales/:cardId', function(req, res) {
    PokemonTransactions.find({card_id: req.params.cardId})
    .then((foundTransactions) => {
        res.json(foundTransactions)
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;