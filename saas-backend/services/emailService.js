import nodemailer from "nodemailer"

// Create transporter lazily (only when needed)
let transporter = null

const getTransporter = () => {
  if (!transporter) {
    // DEBUG: Check if env variables are loaded
    console.log('=== EMAIL CONFIG DEBUG ===')
    console.log('EMAIL_USER:', process.env.EMAIL_USER)
    console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***EXISTS***' : 'MISSING')
    console.log('========================')

    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  }
  return transporter
}

export const sendReminderEmail = async (subscription, daysUntilRenewal) => {
  try {
    const user = subscription.userId
    const renewalDate = new Date(subscription.nextRenewalDate).toLocaleDateString()

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Reminder: ${subscription.name} renews in ${daysUntilRenewal} day${daysUntilRenewal > 1 ? "s" : ""}`,
      html: `
        <h2>Subscription Renewal Reminder</h2>
        <p>Hi ${user.name},</p>
        <p>Your subscription <strong>${subscription.name}</strong> will renew in <strong>${daysUntilRenewal} day${daysUntilRenewal > 1 ? "s" : ""}</strong>.</p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>Subscription: ${subscription.name}</li>
          <li>Cost: ${subscription.cost} ${user.currency}</li>
          <li>Renewal Date: ${renewalDate}</li>
          <li>Billing Cycle: ${subscription.billingCycle}</li>
          ${subscription.paymentMethod ? `<li>Payment Method: ${subscription.paymentMethod}</li>` : ""}
        </ul>
        <p>Log in to your account to manage your subscriptions.</p>
        <p>Best regards,<br>Subscription Manager Team</p>
      `,
    }

    await getTransporter().sendMail(mailOptions)
    console.log(`✓ Reminder email sent to ${user.email} for ${subscription.name}`)
  } catch (error) {
    console.error("✗ Error sending reminder email:", error)
    throw error
  }
}

export const sendWelcomeEmail = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Welcome to Subscription Manager!",
      html: `
        <h2>Welcome, ${user.name}!</h2>
        <p>Thank you for signing up for Subscription Manager.</p>
        <p>Start tracking your subscriptions today and never miss a renewal!</p>
        <p>Best regards,<br>Subscription Manager Team</p>
      `,
    }

    await getTransporter().sendMail(mailOptions)
    console.log(`✓ Welcome email sent to ${user.email}`)
  } catch (error) {
    console.error("✗ Error sending welcome email:", error)
    throw error
  }
}