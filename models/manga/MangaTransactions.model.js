const { Schema, model } = require("mongoose");

const mangaTransactionsSchema = new Schema(
    {
      mangaItem_id: {type: Schema.Types.ObjectId, ref: "MangaItem"},
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
  
  const MangaTransactions = model("MangaTransactions", mangaTransactionsSchema);
  
  module.exports = MangaTransactions;