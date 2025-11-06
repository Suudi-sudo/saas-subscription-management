import express from "express"
import Subscription from "../models/Subscription.js"
import Payment from "../models/Payment.js"

const router = express.Router()

// Get dashboard overview
router.get("/overview", async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      userId: req.userId,
      isActive: true,
    })

    const totalMonthly = subscriptions.reduce((sum, sub) => {
      if (sub.billingCycle === "monthly") return sum + sub.cost
      if (sub.billingCycle === "yearly") return sum + sub.cost / 12
      if (sub.billingCycle === "quarterly") return sum + sub.cost / 3
      if (sub.billingCycle === "weekly") return sum + sub.cost * 4.33
      return sum
    }, 0)

    const totalYearly = subscriptions.reduce((sum, sub) => {
      if (sub.billingCycle === "yearly") return sum + sub.cost
      if (sub.billingCycle === "monthly") return sum + sub.cost * 12
      if (sub.billingCycle === "quarterly") return sum + sub.cost * 4
      if (sub.billingCycle === "weekly") return sum + sub.cost * 52
      return sum
    }, 0)

    const highestCost = subscriptions.reduce((max, sub) => (sub.cost > max.cost ? sub : max), subscriptions[0] || {})

    const categorySpending = {}
    subscriptions.forEach((sub) => {
      categorySpending[sub.category] = (categorySpending[sub.category] || 0) + sub.cost
    })

    res.json({
      totalMonthly: Math.round(totalMonthly * 100) / 100,
      totalYearly: Math.round(totalYearly * 100) / 100,
      activeSubscriptions: subscriptions.length,
      highestCost: highestCost.name || "N/A",
      highestCostAmount: highestCost.cost || 0,
      categorySpending,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get spending by category
router.get("/spending", async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      userId: req.userId,
      isActive: true,
    })

    const categoryData = {}
    subscriptions.forEach((sub) => {
      if (!categoryData[sub.category]) {
        categoryData[sub.category] = { count: 0, total: 0 }
      }
      categoryData[sub.category].count += 1
      categoryData[sub.category].total += sub.cost
    })

    const data = Object.entries(categoryData).map(([category, data]) => ({
      category,
      ...data,
    }))

    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get monthly trends (last 6 months)
router.get("/trends", async (req, res) => {
  try {
    const payments = await Payment.find({
      userId: req.userId,
      paymentDate: {
        $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
      },
    })

    const trends = {}
    payments.forEach((payment) => {
      const month = new Date(payment.paymentDate).toLocaleString("default", { month: "short", year: "numeric" })
      trends[month] = (trends[month] || 0) + payment.amount
    })

    const data = Object.entries(trends).map(([month, amount]) => ({
      month,
      amount: Math.round(amount * 100) / 100,
    }))

    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
