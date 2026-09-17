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

PowerShell requires `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` before npm/npx. Use `;` not `&&` to chain commands.

## Architecture

- **Next.js 16** App Router. Route groups: `(public)`, `(dashboard)`. No `(admin)` group — all admin routes live under `/dashboard/`
- **Prisma** ORM → PostgreSQL (Neon). Schema at `prisma/schema.prisma` (401 lines, ~23 models)
- **NextAuth v5** beta with Credentials provider. JWT strategy. Auth config in `src/lib/auth.ts`
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config` file, theme defined in `src/app/globals.css` `@theme {}` block
- Path alias: `@/*` → `./src/*`

## Key Gotchas

- **Prisma singleton** — Always import `prisma` from `@/lib/prisma`. Uses `globalThis` caching to avoid multiple clients in dev
- **NextAuth v5 beta** — Uses `handlers` export pattern (not v4-style). Auth callbacks cast `role` onto session via `as unknown as { role: string }`
- **Tailwind v4** — No `tailwind.config.ts`. Theme tokens in `globals.css` `@theme {}`. Custom utilities (gradient-welcome, shadow-card-hover, bg-grid-pattern, etc.) defined in `@layer utilities`. Line-clamp utilities are manual (not plugin)
- **Role-based access** — Roles: `PUBLIC | USER | OPERATOR | ADMIN | SUPER_ADMIN | LEADER | AUDITOR`. Route groups are layout wrappers only — no server-side auth guards in layouts. Middleware protects `/dashboard/*` and specific API routes. Protect pages individually
- **Status enums** — `ApplicationStatus`, `PaymentStatus`, `ServiceStatus`, `TariffVerificationStatus` in schema. Display helpers in `src/lib/utils.ts` (`getStatusLabel`, `getStatusVariant`, `getStatusColor`)
- **Status transitions** — Enforced by `src/lib/status-machine.ts` with role-based allowed transitions
- **Application numbers** — Generated client-side via `generateApplicationNumber()` (format: `PNBP-YYYYMM-XXXX`). Not unique-guaranteed at DB level
- **Neon database** — `DATABASE_URL` (pooled, `&pool_timeout=30`) for queries, `DIRECT_URL` (direct) for migrations. Don't mix them
- **Dashboard queries** — Split `Promise.all` into 2 batches with try/catch for graceful degradation (`src/app/(dashboard)/dashboard/page.tsx`)
- **No recharts/TanStack Table in use** — Packages installed but not imported. All tables are custom HTML. Charts are placeholders
- **Dialog component** — Uses native `<dialog>` with `showModal()`/`close()`. Centering requires `m-auto` class on the dialog element
- **Admin CRUD pattern** — Server components fetch data → pass to client table components → client handles search, modals, form submission via `fetch()` to API routes → `router.refresh()` after mutations

## Route Structure

```
src/app/
  page.tsx                    # Landing page (server component)
  (public)/                   # Public pages: /layanan, /faq, /kontak, etc.
  (dashboard)/
    layout.tsx                # Dashboard shell (sidebar + header)
    dashboard/
      page.tsx                # User dashboard (server component, welcome banner + stats)
      layanan/page.tsx        # Service CRUD (delegates to LayananDashboard client component)
      permohonan/page.tsx     # User's applications
      pembayaran/page.tsx     # User's payments
      notifikasi/page.tsx     # User's notifications
      profil/page.tsx         # User profile
      tarif/page.tsx          # Tariff management
      kelola-permohonan/      # Admin: all applications
      kelola-pembayaran/      # Admin: all payments
      pengguna/page.tsx       # User management
      pengumuman/page.tsx     # Announcements CRUD
      faq/page.tsx            # FAQ CRUD
      laporan/page.tsx        # Reports/stats
      audit-log/page.tsx      # Audit logs
      pengaturan/page.tsx     # System settings (client component)
  api/                        # API routes (services, tariffs, applications, payments, etc.)
```

## Layout Components

- `src/components/layout/dashboard-sidebar.tsx` — Dark gradient sidebar with role-based menu (user items always visible, admin items for OPERATOR/ADMIN/SUPER_ADMIN). Collapsible. Uses `useSession()`
- `src/components/layout/dashboard-header.tsx` — Sticky header with breadcrumb navigation, notification bell, user avatar
- `src/components/layout/user-badge.tsx` — User info displayed in sidebar footer

## UI Conventions

- UI primitives in `src/components/ui/` — Button, Card, Input, Badge, Skeleton, Avatar, EmptyState, Dialog, etc.
- All UI components use `cn()` from `@/lib/utils` (clsx + tailwind-merge)
- Currency formatting uses `Intl.NumberFormat` with `id-ID` locale and IDR currency
- Admin tables use consistent pattern: header with search → table with `border-border/60` rows → `hover:bg-primary-50/30` transitions → color-coded action buttons (blue=view, amber=edit, red=delete)

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
- `services`, `services/[id]` — Service CRUD (route tries id then slug lookup)
- `tariffs`, `tariffs/[id]` — Tariff CRUD
- `applications`, `applications/[id]` — Application CRUD with status machine
- `payments`, `payments/[id]` — Payment CRUD
- `categories`, `faqs`, `announcements`, `users` — Content/user endpoints
- Middleware allows unauthenticated GET on `/api/services`, `/api/categories`, `/api/faqs`, `/api/announcements`

## Verification After Changes

```bash
npx tsc --noEmit    # TypeScript check (must be 0 errors)
npm run build       # Production build (must succeed)
```

No test framework is installed. No automated tests exist.
