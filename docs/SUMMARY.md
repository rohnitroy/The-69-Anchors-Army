# 69 Anchors Army - Project Summary

**Last Updated:** June 2, 2026  
**Status:** Development (Dev Server Running)  
**Repository:** The-69-Anchors-Army

---

## Project Overview

**The 69 Anchors Army** is a premium luxury event registration website designed to convert visitors into applicants for an exclusive wedding anchor bootcamp. It's powered by **Bol BB Bol** and positions itself as an elite, invitation-only community rather than a typical event or workshop.

### Key Positioning
- **Not:** An event, workshop, or generic training program
- **Is:** An elite, invitation-only community of exactly 69 premium professionals
- **Target:** Wedding anchors, event hosts, MCs, public speakers, premium stage performers

### Core Statistics
- **Investment:** ₹69,000 per seat
- **Total Seats:** 69 (strictly limited)
- **Seats Claimed:** 57
- **Seats Available:** 12
- **Dates:** 8th & 9th August (Batch 1)
- **Venue:** Luxury property ~130km from Pune Airport
- **Tagline:** "baat karne se baat banti hai" (conversations create connections)

---

## Brand & Visual Identity

### Brand Attributes
- Luxury
- Premium
- Elite
- Exclusive
- Transformational
- Cinematic

### Visual References
- **Apple** (minimalist elegance)
- **Masterclass** (premium positioning)
- **Luxury wedding brands** (high-end aesthetics)
- **Color Palette:** Black and gold with deep purple accents

### Logo Assets
1. Microphone symbol logo
2. Horizontal Bol BB Bol logo
3. 69 Anchors Army premium logo

### Design Principles (What to Avoid)
- Generic templates
- Corporate styling
- Bootstrap appearance
- Cheap gradients
- Eventbrite look

**Goal:** Create a website that looks like a ₹5 lakh custom luxury website

---

## Technology Stack

### Frontend Framework
- **Next.js:** 16.2.7 (with Turbopack)
- **React:** 19.2.4
- **TypeScript:** ^5.x
- **Tailwind CSS:** v4 with @tailwindcss/postcss
- **Language:** TypeScript (full type safety)

### Animation & Motion
- **Framer Motion:** ^12.40.0 (component animations)
- **GSAP:** ^3.15.0 (advanced animations, reveals, parallax effects)

### Database
- **ORM:** Prisma ^5.22.0
- **Database:** PostgreSQL (hosted at 187.127.140.201:5432)
- **Database Name:** anchorsarmy_db
- **Database User:** mello_admin

### Additional Tech
- **Payment:** Razorpay integration (planned)
- **Email:** Resend (planned)
- **Backend:** Node.js with Next.js API routes

### Development Tools
- **Package Manager:** npm
- **Linting:** ESLint ^9
- **Build:** Turbopack (default Next.js 16 bundler)
- **Development Server:** Next.js dev mode (Turbopack)

---

## Project Structure

