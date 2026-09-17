# MATRIKS ROLE DAN PERMISSION — SISTEM INFORMASI PNBP BDI MAKASSAR

---

## 1. DEFINISI ROLE

| Role | Level | Deskripsi |
|------|-------|-----------|
| PUBLIC | 0 | Pengunjung belum login |
| USER | 1 | User terdaftar |
| OPERATOR | 2 | Operator BDI |
| ADMIN | 3 | Administrator |
| SUPER_ADMIN | 4 | Super administrator |
| LEADER | 5 | Pimpinan (belum ada fitur khusus) |
| AUDITOR | 6 | Auditor (belum ada fitur khusus) |

---

## 2. MATRIKS Akses HALAMAN

| Halaman | PUBLIC | USER | OPERATOR | ADMIN | SUPER_ADMIN | LEADER | AUDITOR |
|---------|--------|------|----------|-------|-------------|--------|---------|
| `/` (Beranda) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/layanan` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/panduan` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/faq` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/kontak` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/informasi-pembayaran` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/login` | ✅ | — | — | — | — | — | — |
| `/register` | ✅ | — | — | — | — | — | — |
| `/dashboard` | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/dashboard/layanan` | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/dashboard/permohonan` | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/dashboard/pembayaran` | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/dashboard/notifikasi` | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/dashboard/profil` | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/dashboard/tarif` | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `/dashboard/kelola-permohonan` | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `/dashboard/kelola-pembayaran` | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `/dashboard/pengumuman` | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `/dashboard/faq` | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `/dashboard/pengguna` | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| `/dashboard/laporan` | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| `/dashboard/audit-log` | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| `/dashboard/pengaturan` | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |

---

## 3. MATRIKS Akses API

| Endpoint | Method | PUBLIC | USER | OPERATOR | ADMIN | SUPER_ADMIN |
|----------|--------|--------|------|----------|-------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | ✅ | — | — | — | — |
| `/api/auth/register` | POST | ✅ | — | — | — | — |
| `/api/categories` | GET | ✅ | — | — | — | — |
| `/api/services` | GET | ✅ | — | — | — | — |
| `/api/services` | POST | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/api/services/[id]` | GET | ✅ | — | — | — | — |
| `/api/services/[id]` | PUT | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/api/services/[id]` | DELETE | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/api/tariffs` | POST | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/api/tariffs/[id]` | GET | ✅ | — | — | — | — |
| `/api/tariffs/[id]` | PUT | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/api/tariffs/[id]` | DELETE | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/api/applications` | GET | ❌ | ✅ (own) | ✅ (all) | ✅ (all) | ✅ (all) |
| `/api/applications` | POST | ❌ | ✅ | ✅ | ✅ | ✅ |
| `/api/applications/[id]` | GET | ❌ | ✅ (own) | ✅ | ✅ | ✅ |
| `/api/applications/[id]` | PATCH | ❌ | ✅ (own) | ✅ | ✅ | ✅ |
| `/api/applications/[id]/status` | PATCH | ❌ | ✅ (limited) | ✅ | ✅ | ✅ |
| `/api/payments` | GET | ❌ | ✅ (own) | ✅ (all) | ✅ (all) | ✅ (all) |
| `/api/payments` | POST | ❌ | ✅ | ✅ | ✅ | ✅ |
| `/api/payments/[id]/verify` | PATCH | ❌ | ❌ | ✅ | ✅ | ✅ |
| `/api/announcements` | POST | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/api/announcements/[id]` | GET | ✅ | — | — | — | — |
| `/api/announcements/[id]` | PUT | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/api/announcements/[id]` | DELETE | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/api/faqs` | POST | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/api/faqs/[id]` | GET | ✅ | — | — | — | — |
| `/api/faqs/[id]` | PUT | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/api/faqs/[id]` | DELETE | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/api/users/[id]` | GET | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/api/users/[id]` | PUT | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/api/users/[id]` | DELETE | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 4. MATRIKS FITUR

| Fitur | PUBLIC | USER | OPERATOR | ADMIN | SUPER_ADMIN | LEADER | AUDITOR |
|-------|--------|------|----------|-------|-------------|--------|---------|
| **Bacaan** | | | | | | | |
| Lihat landing page | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Lihat layanan publik | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Lihat FAQ publik | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Lihat kontak | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Autentikasi** | | | | | | | |
| Registrasi | ✅ | — | — | — | — | — | — |
| Login/Logout | ✅ | — | — | — | — | — | — |
| **Dashboard** | | | | | | | |
| Akses dashboard | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Lihat statistik | ❌ | ✅ (own) | ✅ (own) | ✅ (all) | ✅ (all) | ✅ (own) | ✅ (own) |
| **Layanan** | | | | | | | |
| Browse layanan | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Kelola layanan (CRUD) | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Tarif** | | | | | | | |
| Lihat tarif | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Kelola tarif (CRUD) | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Permohonan** | | | | | | | |
| Buat permohonan | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Lihat permohonan sendiri | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Lihat semua permohonan | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Update status | ❌ | ✅ (limited) | ✅ | ✅ | ✅ | ❌ | ❌ |
| Hapus permohonan | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Pembayaran** | | | | | | | |
| Catat pembayaran | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Lihat pembayaran sendiri | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Lihat semua pembayaran | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Verifikasi pembayaran | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Konten** | | | | | | | |
| Kelola pengumuman | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Kelola FAQ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Manajemen** | | | | | | | |
| Kelola pengguna | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Hapus user | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Ubah role | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Monitoring** | | | | | | | |
| Lihat laporan | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Lihat audit log | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Lihat notifikasi | ❌ | ✅ (own) | ✅ (own) | ✅ (own) | ✅ (own) | ✅ (own) | ✅ (own) |
| **Profil** | | | | | | | |
| Lihat profil | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edit profil | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Ubah password | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Sistem** | | | | | | | |
| Pengaturan sistem | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Export laporan | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 5. IMPLEMENTASI SERVER-SIDE vs CLIENT-SIDE

| Aspek | Implementasi | Catatan |
|-------|-------------|---------|
| Middleware auth | Server | `getToken()` di Edge middleware |
| Page auth | Server | `auth()` di server components |
| API auth | Server | `requireAuth()` / `requireRole()` |
| Sidebar menu | Client | `useSession()` menentukan menu visibility |
| Role check | Server | State machine + `canTransition()` |

### Gap

| Aspek | Masalah |
|-------|---------|
| Sidebar admin | Hanya UI — OPERATOR bisa akses semua halaman admin di sidebar, tetapi server-side check di API routes juga mengizinkan OPERATOR |
| LEADER/AUDITOR | Sidebar tidak menampilkan admin menu, tetapi tidak ada fitur khusus untuk role ini |
| Page-level auth | Dashboard layout TIDAK memeriksa auth — hanya middleware yang melindungi `/dashboard/*` |
