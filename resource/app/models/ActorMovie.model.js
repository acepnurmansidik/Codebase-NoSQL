const mongoose = require("mongoose");
const globalService = require("../../helper/global-func");
const { model, Schema } = mongoose;

const ActorMovieSchema = new Schema(
  {
    actor_id: {
      type: Schema.Types.ObjectId,
      ref: "Actor",
      required: true,
    },
    movie_id: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "actor_movies",
  },
);

module.exports = model("ActorMovie", ActorMovieSchema);
