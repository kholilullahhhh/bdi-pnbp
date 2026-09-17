# DOKUMENTASI SISTEM — SISTEM INFORMASI PNBP BDI MAKASSAR

> Dokumentasi ini mencerminkan implementasi aktual per kode yang diperiksa.
> Terakhir diperbarui: September 2026

---

## 1. RINGKASAN SISTEM

**Nama:** Sistem Informasi PNBP (Penerimaan Negara Bukan Pajak) — Balai Diklat Industri (BDI) Makassar

**Tujuan:** Platform digital untuk mengelola layanan PNBP BDI Makassar, meliputi katalog layanan, pengajuan permohonan, pemrosesan oleh operator, pembayaran, dan pelaporan.

**Status Implementasi:** Aplikasi memiliki frontend dan backend yang fungsional untuk alur inti (layanan → permohonan → pembayaran → verifikasi). Namun, beberapa fitur publik masih menggunakan data hardcoded, dan ada fitur yang belum terhubung sepenuhnya.

**Tech Stack Aktual:**

| Komponen | Teknologi | Versi |
|----------|-----------|-------|
| Framework | Next.js (App Router + Turbopack) | 16.3.5 |
| UI Library | React | 19.2.8 |
| Bahasa | TypeScript (strict mode) | 5.8.0 |
| Database | PostgreSQL via Neon | — |
| ORM | Prisma | 6.12.0 |
| Autentikasi | NextAuth v5 (Credentials + JWT) | beta.28 |
| CSS | Tailwind CSS v4 | 4.0.0 |
| Deploy | Vercel | — |

---

## 2. ARSITEKTUR APLIKASI

```
┌─────────────────────────────────────────────────────────┐
│                    VERCEL (Edge)                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Middleware (getToken — JWT verification)           │  │
│  │ • /dashboard/* → auth check → redirect/login      │  │
│  │ • /api/applications/*, /api/payments/* → auth     │  │
│  │ • Public API GET → pass through                   │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────┐  ┌───────────────────────────┐   │
│  │  Server Components│  │  Client Components         │   │
│  │  (page.tsx)       │  │  (forms, tables, modals)   │   │
│  │  • auth()         │  │  • useSession()             │   │
│  │  • prisma.*       │  │  • fetch() to API           │   │
│  │  • db-queries     │  │  • router.refresh()         │   │
│  └────────┬─────────┘  └──────────┬────────────────┘   │
│           │                       │                     │
│  ┌────────▼───────────────────────▼────────────────┐   │
│  │              API Routes (/api/*)                  │   │
│  │  • requireAuth() / requireRole()                 │   │
│  │  • Zod validation                                │   │
│  │  • Prisma CRUD                                   │   │
│  │  • Audit logging                                 │   │
│  │  • Status machine                                │   │
│  └────────────────────┬────────────────────────────┘   │
│                       │                                 │
│  ┌────────────────────▼────────────────────────────┐   │
│  │           Prisma Client (singleton)               │   │
│  └────────────────────┬────────────────────────────┘   │
└───────────────────────┼────────────────────────────────┘
                        │
            ┌───────────▼───────────┐
            │  Neon PostgreSQL       │
            │  • 16 models           │
            │  • 5 enums             │
            │  • 30+ indexes         │
            └───────────────────────┘
```

**Pola Arsitektur:**

- **Server Components** fetch data langsung dari Prisma atau `db-queries` helpers
- **Client Components** menangani interaksi user (form, search, modals)
- **API Routes** menerima `fetch()` dari client components, melakukan validasi + CRUD
- **Middleware** hanya melakukan JWT verification via `getToken` (Edge-compatible)
- **No direct DB access from client** — semua melalui server components atau API routes

---

## 3. PETA REPOSITORY

