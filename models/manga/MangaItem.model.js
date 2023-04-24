const mongoose = require('mongoose')
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

mangaItemSchema.statics.search = async function(query) {
  // console.log(query);
  const terms = query.split(' ').map(term => {
    return new RegExp(term, 'i');
  });

  return this.find({
    $and: terms.map(term => {
      return {
        $or: [
          { title: { $regex: term } },
          { volumeName: { $regex: term } },
        ],
      };
    }),
  });
};

const MangaItem = model("MangaItem", mangaItemSchema);

module.exports = MangaItem;