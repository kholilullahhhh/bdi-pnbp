# Analisis Proses Bisnis PNBP BDI Makassar

> Tanggal Pemeriksaan: 17 September 2026

## A. AS-IS (Proses Saat Ini)

### 1. Proses Diklat & Pelatihan

**Aktor**: Calon Peserta, Admin BDI, Instruktur

**Alur**:
1. Calon peserta mengakses website untuk melihat agenda kegiatan
2. Calon peserta memilih program pelatihan yang tersedia
3. Calon peserta mengisi formulir pendaftaran (online atau manual)
4. Admin melakukan verifikasi data dan ketersediaan kuota
5. Admin mengirimkan konfirmasi dan instruksi pembayaran
6. Peserta melakukan pembayaran (mekanisme tidak jelas di website)
7. Admin mencatat pembayaran dan mengkonfirmasi pendaftaran
8. Peserta mengikuti pelatihan
9. Peserta mengikuti uji sertifikasi (LSP)
10. LSP menerbitkan sertifikat kompetensi
11. Untuk program 3 in 1: proses penempatan kerja

**Dokumen**:
- Formulir pendaftaran
- Kartu peserta
- Daftar hadir
- Sertifikat pelatihan
- Sertifikat kompetensi (LSP)

**Sistem Eksternal**:
- Website BDI (informasi dan form pendaftaran)
- SIDIA (sistem informasi diklat nasional)
- WhatsApp (komunikasi)

**Titik Pembayaran**:
- Belum terverifikasi - tidak ada informasi kanal pembayaran

**Proses Validasi**:
- Verifikasi manual oleh admin
- Pengecekan kelengkapan berkas

**Potensi Duplikasi Data**:
- Data peserta mungkin diinput di multiple sistem (website, SIDIA, spreadsheet)
- Tidak ada integrasi otomatis antara form pendaftaran dan database

**Hambatan**:
- Tarif PNBP tidak dipublikasikan secara transparan di website
- Mekanisme pembayaran tidak jelas
- Tidak ada dashboard untuk melacak status pendaftaran
- Tidak ada notifikasi otomatis

---

### 2. Proses Penyewaan Fasilitas

**Aktor**: Penyewa, Admin BDI

**Alur**:
1. Penyewa mengakses form penyewaan di website
2. Penyewa mengisi data diri dan detail penyewaan
3. Penyewa memilih ruangan dan tanggal
4. Penyewa submit pendaftaran
5. Admin melakukan verifikasi jadwal
6. Admin mengkonfirmasi ketersediaan dan mengirimkan tagihan
7. Penyewa melakukan pembayaran
8. Admin mengkonfirmasi pembayaran
9. Penyewa menggunakan fasilitas

**Dokumen**:
- Formulir penyewaan
- Konfirmasi jadwal
- Tagihan/bukti pembayaran

**Kekurangan Informasi**:
- Tarif penyewaan tidak ditampilkan di form (Rp 0)
- Tidak ada informasi kanal pembayaran
- Tidak ada sistem booking real-time
- Tidak ada kalender ketersediaan yang interaktif

---

### 3. Proses Wisata Edukasi

**Aktor**: Penanggung Jawab, Admin BDI

**Alur**:
1. Penanggung Jawab mengakses form wisata edukasi
2. Mengisi data penanggung jawab
3. Memilih paket wisata (Cokelat Praline atau Pizza)
4. Menentukan tanggal kunjungan dan jumlah peserta
5. Sistem menghitung total pembayaran otomatis
6. Submit pendaftaran
7. Admin verifikasi jadwal
8. Konfirmasi pembayaran
9. Pelaksanaan kunjungan

**Dokumen**:
- Formulir pendaftaran
- Ringkasan pendaftaran
- Konfirmasi jadwal

**Kelebihan**:
- Form sudah menampilkan tarif (Rp 1.000.000/paket)
- Perhitungan otomatis berdasarkan jumlah peserta
- Proses relatif transparan

**Kekurangan**:
- Pembayaran masih manual
- Tidak ada integrasi payment gateway

---

### 4. Proses Sertifikasi (LSP)

**Aktor**: Alumni Pelatihan, LSP BDI, Asesor, BNSP

