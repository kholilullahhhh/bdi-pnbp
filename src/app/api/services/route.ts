import { NextResponse } from "next/server";

// Mock data - akan diganti dengan database setelah Neon terkoneksi
const services = [
  {
    id: "1",
    name: "Pelatihan Penyelia Halal",
    slug: "pelatihan-penyelia-halal",
    description: "Pelatihan penyelia halal untuk produk makanan dan minuman. Dilaksanakan secara daring dengan materi komprehensif tentang tata cara penyeliahan halal.",
    targetUser: "UMKM, Industri Kecil, Masyarakat Umum",
    estimationTime: "2-3 hari pelatihan",
    status: "ACTIVE",
    category: { name: "Diklat & Pelatihan", slug: "diklat" },
    tariffs: [{ price: 500000, unit: "Peserta", verificationStatus: "UNVERIFIED" }],
  },
  {
    id: "2",
    name: "Pandu Kakao",
    slug: "pandu-kakao",
    description: "Program pendampingan pengolahan kakao menjadi produk bernilai tambah. Meliputi teknik penyangraian, penggilingan, dan pembuatan produk olahan kakao.",
    targetUser: "Petani Kakao, UMKM, Industri Kecil",
    estimationTime: "3-5 hari",
    status: "ACTIVE",
    category: { name: "Diklat & Pelatihan", slug: "diklat" },
    tariffs: [],
  },
  {
    id: "3",
    name: "Jasa Narasumber Teknis",
    slug: "jasa-narasumber-teknis",
    description: "Penyediaan narasumber ahli untuk seminar, workshop, dan pendampingan teknis di bidang industri pangan, agro, dan fitofarmaka.",
    targetUser: "Instansi Pemerintah, Dunia Usaha, Perguruan Tinggi",
    estimationTime: "Sesuai kesepakatan",
    status: "ACTIVE",
    category: { name: "Jasa Narasumber", slug: "narasumber" },
    tariffs: [],
  },
  {
    id: "4",
    name: "Sewa Aula",
    slug: "sewa-aula",
    description: "Penyewaan aula BDI Makassar dengan kapasitas hingga 300 orang. Cocok untuk seminar, workshop, atau acara besar lainnya.",
    targetUser: "Instansi, Organisasi, Masyarakat",
    estimationTime: "Sesuai durasi sewa",
    status: "ACTIVE",
    category: { name: "Penyewaan Fasilitas", slug: "penyewaan" },
    tariffs: [],
  },
  {
    id: "5",
    name: "Wisata Edukasi Cokelat",
    slug: "wisata-edukasi-cokelat",
    description: "Paket wisata edukasi pembuatan cokelat praline. Peserta akan belajar langsung proses pembuatan cokelat dari bahan mentah hingga produk jadi.",
    targetUser: "Sekolah, Universitas, Komunitas",
    estimationTime: "1 hari kunjungan",
    status: "ACTIVE",
    category: { name: "Wisata Edukasi", slug: "wisata" },
    tariffs: [{ price: 1000000, unit: "Paket (maks. 25 orang)", verificationStatus: "VERIFIED" }],
  },
  {
    id: "6",
    name: "Sertifikasi Kompetensi",
    slug: "sertifikasi-kompetensi",
    description: "Layanan sertifikasi kompetensi profesi melalui LSP P1 BDI Makassar yang terlisensi BNSP dengan 15 skema sertifikasi.",
    targetUser: "Alumni Pelatihan, Masyarakat",
    estimationTime: "1-2 hari uji",
    status: "ACTIVE",
    category: { name: "Sertifikasi Kompetensi", slug: "sertifikasi" },
    tariffs: [],
  },
];

export async function GET() {
  return NextResponse.json(services);
}
