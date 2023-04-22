const PokemonSet = require('../models/tcg/PokemonSet.model');
const PokemonCard = require('../models/tcg/PokemonCard.model');
const SportPlayer = require('../models/sports/SportPlayer.model');
const SportCard = require('../models/sports/SportCard.model')
var mongoose = require('mongoose')
require("dotenv").config();
const {setArray, cardArray, playerArray, sportCardArray} = require('./dummData')

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

    // setArray.forEach((set) => {
    //     PokemonSet.create({
    //         setName: set.setName,
    //         imageUrl: set.imageUrl,
    //         language: set.language,
    //         releaseDate: set.releaseDate,
    //         description: set.description,
    //         setCount: set.setCount,
    //         setYear: set.setYear
    //     })
    //     .then((createdNft) => {
    //         console.log("complete one");
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // })

    // PokemonSet.findById('6441b8f3b5b6f1ce5e735324')
    //     .then((foundSet) => {
    //         cardArray.forEach((card) => {
    //             PokemonCard.create({
    //                 itemType: "tcg",
    //                 cardName: card.cardName,
    //                 imageUrl: card.imageUrl,
    //                 language: card.language,
    //                 cardNumber: card.cardNumber,
    //                 setId: foundSet._id,
    //                 setName: foundSet.setName
    //             })
    //             .then((createdNft) => {
    //                 console.log("created a card");
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })

    // playerArray.forEach((player) => {
    //     SportPlayer.create({
    //         playerName: player.playerName,
    //         imageUrl: player.imageUrl,
    //         sport: player.sport,
    //         description: player.description,
    //     })
    //     .then((createdPlayer) => {
    //         console.log("complete one");
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // })

    sportCardArray.forEach((card) => {
        SportCard.create({
            itemType: card.itemType,
            playerName: card.playerName,
            cardNumber: card.cardNumber,
            setName: card.setName,
            cardType: card.cardType,
            imageUrl: card.imageUrl,
            sport: card.sport
        })
        .then((createdCard) => {
            console.log("created one");
        })
        .catch((err) => {
            console.log(err);
        })
    })





  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// itemType: {
//         type: String,
//         required: true,
//     },
//     playerName: {
//       type: String,
//       required: true,
//     },
//     cardNumber: {
//       type: Number,
//       required: true,
//     },
//     setName: {
//         type: String,
//         required: true
//     },
//     cardType: {
//       type: String,
//       required: true,
//     },
//     imageUrl: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     sport: {
//         type: String,
//         required: true
//     }