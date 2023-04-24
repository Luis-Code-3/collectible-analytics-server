const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const sportCardSchema = new Schema(
  {
    itemType: {
        type: String,
        required: true,
    },
    playerName: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
    },
    setName: {
        type: String,
        required: true
    },
    cardType: {
      type: String,
      required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        unique: true
    },
    sport: {
        type: String,
        required: true
    }
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

sportCardSchema.statics.search = async function(query) {
    const terms = query.split(' ').map((term, index) => {
      if ((!isNaN(parseInt(term)) && isFinite(term)) && index !== 0 || (term.startsWith('#') && !isNaN(parseInt(term.substring(1))))) {
        return parseInt(term.startsWith('#') ? term.substring(1) : term);
      }
      return new RegExp(term, 'i');
    });
  
    return this.find({
      $and: terms.map(term => {
        if (typeof term === 'number') {
          return { cardNumber: term };
        }
        return {
          $or: [
            { playerName: { $regex: term } },
            { setName: { $regex: term } },
            { cardType: { $regex: term } },
          ],
        };
      }),
    });
};

const SportCard = model("SportCard", sportCardSchema);

module.exports = SportCard;