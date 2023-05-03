const PokemonSet = require('../models/tcg/PokemonSet.model');
const PokemonCard = require('../models/tcg/PokemonCard.model');
const SportPlayer = require('../models/sports/SportPlayer.model');
const SportCard = require('../models/sports/SportCard.model');
const MangaVolume = require('../models/manga/MangaVolume.model');
const MangaItem = require('../models/manga/MangaItem.model');
const VideoConsole = require('../models/games/VideoConsole.model')
const VideoGame = require('../models/games/VideoGame.model')
const cloudinary = require('cloudinary').v2
var mongoose = require('mongoose')
const puppeteer = require('puppeteer');
require("dotenv").config();
const { cardArray, playerArray, sportCardArray, volumeArray, mangaItems, consoleArray, gameArray} = require('./dummData');
const {tranArray} = require('./dummDataTwo');
const {setArray} = require('./dummDataThree')
const PokemonTransactions = require('../models/tcg/PokmemonTransactions.model');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET,
  });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async (x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

    const cloudConvert = async (image) => {
        try {
            const result = await cloudinary.uploader.upload(image, {
                folder: "pokemon cards"
            });
            // console.log(result);
            // console.log("RESULT", result.public_id);
            // console.log("RESULT", result.secure_url);
            return result.secure_url;
            
        } catch (error) {
            console.log(error);
        }
    }

    // for(const set of setArray) {
    //     const newImage = await cloudConvert(set.img_url);
    //     await PokemonSet.create({
    //                 setName: set.name,
    //                 imageUrl: newImage,
    //                 language: set.language.toLowerCase(),
    //                 releaseDate: set.release_date,
    //                 description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam fuga alias sint id odit qui sequi! Obcaecati inventore iste repudiandae, necessitatibus eius repellat totam neque, vitae, possimus soluta nemo.",
    //             })
    //             .then((createdSet) => {
    //                 console.log("complete one");
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
    //     await new Promise(resolve => setTimeout(resolve, 1000));
    // }
    const getCardsOne = async (setName) => {
        // console.log(setName);
        let browser;
        let cardsArray;
        try {
            browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            page.setDefaultNavigationTimeout(2 * 60 * 1000)
    
            // const bodyHandle = await page.$('body');
            // const innerHTML = await page.evaluate(body => body.innerHTML, bodyHandle);
            // console.log(innerHTML);
            page.on('response', async (response) => {
                // console.log('URL:', response.url());
                const url = response.url();
                if (url.includes('cards?set_name')) { // Replace with the actual URL
                //   console.log("GOT ONE:", url);
                  const responseData = await response.json();
                //   console.log(responseData[0]);
                  cardsArray = responseData;
                  // console.log('Response data:', responseData);
                  // Extract the data you need from the response data
                  return cardsArray;
                }
            });
    
            await page.goto(`https://www.pokedata.io/set/${setName}`);
            
        } catch (error) {
            console.log(error);
        } finally {
                await browser.close();
        }
        return cardsArray;
    }

    const getCardsAll = async () => {
        try {
            const englishSets = await PokemonSet.find({language: 'english'});
            for (set of englishSets) {
                const newName = set.setName.replace(' ', "+");
                const setCards = await getCardsOne(newName);
                console.log(setCards);
                console.log(typeof setCards);
                for (card of setCards) {
                    const newImage = await cloudConvert(card.img_url);
                    await PokemonCard.create({
                        itemType: "tcg",
                        cardName: card.name,
                        imageUrl: newImage,
                        language: "english",
                        cardNumber: card.num,
                        setId: set._id,
                        setName: set.setName
                    })
                    .then((createdCard) => {
                        console.log("added card");
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    await new Promise(resolve => setTimeout(resolve, 1000)); 
                }
                console.log("SET CARDS COMPLETED");
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        } catch (error) {
            console.log(error);
        }

    }

    getCardsAll();


    // PokemonSet.find({language: 'english'})
    //     .then((foundSets) => {
    //         console.log(foundSets.length);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })


    // setArray.forEach((set) => {
    //     PokemonSet.create({
    //         setName: set.name,
    //         imageUrl: set.img_url,
    //         language: set.language.toLowerCase(),
    //         releaseDate: set.release_date,
    //         description: "",
    //         setCount: "",
    //         setYear: ""
    //     })
    //     .then((createdSet) => {
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

//     PokemonCard.findById('6442f96efd34029736a336c4')
//         .then((foundCard) => {
//             tranArray.forEach((tran) => {
//                 PokemonTransactions.create({
//                     card_id: foundCard._id,
//                     title: tran.title,
//                     marketplace: tran.marketplace,
//                     grade: tran.grade,
//                     salePrice: tran.salePrice,
//                     date_sold: tran.date_sold,
//                     link_slug: tran.link_slug
//                 })
//                 .then((createdTran) => {
//                     console.log("created a tran");
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 })
//             })
//         })
//         .catch((err) => {
//             console.log(err);
//         })


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