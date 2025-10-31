import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: String,
  password: {
    type: String,
    select: false // Don't return password in queries by default
  },
  authMethod: {
    type: String,
    enum: ["google", "email", "both"],
    default: "google"
  },
  currency: {
    type: String,
    default: "USD",
    enum: ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "INR"],
  },
  timezone: {
    type: String,
    default: "UTC",
  },
  profilePicture: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("User", userSchema)