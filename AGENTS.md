# AGENTS.md — Sistem Informasi PNBP BDI Makassar

## Quick Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint (next lint)
npm run db:generate  # Regenerate Prisma client
npm run db:push      # Push schema changes to DB
npm run db:seed      # Seed database (tsx prisma/seed.ts)
npm run db:studio    # Prisma Studio
```

## Architecture

- **Next.js 16** App Router with route groups: `(public)`, `(dashboard)`, `(admin)`
- **Prisma** ORM → PostgreSQL (Neon). Schema at `prisma/schema.prisma` (399 lines, ~15 models)
- **NextAuth v5** beta with Credentials provider. JWT strategy. Auth config in `src/lib/auth.ts`
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config` file, uses `src/app/globals.css` for theme
- Path alias: `@/*` → `./src/*`

## Key Gotchas

- **Prisma singleton** — Always import `prisma` from `@/lib/prisma`. It uses `globalThis` caching to avoid multiple clients in dev
- **NextAuth v5 beta** — Uses `handlers` export pattern from route handler, not v4-style. Auth callbacks cast `role` onto session via `as unknown as { role: string }`
- **Tailwind v4** — No `tailwind.config.ts`. Theme tokens defined in `globals.css` `@theme {}` block. Utility classes like `bg-primary-50` reference CSS custom properties
- **Role-based access** — User roles: `PUBLIC | USER | OPERATOR | ADMIN | SUPER_ADMIN | LEADER | AUDITOR`. Route groups `(dashboard)` and `(admin)` are layout wrappers only — no server-side auth guards in layouts. Protect pages individually
- **Status enums** — `ApplicationStatus`, `PaymentStatus`, `ServiceStatus`, `TariffVerificationStatus` in schema. Display helpers in `src/lib/utils.ts` (`getStatusLabel`, `getStatusVariant`, `getStatusColor`)
- **Application numbers** — Generated client-side via `generateApplicationNumber()` (format: `PNBP-YYYYMM-XXXX`). Not unique-guaranteed at DB level — check uniqueness on insert
- **Neon database** — Uses `DIRECT_URL` for migrations (direct connection) and `DATABASE_URL` for queries (pooled). Don't mix them up in Prisma datasource

## UI Conventions

- UI primitives in `src/components/ui/` — Button, Card, Input, Badge, Skeleton, Avatar, EmptyState, etc.
- Layout components in `src/components/layout/` — `admin-sidebar`, `dashboard-sidebar`, `public-navbar`, `public-footer`
- All UI components use `cn()` from `@/lib/utils` (clsx + tailwind-merge)
- Recharts for charts, TanStack Table for data tables, Sonner for toasts, react-hook-form + Zod for forms
- Currency formatting uses `Intl.NumberFormat` with `id-ID` locale and IDR currency

## Database Workflow

1. Edit `prisma/schema.prisma`
2. `npm run db:generate` (regenerate client)
3. `npm run db:push` (push to DB — use for prototyping)
4. Or `npm run db:seed` to populate test data

Default seed accounts: `admin@bdi-makassar.go.id` / `admin123`, `operator@` / `operator123`, `user@contoh.com` / `user123`

## API Routes

All under `src/app/api/`:
- `auth/[...nextauth]` — NextAuth handler
- `auth/register` — User registration
- `services`, `services/[slug]` — Service catalog CRUD
- `categories` — Service categories
- `faqs`, `announcements` — Content endpoints
