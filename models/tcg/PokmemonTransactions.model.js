const { Schema, model } = require("mongoose");

const pokemonTransactionsSchema = new Schema(
  {
    card_id: {type: Schema.Types.ObjectId, ref: "PokemonCard"},
    marketplace: {
    type: String,
    required: true
    },
    gradeName: {
      type: String,
    },
    gradeNumber: {
      type: Number,
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