# GAP ANALYSIS & KANDIDAT IMPROVEMENT — SISTEM INFORMASI PNBP BDI MAKASSAR

---

## 1. FITUR YANG SUDAH LENGKAP

| # | Fitur | Status | Keterangan |
|---|-------|--------|------------|
| 1 | Landing page | ✅ | 7 section, statis |
| 2 | Registrasi user | ✅ | Zod validation, transactional |
| 3 | Login/logout | ✅ | NextAuth Credentials + JWT |
| 4 | Dashboard user | ✅ | Statistik, recent apps, quick actions |
| 5 | Katalog layanan (dashboard) | ✅ | CRUD via LayananDashboard |
| 6 | Pembuatan permohonan | ✅ | Auto-numbering, invoice generation |
| 7 | Daftar permohonan user | ✅ | Search, status badge |
| 8 | Detail permohonan | ✅ | Relasi lengkap |
| 9 | Status machine | ✅ | 9 transisi, role-based |
| 10 | Pembayaran | ✅ | Manual, verifikasi operator |
| 11 | Riwayat pembayaran | ✅ | User-scoped |
| 12 | Manajemen tarif | ✅ | CRUD dengan verifikasi |
| 13 | Manajemen pengumuman | ✅ | CRUD, publishedAt logic |
| 14 | Manajemen FAQ | ✅ | CRUD, sort order |
| 15 | Manajemen pengguna | ✅ | Role assignment, soft delete |
| 16 | Audit logging | ✅ | Semua mutasi (kecuali notes update) |
| 17 | Role-based sidebar | ✅ | USER vs ADMIN menu |
| 18 | Middleware auth | ✅ | Edge-compatible getToken |
| 19 | 16 DB models | ✅ | 30+ indexes |
| 20 | Zod validation | ✅ | 7 schemas + 3 inline |
| 21 | Database transactions | ✅ | 3 endpoints |

---

## 2. FITUR YANG BELUM LENGKAP

### 2.1 Data Hardcoded (Bukan dari Database)

| Item | Lokasi | Masalah | Dampak |
|------|--------|---------|--------|
| Layanan publik | `src/app/(public)/layanan/page.tsx` | 5 layanan hardcoded, bukan dari DB Service | Admin mengelola layanan di dashboard tapi pengunjung tidak melihatnya |
| FAQ publik | `src/app/(public)/faq/page.tsx` | 12 Q&A hardcoded, bukan dari DB FAQ | Admin mengelola FAQ tapi pengunjung tidak melihatnya |
| Pengumuman publik | — | Tidak ada halaman publik | Admin membuat pengumuman tapi tidak ada yang melihat |
| Testimoni | `src/app/page.tsx` | 3 testimoni hardcoded | Data tidak dari database |
| Pengaturan | `src/app/(dashboard)/dashboard/pengaturan/page.tsx` | Semua form hardcoded | Tidak ada backend |

### 2.2 Tombol/Aksi yang Belum Terhubung

| Tombol | Lokasi | Masalah |
|--------|--------|---------|
| "Edit Profil" | `/dashboard/profil` | Tombol ada, tidak ada form edit |
| "Tandai Semua Dibaca" | `/dashboard/notifikasi` | Tombol ada, tidak ada API call |
| "Export PDF" | `/dashboard/laporan` | Tombol ada, tidak ada implementasi |
| "Simpan Perubahan" (semua card) | `/dashboard/pengaturan` | Tombol ada, tidak ada API call |
| Toggle switches | `/dashboard/pengaturan` | UI ada, tidak ada state management |
| "Unduh" (bukti bayar) | `/dashboard/pembayaran` | Tombol ada, tidak ada file download |

### 2.3 Model yang Belum Terpakai Sepenuhnya

| Model | Masalah |
|-------|---------|
| ApplicationDocument | Model ada, tidak ada upload UI atau file storage |
| PaymentProof | Model ada, tidak ada upload UI atau file storage |
| SystemSetting | Model ada, tidak ada halaman yang menggunakannya |
| Notification (otomatis) | Hanya bisa dibuat manual via DB, tidak ada trigger dari status changes |

