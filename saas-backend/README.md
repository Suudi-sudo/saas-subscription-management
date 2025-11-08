# SaaS Subscription Management Backend

A complete Express.js backend for managing subscriptions with MongoDB.

## Features

- ✓ Google OAuth Authentication with JWT
- ✓ Complete Subscription CRUD operations
- ✓ Analytics & Dashboard endpoints
- ✓ Payment tracking system
- ✓ Email notification reminders (7-day, 3-day, 1-day)
- ✓ Automated notification scheduler
- ✓ User preferences management
- ✓ Input validation & error handling
- ✓ CORS enabled for frontend integration



## API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - Logout

### Subscriptions
- `GET /api/subscriptions` - List all subscriptions
- `POST /api/subscriptions` - Create subscription
- `GET /api/subscriptions/:id` - Get single subscription
- `PUT /api/subscriptions/:id` - Update subscription
- `DELETE /api/subscriptions/:id` - Delete subscription
- `GET /api/subscriptions/upcoming/renewals` - Get upcoming renewals

### Analytics
- `GET /api/analytics/overview` - Dashboard overview
- `GET /api/analytics/spending` - Spending by category
- `GET /api/analytics/trends` - Monthly trends

### Payments
- `GET /api/payments` - List payments
- `POST /api/payments` - Log payment
- `GET /api/payments/:id` - Get payment details
- `PUT /api/payments/:id` - Update payment
- `DELETE /api/payments/:id` - Delete payment

### Notifications
- `GET /api/notifications/settings` - Get preferences
- `PUT /api/notifications/settings` - Update preferences
- `POST /api/notifications/test-email` - Send test email

## Database Models

- **User** - User accounts with profile info
- **Subscription** - Subscription details
- **Payment** - Payment history
- **NotificationPreference** - User notification settings




## Features in Detail

### Authentication
- Google OAuth integration
- JWT token-based sessions (7-day expiration)
- Automatic user creation on first login
- Default notification preferences created

### Subscriptions
- Full CRUD operations
- Filtering by status and category
- Sorting by cost, renewal date, name
- Soft delete functionality
- Upcoming renewals endpoint

### Analytics
- Total monthly/yearly spending
- Spending breakdown by category
- Monthly spending trends
- Highest cost subscription tracking

### Notifications
- Automated email reminders (7, 3, 1 day before renewal)
- Customizable notification preferences
- Quiet hours support
- Daily cron job scheduler

## Error Handling

All endpoints include comprehensive error handling:
- Validation errors (400)
- Authentication errors (401)
- Not found errors (404)
- Server errors (500)

## Security Features

- JWT authentication on protected routes
- Input validation on all endpoints
- CORS configuration
- Soft delete for data retention
- User data isolation

## Testing the API

Use Postman or curl to test endpoints:

\`\`\`bash
# Get health check
curl http://localhost:5000/api/health

# Create subscription (requires auth token)
curl -X POST http://localhost:5000/api/subscriptions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Netflix",
    "cost": 15.99,
    "billingCycle": "monthly",
    "nextRenewalDate": "2024-11-30",
    "category": "Entertainment"
  }'
\`\`\`

## Tech Stack

Node.js & Express.js
MongoDB with Mongoose ODM
JWT for authentication
bcryptjs for password hashing
Nodemailer for email service
Google OAuth 2.0
