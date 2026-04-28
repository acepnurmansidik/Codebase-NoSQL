const SubscriptionSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    plan_id: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required: [true, "Plan ID is required"],
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired", "pending"],
      required: true,
      default: "pending",
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    payment_gateway_id: {
      type: String, // ID transaksi dari Midtrans/Stripe/Xendit
      default: null,
    },
  },
  { timestamps: true, collection: "subscriptions" },
);

module.exports = model("Subscription", SubscriptionSchema);
