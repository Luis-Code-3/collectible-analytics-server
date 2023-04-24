const PokemonSet = require('../models/tcg/PokemonSet.model');
const PokemonCard = require('../models/tcg/PokemonCard.model');
const SportPlayer = require('../models/sports/SportPlayer.model');
const SportCard = require('../models/sports/SportCard.model');
const MangaVolume = require('../models/manga/MangaVolume.model');
const MangaItem = require('../models/manga/MangaItem.model');
const VideoConsole = require('../models/games/VideoConsole.model')
const VideoGame = require('../models/games/VideoGame.model')
var mongoose = require('mongoose')
require("dotenv").config();
const {setArray, cardArray, playerArray, sportCardArray, volumeArray, mangaItems, consoleArray, gameArray} = require('./dummData');
const {tranArray} = require('./dummDataTwo');
const PokemonTransactions = require('../models/tcg/PokmemonTransactions.model');

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

    // sportCardArray.forEach((card) => {
    //     SportCard.create({
    //         itemType: card.itemType,
    //         playerName: card.playerName,
    //         cardNumber: card.cardNumber,
    //         setName: card.setName,
    //         cardType: card.cardType,
    //         imageUrl: card.imageUrl,
    //         sport: card.sport
    //     })
    //     .then((createdCard) => {
    //         console.log("created one");
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // })

    // volumeArray.forEach((volume) => {
    //     MangaVolume.create({
    //         title: volume.title,
    //         mangaType: volume.mangaType,
    //         publisher: volume.publisher,
    //         issueCount: volume.issueCount,
    //         imageUrl: volume.imageUrl,
    //         description: volume.description,
    //         releaseDate: volume.releaseDate
    //     })
    //     .then((createdVolume) => {
    //         console.log("created one");
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // })

    // MangaVolume.findById('64434ef6a31ff32d793007b8')
    //     .then((foundVolume) => {
    //         mangaItems.forEach((item) => {
    //             MangaItem.create({
    //                 itemType: "tcg",
    //                 title: item.title,
    //                 imageUrl: item.imageUrl,
    //                 volumeId: foundVolume._id,
    //                 volumeName: foundVolume.title,
    //             })
    //             .then((createdItem) => {
    //                 console.log("created a item");
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })

    // consoleArray.forEach((item) => {
    //     VideoConsole.create({
    //         consoleName: item.consoleName,
    //         company: item.company,
    //         imageUrl: item.imageUrl,
    //         releaseDate: item.releaseDate,
    //         description: item.description,
    //         gameCount: item.gameCount
    //     })
    //     .then((createdConsole) => {
    //         console.log("created one")
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // })

    // VideoConsole.findById('64445f62995e228ee9d46093')
    //     .then((foundConsole) => {
    //         gameArray.forEach((item) => {
    //             VideoGame.create({
    //                 itemType: "game",
    //                 title: item.title,
    //                 imageUrl: item.imageUrl,
    //                 consoleId: foundConsole._id,
    //                 consoleName: foundConsole.consoleName,
    //                 releaseDate: item.releaseDate
    //             })
    //             .then((createdItem) => {
    //                 console.log("created a item");
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })

    PokemonCard.findById('6442f96efd34029736a336c4')
        .then((foundCard) => {
            tranArray.forEach((tran) => {
                PokemonTransactions.create({
                    card_id: foundCard._id,
                    title: tran.title,
                    marketplace: tran.marketplace,
                    grade: tran.grade,
                    salePrice: tran.salePrice,
                    date_sold: tran.date_sold,
                    link_slug: tran.link_slug
                })
                .then((createdTran) => {
                    console.log("created a tran");
                })
                .catch((err) => {
                    console.log(err);
                })
            })
        })
        .catch((err) => {
            console.log(err);
        })


  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// card_id: {type: Schema.Types.ObjectId, ref: "PokemonCard"},
//     title: {
//     type: String,
//     required: true
//     },
//     marketplace: {
//     type: String,
//     required: true
//     },
//     grade: {
//       type: String,
//       required: true
//     },
//     salePrice: {
//         type: Number,
//         required: true
//     },
//     date_sold: {
//       type: String,
//       required: true,
//     },
//     seller: {
//         type: String,
//     },
//     link_slug: {
//         type: String
//     }