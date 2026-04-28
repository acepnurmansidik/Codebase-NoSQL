const EpisodeLikerSchema = new Schema(
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
    is_like: {
      type: Boolean,
      default: true,
    },
    is_guest: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "user_episode_likers",
  },
);

// Pastikan satu user hanya bisa nge-like satu episode satu kali
EpisodeLikerSchema.index({ episode_id: 1, user_id: 1 }, { unique: true });

module.exports = model("EpisodeLiker", EpisodeLikerSchema);
