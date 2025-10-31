import express from "express"
import Payment from "../models/Payment.js"

const router = express.Router()

// Get payment history
router.get("/", async (req, res) => {
  try {
    const { limit = 50, skip = 0 } = req.query

    const payments = await Payment.find({ userId: req.userId })
      .sort({ paymentDate: -1 })
      .limit(Number.parseInt(limit))
      .skip(Number.parseInt(skip))
      .populate("subscriptionId", "name")

    const total = await Payment.countDocuments({ userId: req.userId })

    res.json({
      payments,
      total,
      limit: Number.parseInt(limit),
      skip: Number.parseInt(skip),
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single payment
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findOne({
      _id: req.params.id,
      userId: req.userId,
    }).populate("subscriptionId")

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" })
    }

    res.json(payment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Log manual payment
router.post("/", async (req, res) => {
  try {
    const { subscriptionId, amount, paymentDate, paymentMethod, notes } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" })
    }

    const payment = new Payment({
      userId: req.userId,
      subscriptionId,
      amount,
      paymentDate: paymentDate || new Date(),
      paymentMethod,
      notes,
      status: "completed",
    })

    await payment.save()
    res.status(201).json(payment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update payment
router.put("/:id", async (req, res) => {
  try {
    const payment = await Payment.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true })

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" })
    }

    res.json(payment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete payment
router.delete("/:id", async (req, res) => {
  try {
    const payment = await Payment.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    })

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" })
    }

    res.json({ message: "Payment deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
