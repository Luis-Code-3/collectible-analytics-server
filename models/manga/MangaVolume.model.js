const { Schema, model } = require("mongoose");

const mangaVolumeSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
    },
    mangaType: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true
    },
    issueCount: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    }
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const MangaVolume = model("MangaVolume", mangaVolumeSchema);

module.exports = MangaVolume;