```
The-69-Anchors-Army/
├── src/
│   ├── app/
│   │   ├── layout.tsx              (Root layout wrapper)
│   │   ├── page.tsx                (Homepage / landing page)
│   │   ├── register/
│   │   │   └── page.tsx            (Registration form page)
│   │   ├── thank-you/
│   │   │   └── page.tsx            (Thank you / success page)
│   │   └── api/
│   │       └── apply/
│   │           └── route.ts        (Application submission API)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          (Navigation header)
│   │   │   └── Footer.tsx          (Footer section)
│   │   │
│   │   ├── logos/
│   │   │   ├── AnchorsArmyLogo.tsx (69 Anchors Army logo)
│   │   │   ├── BolBBBolLogo.tsx    (Bol BB Bol brand logo)
│   │   │   └── MicSymbol.tsx       (Microphone symbol icon)
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx          (Landing hero with CTA)
│   │   │   ├── PositioningSection.tsx   (Unique positioning statement)
│   │   │   ├── MentorSection.tsx        (Who is BB - mentor bio)
│   │   │   ├── ProgramSection.tsx       (7-module curriculum)
│   │   │   ├── DeliverablesSection.tsx  (What you get)
│   │   │   ├── InclusionsSection.tsx    (Package inclusions)
│   │   │   ├── InvestmentSection.tsx    (Pricing & investment)
│   │   │   ├── PromoSection.tsx         (Promotional content)
│   │   │   └── RegistrationSection.tsx  (Call-to-action register)
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx           (Reusable button component)
│   │       ├── DeliverableCard.tsx  (Card for deliverables)
│   │       ├── GoldDivider.tsx      (Gold separator / divider)
│   │       ├── InclusionItem.tsx    (Inclusion list item)
│   │       ├── Loader.tsx           (Loading state)
│   │       ├── Marquee.tsx          (Scrolling marquee text)
│   │       ├── ModuleCard.tsx       (Program module card)
│   │       ├── SectionReveal.tsx    (GSAP reveal animation)
│   │       ├── SpotProgress.tsx     (Progress indicator)
│   │       └── StatCounter.tsx      (Animated number counter)
│   │
│   └── lib/
│       ├── content.ts       (Content constants: BRAND, HERO, MENTOR, PROGRAM, etc.)
│       └── db.ts            (Database utilities / Prisma client setup)
│
├── prisma/
│   ├── schema.prisma        (Database schema definition)
│   ├── seed.ts              (Database seeding script)
│   └── migrations/
│       └── 0001_init/
│           └── migration.sql (Initial migration)
│
├── public/                   (Static assets: images, fonts, etc.)
│
├── scripts/                  (Build/utility scripts)
│
├── docs/                     (NEW: Documentation folder)
│   └── SUMMARY.md           (This file)
│
├── package.json             (Dependencies & scripts)
├── tsconfig.json            (TypeScript configuration)
├── next.config.ts           (Next.js configuration)
├── .env.local               (Local environment variables - DO NOT COMMIT)
├── .gitignore               (Git ignore rules)
├── README.md                (Standard Next.js README)
├── CLAUDE.md                (Project briefing for AI)
├── AGENTS.md                (Next.js agent rules)
└── .git/                    (Git repository)
```

---

## Database Schema

### Models & Relationships

#### 1. **Registration**
Core user registration model for bootcamp applicants.

**Fields:**
- `id` (UUID) - Primary key
- `registrationId` - Unique user-facing ID
- `fullName`, `email` (unique), `phone`
- `city`, `state`, `age`, `gender`
- `profession`, `experienceLevel`
- `socialInstagram`, `socialYoutube` - Social media handles
- `whyJoin`, `expectations` - Text fields for applications
- `profilePhotoUrl` - Avatar/profile photo
- `status` - RegistrationStatus enum (pending|approved|rejected|waitlisted)
- `createdAt`, `updatedAt` - Timestamps

**Relationships:**
- `payments[]` - Multiple Payment records
- `uploads[]` - Multiple file uploads
- `adminLogs[]` - Admin activity logs

**Indexes:** status, createdAt, email, phone

---

#### 2. **Payment**
Razorpay payment tracking for registrations.

**Fields:**
- `id` (UUID) - Primary key
- `registrationId` - Foreign key to Registration
- `razorpayOrderId`, `razorpayPaymentId`, `razorpaySignature`
- `amount`, `currency` (default: INR)
- `paymentStatus` - PaymentStatus enum (pending|captured|failed|refunded)
- `paymentDate` - When payment was completed
- `createdAt` - Record creation timestamp

**Indexes:** registrationId, paymentStatus, razorpayOrderId

---

#### 3. **ContactSubmission**
Generic contact form submissions (separate from applications).

**Fields:**
- `id` (UUID)
- `name`, `email` (indexed), `phone`, `subject`
- `message`
- `createdAt`

---

#### 4. **AdminLog**
Activity audit trail for admin actions.

**Fields:**
- `id` (UUID)
- `adminAction` - Description of action
- `targetRegistrationId` - Optional reference to affected registration
- `notes` - Additional details
- `createdAt`

