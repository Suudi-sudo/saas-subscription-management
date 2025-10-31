import cron from "node-cron"
import Subscription from "../models/Subscription.js"
import NotificationPreference from "../models/NotificationPreference.js"
import { sendReminderEmail } from "./emailService.js"

export const startNotificationScheduler = () => {
  // Run every day at 9 AM
  cron.schedule("0 9 * * *", async () => {
    console.log("Running notification scheduler...")
    await checkAndSendReminders()
  })
}

const checkAndSendReminders = async () => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Check for 7-day reminders
    const sevenDaysFromNow = new Date(today)
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)
    sevenDaysFromNow.setHours(23, 59, 59, 999)

    const sevenDaySubscriptions = await Subscription.find({
      nextRenewalDate: {
        $gte: new Date(today),
        $lte: sevenDaysFromNow,
      },
      isActive: true,
    }).populate("userId")

    for (const subscription of sevenDaySubscriptions) {
      const preferences = await NotificationPreference.findOne({
        userId: subscription.userId._id,
      })

      if (preferences?.emailEnabled && preferences?.notify7Days) {
        await sendReminderEmail(subscription, 7)
      }
    }

    // Check for 3-day reminders
    const threeDaysFromNow = new Date(today)
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)
    threeDaysFromNow.setHours(23, 59, 59, 999)

    const threeDaySubscriptions = await Subscription.find({
      nextRenewalDate: {
        $gte: new Date(today),
        $lte: threeDaysFromNow,
      },
      isActive: true,
    }).populate("userId")

    for (const subscription of threeDaySubscriptions) {
      const preferences = await NotificationPreference.findOne({
        userId: subscription.userId._id,
      })

      if (preferences?.emailEnabled && preferences?.notify3Days) {
        await sendReminderEmail(subscription, 3)
      }
    }

    // Check for 1-day reminders
    const oneDayFromNow = new Date(today)
    oneDayFromNow.setDate(oneDayFromNow.getDate() + 1)
    oneDayFromNow.setHours(23, 59, 59, 999)

    const oneDaySubscriptions = await Subscription.find({
      nextRenewalDate: {
        $gte: new Date(today),
        $lte: oneDayFromNow,
      },
      isActive: true,
    }).populate("userId")

    for (const subscription of oneDaySubscriptions) {
      const preferences = await NotificationPreference.findOne({
        userId: subscription.userId._id,
      })

      if (preferences?.emailEnabled && preferences?.notify1Day) {
        await sendReminderEmail(subscription, 1)
      }
    }

    console.log("✓ Notification scheduler completed")
  } catch (error) {
    console.error("✗ Error in notification scheduler:", error)
  }
}
