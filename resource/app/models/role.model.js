const mongoose = require("mongoose");
const globalService = require("../../helper/global-func");
const { model, Schema } = mongoose;

const RoleSchema = new Schema(
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
    collection: "role",
  },
);

// Pre-save hook
RoleSchema.pre("validate", function (next) {
  // Jika slug tidak diisi, buat dari name
  if (!this.slug && this.name) {
    this.slug = globalService.createSlug(this.name); // Pastikan fungsi createSlug mengembalikan slug yang benar
  }
  next();
});

module.exports = model("Role", RoleSchema);