**Relationship:** Optional relation to Registration (onDelete: SetNull)

---

#### 5. **Upload**
File upload tracking for registration attachments.

**Fields:**
- `id` (UUID)
- `registrationId` - Foreign key to Registration
- `fileType` - Type of file (e.g., "resume", "portfolio")
- `fileUrl` - URL to uploaded file (Supabase or similar)
- `uploadedAt`

---

### Enums

```typescript
RegistrationStatus: pending | approved | rejected | waitlisted
PaymentStatus: pending | captured | failed | refunded
ExperienceLevel: beginner | intermediate | advanced | professional
Gender: male | female | other | prefer_not_to_say
```

---

## Content Structure

All copy, messaging, and content constants are centralized in `src/lib/content.ts`:

### Sections
1. **BRAND** - Company identity (name, tagline, batch info, investment, seat counts)
2. **HERO** - Landing page headline, quote, CTA buttons
3. **POSITIONING** - Unique value proposition, statistics (69 seats, ₹69k, 2 days)
4. **MENTOR** - "Who is BB?" section with bio and stats (500+ events, 40+ cities, 12+ years)
5. **PROGRAM** - 7-module curriculum outline
   - Module 01: Voice Craft & Career Architecture
   - Module 02: Visual Transformation
   - Module 03: The Pajama Circle (networking)
   - Module 04: The Digital Edge (social media)
   - Module 05: The Wedding Playbook (scripts & protocols)
   - Module 06: Referral Network Induction
   - Module 07: The Personal Audit
6. **DELIVERABLES** - Premium offerings and exclusive materials
7. **INCLUSIONS** - What's included in the bootcamp
8. **INVESTMENT** - Pricing breakdown and payment terms

---

## API Endpoints

### Routes Defined

#### 1. **POST /api/apply**
Application submission endpoint.
- Accepts registration form data
- Creates Registration and Payment records
- Initiates Razorpay payment flow
- Returns order details for client-side payment handling

**Location:** `src/app/api/apply/route.ts`

---

## Pages

### Public Pages

1. **`/` (Homepage)**
   - Landing page with all promotional sections
   - Full-page scrolling experience
   - CTA: "Request Admission"
   - Animated hero, parallax effects, GSAP reveals
   - File: `src/app/page.tsx`

2. **`/register`**
   - Registration form for applicants
   - Collects all required information
   - Payment integration
   - File: `src/app/register/page.tsx`

3. **`/thank-you`**
   - Success confirmation page
   - Displayed after successful application
   - File: `src/app/thank-you/page.tsx`

---

## Animation Strategy

### Frameworks & Techniques

**GSAP (GreenSock Animation Platform)**
- Smooth section reveals (SectionReveal component)
- Parallax scrolling effects
- Text reveal animations
- Premium transition effects
- Microphone logo loading animation

**Framer Motion**
- Component-level animations
- Page transitions
- Interactive hover states
- Smooth micro-interactions

**CSS Animations** (via Tailwind v4)
- Fade-ins
- Scale transforms
- Opacity changes

### Key Animated Components
- `SectionReveal.tsx` - GSAP-powered section reveal on scroll
- `StatCounter.tsx` - Animated number counters
- `Marquee.tsx` - Scrolling text carousel
- Logo animations on page load
- Smooth scroll behavior across all sections

---

## Dependencies Summary

### Core Dependencies (17)
- `@prisma/client` ^5.22.0
- `framer-motion` ^12.40.0
- `gsap` ^3.15.0
- `next` 16.2.7
- `prisma` ^5.22.0
- `react` 19.2.4
- `react-dom` 19.2.4

### Dev Dependencies (8)
- `@tailwindcss/postcss` ^4
- `@types/node` ^20
- `@types/react` ^19
- `@types/react-dom` ^19
- `eslint` ^9
- `eslint-config-next` 16.2.7
- `pg` ^8.21.0
- `tailwindcss` ^4
- `typescript` ^5

**Total:** 386 packages (including dependencies of dependencies)

---

## Environment Variables

**Location:** `.env.local` (Git-ignored, not committed)