```
kkl/
├── prisma/
│   ├── schema.prisma          # 16 models, 5 enums, 401 baris
│   └── seed.ts                # Seed data
├── docs/
│   ├── SYSTEM_OVERVIEW.md     # Dokumentasi ini
│   ├── USER_FLOWS.md          # Alur pengguna
│   ├── API_DOCUMENTATION.md   # Dokumentasi API
│   ├── DATABASE_DOCUMENTATION.md  # Dokumentasi DB + ERD
│   ├── ROLE_PERMISSION_MATRIX.md  # Matriks akses
│   ├── BUSINESS_RULES.md      # Aturan bisnis & status
│   └── FEATURE_GAP_ANALYSIS.md    # Gap analysis & improvement
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Tailwind v4 theme
│   │   ├── page.tsx           # Landing page
│   │   ├── (public)/          # Halaman publik
│   │   ├── (dashboard)/       # Dashboard (user + admin)
│   │   └── api/               # API routes (18 files)
│   ├── components/
│   │   ├── ui/                # 12 UI primitives
│   │   ├── layout/            # 5 layout components
│   │   ├── dashboard/         # 1 dashboard component
│   │   └── admin/             # 9 admin components
│   ├── lib/
│   │   ├── auth.ts            # NextAuth config
│   │   ├── auth-helpers.ts    # Auth utilities
│   │   ├── prisma.ts          # Prisma singleton
│   │   ├── status-machine.ts  # Status transitions
│   │   ├── utils.ts           # Utility functions
│   │   └── db-queries.ts      # Data access layer
│   ├── validations/
│   │   └── index.ts           # 7 Zod schemas
│   └── middleware.ts          # Edge middleware
├── package.json
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

---

## 4. KOMPONEN APLIKASI

### 4.1 UI Primitives (`src/components/ui/`)

| Komponen | Fungsi |
|----------|--------|
| `Avatar` | Tampilan avatar dengan image atau initials fallback |
| `Badge` | Label status dengan warna berbeda (default, success, warning, destructive, info) |
| `Button` | Tombol dengan loading state, multiple variants |
| `Card` | Container kartu dengan header, content, footer |
| `Dialog` | Modal menggunakan native `<dialog>` element |
| `EmptyState` | Placeholder ketika tidak ada data |
| `Input` | Input text dengan error state |
| `Label` | Label form |
| `Separator` | Garis pemisah horizontal/vertical |
| `Skeleton` | Loading placeholder dengan pulse animation |
| `TableSkeleton` | Loading skeleton berbentuk tabel |
| `Textarea` | Textarea dengan error state |

### 4.2 Layout Components (`src/components/layout/`)

| Komponen | Fungsi | Type |
|----------|--------|------|
| `DashboardSidebar` | Sidebar navigasi dengan role-based menu, collapsible, mobile support | Client |
| `DashboardHeader` | Sticky header dengan breadcrumb, notification bell, user info | Client |
| `UserBadge` | Info user di sidebar footer | Client |
| `PublicNavbar` | Navbar publik dengan top bar, desktop/mobile menu | Client |
| `PublicFooter` | Footer publik dengan kontak, link, info | Server |

### 4.3 Admin Components (`src/components/admin/`)

| Komponen | Fungsi |
|----------|--------|
| `DeleteConfirm` | Dialog konfirmasi hapus (reusable) |
| `ServiceTable` | Tabel layanan + CRUD (search, create, edit, delete, view detail) |
| `ServiceForm` | Form create/edit layanan |
| `TariffTable` | Tabel tarif + CRUD dengan status verifikasi |
| `TariffForm` | Form create/edit tarif |
| `UserTable` | Tabel manajemen user |
| `UserManage` | Dialog ubah role + status aktif user |
| `FAQTable` | Tabel FAQ + CRUD (card-based layout) |
| `FAQForm` | Form create/edit FAQ |
| `AnnouncementTable` | Tabel pengumuman + CRUD (card-based layout) |
| `AnnouncementForm` | Form create/edit pengumuman |

### 4.4 Dashboard Component (`src/components/dashboard/`)

| Komponen | Fungsi |
|----------|--------|
| `LayananDashboard` | Katalog layanan di dashboard user dengan CRUD lengkap |

---

## 5. STATISTIK TEKNIS

| Metrik | Nilai |
|--------|-------|
| Total file source | ~50+ |
| Total baris kode | ~6,000+ |
| Database models | 16 |
| Database enums | 5 |
| API endpoints | 18 (30+ methods) |
| Halaman frontend | 22 (8 public + 14 dashboard) |
| Komponen UI | 12 primitives |
| Komponen layout | 5 |
| Komponen admin | 9 |
| Zod schemas | 7 (+ 3 inline) |
| Role | 7 (4 aktif: USER, OPERATOR, ADMIN, SUPER_ADMIN) |
| Status transitions | 9 (state machine) |
| Build time | ~14 detik |
| TypeScript errors | 0 |
