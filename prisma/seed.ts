import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@bdi-makassar.go.id" },
    update: {},
    create: {
      email: "admin@bdi-makassar.go.id",
      password: adminPassword,
      name: "Administrator BDI",
      role: "ADMIN",
      isActive: true,
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Create operator user
  const operatorPassword = await bcrypt.hash("operator123", 12);
  const operator = await prisma.user.upsert({
    where: { email: "operator@bdi-makassar.go.id" },
    update: {},
    create: {
      email: "operator@bdi-makassar.go.id",
      password: operatorPassword,
      name: "Operator BDI",
      role: "OPERATOR",
      isActive: true,
    },
  });
  console.log("✅ Operator user created:", operator.email);

  // Create test user
  const userPassword = await bcrypt.hash("user123", 12);
  const testUser = await prisma.user.upsert({
    where: { email: "user@contoh.com" },
    update: {},
    create: {
      email: "user@contoh.com",
      password: userPassword,
      name: "User Contoh",
      role: "USER",
      phone: "081234567890",
      instansi: "PT Contoh Nusantara",
      isActive: true,
    },
  });
  console.log("✅ Test user created:", testUser.email);

  // Create service categories
  const categories = [
    { name: "Diklat & Pelatihan", slug: "diklat", description: "Pelatihan berbasis kompetensi industri", icon: "GraduationCap", sortOrder: 1 },
    { name: "Jasa Narasumber", slug: "narasumber", description: "Seminar, workshop, dan pendampingan teknis", icon: "Users", sortOrder: 2 },
    { name: "Penyewaan Fasilitas", slug: "penyewaan", description: "Aula, ruang belajar, asrama", icon: "Home", sortOrder: 3 },
    { name: "Wisata Edukasi", slug: "wisata", description: "Kunjungan industri untuk pembelajaran", icon: "Compass", sortOrder: 4 },
    { name: "Sertifikasi Kompetensi", slug: "sertifikasi", description: "Lembaga Sertifikasi Profesi BNSP", icon: "Award", sortOrder: 5 },
  ];

  const createdCategories = [];
  for (const cat of categories) {
    const created = await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    createdCategories.push(created);
  }
  console.log("✅ Service categories created");

  // Create services
  const services = [
    {
      name: "Pelatihan Penyelia Halal",
      slug: "pelatihan-penyelia-halal",
      description: "Pelatihan penyelia halal untuk produk makanan dan minuman. Dilaksanakan secara daring dengan materi komprehensif tentang tata cara penyeliahan halal.",
      targetUser: "UMKM, Industri Kecil, Masyarakat Umum",
      requirements: "1. KTP/Paspor\n2. Pas foto 3x4\n3. Surat pengantar dari instansi (jika ditugaskan)",
      procedure: "1. Daftar online\n2. Verifikasi data\n3. Pembayaran\n4. Mengikuti pelatihan daring\n5. Uji kompetensi\n6. Penerbitan sertifikat",
      paymentInfo: "Pembayaran melalui transfer bank setelah konfirmasi admin",
      estimationTime: "2-3 hari pelatihan",
      categoryId: createdCategories[0].id,
      status: "ACTIVE",
      sortOrder: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
    },
    {
      name: "Pandu Kakao",
      slug: "pandu-kakao",
      description: "Program pendampingan pengolahan kakao menjadi produk bernilai tambah. Meliputi teknik penyangraian, penggilingan, dan pembuatan produk olahan kakao.",
      targetUser: "Petani Kakao, UMKM, Industri Kecil",
      requirements: "1. KTP\n2. Surat keterangan usaha",
      procedure: "1. Daftar online\n2. Verifikasi\n3. Pembayaran\n4. Mengikuti pelatihan\n5. Praktik langsung",
      estimationTime: "3-5 hari",
      categoryId: createdCategories[0].id,
      status: "ACTIVE",
      sortOrder: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80",
    },
    {
      name: "Jasa Narasumber Teknis",
      slug: "jasa-narasumber-teknis",
      description: "Penyediaan narasumber ahli untuk seminar, workshop, dan pendampingan teknis di bidang industri pangan, agro, dan fitofarmaka.",
      targetUser: "Instansi Pemerintah, Dunia Usaha, Perguruan Tinggi",
      requirements: "1. Surat permohonan\n2. Topik dan jadwal kegiatan",
      procedure: "1. Hubungi via WhatsApp\n2. Konsultasi kebutuhan\n3. Kesepakatan jadwal\n4. Penerbitan instruksi bayar\n5. Pelaksanaan kegiatan",
      paymentInfo: "Tarif berdasarkan kesepakatan kontrak",
      categoryId: createdCategories[1].id,
      status: "ACTIVE",
      sortOrder: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    },
    {
      name: "Sewa Aula",
      slug: "sewa-aula",
      description: "Penyewaan aula BDI Makassar dengan kapasitas hingga 300 orang. Cocok untuk seminar, workshop, atau acara besar lainnya.",
      targetUser: "Instansi, Organisasi, Masyarakat",
      requirements: "1. Formulir penyewaan\n2. Identitas penyewa\n3. Surat permohonan",
      procedure: "1. Isi form online\n2. Pilih tanggal\n3. Verifikasi jadwal\n4. Pembayaran\n5. Penggunaan fasilitas",
      estimationTime: "Sesuai durasi sewa",
      categoryId: createdCategories[2].id,
      status: "ACTIVE",
      sortOrder: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=80",
    },
    {
      name: "Wisata Edukasi Cokelat",
      slug: "wisata-edukasi-cokelat",
      description: "Paket wisata edukasi pembuatan cokelat praline. Peserta akan belajar langsung proses pembuatan cokelat dari bahan mentah hingga produk jadi.",
      targetUser: "Sekolah, Universitas, Komunitas",
      requirements: "1. Formulir pendaftaran\n2. Minimal 1 paket (25 orang)",
      procedure: "1. Isi form online\n2. Pilih paket\n3. Verifikasi jadwal\n4. Pembayaran\n5. Kunjungan",
      paymentInfo: "Rp 1.000.000 per paket (maks. 25 orang)",
      estimationTime: "1 hari kunjungan",
      categoryId: createdCategories[3].id,
      status: "ACTIVE",
      sortOrder: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1600&q=80",
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: { imageUrl: service.imageUrl },
      create: service as Parameters<typeof prisma.service.create>[0]["data"],
    });
  }
  console.log("✅ Services created");

  // Create tariffs (only for verified ones)
  const cokelatService = await prisma.service.findUnique({ where: { slug: "wisata-edukasi-cokelat" } });
  if (cokelatService) {
    await prisma.serviceTariff.create({
      data: {
        serviceId: cokelatService.id,
        name: "Paket Wisata Edukasi Cokelat Praline",
        price: 1000000,
        unit: "Paket (maks. 25 orang)",
        description: "Termasuk fasilitas pelatihan dan bahan baku",
        legalBasis: "PP 54/2021 tentang Jenis dan Tarif PNBP Kemenperin",
        regulationNumber: "PP 54/2021",
        regulationYear: 2021,
        effectiveStartDate: new Date("2024-01-01"),
        verificationStatus: "VERIFIED",
        createdById: admin.id,
        verifiedById: admin.id,
        verifiedAt: new Date(),
      },
    });
  }

  const pizzaService = await prisma.service.findUnique({ where: { slug: "wisata-edukasi-cokelat" } });
  // Create another tariff for pizza if needed

  // Create announcements
  await prisma.announcement.create({
    data: {
      title: "Pembukaan Pendaftaran Pelatihan Penyelia Halal Angkatan XI",
      content: "Balai Diklat Industri Makassar membuka pendaftaran Pelatihan Penyelia Halal Angkatan XI yang akan dilaksanakan secara daring. Segera daftarkan diri Anda!",
      isPublished: true,
      publishedAt: new Date(),
      createdById: admin.id,
    },
  });

  await prisma.announcement.create({
    data: {
      title: "Jadwal Libur Nasional",
      content: "BDI Makassar libur pada hari-hari besar nasional. Untuk informasi jadwal layanan, silakan hubungi 0411-556617.",
      isPublished: true,
      publishedAt: new Date(),
      createdById: admin.id,
    },
  });
  console.log("✅ Announcements created");

  // Create FAQs
  const faqs = [
    {
      question: "Apa itu PNBP?",
      answer: "PNBP adalah Penerimaan Negara Bukan Pajak, yaitu penerimaan negara yang berasal dari penerimaan bukan pajak yang dipungut berdasarkan undang-undang atau peraturan yang berlaku. Di BDI Makassar, PNBP diperoleh dari layanan pelatihan, sertifikasi, penyewaan fasilitas, dan lainnya.",
      category: "Umum",
      sortOrder: 1,
    },
    {
      question: "Bagaimana cara mendaftar pelatihan di BDI Makassar?",
      answer: "Anda dapat mendaftar melalui website resmi kami di bagian Layanan, atau menghubungi WhatsApp kami di 0822-9331-9335. Pendaftaran juga dapat dilakukan datang langsung ke kantor BDI Makassar.",
      category: "Pendaftaran",
      sortOrder: 2,
    },
    {
      question: "Apakah pelatihan di BDI Makassar dipungut biaya?",
      answer: "Beberapa program pelatihan kami dikenakan tarif PNBP sesuai ketentuan yang berlaku, sementara program lainnya mungkin gratis (dibiayai APBN). Informasi tarif akan ditampilkan pada setiap program yang tersedia.",
      category: "Tarif",
      sortOrder: 3,
    },
    {
      question: "Bagaimana cara pembayaran PNBP?",
      answer: "Setelah pendaftaran Anda diverifikasi, Anda akan menerima instruksi pembayaran. Pembayaran dapat dilakukan melalui transfer bank atau mekanisme lain yang ditentukan. Konfirmasi pembayaran akan diverifikasi oleh petugas kami.",
      category: "Pembayaran",
      sortOrder: 4,
    },
    {
      question: "Apakah saya bisa membatalkan pendaftaran?",
      answer: "Pembatalan dapat dilakukan sebelum batas waktu yang ditentukan. Hubungi kami untuk informasi lebih lanjut mengenai kebijakan pembatalan dan pengembalian dana.",
      category: "Pembatalan",
      sortOrder: 5,
    },
    {
      question: "Apakah BDI Makassar menyediakan sertifikasi?",
      answer: "Ya, BDI Makassar memiliki Lembaga Sertifikasi Profesi (LSP) P1 yang terlisensi BNSP dengan 15 skema sertifikasi kompetensi di bidang pengolahan pangan dan industri.",
      category: "Sertifikasi",
      sortOrder: 6,
    },
    {
      question: "Bagaimana cara menyewa fasilitas BDI Makassar?",
      answer: "Anda dapat menyewa aula, ruang rapat, atau asrama melalui form online di website kami. Pilih fasilitas yang tersedia, tentukan tanggal, dan submit pendaftaran. Admin akan memverifikasi jadwal dan mengirimkan tagihan.",
      category: "Penyewaan",
      sortOrder: 7,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: {
        ...faq,
        isActive: true,
        createdById: admin.id,
      },
    });
  }
  console.log("✅ FAQs created");

  // Seed system settings
  const systemSettings = [
    { key: "institution.name", value: "Balai Diklat Industri Makassar", group: "institution" },
    { key: "institution.shortName", value: "BDI Makassar", group: "institution" },
    { key: "institution.ministry", value: "Kementerian Perindustrian RI", group: "institution" },
    { key: "website.main", value: "bdimakassar.kemenperin.go.id", group: "website" },
    { key: "website.alt", value: "bdimakassar.id", group: "website" },
    { key: "website.sidia", value: "sidia.kemenperin.go.id", group: "website" },
    { key: "contact.email", value: "bdimks.kemenperin@gmail.com", group: "contact" },
    { key: "contact.phone", value: "0411-556617", group: "contact" },
    { key: "contact.whatsapp", value: "0822-9331-9335", group: "contact" },
    { key: "notifications.emailEnabled", value: "true", group: "notifications" },
    { key: "notifications.autoEnabled", value: "false", group: "notifications" },
  ];

  for (const setting of systemSettings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log("✅ System settings seeded");

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
