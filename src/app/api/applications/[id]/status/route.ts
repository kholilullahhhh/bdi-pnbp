import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, getClientIp } from "@/lib/auth-helpers";
import { canTransition } from "@/lib/status-machine";
import { z } from "zod";

const statusSchema = z.object({
  status: z.enum([
    "SUBMITTED",
    "UNDER_REVIEW",
    "REVISION_REQUIRED",
    "APPROVED",
    "REJECTED",
    "COMPLETED",
    "CANCELLED",
  ]),
  notes: z.string().optional(),
  rejectionReason: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;
  const { session } = authResult;
  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = statusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { status: targetStatus, notes, rejectionReason } = parsed.data;

    const application = await prisma.application.findUnique({
      where: { id },
      include: { invoice: true },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Permohonan tidak ditemukan" },
        { status: 404 }
      );
    }

    // Check ownership for USER role
    if (session.role === "USER" && application.userId !== session.userId) {
      return NextResponse.json(
        { error: "Akses ditolak" },
        { status: 403 }
      );
    }

    // Validate transition
    const transition = canTransition(
      application.status,
      targetStatus,
      session.role
    );

    if (!transition.allowed) {
      return NextResponse.json(
        { error: transition.reason },
        { status: 400 }
      );
    }

    // Check payment requirement
    if (transition.requiresPayment) {
      if (application.paymentStatus === "AWAITING_PAYMENT" || application.paymentStatus === "NOT_APPLICABLE") {
        return NextResponse.json(
          { error: "Pembayaran belum lunas. Verifikasi pembayaran terlebih dahulu." },
          { status: 400 }
        );
      }
    }

    // Check rejection reason requirement
    if (transition.requiresRejectionReason && !rejectionReason) {
      return NextResponse.json(
        { error: "Alasan penolakan wajib diisi" },
        { status: 400 }
      );
    }

    // Update application status
    const updateData: Record<string, unknown> = {
      status: targetStatus,
    };

    if (targetStatus === "SUBMITTED") {
      updateData.submittedAt = new Date();
    } else if (targetStatus === "UNDER_REVIEW" || targetStatus === "REVISION_REQUIRED" || targetStatus === "APPROVED" || targetStatus === "REJECTED") {
      updateData.reviewedAt = new Date();
    } else if (targetStatus === "COMPLETED") {
      updateData.completedAt = new Date();
    }

    if (targetStatus === "REJECTED" && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    // Execute in transaction
    const [updated] = await prisma.$transaction([
      prisma.application.update({
        where: { id },
        data: updateData,
      }),
      prisma.applicationStatusHistory.create({
        data: {
          applicationId: id,
          oldStatus: application.status,
          newStatus: targetStatus,
          notes: notes || null,
          changedById: session.userId,
        },
      }),
      prisma.auditLog.create({
        data: {
          userId: session.userId,
          action: "STATUS_CHANGE",
          entity: "Application",
          entityId: id,
          oldData: { status: application.status },
          newData: { status: targetStatus, notes },
          ipAddress: getClientIp(request),
        },
      }),
    ]);

    // Create notification for the application owner
    const statusLabels: Record<string, string> = {
      SUBMITTED: "Permohonan Anda telah dikirim",
      UNDER_REVIEW: "Permohonan Anda sedang ditinjau",
      REVISION_REQUIRED: "Permohonan Anda membutuhkan revisi",
      APPROVED: "Permohonan Anda telah disetujui",
      REJECTED: "Permohonan Anda ditolak",
      COMPLETED: "Layanan Anda telah selesai",
      CANCELLED: "Permohonan Anda dibatalkan",
    };

    const notificationMessages: Record<string, string> = {
      REVISION_REQUIRED: `Petugas meminta revisi: ${notes || "Tidak ada catatan"}`,
      REJECTED: `Alasan penolakan: ${rejectionReason}`,
      APPROVED: "Pembayaran telah terverifikasi. Permohonan disetujui.",
      COMPLETED: "Layanan telah selesai. Silakan cek detail permohonan.",
    };

    await prisma.notification.create({
      data: {
        userId: application.userId,
        title: statusLabels[targetStatus] || `Status diperbarui ke ${targetStatus}`,
        message: notificationMessages[targetStatus] || `Status permohonan ${application.applicationNumber} diperbarui`,
        type: targetStatus === "REJECTED" ? "warning" : targetStatus === "COMPLETED" ? "success" : "info",
        link: `/dashboard/permohonan`,
      },
    });

    return NextResponse.json({
      data: updated,
      message: `Status berhasil diubah ke ${targetStatus}`,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "Gagal mengubah status" },
      { status: 500 }
    );
  }
}
