const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");

const videoGameSchema = new Schema(
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

videoGameSchema.statics.search = async function(query) {
    const terms = query.split(' ').map(term => {
      return new RegExp(term, 'i');
    });
  
    return this.find({
      $and: terms.map(term => {
        return {
          $or: [
            { title: { $regex: term } },
            { consoleName: { $regex: term } },
          ],
        };
      }),
    });
  };

const VideoGame = model("VideoGame", videoGameSchema);

module.exports = VideoGame;