### Database Configuration
```
DATABASE_URL=postgresql://mello_admin:Mello%40dbadmin@187.127.140.201:5432/anchorsarmy_db
DB_HOST=187.127.140.201
DB_PORT=5432
DB_DATABASE=anchorsarmy_db
DB_USER=mello_admin
DB_PASSWORD=Mello@dbadmin
```

### Additional Variables (To Be Configured)
- `RAZORPAY_KEY_ID` - Razorpay public key
- `RAZORPAY_KEY_SECRET` - Razorpay secret key
- `RESEND_API_KEY` - Email service API
- `SUPABASE_URL` - File storage (if used)
- `SUPABASE_ANON_KEY` - Storage authentication

---

## Scripts & Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:migrate   # Run Prisma migrations
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio GUI
npm run db:seed      # Run database seed script
npm run db:push      # Push schema changes to DB
```

---

## Development Server Status

- **Status:** ✅ Running
- **Port:** 3000
- **URL:** http://localhost:3000
- **Engine:** Next.js 16.2.7 with Turbopack
- **Ready Time:** 260ms
- **Mode:** Development (Hot Module Replacement enabled)

---

## File Statistics

- **Total TypeScript/TSX Files:** 34
- **Components:** 24 (layouts, logos, sections, UI)
- **Pages:** 3 (home, register, thank-you)
- **API Routes:** 1 (/apply)
- **Library Files:** 2 (content, db)
- **Database Files:** 3 (schema, seed, migrations)

---

## Next Steps / Tasks

### Immediate (Development)
- [ ] Test registration form validation
- [ ] Implement Razorpay payment integration
- [ ] Set up email notifications (Resend)
- [ ] Configure Supabase for file uploads
- [ ] Test form submission flow end-to-end

### Configuration
- [ ] Add missing environment variables
- [ ] Set up API keys for external services
- [ ] Configure Prisma migrations for production
- [ ] Set up admin dashboard (future)

### Optimization
- [ ] Image optimization for hero section
- [ ] Performance audits (Lighthouse)
- [ ] SEO meta tags and structured data
- [ ] Mobile responsiveness testing
- [ ] Animation performance tuning

### Deployment
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Configure production database
- [ ] Set up error monitoring (Sentry)
- [ ] Configure analytics
- [ ] Deploy to Vercel (recommended for Next.js)

---

## Design Reference

### Inspiration
- **Apple** - Minimalist, luxury, white space
- **Masterclass** - Premium positioning, cinematic visuals
- **Luxury Wedding Brands** - Elegant, high-end aesthetics

### Color Palette
- **Primary:** Black
- **Accent:** Gold
- **Secondary:** Deep purple
- **Background:** Dark/black with gold accents

### Typography
- Modern, clean sans-serif
- Clear hierarchy
- Generous spacing

---

## Important Notes

### Security
- Database credentials stored in `.env.local` (NOT committed to Git)
- `.gitignore` contains `.env*` to prevent credential leaks
- Razorpay signatures verified server-side
- All sensitive API keys should be environment variables

### Database
- PostgreSQL hosted on remote server
- Connection: 187.127.140.201:5432
- User: mello_admin (password in .env.local)
- Database: anchorsarmy_db
- Migrations tracked in `prisma/migrations/`

### Brand Guidelines
- Strict 69-seat limit (core to brand identity)
- Premium positioning (not generic workshop)
- Luxury aesthetic (Apple/Masterclass inspiration)
- Avoid: templates, corporate look, cheap gradients

---

## Contact & Support

**Project Lead:** Bol BB Bol / Anchor BB  
**Bootcamp Dates:** 8th & 9th August  
**Investment:** ₹69,000 per seat  
**Seats Available:** 12 / 69  
**Venue:** Luxury property near Pune

---

## Document Updates

- **Created:** June 2, 2026
- **Dev Server Started:** June 2, 2026 (16:38 IST)
- **Latest Status:** Development in progress

---

**Generated with project analysis from source code, package configuration, database schema, and content constants.**
