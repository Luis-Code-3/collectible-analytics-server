var express = require('express');
var router = express.Router();
const MangaItem = require('../models/manga/MangaItem.model');
const MangaVolume = require('../models/manga/MangaVolume.model');
const MangaTransactions = require('../models/manga/MangaTransactions.model')

/* GET users listing. */
router.get('/volume', function(req, res) {
  MangaVolume.find()
  .then((foundVolumes) => {
    res.json(foundVolumes)
  })
  .catch((err) => {
    console.log(err);
  })
});

router.get('/volume/:volumeId', function(req, res) {
  MangaVolume.findById(req.params.volumeId)
  .then((foundVolume) => {
    res.json(foundVolume);
  })
  .catch((err) => {
    console.log(err);
  })
});

router.get('/volume-items/:volumeId', function(req, res) {
    MangaItem.find({volumeId: req.params.volumeId})
    .then((foundItems) => {
        res.json(foundItems);
    })
    .catch((err) => {
        console.log(err);
    })
  });

router.get('/item/:itemId', function(req, res) {
    MangaItem.findById(req.params.itemId)
    .then((foundItem) => {
        res.json(foundItem);
    })
    .catch((err) => {
        console.log(err);
    })
  });

router.get('/item-sales/:itemId', function(req, res) {
    MangaTransactions.find({mangaItem_id: req.params.itemId})
    .then((foundTransactions) => {
        res.json(foundTransactions)
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;