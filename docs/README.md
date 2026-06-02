# Documentation Index

**The 69 Anchors Army** - Premium Wedding Anchor Bootcamp Registration Platform

Last Updated: June 2, 2026

---

## Quick Navigation

### 📋 **[SUMMARY.md](./SUMMARY.md)** - Complete Project Overview
Comprehensive project summary covering:
- Project overview & positioning
- Technology stack (Next.js, React, TypeScript, Tailwind, GSAP)
- Project structure & file organization
- Database schema & models
- Content structure & pages
- Development status
- 34 components across layouts, logos, sections, UI

**Start here for:** Complete project understanding, architecture, statistics

---

### 🚀 **[QUICKSTART.md](./QUICKSTART.md)** - Get Up & Running
Step-by-step setup and development guide:
- Environment setup (Node.js, PostgreSQL)
- Installation & configuration
- Database setup commands
- Running development server
- Key files to edit
- Common tasks & troubleshooting

**Start here for:** Setting up development environment, running project locally

---

### 🔌 **[API.md](./API.md)** - API Endpoints & Integration
Complete API documentation:
- POST /api/apply (application submission)
- Request/response formats
- Error handling
- Razorpay integration
- Authentication (planned)
- Testing examples

**Start here for:** Building integrations, understanding request/response formats

---

### 💾 **[DATABASE.md](./DATABASE.md)** - Data Model & Schema
Complete database documentation:
- Connection details (PostgreSQL)
- 5 tables: registrations, payments, contact_submissions, admin_logs, uploads
- Field definitions & types
- Relationships & indexes
- Prisma ORM reference
- Common queries
- Backup/recovery procedures

**Start here for:** Understanding data model, writing database queries, schema modifications

---

### 🧩 **[COMPONENTS.md](./COMPONENTS.md)** - UI Component Reference
Complete component library documentation:
- 34 React components (layouts, logos, sections, UI)
- Component props & usage examples
- Hierarchy & composition patterns
- Styling (Tailwind CSS v4)
- Animations (GSAP, Framer Motion)
- Best practices
- Adding new components

**Start here for:** Building UI, reusing components, understanding component API

---

## Project Structure

```
docs/
├── README.md          (This file - navigation index)
├── SUMMARY.md         (Full project overview)
├── QUICKSTART.md      (Setup & development)
├── API.md             (API endpoints)
├── DATABASE.md        (Data models & schema)
└── COMPONENTS.md      (UI component reference)
```

---

## By Role

### 👨‍💻 **Developer**
1. Start with [QUICKSTART.md](./QUICKSTART.md) to set up locally
2. Read [COMPONENTS.md](./COMPONENTS.md) to understand available UI components
3. Reference [API.md](./API.md) when building features
4. Check [DATABASE.md](./DATABASE.md) for data operations
5. Review [SUMMARY.md](./SUMMARY.md) for overall architecture

### 🏗️ **Architect**
1. Read [SUMMARY.md](./SUMMARY.md) for complete overview
2. Study [DATABASE.md](./DATABASE.md) for data model decisions
3. Review [COMPONENTS.md](./COMPONENTS.md) for component structure
4. Check [API.md](./API.md) for integration points

### 🎨 **Designer**
1. Check [SUMMARY.md](./SUMMARY.md) Brand & Visual Identity section
2. Review component usage in [COMPONENTS.md](./COMPONENTS.md)
3. Understand page structures in [SUMMARY.md](./SUMMARY.md) Pages section

### 🔧 **DevOps**
1. Review environment setup in [QUICKSTART.md](./QUICKSTART.md)
2. Database details in [DATABASE.md](./DATABASE.md)
3. Deployment notes in [SUMMARY.md](./SUMMARY.md)

---

## Key Information at a Glance

### Stack
- **Frontend:** Next.js 16.2.7, React 19.2.4, TypeScript, Tailwind CSS v4
- **Backend:** Node.js with Next.js API routes
- **Database:** PostgreSQL (187.127.140.201:5432)
- **Animations:** GSAP, Framer Motion
- **ORM:** Prisma ^5.22.0

### Project Details
- **Name:** The 69 Anchors Army
- **Seats:** 69 (strictly limited)
- **Investment:** ₹69,000
- **Bootcamp Dates:** 8th & 9th August
- **Status:** Development (Dev server running on localhost:3000)

### Files & Components
- **34** TypeScript/TSX files
- **24** React components (layouts, logos, sections, UI)
- **3** Pages (home, register, thank-you)
- **1** API endpoint (/api/apply)
- **5** Database tables
- **3** Prisma migrations/schema files

### Database
- **Tables:** registrations, payments, contact_submissions, admin_logs, uploads
- **Connection:** postgresql://user:pass@187.127.140.201:5432/anchorsarmy_db
- **Seats Claimed:** 57/69
- **Seats Available:** 12/69

---

## Quick Commands

```bash
# Setup & Install
npm install

# Development
npm run dev                    # Start dev server (localhost:3000)
npm run build                  # Production build
npm run lint                   # Run ESLint

# Database
npm run db:push               # Push schema changes
npm run db:generate           # Regenerate Prisma client
npm run db:studio             # Open database GUI (localhost:5555)
npm run db:migrate            # Create migration
npm run db:seed               # Run seed script
```

---

## Common Tasks

### Adding a New Page
1. Create file: `src/app/[name]/page.tsx`
2. Export default React component
3. Auto-routed to `/[name]`

### Adding a New Component
1. Create file: `src/components/[category]/[Name].tsx`
2. Define TypeScript Props interface
3. Import & use in pages/sections
4. Document in [COMPONENTS.md](./COMPONENTS.md)

### Adding an API Endpoint
1. Create file: `src/app/api/[endpoint]/route.ts`
2. Export POST, GET, etc. functions
3. Use Prisma for database operations
4. Document in [API.md](./API.md)

### Modifying Database Schema
1. Edit `prisma/schema.prisma`
2. Run `npm run db:push`
3. Prisma client auto-regenerates
4. Update [DATABASE.md](./DATABASE.md)

### Updating Content & Copy
1. Edit `src/lib/content.ts`
2. Use constants throughout components
3. Dev server hot-reloads automatically

---

## Important Notes

### Security
- Database credentials in `.env.local` (Git-ignored)
- Never commit `.env.local` or sensitive keys
- All inputs validated server-side
- Razorpay signatures verified

### Brand Guidelines
- Strict 69-seat limit (core identity)
- Premium positioning (not generic workshop)
- Luxury aesthetic (Apple/Masterclass inspired)
- Black, gold, deep purple color palette

### Performance
- Turbopack bundler for fast builds
- Image optimization (Next.js native)
- Code splitting (automatic)
- GSAP animations optimized

---

## Getting Help

- Check relevant doc section above
- Review [QUICKSTART.md](./QUICKSTART.md) for setup issues
- Look in [COMPONENTS.md](./COMPONENTS.md) for component usage
- Check [API.md](./API.md) for integration questions
- Review [DATABASE.md](./DATABASE.md) for data operations

---

## Document Updates

- **Created:** June 2, 2026
- **Dev Server:** Running on localhost:3000
- **Database:** Connected to 187.127.140.201:5432
- **Status:** Ready for development

---

**Navigation Tips:**
- Click links above to jump to specific documentation
- Each doc is self-contained and can be read independently
- Use browser search (Cmd+F / Ctrl+F) to find topics
- Return here for quick reference

**Happy Building! 🚀**
