const mongoose = require("mongoose");
const globalService = require("../../helper/global-func");
const { model, Schema } = mongoose;

const GenreSchema = new Schema(
  {
    slug: {
      type: String,
      required: [true, "Slug is required!"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
    },
    is_adult: { type: Boolean, default: false },
    is_delete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "genres",
  },
);

GenreSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = globalService.createSlug(this.name);
  }
  next();
});

module.exports = model("Genre", GenreSchema);

// Pre-save hook
GenreSchema.pre("validate", function (next) {
  // Jika slug tidak diisi, buat dari name
  if (!this.slug && this.name) {
    this.slug = globalService.createSlug(this.name); // Pastikan fungsi createSlug mengembalikan slug yang benar
  }
  next();
});

module.exports = model("Genre", GenreSchema);
