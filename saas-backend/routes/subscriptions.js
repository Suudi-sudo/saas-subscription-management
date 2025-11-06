import express from "express"
import Subscription from "../models/Subscription.js"
import { validateSubscription } from "../utils/validators.js"

const router = express.Router()

// Get all subscriptions
router.get("/", async (req, res) => {
  try {
    const { sort = "nextRenewalDate", filter = "active", category } = req.query

    const query = { userId: req.userId }

    if (filter === "active") {
      query.isActive = true
    } else if (filter === "inactive") {
      query.isActive = false
    }

    if (category) {
      query.category = category
    }

    const sortOptions = {
      cost: { cost: -1 },
      renewal: { nextRenewalDate: 1 },
      name: { name: 1 },
      category: { category: 1 },
    }

    const subscriptions = await Subscription.find(query).sort(sortOptions[sort] || { nextRenewalDate: 1 })

    res.json(subscriptions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single subscription
router.get("/:id", async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      userId: req.userId,
    })

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" })
    }

    res.json(subscription)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create subscription
router.post("/", async (req, res) => {
  try {
    const validation = validateSubscription(req.body)
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error })
    }

    const subscription = new Subscription({
      userId: req.userId,
      ...req.body,
    })

    await subscription.save()
    res.status(201).json(subscription)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update subscription
router.put("/:id", async (req, res) => {
  try {
    const validation = validateSubscription(req.body)
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error })
    }

    const subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true },
    )

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" })
    }

    res.json(subscription)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete subscription (soft delete)
router.delete("/:id", async (req, res) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { isActive: false, updatedAt: new Date() },
      { new: true },
    )

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" })
    }

    res.json({ message: "Subscription deleted", subscription })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get upcoming renewals
router.get("/upcoming/renewals", async (req, res) => {
  try {
    const today = new Date()
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)

    const subscriptions = await Subscription.find({
      userId: req.userId,
      isActive: true,
      nextRenewalDate: { $gte: today, $lte: thirtyDaysFromNow },
    }).sort({ nextRenewalDate: 1 })

    res.json(subscriptions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
