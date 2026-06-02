# Database Documentation

## Overview
PostgreSQL database hosted at `187.127.140.201:5432`  
Database: `anchorsarmy_db`  
User: `mello_admin`

---

## Connection

### Connection String
```
postgresql://mello_admin:Mello%40dbadmin@187.127.140.201:5432/anchorsarmy_db
```

### Environment Variable
```
DATABASE_URL=postgresql://mello_admin:Mello%40dbadmin@187.127.140.201:5432/anchorsarmy_db
```

---

## Schema Overview

### Tables (5)

1. **registrations** - Bootcamp applicant records
2. **payments** - Razorpay payment tracking
3. **contact_submissions** - Contact form data
4. **admin_logs** - Admin activity audit trail
5. **uploads** - File upload tracking

### Entity Relationship Diagram
```
registrations (1) ──── (M) payments
    ↓
  (1) ──── (M) uploads
    ↓
  (1) ──── (M) admin_logs
```

---

## Table Details

### registrations
**Purpose:** Store bootcamp applicant information

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY, DEFAULT uuid() | Unique identifier |
| registration_id | VARCHAR(20) | UNIQUE | User-facing ID (e.g., REG-001) |
| full_name | VARCHAR(255) | NOT NULL | Applicant name |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Email address |
| phone | VARCHAR(20) | NOT NULL | Contact number |
| city | VARCHAR(100) | NOT NULL | City of residence |
| state | VARCHAR(100) | NULLABLE | State of residence |
| age | INT | NULLABLE | Age of applicant |
| gender | ENUM | NULLABLE | male, female, other, prefer_not_to_say |
| profession | VARCHAR(255) | NULLABLE | Current profession |
| social_instagram | VARCHAR(255) | NULLABLE | Instagram handle |
| social_youtube | VARCHAR(255) | NULLABLE | YouTube channel |
| experience_level | ENUM | NULLABLE | beginner, intermediate, advanced, professional |
| why_join | TEXT | NOT NULL | Application motivation |
| expectations | TEXT | NULLABLE | Expectations from bootcamp |
| profile_photo_url | TEXT | NULLABLE | Profile photo URL |
| status | ENUM | DEFAULT pending | Registration status: pending, approved, rejected, waitlisted |
| created_at | TIMESTAMPTZ(6) | DEFAULT now() | Creation timestamp |
| updated_at | TIMESTAMPTZ(6) | AUTO UPDATE | Last modification timestamp |

**Indexes:**
- status
- created_at
- email
- phone

**Sample Record:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "registrationId": "REG-001",
  "fullName": "Aditya Verma",
  "email": "aditya@example.com",
  "phone": "9876543210",
  "city": "Pune",
  "state": "Maharashtra",
  "age": 28,
  "gender": "male",
  "profession": "Event Host",
  "socialInstagram": "@adityahost",
  "socialYoutube": "@channel",
  "experienceLevel": "intermediate",
  "whyJoin": "Want to level up my anchoring skills and join elite network",
  "expectations": "Learn premium anchoring techniques",
  "status": "pending",
  "createdAt": "2026-06-02T10:30:00Z",
  "updatedAt": "2026-06-02T10:30:00Z"
}
```

---

### payments
**Purpose:** Track Razorpay payment transactions

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Unique payment ID |
| registration_id | UUID | FOREIGN KEY | References registrations.id |
| razorpay_order_id | VARCHAR(100) | UNIQUE, NULLABLE | Razorpay order ID |
| razorpay_payment_id | VARCHAR(100) | UNIQUE, NULLABLE | Razorpay payment ID |
| razorpay_signature | TEXT | NULLABLE | Webhook signature for verification |
| amount | INT | NOT NULL | Amount in paise (e.g., 6900000 = ₹69,000) |
| currency | VARCHAR(3) | DEFAULT INR | Currency code |
| payment_status | ENUM | DEFAULT pending | pending, captured, failed, refunded |
| payment_date | TIMESTAMPTZ(6) | NULLABLE | When payment completed |
| created_at | TIMESTAMPTZ(6) | DEFAULT now() | Record creation time |

**Indexes:**
- registration_id
- payment_status
- razorpay_order_id

**Sample Record:**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "registrationId": "550e8400-e29b-41d4-a716-446655440000",
  "razorpayOrderId": "order_1234567890",
  "razorpayPaymentId": "pay_1234567890",
  "razorpaySignature": "xyz123...",
  "amount": 6900000,
  "currency": "INR",
  "paymentStatus": "captured",
  "paymentDate": "2026-06-02T11:00:00Z",
  "createdAt": "2026-06-02T10:30:00Z"
}
```

