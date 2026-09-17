import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, getClientIp } from "@/lib/auth-helpers";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const verifySchema = z.object({
  status: z.enum(["PAID", "FAILED"]),
  notes: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireRole("OPERATOR", "ADMIN", "SUPER_ADMIN");
  if (authResult.error) return authResult.error;
  const { session } = authResult;
  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { status: targetStatus, notes } = parsed.data;

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        invoice: {
          include: { application: true },
        },
      },
    });

    if (!payment) {
      return NextResponse.json(
        { error: "Pembayaran tidak ditemukan" },
        { status: 404 }
      );
    }

    // Idempotency: if already in target status, return success without double-counting
    if (payment.status === targetStatus) {
      return NextResponse.json({
        data: payment,
        message: `Pembayaran sudah dalam status ${targetStatus}`,
      });
    }

    if (payment.status !== "PENDING") {
      return NextResponse.json(
        { error: "Hanya pembayaran dengan status PENDING yang dapat diverifikasi" },
        { status: 400 }
      );
    }

    const now = new Date();

    // Execute everything in a single transaction for atomicity
    const results = await prisma.$transaction(async (tx) => {
      const paymentUpdate = await tx.payment.update({
        where: { id },
        data: {
          status: targetStatus,
          verifiedById: session.userId,
          verifiedAt: now,
          notes: notes || undefined,
        },
      });

      await tx.paymentEvent.create({
        data: {
          paymentId: id,
          eventType: targetStatus === "PAID" ? "VERIFIED" : "FAILED",
          eventData: { verifiedBy: session.userId, notes },
        },
      });

      await tx.auditLog.create({
        data: {
          userId: session.userId,
          action: "VERIFY_PAYMENT",
          entity: "Payment",
          entityId: id,
          oldData: { status: payment.status } as Prisma.InputJsonValue,
          newData: { status: targetStatus, notes } as Prisma.InputJsonValue,
          ipAddress: getClientIp(request),
        },
      });

      if (targetStatus === "PAID") {
        const totalPaid = await tx.payment.aggregate({
          where: {
            invoiceId: payment.invoiceId,
            status: "PAID",
          },
          _sum: { amount: true },
        });

        const paidAmount = totalPaid._sum.amount || 0;
        const invoiceAmount = payment.invoice.totalAmount;
        const isFullyPaid = Number(paidAmount) >= Number(invoiceAmount);

        await tx.invoice.update({
          where: { id: payment.invoiceId },
          data: {
            paidAmount: paidAmount,
            status: isFullyPaid ? "PAID" : "PENDING",
          },
        });

        if (isFullyPaid) {
          await tx.application.update({
            where: { id: payment.invoice.applicationId },
            data: { paymentStatus: "PAID" },
          });
        }
      } else {
        await tx.application.update({
          where: { id: payment.invoice.applicationId },
          data: { paymentStatus: "FAILED" },
        });
      }

      return paymentUpdate;
    });

    // Create notification for the application owner
    await prisma.notification.create({
      data: {
        userId: payment.invoice.application.userId,
        title: targetStatus === "PAID" ? "Pembayaran diverifikasi" : "Pembayaran ditolak",
        message: targetStatus === "PAID"
          ? `Pembayaran untuk ${payment.invoice.application.applicationNumber} telah diverifikasi`
          : `Pembayaran ditolak: ${notes || "Tidak ada catatan"}`,
        type: targetStatus === "PAID" ? "success" : "warning",
        link: "/dashboard/pembayaran",
      },
    });

    return NextResponse.json({
      data: results,
      message: `Pembayaran berhasil ${targetStatus === "PAID" ? "diverifikasi" : "ditolak"}`,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Gagal memverifikasi pembayaran" },
      { status: 500 }
    );
  }
}
