import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
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

export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function generateApplicationNumber(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const r = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `PNBP-${y}${m}-${r}`;
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    DRAFT: "Draft",
    SUBMITTED: "Diajukan",
    UNDER_REVIEW: "Sedang Diproses",
    REVISION_REQUIRED: "Perlu Revisi",
    APPROVED: "Disetujui",
    REJECTED: "Ditolak",
    COMPLETED: "Selesai",
    CANCELLED: "Dibatalkan",
    NOT_APPLICABLE: "Tidak Berlaku",
    PENDING: "Menunggu",
    AWAITING_PAYMENT: "Menunggu Pembayaran",
    PAID: "Lunas",
    FAILED: "Gagal",
    EXPIRED: "Kadaluarsa",
    REFUNDED: "Dikembalikan",
    ACTIVE: "Aktif",
    INACTIVE: "Nonaktif",
    UNVERIFIED: "Belum Terverifikasi",
    VERIFIED: "Terverifikasi",
  };
  return map[status] || status;
}

export function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" | "success" | "warning" | "info" {
  const map: Record<string, "default" | "secondary" | "destructive" | "success" | "warning" | "info"> = {
    DRAFT: "secondary",
    SUBMITTED: "info",
    UNDER_REVIEW: "warning",
    REVISION_REQUIRED: "warning",
    APPROVED: "success",
    REJECTED: "destructive",
    COMPLETED: "success",
    CANCELLED: "secondary",
    PENDING: "warning",
    AWAITING_PAYMENT: "warning",
    PAID: "success",
    FAILED: "destructive",
    ACTIVE: "success",
    INACTIVE: "destructive",
    UNVERIFIED: "warning",
    VERIFIED: "success",
  };
  return map[status] || "secondary";
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    DRAFT: "bg-gray-100 text-gray-800",
    SUBMITTED: "bg-blue-100 text-blue-800",
    UNDER_REVIEW: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    COMPLETED: "bg-emerald-100 text-emerald-800",
    CANCELLED: "bg-gray-100 text-gray-500",
    PENDING: "bg-yellow-100 text-yellow-800",
    PAID: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
    ACTIVE: "bg-green-100 text-green-800",
    INACTIVE: "bg-red-100 text-red-800",
    UNVERIFIED: "bg-yellow-100 text-yellow-800",
    VERIFIED: "bg-green-100 text-green-800",
  };
  return map[status] || "bg-gray-100 text-gray-800";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
