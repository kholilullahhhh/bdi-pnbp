# Asumsi dan Pertanyaan Terbuka

> Tanggal Pemeriksaan: 17 September 2026

## Asumsi yang Dibuat

### Asumsi 1: Mekanisme Pembayaran
**Asumsi**: Pembayaran PNBP dilakukan melalui mekanisme manual (transfer bank atau setor ke kas) karena tidak ditemukan integrasi payment gateway di website.

**Basis**: 
- Tidak ada informasi kanal pembayaran di website
- Form wisata edukasi hanya menyebutkan "admin akan melakukan verifikasi jadwal dan konfirmasi pembayaran"
- Tidak ada tombol "Bayar Sekarang" atau integrasi payment

### Asumsi 2: Status BLU
**Asumsi**: BDI Makassar kemungkinan tidak menerapkan pengelolaan keuangan BLU (Badan Layanan Umum) secara penuh, sehingga pengelolaan PNBP menggunakan mekanisme Bendahara Penerimaan.

**Basis**:
- Tidak ditemukan informasi status BLU di website
- Tarif yang dipublikasikan sangat terbatas
- PMK 82/2025 lebih difokuskan untuk politeknik/akademi

### Asumsi 3: Target Pengguna Sistem
**Asumsi**: Sistem ini ditujukan untuk:
- Masyarakat umum yang ingin mengakses informasi layanan
- Calon peserta pelatihan yang ingin mendaftar
- Instansi/organisasi yang ingin menyewa fasilitas atau menggunakan jasa narasumber
- Admin BDI untuk mengelola data

### Asumsi 4: Tidak Ada Perubahan SOP
**Asumsi**: Sistem digital tidak mengubah SOP yang sudah berlaku, hanya mempercepat dan mempermudah proses administrasi.

### Asumsi 5: Tarif Tidak Diubah
**Asumsi**: Tarif yang ditampilkan di sistem mengikuti tarif resmi yang ditetapkan oleh Kepala BDI Makassar sesuai PP 54/2021 dan peraturan terkait.

---

## Pertanyaan Terbuka

### Pertanyaan Kritis (Mempengaruhi Arsitektur Sistem)

| No | Pertanyaan | Dampak | Sumber yang Perlu Dihubungi |
|----|-----------|--------|---------------------------|
| 1 | Apakah BDI Makassar menerapkan pengelolaan keuangan BLU? | Menentukan mekanisme pencatatan PNBP | Kepala BDI / Bagian Keuangan |
| 2 | Apakah ada kanal pembayaran resmi yang sudah terintegrasi (e-Billing, VNPA, dll)? | Menentukan modul pembayaran | Bagian Keuangan |
| 3 | Apakah BDI Makassar sudah memiliki sistem informasi internal untuk pencatatan PNBP? | Menentukan apakah perlu integrasi atau penggantian | IT/Admin |
| 4 | Bagaimana mekanisme verifikasi pembayaran saat ini? | Menentukan alur verifikasi | Admin/Bagian Keuangan |
| 5 | Apakah ada rencana integrasi dengan SIDIA atau sistem nasional lainnya? | Menentukan arsitektur integrasi | Pusdiklat BPSDMI |

### Pertanyaan Fungsional (Mempengaruhi Fitur)

| No | Pertanyaan | Dampak |
|----|-----------|--------|
| 6 | Apakah semua jenis layanan (diklat, narasumber, penyewaan, wisata) memerlukan pendaftaran online? | Menentukan cakupan modul pendaftaran |
| 7 | Apakah ada program yang gratis dan program yang berbayar? | Menentukan logika bisnis |
| 8 | Bagaimana mekanisme pembatalan/pengembalian dana? | Menentukan modul pembatalan |
| 9 | Apakah perlu fitur notifikasi email/SMS? | Menentukan integrasi notifikasi |
| 10 | Siapa yang berwenang melakukan verifikasi pembayaran? | Menentukan role dan hak akses |

### Pertanyaan Teknis (Mempengaruhi Implementasi)

| No | Pertanyaan | Dampak |
|----|-----------|--------|
| 11 | Apakah ada API yang tersedia dari SIDIA atau sistem Kemenperin? | Menentukan potensi integrasi |
| 12 | Bagaimana kebijakan keamanan data pribadi peserta? | Menentukan enkripsi dan akses |
| 13 | Apakah diperlukan fitur multi-bahasa? | Menentukan lokalisasi |
| 14 | Berapa estimasi jumlah pengguna harian? | Menentukan skala infrastruktur |
| 15 | Apakah ada kebutuhan untuk mobile app di masa depan? | Menentukan arsitektur API |

---

## Informasi yang Perlu Diverifikasi

| No | Informasi | Status Saat Ini | Cara Verifikasi |
|----|-----------|-----------------|-----------------|
| 1 | Tarif resmi setiap jenis layanan | Belum terverifikasi | Hubungi Bagian Keuangan BDI |
| 2 | Kanal pembayaran resmi | Belum terverifikasi | Hubungi Bagian Keuangan |
| 3 | Status BLU BDI Makassar | Belum terverifikasi | Hubungi Kepala BDI |
| 4 | SOP penerimaan pembayaran | Belum tersedia | Minta dokumen SOP |
| 5 | Daftar program yang dikenakan PNBP | Sebagian tersedia | Verifikasi dengan program aktual |
| 6 | Mekanisme pengembalian dana | Belum tersedia | Minta dokumen SOP |
| 7 | Format bukti pembayaran/SPTJB | Belum tersedia | Minta contoh dokumen |
| 8 | Waktu layanan yang akurat | Sebagian tersedia | Verifikasi di website |

---

## Rekomendasi

### Untuk Tahap 1 (MVP)
1. Fokus pada **katalog layanan publik** dengan informasi yang sudah terverifikasi
2. Buat **form pendaftaran online** untuk wisata edukasi (sudah ada tarif)
3. Buat **dashboard admin sederhana** untuk pencatatan
4. Gunakan **placeholder** untuk tarif yang belum terverifikasi
5. Jangan aktifkan transaksi untuk layanan dengan tarif belum terverifikasi

### Untuk Tahap 2
1. Tambahkan modul pendaftaran diklat
2. Tambahkan modul penyewaan fasilitas
3. Tambahkan dashboard pengguna
4. Tambahkan modul laporan

### Untuk Tahap Lanjutan
1. Integrasi payment gateway (jika tersedia API resmi)
2. Integrasi dengan SIDIA
3. Notifikasi otomatis
4. Mobile responsive/app

---

## Daftar Pertanyaan untuk BDI Makassar

Berikut adalah daftar pertanyaan yang perlu diajukan kepada pihak BDI Makassar untuk melengkapi analisis:

1. Apakah BDI Makassar menerapkan pengelolaan keuangan BLU?
2. Apa saja kanal pembayaran yang digunakan untuk penerimaan PNBP?
3. Bagaimana mekanisme verifikasi pembayaran saat ini?
4. Apakah ada dokumen SOP penerimaan PNBP yang bisa diakses?
5. Apa saja program/layanan yang saat ini dikenakan PNBP?
6. Berapa tarif resmi untuk setiap jenis layanan?
7. Apakah ada rencana digitalisasi pelayanan PNBP?
8. Siapa yang berwenang melakukan verifikasi pembayaran?
9. Apakah ada integrasi dengan sistem pemerintah lainnya?
10. Bagaimana mekanisme pengembalian dana jika ada pembatalan?
