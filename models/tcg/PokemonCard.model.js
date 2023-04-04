const { Schema, model } = require("mongoose");

const pokemonCardSchema = new Schema(
  {
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
      type: Number,
      required: true,
    },
    setId: {type: Schema.Types.ObjectId, ref: "PokemonSet"},
    setName: {
        type: String,
        required: true
    },
    pokemonName: {
      type: String,
      required: true,
    },
    cardYear: {
        type: Number,
        required: true
    }
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const PokemonCard = model("PokemonCard", pokemonCardSchema);

module.exports = PokemonCard;