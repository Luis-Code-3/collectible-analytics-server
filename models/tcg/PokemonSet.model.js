const { Schema, model } = require("mongoose");

const pokemonSetSchema = new Schema(
  {
    setName: {
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
    releaseDate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    setCount: {
        type: Number,
        
    },
    cards_id: [{type: Schema.Types.ObjectId, ref: "PokemonCard"}],
    setYear: {
        type: Number,
        
    }
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const PokemonSet = model("PokemonSet", pokemonSetSchema);

module.exports = PokemonSet;