const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
    type: String,
    required: true,
    unique: true
    },
    email: {
    type: String,
    required: true,
    unique: true
    },
    password: {
      type: String,
      required: true,
    },
    gameWatchlist: [{type: Schema.Types.ObjectId, ref: "VideoGame"}],
    tcgWatchlist: [{type: Schema.Types.ObjectId, ref: "PokemonCard"}],
    mangaWatchlist: [{type: Schema.Types.ObjectId, ref: "MangaItem"}],
    sportWatchlist: [{type: Schema.Types.ObjectId, ref: "SportCard"}],
    gameCollection: [{type: Schema.Types.ObjectId, ref: "VideoGame"}],
    tcgCollection: [{type: Schema.Types.ObjectId, ref: "PokemonCard"}],
    mangaCollection: [{type: Schema.Types.ObjectId, ref: "MangaItem"}],
    sportCollection: [{type: Schema.Types.ObjectId, ref: "SportCard"}],
    submissions: [{type: Schema.Types.ObjectId, ref: "Submissions"}]
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;