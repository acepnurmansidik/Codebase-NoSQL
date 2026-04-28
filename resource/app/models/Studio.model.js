const mongoose = require("mongoose");
const globalService = require("../../helper/global-func");
const { model, Schema } = mongoose;

const GenreSchema = new Schema(
  {
    slug: {
      type: String,
      minlength: [3, "Slug must be at least 3 characters long"],
      required: [true, "Slug is required!"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      minlength: [3, "Name must be at least 3 characters long"],
      required: [true, "Name is required!"],
    },
    country: {
      type: String,
      minlength: [3, "Country must be at least 3 characters long"],
      required: [true, "Country is required!"],
    },
    continent: {
      type: String,
      minlength: [3, "Continent must be at least 3 characters long"],
      required: [true, "Continent is required!"],
    },
    is_adult: {
      type: Boolean,
      required: true,
      default: false,
    },
    profile_id: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },

    // separated by comma, example: "admin, user"
    is_delete: {
      type: Boolean,
      required: true,
      default: false,
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updated_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "genre",
  },
);

// Pre-save hook
GenreSchema.pre("validate", function (next) {
  // Jika slug tidak diisi, buat dari name
  if (!this.slug && this.name) {
    this.slug = globalService.createSlug(this.name); // Pastikan fungsi createSlug mengembalikan slug yang benar
  }
  next();
});

module.exports = model("Genre", GenreSchema);
