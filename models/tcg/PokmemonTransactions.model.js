const { Schema, model } = require("mongoose");

const pokemonTransactionsSchema = new Schema(
  {
    card_id: {type: Schema.Types.ObjectId, ref: "PokemonCard"},
    title: {
    type: String,
    required: true
    },
    marketplace: {
    type: String,
    required: true
    },
    grade: {
      type: String,
      required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    date_sold: {
      type: String,
      required: true,
    },
    seller: {
        type: String,
    },
    link_slug: {
        type: String
    }
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const PokemonTransactions = model("PokemonTransactions", pokemonTransactionsSchema);

module.exports = PokemonTransactions;