**Alur**:
1. Alumni pelatihan mendaftar sertifikasi
2. LSP melakukan verifikasi persyaratan
3. Penjadwalan uji kompetensi
4. Pelaksanaan uji oleh asesor
5. Penilaian hasil uji
6. Penerbitan sertifikat oleh LSP
7. Pelaporan ke BNSP

**Dokumen**:
- Formulir pendaftaran sertifikasi
- Portofolio
- Hasil penilaian
- Sertifikat kompetensi

**Sistem Eksternal**:
- BNSP (otoritas sertifikasi)
- LSP P1 BDI Makassar (pelaksana)

---

## B. TO-BE (Proses Usulan Digitalisasi)

### Prinsip Digitalisasi
1. Transparansi tarif dan prosedur
2. Kemudahan akses informasi
3. Efisiensi proses administrasi
4. Akuntabilitas pencatatan
5. Kepatuhan regulasi

### Alur Umum yang Diusulkan

#### 1. Proses Diklat & Pelatihan (Digital)

```
Calon Peserta → Akses Website → Lihat Katalog Layanan
    ↓
Pilih Program → Lihat Detail (tarif, persyaratan, jadwal)
    ↓
Daftar Online → Isi Formulir → Upload Dokumen
    ↓
Sistem Terima → Notifikasi ke Admin
    ↓
Admin Review → Verifikasi Kelengkapan
    ↓
[Approved] → Terbitkan Invoice → Notifikasi ke Peserta
[Rejected] → Notifikasi Revisi → Peserta Perbaiki
    ↓
Peserta Bayar → Via Kanal Resmi (e-Billing/VNPA/Transfer)
    ↓
Admin Verifikasi Pembayaran → Update Status
    ↓
Peserta Terima Konfirmasi → Ikuti Pelatihan
    ↓
Uji Sertifikasi → Sertifikat Diterbitkan
    ↓
Proses Selesai → Laporan Otomatis
```

#### 2. Proses Penyewaan Fasilitas (Digital)

```
Penyewa → Akses Website → Lihat Fasilitas
    ↓
Pilih Ruangan → Cek Ketersediaan (Kalender)
    ↓
Isi Form Penyewaan → Pilih Tanggal
    ↓
Sistem Cek Konflik → Validasi
    ↓
Terbitkan Invoice → Notifikasi ke Penyewa
    ↓
Penyewa Bayar → Via Kanal Resmi
    ↓
Admin Verifikasi → Konfirmasi Booking
    ↓
Penyewa Terima Voucher → Gunakan Fasilitas
```

#### 3. Proses Wisata Edukasi (Digital)

```
Penanggung Jawab → Akses Website → Lihat Paket
    ↓
Pilih Paket → Hitung Biaya (otomatis)
    ↓
Isi Form Pendaftaran
    ↓
Sistem Terima → Cek Jadwal
    ↓
Terbitkan Invoice → Notifikasi
    ↓
Pembayaran → Verifikasi
    ↓
Konfirmasi Kunjungan → Pelaksanaan
```

### Modul yang Diperlukan

| Modul | Fungsi | Prioritas |
|-------|--------|-----------|
| Katalog Layanan Publik | Menampilkan informasi layanan, tarif, prosedur | Tinggi |
| Form Pendaftaran Online | Penerimaan pendaftaran dengan validasi | Tinggi |
| Dashboard Pengguna | Pelacak status pendaftaran dan pembayaran | Tinggi |
| Dashboard Admin | Manajemen data, verifikasi, pelaporan | Tinggi |
| Modul Invoice | Penerbitan tagihan otomatis | Sedang |
| Modul Pembayaran | Pencatatan dan verifikasi pembayaran | Sedang |
| Modul Laporan | Rekapitulasi dan ekspor data | Sedang |
| Modul Notifikasi | Pemberitahuan status via email/SMS | Rendah |
| Modul Audit Log | Pencatatan aktivitas | Rendah |

### Catatan Penting

1. **Tidak menggantikan SIDIA**: Sistem ini melengkapi, bukan menggantikan sistem nasional
2. **Mekanisme Pembayaran**: Mengikuti mekanisme resmi yang berlaku di Kemenperin
3. **Verifikasi Pembayaran**: Tidak otomatis "Paid" - tetap membutuhkan verifikasi resmi
4. **Integrasi**: Terbuka untuk integrasi dengan sistem pemerintah jika tersedia API
