const { Schema, model } = require("mongoose");

const mangaItemSchema = new Schema(
  {
    itemType: {
      type: String,
      required: true
    },
    title: {
        type: String,
        required: true,
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
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const MangaItem = model("MangaItem", mangaItemSchema);

module.exports = MangaItem;