---

### contact_submissions
**Purpose:** Store general contact form submissions

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Unique submission ID |
| name | VARCHAR(255) | NOT NULL | Sender name |
| email | VARCHAR(255) | NOT NULL | Sender email |
| phone | VARCHAR(20) | NULLABLE | Sender phone |
| subject | VARCHAR(255) | NULLABLE | Message subject |
| message | TEXT | NOT NULL | Message content |
| created_at | TIMESTAMPTZ(6) | DEFAULT now() | Submission time |

**Indexes:**
- email
- created_at

---

### admin_logs
**Purpose:** Audit trail of admin actions

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Unique log ID |
| admin_action | VARCHAR(255) | NOT NULL | Action description |
| target_registration_id | UUID | NULLABLE, FOREIGN KEY | Related registration |
| notes | TEXT | NULLABLE | Additional details |
| created_at | TIMESTAMPTZ(6) | DEFAULT now() | Action timestamp |

**Indexes:**
- target_registration_id
- created_at

**Sample Actions:**
- "Approved registration REG-001"
- "Changed status from pending to approved"
- "Marked as waitlisted"
- "Sent rejection email"

---

### uploads
**Purpose:** Track file uploads for registrations

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Unique upload ID |
| registration_id | UUID | FOREIGN KEY | References registrations.id |
| file_type | VARCHAR(50) | NOT NULL | Type (e.g., "resume", "portfolio") |
| file_url | TEXT | NOT NULL | URL to uploaded file |
| uploaded_at | TIMESTAMPTZ(6) | DEFAULT now() | Upload timestamp |

**Indexes:**
- registration_id

---

## Migrations

### 0001_init (Initial Schema)
Location: `prisma/migrations/0001_init/migration.sql`

Creates all 5 tables with:
- Primary keys
- Foreign key constraints
- Enums
- Indexes
- Timestamps

---

## Prisma ORM

### Schema File
`prisma/schema.prisma`

### Generate Client
```bash
npm run db:generate
```

### Push Schema Changes
```bash
npm run db:push
```

### Create Migration
```bash
npm run db:migrate
```

### Open GUI
```bash
npm run db:studio
```
Access at: http://localhost:5555

---

## Common Queries

### Find Registration by Email
```typescript
const reg = await prisma.registration.findUnique({
  where: { email: "user@example.com" }
});
```

### Get Registrations with Payments
```typescript
const regs = await prisma.registration.findMany({
  include: {
    payments: true,
    uploads: true
  }
});
```

### Count by Status
```typescript
const counts = await prisma.registration.groupBy({
  by: ['status'],
  _count: true
});
```

### Find Pending Payments
```typescript
const pending = await prisma.payment.findMany({
  where: { paymentStatus: 'pending' }
});
```

### Update Registration Status
```typescript
await prisma.registration.update({
  where: { id: registrationId },
  data: { status: 'approved' }
});
```

---

## Backup & Recovery

### Export Data
```bash
pg_dump -h 187.127.140.201 -U mello_admin anchorsarmy_db > backup.sql
```

### Restore Data
```bash
psql -h 187.127.140.201 -U mello_admin anchorsarmy_db < backup.sql
```

---

## Performance Considerations

### Indexed Columns
All frequently queried columns are indexed:
- `status` (filter registrations)
- `email` (unique lookups)
- `phone` (lookups)
- `created_at` (sort/range queries)

### Connection Pooling
Configure in production `.env`:
```
DATABASE_URL="postgresql://user:pass@host:5432/db?max_pool_size=20"
```

### Query Optimization
- Use `select` to limit returned fields
- Use indexes for WHERE clauses
- Batch operations when possible

---

## Maintenance

### Weekly
- Monitor connection count
- Check disk space
- Backup important data

### Monthly
- Analyze query performance
- Update statistics
- Review slow query logs

---

## Security

- Database user has limited permissions
- Connection requires strong password
- `.env.local` with credentials is Git-ignored
- All queries use parameterized statements (Prisma)
- Never expose database credentials in code

---

## Scaling Notes

For high traffic (1000+ registrations):
- Use read replicas
- Implement caching layer (Redis)
- Archive old records
- Optimize slow queries
- Consider horizontal partitioning
