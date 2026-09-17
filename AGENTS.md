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
  page.tsx                    # Landing page (server component, DB-backed services)
  (public)/                   # Public pages: /layanan, /faq, /kontak, etc.
    layanan/page.tsx          # DB-backed service listing (server + client search)
    layanan/[slug]/page.tsx   # Service detail page (DB)
    layanan/[slug]/ajukan/    # Application form (auth-gated, server + client)
    faq/page.tsx              # FAQ from DB (server)
    login/page.tsx            # Server wrapper with Suspense
    login/login-form.tsx      # Client form with callbackUrl support
  (dashboard)/
    layout.tsx                # Dashboard shell (sidebar + header)
    dashboard/
      page.tsx                # User dashboard (server component, welcome banner + stats)
      layanan/page.tsx        # Service CRUD (delegates to LayananDashboard client component)
      permohonan/page.tsx     # User's applications (with search + status filters)
      permohonan/[id]/page.tsx # Application detail page (timeline, actions, revision panel)
      pembayaran/page.tsx     # User's payments
      notifikasi/page.tsx     # User's notifications
      profil/page.tsx         # User profile (edit name, phone, password change)
      tarif/page.tsx          # Tariff management
      kelola-permohonan/      # Admin: all applications (status filters, work queue)
      kelola-permohonan/[id]/page.tsx # Admin application detail (timeline, ApplicationActions)
      kelola-pembayaran/      # Admin: all payments (verify/reject actions)
      pengguna/page.tsx       # User management
      pengumuman/page.tsx     # Announcements CRUD
      faq/page.tsx            # FAQ CRUD
      laporan/page.tsx        # Reports/stats
      audit-log/page.tsx      # Audit logs
      pengaturan/page.tsx     # System settings (server + client, DB-backed)
  api/                        # API routes (services, tariffs, applications, payments, etc.)
    settings/route.ts         # GET/PUT system settings (ADMIN+)
```

## Layout Components

- `src/components/layout/dashboard-sidebar.tsx` — Dark gradient sidebar with role-based menu (user items always visible, admin items for OPERATOR/ADMIN/SUPER_ADMIN). Collapsible. Uses `useSession()`
- `src/components/layout/dashboard-header.tsx` — Sticky header with breadcrumb navigation, notification bell (live unread count), user avatar
- `src/components/layout/notification-bell.tsx` — Client component with polling (30s interval), shows red badge with unread count (max 99+)
- `src/components/layout/user-badge.tsx` — User info displayed in sidebar footer

## Key Components

- `src/components/dashboard/application-actions.tsx` — Role-aware action buttons (submit, cancel, review, revision, approve, reject, complete) with confirmation dialog
- `src/components/dashboard/revision-panel.tsx` — Revision response panel for users (edit notes + resubmit)
- `src/components/dashboard/profile-client.tsx` — Profile edit (name, phone) + password change with validation
- `src/components/dashboard/permohonan-client.tsx` — User's application list with search + status filter tabs
- `src/components/admin/kelola-permohonan-client.tsx` — Admin application list with status tabs, work queue summary, search
- `src/components/admin/payment-verify-actions.tsx` — Payment verify/reject buttons with confirmation dialog
- `src/components/admin/quick-status-action.tsx` — Inline status action buttons for admin list view (with confirmation dialog)
- `src/components/admin/settings-client.tsx` — Settings form (institution, website, contact, notifications) with DB persistence

## Auth Helpers

- `src/lib/auth-helpers.ts` — `requireAuth()`, `requireRole(...)`, `getAuthSession()`, `getClientIp()`
- `requireAuth()` returns `{ session: AuthSession }` (userId, email, name, role) or `{ error: NextResponse }`
- `requireRole("ADMIN", "SUPER_ADMIN")` chains auth + role check

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

Seed also creates: services, tariffs, categories, FAQs, announcements, and system settings (institution, website, contact, notifications).

## API Routes

All under `src/app/api/`:
- `auth/[...nextauth]` — NextAuth handler
- `auth/register` — User registration
- `services`, `services/[id]` — Service CRUD (route tries id then slug lookup)
- `tariffs`, `tariffs/[id]` — Tariff CRUD
- `applications`, `applications/[id]` — Application CRUD with status machine
- `applications/[id]/status` — Status transitions (enforces machine rules, creates notifications)
- `payments`, `payments/[id]` — Payment CRUD (amount validation, duplicate PENDING guard)
- `payments/[id]/verify` — Atomic payment verification (prisma.$transaction, creates notifications)
- `notifications/unread-count` — Unread notification count for bell badge
- `settings` — GET/PUT system settings (ADMIN+, upserts by key)
- `categories`, `faqs`, `announcements`, `users` — Content/user endpoints
- `users/[id]` — GET/PUT (admin), PATCH (self-service profile + password change)
- Middleware allows unauthenticated GET on `/api/services`, `/api/categories`, `/api/faqs`, `/api/announcements`

## Verification After Changes

```bash
npx tsc --noEmit    # TypeScript check (must be 0 errors)
npm run build       # Production build (must succeed)
```

No test framework is installed. No automated tests exist.
