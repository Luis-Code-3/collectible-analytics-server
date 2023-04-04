const { Schema, model } = require("mongoose");

const videoGameSchema = new Schema(
  {
    title: {
    type: String,
    required: true,
    },
    imageUrl: {
    type: String,
    required: true
    },
    region: {
      type: String,
      required: true,
    },
    consoleId: {type: Schema.Types.ObjectId, ref: "VideoConsole"},
    consoleName: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Number,
        required: true
    }
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const VideoGame = model("VideoGame", videoGameSchema);

module.exports = VideoGame;