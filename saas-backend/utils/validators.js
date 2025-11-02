export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateSubscription = (data) => {
  const { name, cost, billingCycle, nextRenewalDate } = data

  if (!name || name.length === 0 || name.length > 100) {
    return { valid: false, error: "Name must be between 1 and 100 characters" }
  }

  if (!cost || cost <= 0) {
    return { valid: false, error: "Cost must be a positive number" }
  }

  if (!billingCycle || !["weekly", "monthly", "quarterly", "yearly"].includes(billingCycle)) {
    return { valid: false, error: "Invalid billing cycle" }
  }

  if (!nextRenewalDate) {
    return { valid: false, error: "Next renewal date is required" }
  }

  const renewalDate = new Date(nextRenewalDate)
  if (renewalDate < new Date()) {
    return { valid: false, error: "Next renewal date must be in the future" }
  }

  return { valid: true }
}
