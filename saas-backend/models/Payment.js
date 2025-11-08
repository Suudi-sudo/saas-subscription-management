import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "failed", "pending"],
    default: "completed",
  },
  paymentMethod: String,
  stripePaymentId: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

paymentSchema.index({ userId: 1, paymentDate: -1 })

export default mongoose.model("Payment", paymentSchema)
