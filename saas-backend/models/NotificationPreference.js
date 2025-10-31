import mongoose from "mongoose"

const notificationPreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  emailEnabled: {
    type: Boolean,
    default: true,
  },
  notify7Days: {
    type: Boolean,
    default: true,
  },
  notify3Days: {
    type: Boolean,
    default: true,
  },
  notify1Day: {
    type: Boolean,
    default: true,
  },
  quietHoursStart: String,
  quietHoursEnd: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model("NotificationPreference", notificationPreferenceSchema)
