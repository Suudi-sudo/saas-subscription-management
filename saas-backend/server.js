import dotenv from "dotenv"
dotenv.config() // ← MUST BE FIRST!

import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js"
import subscriptionRoutes from "./routes/subscriptions.js"
import analyticsRoutes from "./routes/analytics.js"
import paymentRoutes from "./routes/payments.js"
import notificationRoutes from "./routes/notifications.js"
import { errorHandler } from "./middleware/errorHandler.js"
import { authMiddleware } from "./middleware/auth.js"
import { startNotificationScheduler } from "./services/notificationScheduler.js"

const app = express()

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ limit: "10mb", extended: true }))

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✓ MongoDB connected"))
  .catch((err) => {
    console.error("✗ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/subscriptions", authMiddleware, subscriptionRoutes)
app.use("/api/analytics", authMiddleware, analyticsRoutes)
app.use("/api/payments", authMiddleware, paymentRoutes)
app.use("/api/notifications", authMiddleware, notificationRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// Error handling
app.use(errorHandler)

// Start notification scheduler
startNotificationScheduler()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`)
})