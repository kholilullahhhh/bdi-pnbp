import { ApplicationStatus } from "@prisma/client";

type StatusTransition = {
  from: ApplicationStatus;
  to: ApplicationStatus;
  allowedRoles: string[];
  requiresPayment?: boolean;
  requiresRejectionReason?: boolean;
};

// Define all allowed status transitions
export const STATUS_TRANSITIONS: StatusTransition[] = [
  // User actions
  {
    from: "DRAFT",
    to: "SUBMITTED",
    allowedRoles: ["USER"],
  },
  {
    from: "REVISION_REQUIRED",
    to: "SUBMITTED",
    allowedRoles: ["USER"],
  },
  {
    from: "DRAFT",
    to: "CANCELLED",
    allowedRoles: ["USER"],
  },
  {
    from: "SUBMITTED",
    to: "CANCELLED",
    allowedRoles: ["USER"],
  },

  // Operator actions
  {
    from: "SUBMITTED",
    to: "UNDER_REVIEW",
    allowedRoles: ["OPERATOR", "ADMIN", "SUPER_ADMIN"],
  },
  {
    from: "UNDER_REVIEW",
    to: "REVISION_REQUIRED",
    allowedRoles: ["OPERATOR", "ADMIN", "SUPER_ADMIN"],
  },
  {
    from: "UNDER_REVIEW",
    to: "APPROVED",
    allowedRoles: ["OPERATOR", "ADMIN", "SUPER_ADMIN"],
    requiresPayment: true,
  },
  {
    from: "UNDER_REVIEW",
    to: "REJECTED",
    allowedRoles: ["OPERATOR", "ADMIN", "SUPER_ADMIN"],
    requiresRejectionReason: true,
  },
  {
    from: "APPROVED",
    to: "COMPLETED",
    allowedRoles: ["OPERATOR", "ADMIN", "SUPER_ADMIN"],
  },
];

export function canTransition(
  currentStatus: ApplicationStatus,
  targetStatus: ApplicationStatus,
  userRole: string
): { allowed: boolean; reason?: string; requiresPayment?: boolean; requiresRejectionReason?: boolean } {
  const transition = STATUS_TRANSITIONS.find(
    (t) => t.from === currentStatus && t.to === targetStatus
  );

  if (!transition) {
    return {
      allowed: false,
      reason: `Transisi dari ${currentStatus} ke ${targetStatus} tidak diizinkan`,
    };
  }

  if (!transition.allowedRoles.includes(userRole)) {
    return {
      allowed: false,
      reason: `Peran ${userRole} tidak memiliki wewenangan untuk transisi ini`,
    };
  }

  return {
    allowed: true,
    requiresPayment: transition.requiresPayment,
    requiresRejectionReason: transition.requiresRejectionReason,
  };
}

export function getValidTransitions(
  currentStatus: ApplicationStatus,
  userRole: string
): ApplicationStatus[] {
  return STATUS_TRANSITIONS
    .filter(
      (t) => t.from === currentStatus && t.allowedRoles.includes(userRole)
    )
    .map((t) => t.to);
}
