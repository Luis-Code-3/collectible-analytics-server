const { Schema, model } = require("mongoose");

const sportPlayerSchema = new Schema(
  {
    playerName: {
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

const SportPlayer = model("SportPlayer", sportPlayerSchema);

module.exports = SportPlayer;