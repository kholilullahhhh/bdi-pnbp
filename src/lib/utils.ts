import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function generateApplicationNumber(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const r = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `PNBP-${y}${m}-${r}`;
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    DRAFT: "Draft", SUBMITTED: "Diajukan", UNDER_REVIEW: "Sedang Diproses",
    REVISION_REQUIRED: "Perlu Revisi", APPROVED: "Disetujui", REJECTED: "Ditolak",
    COMPLETED: "Selesai", CANCELLED: "Dibatalkan", NOT_APPLICABLE: "Tidak Berlaku",
    PENDING: "Menunggu", AWAITING_PAYMENT: "Menunggu Pembayaran", PAID: "Lunas",
    FAILED: "Gagal", EXPIRED: "Kadaluarsa", REFUNDED: "Dikembalikan",
    ACTIVE: "Aktif", INACTIVE: "Nonaktif", UNVERIFIED: "Belum Terverifikasi",
    VERIFIED: "Terverifikasi",
  };
  return map[status] || status;
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    DRAFT: "bg-gray-100 text-gray-800", SUBMITTED: "bg-blue-100 text-blue-800",
    UNDER_REVIEW: "bg-yellow-100 text-yellow-800", APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800", COMPLETED: "bg-emerald-100 text-emerald-800",
    CANCELLED: "bg-gray-100 text-gray-500", PENDING: "bg-yellow-100 text-yellow-800",
    PAID: "bg-green-100 text-green-800", FAILED: "bg-red-100 text-red-800",
    ACTIVE: "bg-green-100 text-green-800", INACTIVE: "bg-red-100 text-red-800",
    UNVERIFIED: "bg-yellow-100 text-yellow-800", VERIFIED: "bg-green-100 text-green-800",
  };
  return map[status] || "bg-gray-100 text-gray-800";
}
