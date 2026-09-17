import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().optional(),
  instansi: z.string().optional(),
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export const applicationSchema = z.object({
  serviceId: z.string().min(1, "Pilih layanan"),
  notes: z.string().optional(),
});

export const serviceSchema = z.object({
  name: z.string().min(2, "Nama layanan minimal 2 karakter"),
  slug: z.string().min(2, "Slug minimal 2 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  categoryId: z.string().min(1, "Pilih kategori"),
  targetUser: z.string().optional(),
  requirements: z.string().optional(),
  procedure: z.string().optional(),
  paymentInfo: z.string().optional(),
  cancellation: z.string().optional(),
  estimationTime: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "UNVERIFIED"]),
});

export const tariffSchema = z.object({
  serviceId: z.string().min(1, "Pilih layanan"),
  name: z.string().min(2, "Nama tarif minimal 2 karakter"),
  price: z.number().min(0, "Harga tidak boleh negatif"),
  unit: z.string().min(1, "Satuan harus diisi"),
  description: z.string().optional(),
  legalBasis: z.string().optional(),
  regulationNumber: z.string().optional(),
  regulationYear: z.number().optional(),
  effectiveStartDate: z.string().min(1, "Tanggal mulai harus diisi"),
  effectiveEndDate: z.string().optional(),
});

export const announcementSchema = z.object({
  title: z.string().min(2, "Judul minimal 2 karakter"),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  isPublished: z.boolean().default(false),
});

export const faqSchema = z.object({
  question: z.string().min(5, "Pertanyaan minimal 5 karakter"),
  answer: z.string().min(5, "Jawaban minimal 5 karakter"),
  category: z.string().optional(),
  sortOrder: z.number().default(0),
  isActive: z.boolean().default(true),
});
