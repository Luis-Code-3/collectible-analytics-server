const { Schema, model } = require("mongoose");

const mangaItemSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
    },
    issueNumber: {
        type: Number,
    },
    magazineNumber: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true
    },
    volumeId: {type: Schema.Types.ObjectId, ref: "MangaVolume"},
    volumeName: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Number,
    },
    releaseYear: {
      type: Number
    }
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const MangaItem = model("MangaItem", mangaItemSchema);

module.exports = MangaItem;