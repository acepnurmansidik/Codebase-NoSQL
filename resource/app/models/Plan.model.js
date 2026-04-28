const PlanSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      unique: true,
      trim: true,
    },
    price: {
      type: Number, // Diubah dari varchar ke number untuk kalkulasi
      required: [true, "Price is required"],
      min: 0,
    },
    duration_days: {
      type: Number, // Diubah dari uuid ke number
      required: [true, "Duration in days is required"],
    },
    features: {
      type: [String], // AOS (Array of Strings)
      default: [],
    },
    active_screens: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true, collection: "plans", versionKey: false },
);

module.exports = model("Plan", PlanSchema);