### 2.4 Visualisasi

| Item | Masalah |
|------|---------|
| Chart laporan | Placeholder EmptyState, bukan chart |
| Recharts | Sudah dihapus dari dependencies |

---

## 3. BUG DAN INKONSISTENSI

| # | Jenis | Lokasi | Deskripsi | Severity |
|---|-------|--------|-----------|----------|
| 1 | Inkonsistensi data | Public pages vs DB | Layanan & FAQ publik hardcoded, bukan dari database yang sama dengan dashboard | Medium |
| 2 | Missing audit log | `PATCH /api/applications/[id]` | Update notes tidak menciptakan audit log | Low |
| 3 | Non-transactional | `PATCH /api/payments/[id]/verify` | Post-transaction aggregate/update tidak dalam transaction — bisa inconsistency gap | High |
| 4 | Duplicate schemas | `registerSchema` di validations DAN register route | Dua definisi validasi yang sama | Low |
| 5 | Nomor tidak atomic | `generateApplicationNumber()` | Random suffix bisa konflik pada concurrent | Medium |
| 6 | Role tidak aktif | LEADER, AUDITOR | Role ada tapi tidak ada perbedaan akses | Medium |
| 7 | No page-level auth | Dashboard layout | Layout tidak memeriksa auth — hanya middleware | Low |
| 8 | Client-side search | Admin tables | Search dilakukan client-side, tidak efisien untuk data besar | Medium |
| 9 | No pagination admin | Kelola permohonan, kelola pembayaran | Fetch semua data tanpa limit | Medium |
| 10 | Notification bell | Dashboard header | Red dot hardcoded, tidak berdasarkan unread count | Low |

---

## 4. GAP ANALYSIS

| Area | Implementasi Saat Ini | Kesenjangan |
|------|----------------------|-------------|
| **Publik → DB** | Layanan & FAQ hardcoded | Tidak terhubung ke data yang dikelola admin |
| **Notifikasi** | Model ada, halaman ada | Tidak ada mekanisme auto-notifikasi |
| **File upload** | Model ada | Tidak ada UI atau storage integration |
| **Laporan** | Statistik angka saja | Tidak ada chart, filter periode, atau export |
| **Profil** | Hanya tampilan | Tidak ada edit profile |
| **Pengaturan** | Placeholder | Tidak ada backend |
| **Email** | Tidak ada | Tidak ada email notifikasi atau verifikasi |
| **Pembayaran** | Simulasi manual | Tidak ada payment gateway |
| **Audit per role** | Audit log ada | LEADER/AUDITOR tidak punya view khusus |
| **Search** | Client-side filter | Tidak ada server-side search/pagination |
| **Mobile** | Sidebar responsive | Beberapa tabel mungkin tidak mobile-friendly |

---

## 5. KANDIDAT FITUR IMPROVEMENT

### 5.1 Penyelesaian Bug & Kekurangan Fitur Existing

| Aspek | Isi |
|-------|-----|
| **Nama fitur** | Hubungkan Halaman Publik ke Database |
| **Masalah** | Layanan dan FAQ publik hardcoded |
| **Pengguna** | Pengunjung website, Admin |
| **Kondisi saat ini** | Admin CRUD di dashboard, pengunjung lihat data statis |
| **Manfaat** | Data admin langsung terlihat di publik |
| **Ketergantungan** | GET endpoints sudah ada |
| **Risiko** | Perlu validasi data yang di-public |
| **Kompleksitas** | Rendah |
| **Perlu konfirmasi bisnis?** | Ya |

