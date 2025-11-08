import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import NotificationPreference from "../models/NotificationPreference.js"
import { validateEmail } from "../utils/validators.js"
import { sendWelcomeEmail } from "../services/emailService.js"

const router = express.Router()

// Email/Password Registration
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email" })
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" })
    }

    // Check if user exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ error: "User already exists" })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new user
    user = new User({
      email,
      password: hashedPassword,
      name,
      authMethod: "email" // Track authentication method
    })

    await user.save()

    // Create default notification preferences
    await NotificationPreference.create({ userId: user._id })

    // Send welcome email
    try {
      await sendWelcomeEmail({ email, name })
    } catch (emailError) {
      console.log("Welcome email failed:", emailError)
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    )

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        currency: user.currency,
        timezone: user.timezone,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Email/Password Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email" })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: "User not found" })
    }

    // Check if user has password (might be Google OAuth user)
    if (!user.password) {
      return res.status(400).json({ error: "Please use Google OAuth to login" })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" })
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    )

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        currency: user.currency,
        timezone: user.timezone,
        profilePicture: user.profilePicture,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Google OAuth callback
router.post("/google", async (req, res) => {
  try {
    const { googleId, email, name, profilePicture } = req.body

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email" })
    }

    let user = await User.findOne({ email })

    if (!user) {
      user = new User({
        googleId,
        email,
        name,
        profilePicture,
        authMethod: "google"
      })
      await user.save()

      // Create default notification preferences
      await NotificationPreference.create({ userId: user._id })

      // Send welcome email
      try {
        await sendWelcomeEmail({ email, name })
      } catch (emailError) {
        console.log("Welcome email failed:", emailError)
      }
    } else if (!user.googleId) {
      user.googleId = googleId
      user.authMethod = "both" // User can use both methods
      await user.save()
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    )

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        currency: user.currency,
        timezone: user.timezone,
        profilePicture: user.profilePicture,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get current user
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
      return res.status(401).json({ error: "No token provided" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      currency: user.currency,
      timezone: user.timezone,
      profilePicture: user.profilePicture,
      authMethod: user.authMethod
    })
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
})

// Update user profile
router.put("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")

    const { name, currency, timezone } = req.body
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { name, currency, timezone, updatedAt: new Date() },
      { new: true }
    )

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      currency: user.currency,
      timezone: user.timezone,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Logout (client-side token deletion)
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" })
})

export default router