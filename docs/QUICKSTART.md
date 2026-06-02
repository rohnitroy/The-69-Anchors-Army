# Quick Start Guide

## Environment Setup

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database access (credentials in `.env.local`)
- Git configured with GitHub PAT

### Clone & Install
```bash
git clone https://github.com/rohnitroy/The-69-Anchors-Army.git
cd The-69-Anchors-Army
npm install
```

### Environment Configuration
Create `.env.local` in project root:
```
DATABASE_URL=postgresql://mello_admin:Mello%40dbadmin@187.127.140.201:5432/anchorsarmy_db
DB_HOST=187.127.140.201
DB_PORT=5432
DB_DATABASE=anchorsarmy_db
DB_USER=mello_admin
DB_PASSWORD=Mello@dbadmin
```

### Database Setup
```bash
# Push schema to database
npm run db:push

# Optional: Run seed script
npm run db:seed

# View database GUI
npm run db:studio
```

## Development

### Start Dev Server
```bash
npm run dev
```
Server runs on `http://localhost:3000`

### Project Structure
- `src/app/` - Pages & API routes
- `src/components/` - Reusable React components
- `src/lib/` - Utilities & constants
- `prisma/` - Database schema
- `public/` - Static assets

## Key Files to Edit

### Content & Copy
Edit all text in `src/lib/content.ts`:
- Brand messaging
- Section headings
- Module descriptions
- Statistics

### Pages
- Homepage: `src/app/page.tsx`
- Register: `src/app/register/page.tsx`
- API: `src/app/api/apply/route.ts`

### Components
- Sections: `src/components/sections/`
- UI: `src/components/ui/`

## Database

### Prisma Commands
```bash
npm run db:generate   # Regenerate client
npm run db:migrate    # Create migration
npm run db:push       # Push schema changes
npm run db:studio     # GUI interface
npm run db:seed       # Populate data
```

### Schema Location
`prisma/schema.prisma`

## Build & Deploy

### Development Build
```bash
npm run build
npm run start
```

### Production Deployment
- Recommended: Vercel (native Next.js support)
- Or: Any Node.js hosting

## Common Tasks

### Add Environment Variable
1. Add to `.env.local`
2. Use with `process.env.YOUR_VAR`
3. Restart dev server

### Create New Page
1. Create file in `src/app/[name]/page.tsx`
2. Export default React component
3. Auto-routed to `/[name]`

### Add API Endpoint
1. Create file in `src/app/api/[endpoint]/route.ts`
2. Export `POST`, `GET`, etc. functions
3. Accessible at `/api/[endpoint]`

### Update Database Schema
1. Edit `prisma/schema.prisma`
2. Run `npm run db:push`
3. Prisma client auto-regenerates

## Troubleshooting

### Database Connection Failed
- Verify `.env.local` credentials
- Check PostgreSQL server is running
- Test connection: `psql postgresql://...`

### Port 3000 Already in Use
- Kill process: `lsof -ti:3000 | xargs kill -9`
- Or use different port: `npm run dev -- -p 3001`

### Build Errors
- Clear cache: `rm -rf .next`
- Reinstall deps: `rm -rf node_modules && npm install`
- Regenerate Prisma: `npm run db:generate`

## Next Steps
- Review `SUMMARY.md` for full project overview
- Check `API.md` for endpoint documentation
- Read `COMPONENTS.md` for UI component reference
