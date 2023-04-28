var express = require('express');
var router = express.Router();
const Users = require('../models/users/Users.model');

/* GET home page. */
router.get('/watchlist/:userId', (req, res) => {
    Users.findById(`${req.params.userId}`)
      .populate('gameWatchlist')
      .populate('tcgWatchlist')
      .populate('mangaWatchlist')
      .populate('sportWatchlist')
      .then((foundUser) => {
        const allWatched = [...foundUser.gameWatchlist, ...foundUser.tcgWatchlist, ...foundUser.mangaWatchlist, ...foundUser.sportWatchlist];
        res.status(200).json(allWatched)
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.post('/add-watchlist/trading-cards/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId, tcgWatchlist: { $ne: itemId } },
      { $addToSet: { tcgWatchlist: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'Item is already being watched'})
        } else {
          console.log(foundUser);
          res.json({message: 'Item is now being watched'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.post('/add-watchlist/sports-cards/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId, sportWatchlist: { $ne: itemId } },
      { $addToSet: { sportWatchlist: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'Item is already being watched'})
        } else {
          console.log(foundUser);
          res.json({message: 'Item is now being watched'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.post('/add-watchlist/video-games/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId, gameWatchlist: { $ne: itemId } },
      { $addToSet: { gameWatchlist: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'Item is already being watched'})
        } else {
          console.log(foundUser);
          res.json({message: 'Item is now being watched'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.post('/add-watchlist/manga/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId, mangaWatchlist: { $ne: itemId } },
      { $addToSet: { mangaWatchlist: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'Item is already being watched'})
        } else {
          console.log(foundUser);
          res.json({message: 'Item is now being watched'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  // STOP WATCHING THIS
  
  router.post('/remove-watchlist/trading-cards/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { tcgWatchlist: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'User not found'})
        } else {
          console.log(foundUser);
          res.json({message: 'Item removed from watchlist'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.post('/remove-watchlist/sports-cards/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { sportWatchlist: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'User not found'})
        } else {
          console.log(foundUser);
          res.json({message: 'Item removed from watchlist'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.post('/remove-watchlist/video-games/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { gameWatchlist: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'User not found'})
        } else {
          console.log(foundUser);
          res.json({message: 'Item removed from watchlist'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.post('/remove-watchlist/manga/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { mangaWatchlist: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'User not found'})
        } else {
          console.log(foundUser);
          res.json({message: 'Item removed from watchlist'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  
  // ARE WE ALREADY WATCHING?
  
  
  router.get('/is-watching/trading-cards/:userId', (req, res) => {
    const {itemId} = req.query;
    // console.log('ITEM ID',itemId);
    Users.findById(req.params.userId)
      .then((foundUser) => {
  
        if(foundUser.tcgWatchlist.includes(itemId)) {
          res.json({message: 'Item is already being watched'})
        } else {
          res.json({message: 'Item is not watched'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.get('/is-watching/sports-cards/:userId', (req, res) => {
    const {itemId} = req.query;
    // console.log('ITEM ID',itemId);
    Users.findById(req.params.userId)
      .then((foundUser) => {
  
        if(foundUser.sportWatchlist.includes(itemId)) {
          res.json({message: 'Item is already being watched'})
        } else {
          res.json({message: 'Item is not watched'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.get('/is-watching/video-games/:userId', (req, res) => {
    const {itemId} = req.query;
    // console.log('ITEM ID',itemId);
    Users.findById(req.params.userId)
      .then((foundUser) => {
  
        if(foundUser.gameWatchlist.includes(itemId)) {
          res.json({message: 'Item is already being watched'})
        } else {
          res.json({message: 'Item is not watched'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.get('/is-watching/manga/:userId', (req, res) => {
    const {itemId} = req.query;
    // console.log('ITEM ID',itemId);
    Users.findById(req.params.userId)
      .then((foundUser) => {
  
        if(foundUser.mangaWatchlist.includes(itemId)) {
          res.json({message: 'Item is already being watched'})
        } else {
          res.json({message: 'Item is not watched'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });

module.exports = router;