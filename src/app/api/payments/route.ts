import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, getClientIp } from "@/lib/auth-helpers";
import { z } from "zod";

const paymentSchema = z.object({
  invoiceId: z.string().min(1, "Invoice ID wajib diisi"),
  amount: z.number().positive("Jumlah harus positif"),
  paymentMethod: z.string().min(1, "Metode pembayaran wajib diisi"),
  paymentReference: z.string().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;
  const { session } = authResult;

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const status = searchParams.get("status");

  const where: Record<string, unknown> = {};

  // User can only see own payments
  if (session.role === "USER") {
    where.invoice = {
      application: { userId: session.userId },
    };
  }

  if (status) {
    where.status = status;
  }

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
      where,
      include: {
        invoice: {
          include: {
            application: {
              select: {
                id: true,
                applicationNumber: true,
                serviceName: true,
                userId: true,
              },
            },
          },
        },
        verifier: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.payment.count({ where }),
  ]);

  return NextResponse.json({
    data: payments,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;
  const { session } = authResult;

  try {
    const body = await request.json();
    const parsed = paymentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { invoiceId, amount, paymentMethod, paymentReference, bankName, accountNumber, notes } = parsed.data;

    // Verify invoice exists and user owns it
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { application: true },
    });

    if (!invoice) {
      return NextResponse.json(
        { error: "Invoice tidak ditemukan" },
        { status: 404 }
      );
    }

    if (session.role === "USER" && invoice.application.userId !== session.userId) {
      return NextResponse.json(
        { error: "Akses ditolak" },
        { status: 403 }
      );
    }

    if (invoice.status === "PAID") {
      return NextResponse.json(
        { error: "Invoice sudah lunas" },
        { status: 400 }
      );
    }

    // Generate payment number
    const paymentNumber = `PAY-${Date.now().toString(36).toUpperCase()}`;

    const payment = await prisma.payment.create({
      data: {
        paymentNumber,
        invoiceId,
        amount,
        paymentMethod,
        paymentReference: paymentReference || null,
        bankName: bankName || null,
        accountNumber: accountNumber || null,
        notes: notes || null,
        status: "PENDING",
        paidAt: new Date(),
      },
      include: {
        invoice: true,
      },
    });

    // Create payment event
    await prisma.paymentEvent.create({
      data: {
        paymentId: payment.id,
        eventType: "SUBMITTED",
        eventData: { amount, paymentMethod, bankName },
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "CREATE",
        entity: "Payment",
        entityId: payment.id,
        newData: { paymentNumber, invoiceId, amount },
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json(
      { data: payment, message: "Pembayaran berhasil dicatat" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Gagal mencatat pembayaran" },
      { status: 500 }
    );
  }
}
