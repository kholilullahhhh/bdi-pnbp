# Sistem Informasi PNBP BDI Makassar

Sistem Informasi Penerimaan Negara Bukan Pajak (PNBP) Balai Diklat Industri (BDI) Makassar.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Neon)
- **Auth**: NextAuth.js v5

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (Neon recommended)

### Installation

```bash
# Clone repository
git clone <repo-url>
cd kkl

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database URL and secrets

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed database
npm run db:seed

# Run development server
npm run dev
```

### Default Accounts (Seed Data)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@bdi-makassar.go.id | admin123 |
| Operator | operator@bdi-makassar.go.id | operator123 |
| User | user@contoh.com | user123 |

**Catatan**: Ganti password default sebelum deployment ke production.

## Struktur Aplikasi

```
src/
├── app/
│   ├── (public)/          # Halaman publik
│   │   ├── layanan/       # Katalog layanan
│   │   ├── faq/           # FAQ
│   │   ├── kontak/        # Kontak
│   │   ├── panduan/       # Panduan
│   │   ├── login/         # Login
│   │   └── register/      # Registrasi
│   ├── (dashboard)/       # Dashboard pengguna
│   │   └── dashboard/
│   ├── (admin)/           # Dashboard admin
│   │   └── admin/
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/            # Layout components
│   └── ui/                # UI components
├── lib/                   # Utilities
├── types/                 # TypeScript types
└── validations/           # Zod schemas
```

## Fitur

### Publik
- Katalog layanan PNBP
- Informasi tarif dan prosedur
- FAQ
- Form pendaftaran online

### Pengguna
- Dashboard permohonan
- Riwayat pembayaran
- Notifikasi
- Pengaturan profil

### Admin
- Manajemen layanan dan tarif
- Verifikasi permohonan
- Manajemen pembayaran
- Laporan dan rekapitulasi
- Audit log

## Deployment

### Vercel

1. Push ke GitHub
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy

### Neon Database

1. Buat akun di neon.tech
2. Buat project PostgreSQL
3. Copy connection string ke `.env`
4. Jalankan `npx prisma db push`

## Dokumentasi Riset

Dokumentasi lengkap riset website BDI Makassar tersedia di folder `docs/research/`:

- `website-inventory.md` - Inventaris website
- `pnbp-service-catalog.md` - Katalog layanan PNBP
- `regulatory-references.md` - Referensi regulasi
- `process-analysis.md` - Analisis proses bisnis
- `assumptions-and-open-questions.md` - Asumsi dan pertanyaan terbuka

## Regulasi Terkait

- PP 54/2021 - Jenis dan Tarif PNBP Kemenperin
- Permenperin 19/2021 - Tarif Tertentu PNBP
- Permenperin 2/2022 - Organisasi Balai Diklat Industri
- PMK 82/2025 - Tarif BLU Pendidikan SDM Industri

## Catatan Penting

1. Tarif yang ditampilkan harus sesuai dengan regulasi yang berlaku
2. Status "Lunas" hanya diberikan setelah verifikasi petugas
3. Sistem ini bukan pengganti SIDIA atau sistem pemerintah lainnya
4. Lakukan pengecekan dan pengujian sebelum deployment

## License

Internal - Balai Diklat Industri Makassar
