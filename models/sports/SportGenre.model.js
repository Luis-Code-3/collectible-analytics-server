const { Schema, model } = require("mongoose");

const sportGenreSchema = new Schema(
  {
    imageUrl: {
    type: String,
    required: true,
    unique: true
    },
    sport: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cards_id: [{type: Schema.Types.ObjectId, ref: "SportCard"}],
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const SportGenre = model("SportGenre", sportGenreSchema);

module.exports = SportGenre;