| Aspek | Isi |
|-------|-----|
| **Nama fitur** | Halaman Publik Pengumuman |
| **Masalah** | Tidak ada halaman publik untuk pengumuman |
| **Pengguna** | Pengunjung website |
| **Kondisi saat ini** | Admin bisa membuat, tidak ada yang melihat |
| **Manfaat** | Pengunjung melihat pengumuman terbaru |
| **Ketergantungan** | GET endpoint perlu list endpoint |
| **Risiko** | Minimal |
| **Kompleksitas** | Rendah |
| **Perlu konfirmasi bisnis?** | Tidak |

### 5.2 Penyempurnaan Alur Utama

| Aspek | Isi |
|-------|-----|
| **Nama fitur** | Edit Profil |
| **Masalah** | Tombol ada tapi tidak terhubung |
| **Pengguna** | Semua user |
| **Kondisi saat ini** | User hanya bisa melihat |
| **Manfaat** | User perbarui nama, telepon, instansi |
| **Ketergantungan** | Perlu API `/api/profile` atau update users/[id] |
| **Risiko** | Perlu ownership check |
| **Kompleksitas** | Rendah |
| **Perlu konfirmasi bisnis?** | Ya — field apa yang boleh diubah |

| Aspek | Isi |
|-------|-----|
| **Nama fitur** | Notifikasi Otomatis |
| **Masalah** | Model ada, tidak ada yang membuat |
| **Pengguna** | User, Operator, Admin |
| **Kondisi saat ini** | Status berubah tanpa notifikasi |
| **Manfaat** | User diberi tahu saat perubahan |
| **Ketergantungan** | Perlu create Notification di status/payment routes |
| **Risiko** | Hanya in-app, belum email |
| **Kompleksitas** | Sedang |
| **Perlu konfirmasi bisnis?** | Ya — notifikasi apa saja |

| Aspek | Isi |
|-------|-----|
| **Nama fitur** | Pagination Server-Side Admin |
| **Masalah** | Admin fetch semua data |
| **Pengguna** | Admin, Operator |
| **Kondisi saat ini** | Semua record dimuat |
| **Manfaat** | Performa lebih baik |
| **Ketergantungan** | API sudah support pagination |
| **Risiko** | Perlu update client components |
| **Kompleksitas** | Sedang |
| **Perlu konfirmasi bisnis?** | Tidak |

### 5.3 Keamanan dan Kontrol Akses

| Aspek | Isi |
|-------|-----|
| **Nama fitur** | Fitur Khusus LEADER/AUDITOR |
| **Masalah** | Role tidak ada fitur khusus |
| **Pengguna** | Leader, Auditor |
| **Kondisi saat ini** | Sama seperti USER |
| **Manfaat** | Role memiliki makna fungsional |
| **Ketergantungan** | Perlu definisi bisnis |
| **Risiko** | Perlu keputusan bisnis |
| **Kompleksitas** | Sedang - Tinggi |
| **Perlu konfirmasi bisnis?** | Ya — PENTING |

| Aspek | Isi |
|-------|-----|
| **Nama fitur** | Ubah Password |
| **Masalah** | Tidak ada fitur ganti password |
| **Pengguna** | Semua user |
| **Kondisi saat ini** | User tidak bisa ubah password |
| **Manfaat** | Keamanan akun |
| **Ketergantungan** | Perlu API endpoint baru |
| **Risiko** | Minimal |
| **Kompleksitas** | Rendah |
| **Perlu konfirmasi bisnis?** | Tidak |

### 5.4 Pelaporan dan Monitoring

| Aspek | Isi |
|-------|-----|
| **Nama fitur** | Chart Laporan |
| **Masalah** | Chart placeholder |
| **Pengguna** | Admin, Pimpinan |
| **Kondisi saat ini** | EmptyState |
| **Manfaat** | Visualisasi data |
| **Ketergantungan** | Perlu chart library |
| **Risiko** | Bundle size |
| **Kompleksitas** | Sedang |
| **Perlu konfirmasi bisnis?** | Ya — chart apa |

