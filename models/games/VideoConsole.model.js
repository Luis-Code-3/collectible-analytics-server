const { Schema, model } = require("mongoose");

const videoConsoleSchema = new Schema(
  {
    consoleName: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    region: {
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
    gameCount: {
        type: String,
        required: true
    },
    consoleYear: {
        type: Number,
        required: true
    }
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const VideoConsole = model("VideoConsole", videoConsoleSchema);

module.exports = VideoConsole;