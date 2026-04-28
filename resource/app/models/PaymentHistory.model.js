const PaymentHistorySchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscription_id: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },
    amount: {
      type: Number, // Diubah dari varchar ke number
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed", "pending", "refunded"],
      required: true,
    },
    method: {
      type: String, // Contoh: 'credit_card', 'bank_transfer', 'e-wallet'
      required: true,
    },
    transaction_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, collection: "payment_history" },
);

module.exports = model("PaymentHistory", PaymentHistorySchema);
