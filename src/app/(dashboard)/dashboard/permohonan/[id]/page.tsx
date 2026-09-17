export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, FileText, Clock, CheckCircle2, XCircle,
  Send, RotateCcw, Eye, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getStatusLabel, getStatusVariant, formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import { getValidTransitions } from "@/lib/status-machine";
import { ApplicationActions } from "@/components/dashboard/application-actions";
import { RevisionPanel } from "@/components/dashboard/revision-panel";

const statusIcons: Record<string, typeof Clock> = {
  DRAFT: FileText,
  SUBMITTED: Send,
  UNDER_REVIEW: Eye,
  REVISION_REQUIRED: RotateCcw,
  APPROVED: CheckCircle2,
  REJECTED: XCircle,
  COMPLETED: CheckCircle2,
  CANCELLED: XCircle,
};

const statusColors: Record<string, string> = {
  DRAFT: "text-gray-500 bg-gray-50",
  SUBMITTED: "text-blue-600 bg-blue-50",
  UNDER_REVIEW: "text-amber-600 bg-amber-50",
  REVISION_REQUIRED: "text-orange-600 bg-orange-50",
  APPROVED: "text-emerald-600 bg-emerald-50",
  REJECTED: "text-red-600 bg-red-50",
  COMPLETED: "text-green-600 bg-green-50",
  CANCELLED: "text-gray-600 bg-gray-50",
};

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const userId = (session?.user as unknown as { id: string })?.id;
  const userRole = (session?.user as unknown as { role: string })?.role;
  if (!userId) return null;

  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      service: { select: { name: true, slug: true, description: true, requirements: true, procedure: true } },
      user: { select: { id: true, name: true, email: true, phone: true, instansi: true } },
      invoice: {
        include: {
          items: true,
          payments: { orderBy: { createdAt: "desc" } },
        },
      },
      statusHistory: {
        orderBy: { changedAt: "asc" },
        include: { changedBy: { select: { name: true, role: true } } },
      },
      documents: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!application) notFound();

  if (userRole === "USER" && application.userId !== userId) notFound();

  const validTransitions = getValidTransitions(application.status, userRole || "USER");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Link
            href="/dashboard/permohonan"
            className="mt-1 p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">
                {application.applicationNumber}
              </h1>
              <Badge variant={getStatusVariant(application.status)}>
                {getStatusLabel(application.status)}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              {application.serviceName} — Dibuat {formatDate(application.createdAt)}
            </p>
          </div>
        </div>
        <ApplicationActions
          applicationId={application.id}
          currentStatus={application.status}
          validTransitions={validTransitions}
          userRole={userRole || "USER"}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Application Info */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground">Informasi Permohonan</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nomor</p>
                <p className="text-sm font-mono font-medium text-foreground mt-1">{application.applicationNumber}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Layanan</p>
                <p className="text-sm font-medium text-foreground mt-1">{application.serviceName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</p>
                <Badge variant={getStatusVariant(application.status)} className="mt-1">
                  {getStatusLabel(application.status)}
                </Badge>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status Pembayaran</p>
                <Badge variant={getStatusVariant(application.paymentStatus)} className="mt-1">
                  {getStatusLabel(application.paymentStatus)}
                </Badge>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dibuat</p>
                <p className="text-sm text-foreground mt-1">{formatDateTime(application.createdAt)}</p>
              </div>
              {application.submittedAt && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dikirim</p>
                  <p className="text-sm text-foreground mt-1">{formatDateTime(application.submittedAt)}</p>
                </div>
              )}
              {application.completedAt && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Selesai</p>
                  <p className="text-sm text-foreground mt-1">{formatDateTime(application.completedAt)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Service Details */}
          {application.service && (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-base font-bold text-foreground">Detail Layanan</h3>
              </div>
              <div className="p-6 space-y-4">
                {application.service.description && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Deskripsi</p>
                    <p className="text-sm text-foreground leading-relaxed">{application.service.description}</p>
                  </div>
                )}
                {application.service.requirements && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Persyaratan</p>
                    <p className="text-sm text-foreground whitespace-pre-line">{application.service.requirements}</p>
                  </div>
                )}
                {application.service.procedure && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Prosedur</p>
                    <p className="text-sm text-foreground whitespace-pre-line">{application.service.procedure}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {application.notes && (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-base font-bold text-foreground">Catatan</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-foreground whitespace-pre-line">{application.notes}</p>
              </div>
            </div>
          )}

          {/* Rejection Reason */}
          {application.rejectionReason && (
            <div className="bg-red-50 rounded-xl border border-red-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-red-200">
                <h3 className="text-base font-bold text-red-800 flex items-center gap-2">
                  <XCircle className="h-5 w-5" /> Alasan Penolakan
                </h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-red-700">{application.rejectionReason}</p>
              </div>
            </div>
          )}

          {/* Revision Panel */}
          {application.status === "REVISION_REQUIRED" && userRole === "USER" && (
            <RevisionPanel applicationId={application.id} currentNotes={application.notes} />
          )}

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground">Riwayat Proses</h3>
            </div>
            <div className="p-6">
              {application.statusHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada riwayat</p>
              ) : (
                <div className="space-y-0">
                  {application.statusHistory.map((history, index) => {
                    const Icon = statusIcons[history.newStatus] || Clock;
                    const colorClass = statusColors[history.newStatus] || "text-gray-500 bg-gray-50";
                    return (
                      <div key={history.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          {index < application.statusHistory.length - 1 && (
                            <div className="w-0.5 h-full bg-border min-h-[40px]" />
                          )}
                        </div>
                        <div className="pb-8 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-foreground">
                              {getStatusLabel(history.newStatus)}
                            </p>
                            {history.oldStatus && (
                              <span className="text-xs text-muted-foreground">
                                dari {getStatusLabel(history.oldStatus)}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatDateTime(history.changedAt)}
                            {history.changedBy && ` — ${history.changedBy.name}`}
                          </p>
                          {history.notes && (
                            <p className="text-sm text-foreground mt-1 bg-surface rounded-lg p-2">
                              {history.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Applicant Info (for operators) */}
          {userRole !== "USER" && (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-base font-bold text-foreground">Data Pemohon</h3>
              </div>
              <div className="p-6 space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nama</p>
                  <p className="text-sm font-medium text-foreground mt-1">{application.user.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</p>
                  <p className="text-sm text-foreground mt-1">{application.user.email}</p>
                </div>
                {application.user.phone && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Telepon</p>
                    <p className="text-sm text-foreground mt-1">{application.user.phone}</p>
                  </div>
                )}
                {application.user.instansi && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Instansi</p>
                    <p className="text-sm text-foreground mt-1">{application.user.instansi}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Invoice */}
          {application.invoice && (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-base font-bold text-foreground">Tagihan</h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nomor Invoice</span>
                  <span className="text-sm font-mono text-foreground">{application.invoice.invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</span>
                  <span className="text-sm font-bold text-foreground">{formatCurrency(Number(application.invoice.totalAmount))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Terbayar</span>
                  <span className="text-sm text-foreground">{formatCurrency(Number(application.invoice.paidAmount))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</span>
                  <Badge variant={getStatusVariant(application.invoice.status)}>
                    {getStatusLabel(application.invoice.status)}
                  </Badge>
                </div>

                {/* Invoice Items */}
                {application.invoice.items.length > 0 && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Rincian</p>
                    {application.invoice.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm py-1">
                        <span className="text-foreground">{item.description}</span>
                        <span className="font-mono text-foreground">{formatCurrency(Number(item.totalPrice))}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Payments */}
                {application.invoice.payments.length > 0 && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Pembayaran</p>
                    {application.invoice.payments.map((payment) => (
                      <div key={payment.id} className="flex justify-between items-center text-sm py-1">
                        <div>
                          <span className="font-mono text-xs text-muted-foreground">{payment.paymentNumber}</span>
                          <Badge variant={getStatusVariant(payment.status)} className="ml-2 text-[10px]">
                            {getStatusLabel(payment.status)}
                          </Badge>
                        </div>
                        <span className="font-mono text-foreground">{formatCurrency(Number(payment.amount))}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Documents */}
          {application.documents.length > 0 && (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-base font-bold text-foreground">Dokumen</h3>
              </div>
              <div className="p-6 space-y-2">
                {application.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-3 p-2 hover:bg-surface rounded-lg">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{doc.fileName}</p>
                      <p className="text-xs text-muted-foreground">{doc.documentType || "Dokumen"}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
