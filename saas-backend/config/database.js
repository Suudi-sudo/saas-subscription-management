import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://abdisalansucdi_db_user:Hayatim12@cluster0.ogkeork.mongodb.net/saas-subscriptions?retryWrites=true&w=majority&appName=Cluster0")
    console.log("✓ MongoDB connected")
  } catch (error) {
    console.error("✗ MongoDB connection error:", error)
    process.exit(1)
  }
}
