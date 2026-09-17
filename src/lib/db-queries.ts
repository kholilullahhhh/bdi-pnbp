import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { formatCurrency, getStatusLabel, getStatusVariant, formatDateShort, formatDateTime } from "@/lib/utils";

export const getServices = unstable_cache(
  async () => {
    return prisma.service.findMany({
      where: { isActive: true, status: "ACTIVE" },
      include: {
        category: true,
        tariffs: {
          where: { verificationStatus: "VERIFIED" },
          orderBy: { effectiveStartDate: "desc" },
          take: 1,
        },
      },
      orderBy: { sortOrder: "asc" },
    });
  },
  ["getServices"],
  { revalidate: 60, tags: ["services"] }
);

export async function getServiceBySlug(slug: string) {
  return prisma.service.findFirst({
    where: { slug, isActive: true, status: "ACTIVE" },
    include: {
      category: true,
      tariffs: {
        where: { verificationStatus: "VERIFIED" },
        orderBy: { effectiveStartDate: "desc" },
      },
    },
  });
}

export async function getTariffs() {
  return prisma.serviceTariff.findMany({
    include: {
      service: { select: { name: true, id: true } },
      modifiedBy: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getApplications(userId?: string) {
  const where = userId ? { userId } : {};
  return prisma.application.findMany({
    where,
    include: {
      service: { select: { id: true, name: true, slug: true } },
      user: { select: { id: true, name: true, email: true } },
      invoice: {
        select: {
          id: true,
          invoiceNumber: true,
          totalAmount: true,
          status: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPayments(userId?: string) {
  return prisma.payment.findMany({
    where: userId
      ? { invoice: { application: { userId } } }
      : {},
    include: {
      invoice: {
        include: {
          application: {
            select: {
              id: true,
              applicationNumber: true,
              serviceName: true,
              userId: true,
              user: { select: { name: true, email: true } },
            },
          },
        },
      },
      verifier: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export const getAnnouncements = unstable_cache(
  async () => {
    return prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
    });
  },
  ["getAnnouncements"],
  { revalidate: 60, tags: ["announcements"] }
);

export const getFAQs = unstable_cache(
  async () => {
    return prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
  },
  ["getFAQs"],
  { revalidate: 60, tags: ["faqs"] }
);

export async function getAuditLogs() {
  return prisma.auditLog.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export async function getSystemSettings() {
  return prisma.systemSetting.findMany({
    orderBy: { key: "asc" },
  });
}

export async function getNotifications(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getReportSummary() {
  const [totalApps, pendingApps, completedApps, totalUsers, totalBilled, totalPaid, rejectedApps] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] } } }),
    prisma.application.count({ where: { status: "COMPLETED" } }),
    prisma.user.count({ where: { isActive: true } }),
    prisma.invoice.aggregate({ _sum: { totalAmount: true } }),
    prisma.payment.aggregate({ where: { status: "PAID" }, _sum: { amount: true } }),
    prisma.application.count({ where: { status: "REJECTED" } }),
  ]);

  const billedAmount = totalBilled._sum.totalAmount ? Number(totalBilled._sum.totalAmount) : 0;
  const paidAmount = totalPaid._sum.amount ? Number(totalPaid._sum.amount) : 0;

  return {
    totalApps,
    pendingApps,
    completedApps,
    totalUsers,
    rejectedApps,
    billedAmount,
    paidAmount,
  };
}

export { formatCurrency, getStatusLabel, getStatusVariant, formatDateShort, formatDateTime };
