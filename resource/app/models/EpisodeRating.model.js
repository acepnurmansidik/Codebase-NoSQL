const EpisodeRatingSchema = new Schema(
  {
    episode_id: {
      type: Schema.Types.ObjectId,
      ref: "Episode",
      required: [true, "Episode ID is required"],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    rating: {
      type: Boolean,
      required: true, // true = thumbs up, false = thumbs down
    },
    is_guest: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "user_episode_ratings",
  },
);

module.exports = model("EpisodeRating", EpisodeRatingSchema);