| Aspek | Isi |
|-------|-----|
| **Nama fitur** | Export Laporan |
| **Masalah** | Tombol placeholder |
| **Pengguna** | Admin, Pimpinan |
| **Kondisi saat ini** | Tidak berfungsi |
| **Manfaat** | Laporan bisa dicetak |
| **Ketergantungan** | Perlu library export |
| **Risiko** | Complexitas rendering |
| **Kompleksitas** | Sedang - Tinggi |
| **Perlu konfirmasi bisnis?** | Ya — format apa |

### 5.5 Integrasi Eksternal

| Aspek | Isi |
|-------|-----|
| **Nama fitur** | Payment Gateway |
| **Masalah** | Simulasi manual |
| **Pengguna** | User, Operator |
| **Kondisi saat ini** | Manual |
| **Manfaat** | Pembayaran real |
| **Ketergantungan** | Midtrans/Flip/VA |
| **Risiko** | Biaya, compliance |
| **Kompleksitas** | Tinggi |
| **Perlu konfirmasi bisnis?** | Ya |

| Aspek | Isi |
|-------|-----|
| **Nama fitur** | File Upload |
| **Masalah** | Model ada, UI tidak ada |
| **Pengguna** | User, Operator |
| **Kondisi saat ini** | Tidak ada upload |
| **Manfaat** | Lampirkan berkas |
| **Ketergantungan** | File storage service |
| **Risiko** | Biaya storage |
| **Kompleksitas** | Sedang - Tinggi |
| **Perlu konfirmasi bisnis?** | Ya — berkas apa |

| Aspek | Isi |
|-------|-----|
| **Nama fitur** | Email Notifikasi |
| **Masalah** | Tidak ada email |
| **Pengguna** | Semua user |
| **Kondisi saat ini** | Tidak ada |
| **Manfaat** | Info via email |
| **Ketergantungan** | Email service |
| **Risiko** | Biaya, deliverability |
| **Kompleksitas** | Tinggi |
| **Perlu konfirmasi bisnis?** | Ya — email apa |

### 5.6 Performa dan Skalabilitas

| Aspek | Isi |
|-------|-----|
| **Nama fitur** | Optimasi Caching |
| **Masalah** | Hanya 3 queries di-cache |
| **Pengguna** | Semua user |
| **Kondisi saat ini** | `unstable_cache` terbatas |
| **Manfaat** | Load time lebih cepat |
| **Ketergantungan** | Pattern sudah ada |
| **Risiko** | Cache invalidation |
| **Kompleksitas** | Rendah - Sedang |
| **Perlu konfirmasi bisnis?** | Tidak |

---

## 6. RINGKASAN KOMPLEKSITAS

| Kompleksitas | Jumlah Fitur | Contoh |
|-------------|-------------|--------|
| Rendah | 6 | Hubungkan publik ke DB, Halaman pengumuman, Edit profil, Ubah password, Optimasi caching, Pagination server-side |
| Sedang | 5 | Notifikasi otomatis, Server-side search, Chart laporan, Fitur LEADER/AUDITOR |
| Sedang - Tinggi | 3 | Export laporan, File upload, Fitur AUDITOR |
| Tinggi | 2 | Payment gateway, Email notifikasi |

---

## 7. REKOMENDASI PRIORITAS

> **Catatan:** Prioritas berikut adalah saran berdasarkan kompleksitas dan dampak. Keputusan akhir ada pada pemilik sistem.

### Prioritas 1 — Quick Wins (Kompleksitas Rendah)

1. Hubungkan halaman publik ke database
2. Buat halaman publik pengumuman
3. Implementasi edit profil
4. Implementasi ubah password
5. Tambahkan pagination server-side untuk admin tables

### Prioritas 2 — Core Improvements (Kompleksitas Sedang)

6. Implementasi notifikasi otomatis
7. Implementasi server-side search
8. Definisikan fitur khusus LEADER dan AUDITOR
9. Tambahkan chart laporan

### Prioritas 3 — Major Features (Kompleksitas Tinggi)

10. File upload untuk berkas dan bukti bayar
11. Export laporan (PDF/Excel)
12. Payment gateway integration
13. Email notifikasi
