var express = require('express');
var router = express.Router();
const PokemonCard = require('../models/tcg/PokemonCard.model');
const MangaItem = require('../models/manga/MangaItem.model');
const VideoGame = require('../models/games/VideoGame.model');
const SportCard = require('../models/sports/SportCard.model');

const PokemonTransactions = require('../models/tcg/PokmemonTransactions.model');
const MangaTransactions = require('../models/manga/MangaTransactions.model');
const VideoTransactions = require('../models/games/VideoTransactions.model');
const SportTransactions = require('../models/sports/SportTransactions.model');

/* GET home page. */
router.get('/item-details/:itemType/:itemId', async (req, res) => {
    const {itemType, itemId} = req.params;

    let ItemModel;

    switch (itemType) {
        case "tcg":
            ItemModel = PokemonCard;
            break;
        case "sports":
            ItemModel = SportCard;
            break;
        case "manga":
            ItemModel = MangaItem;
            break;
        case "videogames":
            ItemModel = VideoGame;
            break;
        default:
            return res.status(400).json({ error: "Invalid item type" });
    }

    try {
        const item = await ItemModel.findById(itemId);
        res.json(item)
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the item" });
    }
});

router.get('/item-sales/:itemType/:itemId', async (req, res) => {
    const {itemType, itemId} = req.params;

    let ItemModel;
    let idField;

    switch (itemType) {
        case "tcg":
            ItemModel = PokemonTransactions;
            idField = "card_id"
            break;
        case "sports":
            ItemModel = SportTransactions;
            idField = "card_id"
            break;
        case "manga":
            ItemModel = MangaTransactions;
            idField = "mangaItem_id"
            break;
        case "videogames":
            ItemModel = VideoTransactions;
            idField = "game_id"
            break;
        default:
            return res.status(400).json({ error: "Invalid item type" });
    }

    try {
        const item = await ItemModel.find({[idField]: itemId});
        res.json(item)
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the transactions" });
    }
});

router.get('/similar-items/:itemType', async (req, res) => {
    const {itemType} = req.params;

    let ItemModel;

    switch (itemType) {
        case "tcg":
            ItemModel = PokemonCard;
            break;
        case "sports":
            ItemModel = SportCard;
            break;
        case "manga":
            ItemModel = MangaItem;
            break;
        case "videogames":
            ItemModel = VideoGame;
            break;
        default:
            return res.status(400).json({ error: "Invalid item type" });
    }

    try {
        const item = await ItemModel.find().limit(10);
        res.json(item)
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the transactions" });
    }
});

async function combinedSearch(query) {
    const [pokemonCards, sportCards, mangaItems, videoGames] = await Promise.all([
      PokemonCard.search(query),
      SportCard.search(query),
      MangaItem.search(query),
      VideoGame.search(query)
    ]);
  
    return [
        ...pokemonCards,
        ...sportCards,
        ...mangaItems,
        ...videoGames
    ]
    ;
  }

router.get('/search-bar/check', async (req,res) => {
    const query = req.query.q;
    //console.log(query);
    const results = await combinedSearch(query);
    res.json(results);
})


module.exports = router;