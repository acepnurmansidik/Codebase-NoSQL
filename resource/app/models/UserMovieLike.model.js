const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const UserMovieLikeSchema = new Schema(
  {
    is_guest: {
      type: Boolean,
      required: true,
      default: false,
    },
    is_allow: {
      type: Boolean,
      required: true,
      default: false,
    },
    // Mengubah location menjadi Object
    location: {
      type: {
        city: { type: String, default: null },
        country: { type: String, default: null },
        coordinates: {
          latitude: { type: Number, default: 0 },
          longitude: { type: Number, default: 0 },
        },
        ip_address: { type: String, default: null },
      },
      _id: false, // Agar tidak membuat _id otomatis di dalam objek location
      default: {},
    },
    is_like: {
      type: Boolean,
      required: true,
      default: false,
    },

    // References
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    movie_id: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: [true, "Movie ID is required"],
    },
    genres_name: {
      type: String,
      required: [true, "Genre names are required"],
      trim: true,
    },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "user_movie_likes",
  },
);

// Mencegah user yang sama memberikan like berulang kali pada movie yang sama (Unique Compound Index)
UserMovieLikeSchema.index({ user_id: 1, movie_id: 1 }, { unique: true });

module.exports = model("UserMovieLike", UserMovieLikeSchema);
