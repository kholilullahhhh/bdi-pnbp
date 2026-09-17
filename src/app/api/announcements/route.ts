import { NextResponse } from "next/server";

const announcements = [
  {
    id: "1",
    title: "Pembukaan Pendaftaran Pelatihan Penyelia Halal Angkatan XI",
    content: "Balai Diklat Industri Makassar membuka pendaftaran Pelatihan Penyelia Halal Angkatan XI yang akan dilaksanakan secara daring. Segera daftarkan diri Anda!",
    publishedAt: "2026-09-15",
  },
  {
    id: "2",
    title: "Jadwal Libur Nasional September 2026",
    content: "BDI Makassar libur pada hari-hari besar nasional. Untuk informasi jadwal layanan, silakan hubungi 0411-556617.",
    publishedAt: "2026-09-10",
  },
  {
    id: "3",
    title: "Wisata Edukasi Cokelat - Open Registration",
    content: "Paket wisata edukasi pembuatan cokelat praline tersedia untuk kunjungan sekolah dan komunitas. Harga Rp 1.000.000/paket (maks 25 orang).",
    publishedAt: "2026-09-01",
  },
];

export async function GET() {
  return NextResponse.json(announcements);
}
