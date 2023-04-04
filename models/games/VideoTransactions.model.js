const { Schema, model } = require("mongoose");

const videoTransactionsSchema = new Schema(
  {
    game_id: {type: Schema.Types.ObjectId, ref: "VideoGame"},
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
    condition: {
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

const VideoTransactions = model("VideoTransactions", videoTransactionsSchema);

module.exports = VideoTransactions;