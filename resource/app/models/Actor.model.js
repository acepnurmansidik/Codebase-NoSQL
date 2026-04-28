const mongoose = require("mongoose");
const globalService = require("../../helper/global-func");
const { model, Schema } = mongoose;

const ActorSchema = new Schema(
  {
    slug: {
      type: String,
      minlength: [3, "Slug must be at least 3 characters long"],
      required: [true, "Slug is required!"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    avatar_id: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: [true, "Avatar ID is required!"],
    },
    name: {
      type: String,
      minlength: [3, "Name must be at least 3 characters long"],
      required: [true, "Name is required!"],
      trim: true,
    },
    birth_date: {
      type: Date,
      required: [true, "Birth date is required!"],
    },
    country: { type: String, required: [true, "Country is required!"] },
    continent: { type: String, required: [true, "Continent is required!"] },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true }, // Boolean diubah ke String agar lebih jelas
    is_new: { type: Boolean, default: false },
    is_delete: { type: Boolean, default: false },
    created_by: { type: Schema.Types.ObjectId, ref: "User", default: null },
    updated_by: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "actors", // Sebelumnya "genre"
  },
);

ActorSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = globalService.createSlug(this.name);
  }
  next();
});

module.exports = model("Actor", ActorSchema); // Sebelumnya "Genre"

// Pre-save hook
ActorSchema.pre("validate", function (next) {
  // Jika slug tidak diisi, buat dari name
  if (!this.slug && this.name) {
    this.slug = globalService.createSlug(this.name); // Pastikan fungsi createSlug mengembalikan slug yang benar
  }
  next();
});

module.exports = model("Genre", ActorSchema);
