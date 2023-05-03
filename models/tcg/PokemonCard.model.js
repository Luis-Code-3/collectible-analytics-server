const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const pokemonCardSchema = new Schema(
  {
    itemType: {
    type: String,
    required: true
    },
    cardName: {
    type: String,
    required: true,
    },
    imageUrl: {
    type: String,
    required: true,
    unique: true
    },
    language: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    setId: {type: Schema.Types.ObjectId, ref: "PokemonSet"},
    setName: {
        type: String,
        required: true
    }
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

pokemonCardSchema.statics.search = async function(query) {
    const terms = query.split(' ').map(term => {
      // If the term is a number or starts with '#' and the rest is a number, return the number as is
      if ((!isNaN(parseInt(term)) && isFinite(term)) || (term.startsWith('#') && !isNaN(parseInt(term.substring(1))))) {
        return parseInt(term.startsWith('#') ? term.substring(1) : term);
      }
      // Otherwise, return a case-insensitive regular expression
      return new RegExp(term, 'i');
    });
  
    return this.find({
      $and: terms.map(term => {
        if (typeof term === 'number') {
          // If the term is a number, match it directly with the cardNumber field
          return { cardNumber: term };
        }
        // If the term is a regex, match it with any of the specified fields
        return {
          $or: [
            { cardName: { $regex: term } },
            { setName: { $regex: term } },
          ],
        };
      }),
    });
};

const PokemonCard = model("PokemonCard", pokemonCardSchema);

module.exports = PokemonCard;