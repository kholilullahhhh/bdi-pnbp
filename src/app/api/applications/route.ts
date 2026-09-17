import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole, getClientIp } from "@/lib/auth-helpers";
import { generateApplicationNumber } from "@/lib/utils";
import { applicationSchema } from "@/validations";

export async function GET(request: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;
  const { session } = authResult;

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const status = searchParams.get("status");
  const serviceId = searchParams.get("serviceId");

  const where: Record<string, unknown> = {};

  // User can only see own applications; operator+ sees all
  if (session.role === "USER") {
    where.userId = session.userId;
  }

  if (status) {
    where.status = status;
  }
  if (serviceId) {
    where.serviceId = serviceId;
  }

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
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
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.application.count({ where }),
  ]);

  return NextResponse.json({
    data: applications,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  const authResult = await requireRole("USER", "OPERATOR", "ADMIN");
  if (authResult.error) return authResult.error;
  const { session } = authResult;

  try {
    const body = await request.json();
    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { serviceId, notes } = parsed.data;

    // Verify service exists and is active
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        tariffs: {
          where: { verificationStatus: "VERIFIED" },
          orderBy: { effectiveStartDate: "desc" },
          take: 1,
        },
      },
    });

    if (!service || !service.isActive) {
      return NextResponse.json(
        { error: "Layanan tidak ditemukan atau tidak aktif" },
        { status: 404 }
      );
    }

    // Generate unique application number with retry
    let applicationNumber = generateApplicationNumber();
    let attempts = 0;
    while (attempts < 10) {
      const existing = await prisma.application.findUnique({
        where: { applicationNumber },
      });
      if (!existing) break;
      applicationNumber = generateApplicationNumber();
      attempts++;
    }

    // Create application with tariff snapshot
    const application = await prisma.application.create({
      data: {
        applicationNumber,
        serviceName: service.name,
        serviceId,
        userId: session.userId,
        status: "DRAFT",
        notes: notes || null,
        statusHistory: {
          create: {
            newStatus: "DRAFT",
            notes: "Permohonan dibuat",
            changedById: session.userId,
          },
        },
      },
      include: {
        service: true,
      },
    });

    // If service has verified tariff, create invoice with tariff snapshot
    const verifiedTariff = service.tariffs[0];
    if (verifiedTariff) {
      const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;
      await prisma.invoice.create({
        data: {
          invoiceNumber,
          applicationId: application.id,
          totalAmount: verifiedTariff.price,
          status: "PENDING",
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          items: {
            create: {
              serviceId,
              tariffId: verifiedTariff.id,
              description: verifiedTariff.name,
              quantity: 1,
              unitPrice: verifiedTariff.price,
              totalPrice: verifiedTariff.price,
            },
          },
        },
      });

      // Update application payment status
      await prisma.application.update({
        where: { id: application.id },
        data: { paymentStatus: "AWAITING_PAYMENT" },
      });
    } else {
      // No tariff — mark as NOT_APPLICABLE
      await prisma.application.update({
        where: { id: application.id },
        data: { paymentStatus: "NOT_APPLICABLE" },
      });
    }

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "CREATE",
        entity: "Application",
        entityId: application.id,
        newData: { applicationNumber, serviceId },
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json(
      { data: application, message: "Permohonan berhasil dibuat" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Gagal membuat permohonan" },
      { status: 500 }
    );
  }
}
