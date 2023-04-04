const { Schema, model } = require("mongoose");

const sportCardSchema = new Schema(
  {
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
    cardYear: {
        type: Number,
        required: true
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

const SportCard = model("SportCard", sportCardSchema);

module.exports = SportCard;