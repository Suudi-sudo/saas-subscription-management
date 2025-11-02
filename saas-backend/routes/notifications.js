import express from "express"
import NotificationPreference from "../models/NotificationPreference.js"

const router = express.Router()

// Get notification preferences
router.get("/settings", async (req, res) => {
  try {
    let preferences = await NotificationPreference.findOne({ userId: req.userId })

    if (!preferences) {
      preferences = await NotificationPreference.create({ userId: req.userId })
    }

    res.json(preferences)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update notification preferences
router.put("/settings", async (req, res) => {
  try {
    const preferences = await NotificationPreference.findOneAndUpdate(
      { userId: req.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true, upsert: true },
    )

    res.json(preferences)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Send test email
router.post("/test-email", async (req, res) => {
  try {
    // This would integrate with your email service
    res.json({ message: "Test email sent successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
