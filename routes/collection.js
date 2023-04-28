var express = require('express');
var router = express.Router();
const Users = require('../models/users/Users.model');

/* GET home page. */
router.get('/collection/:userId', (req, res) => {
    Users.findById(`${req.params.userId}`)
      .populate('gameCollection')
      .populate('tcgCollection')
      .populate('mangaCollection')
      .populate('sportCollection')
      .then((foundUser) => {
        const allCollected = [...foundUser.gameCollection, ...foundUser.tcgCollection, ...foundUser.mangaCollection, ...foundUser.sportCollection];
        res.status(200).json(allCollected)
      })
      .catch((err) => {
        console.log(err);
      })
  });

// ARE WE ALREADY COLLECTING?
  
  
router.get('/is-collecting/trading-cards/:userId', (req, res) => {
    const {itemId} = req.query;
    // console.log('ITEM ID',itemId);
    Users.findById(req.params.userId)
      .then((foundUser) => {
  
        if(foundUser.tcgCollection.includes(itemId)) {
          res.json({message: 'Item is already collected'})
        } else {
          res.json({message: 'Item is not collected'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.get('/is-collecting/sports-cards/:userId', (req, res) => {
    const {itemId} = req.query;
    // console.log('ITEM ID',itemId);
    Users.findById(req.params.userId)
      .then((foundUser) => {
  
        if(foundUser.sportCollection.includes(itemId)) {
          res.json({message: 'Item is already collected'})
        } else {
          res.json({message: 'Item is not collected'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.get('/is-collecting/video-games/:userId', (req, res) => {
    const {itemId} = req.query;
    // console.log('ITEM ID',itemId);
    Users.findById(req.params.userId)
      .then((foundUser) => {
  
        if(foundUser.gameCollection.includes(itemId)) {
          res.json({message: 'Item is already collected'})
        } else {
          res.json({message: 'Item is not collected'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.get('/is-collecting/manga/:userId', (req, res) => {
    const {itemId} = req.query;
    // console.log('ITEM ID',itemId);
    Users.findById(req.params.userId)
      .then((foundUser) => {
  
        if(foundUser.mangaCollection.includes(itemId)) {
          res.json({message: 'Item is already collected'})
        } else {
          res.json({message: 'Item is not collected'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });

  // START COLLECTING ITEM

  router.post('/add-collect/trading-cards/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId, tcgCollection: { $ne: itemId } },
      { $addToSet: { tcgCollection: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'Item is already collected'})
        } else {
        //   console.log(foundUser);
          res.json({message: 'Item is now being collected'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.post('/add-collect/sports-cards/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId, sportCollection: { $ne: itemId } },
      { $addToSet: { sportCollection: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'Item is already collected'})
        } else {
        //   console.log(foundUser);
          res.json({message: 'Item is now being collected'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.post('/add-collect/video-games/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId, gameCollection: { $ne: itemId } },
      { $addToSet: { gameCollection: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'Item is already collected'})
        } else {
        //   console.log(foundUser);
          res.json({message: 'Item is now being collected'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.post('/add-collect/manga/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId, mangaCollection: { $ne: itemId } },
      { $addToSet: { mangaCollection: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'Item is already collected'})
        } else {
        //   console.log(foundUser);
          res.json({message: 'Item is now being collected'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });

  // STOP COLLECTING ITEM

  router.post('/remove-collect/trading-cards/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { tcgCollection: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'User not found'})
        } else {
        //   console.log(foundUser);
          res.json({message: 'Item removed from collection'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.post('/remove-collect/sports-cards/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { sportCollection: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'User not found'})
        } else {
        //   console.log(foundUser);
          res.json({message: 'Item removed from collection'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.post('/remove-collect/video-games/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { gameCollection: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'User not found'})
        } else {
        //   console.log(foundUser);
          res.json({message: 'Item removed from collection'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });
  
  router.post('/remove-collect/manga/:userId', (req, res) => {
    const {itemId} = req.body;
    //console.log(itemId);
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { mangaCollection: itemId } },
      { new: true })
      .then((foundUser) => {
        if(!foundUser) {
          res.json({message: 'User not found'})
        } else {
        //   console.log(foundUser);
          res.json({message: 'Item removed from collection'})
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  });

module.exports = router;