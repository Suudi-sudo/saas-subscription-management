import mongoose from "mongoose"

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: String,
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
  billingCycle: {
    type: String,
    enum: ["weekly", "monthly", "quarterly", "yearly"],
    required: true,
  },
  nextRenewalDate: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ["Entertainment", "Productivity", "Fitness", "Business", "Other"],
    default: "Other",
  },
  logoUrl: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  paymentMethod: String,
  cancellationDeadline: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

subscriptionSchema.index({ userId: 1, nextRenewalDate: 1 })

export default mongoose.model("Subscription", subscriptionSchema)
