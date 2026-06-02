# API Documentation

## Overview
Next.js API routes handle registration, payments, and data management.

---

## POST /api/apply
Application submission endpoint. Accepts registration data, creates database records, and initiates payment.

### Request Body
```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "city": "string",
  "state": "string",
  "age": "number",
  "gender": "male | female | other | prefer_not_to_say",
  "profession": "string",
  "experienceLevel": "beginner | intermediate | advanced | professional",
  "socialInstagram": "string (optional)",
  "socialYoutube": "string (optional)",
  "whyJoin": "string",
  "expectations": "string (optional)"
}
```

### Response (Success - 200)
```json
{
  "success": true,
  "registrationId": "REG-001",
  "razorpayOrderId": "order_1234567890",
  "amount": 6900000,
  "currency": "INR"
}
```

### Response (Error - 400/500)
```json
{
  "success": false,
  "error": "Error message describing the issue"
}
```

### Flow
1. Validate input data
2. Create Registration record (status: pending)
3. Create Payment record (status: pending)
4. Initialize Razorpay order
5. Return order details to client
6. Client handles payment UI
7. Webhook confirms payment completion

### Database Changes
- Creates row in `registrations` table
- Creates row in `payments` table
- Generates unique `registrationId`

---

## Planned Endpoints

### POST /api/payment/verify
Webhook to verify Razorpay payment after client submission.

**Triggers:**
- Razorpay payment successful
- Update Payment record status to `captured`
- Update Registration status based on approval logic

---

### POST /api/contact
Contact form submission (separate from registration).

**Fields:**
- name, email, phone, subject, message

**Creates:** ContactSubmission record

---

### GET /api/admin/registrations
Admin endpoint to fetch all registrations (requires auth).

**Query Parameters:**
- `status` - Filter by registration status
- `page` - Pagination
- `limit` - Records per page

---

## Authentication
Currently: No auth implemented  
Planned: Admin dashboard with token-based auth

---

## Error Handling

### Validation Errors (400)
- Missing required fields
- Invalid email format
- Invalid phone number

### Database Errors (500)
- Connection failed
- Duplicate email
- Query execution failed

### Payment Errors (402)
- Razorpay API unreachable
- Invalid payment amount
- Order creation failed

---

## Rate Limiting
Not implemented yet. Recommended for production:
- Limit registrations per IP
- Limit API calls per minute

---

## Environment Variables Required

For API functionality:
```
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Optional:
```
RESEND_API_KEY=        # Email notifications
WEBHOOK_SECRET=        # Webhook verification
```

---

## Testing

### Test Registration
```bash
curl -X POST http://localhost:3000/api/apply \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "9999999999",
    "city": "Pune",
    "whyJoin": "Interested in anchoring"
  }'
```

---

## Security Considerations

- All inputs validated server-side
- SQL injection prevented by Prisma ORM
- Razorpay signatures verified
- Environment variables secured in `.env.local`
- Sensitive data (passwords, API keys) never exposed to client

---

## Future Enhancements

- [ ] Authentication & authorization
- [ ] Rate limiting
- [ ] Request logging
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Admin dashboard API
- [ ] Analytics tracking
- [ ] Payment webhook handling
- [ ] File upload API
- [ ] Document generation
