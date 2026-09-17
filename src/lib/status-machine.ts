import { ApplicationStatus } from "@prisma/client";

type StatusTransition = {
  from: ApplicationStatus;
  to: ApplicationStatus;
  allowedRoles: string[];
  requiresPayment?: boolean;
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
    allowedRoles: ["OPERATOR", "ADMIN"],
  },
  {
    from: "UNDER_REVIEW",
    to: "REVISION_REQUIRED",
    allowedRoles: ["OPERATOR", "ADMIN"],
  },
  {
    from: "UNDER_REVIEW",
    to: "APPROVED",
    allowedRoles: ["OPERATOR", "ADMIN"],
    requiresPayment: true,
  },
  {
    from: "UNDER_REVIEW",
    to: "REJECTED",
    allowedRoles: ["OPERATOR", "ADMIN"],
  },
  {
    from: "APPROVED",
    to: "COMPLETED",
    allowedRoles: ["OPERATOR", "ADMIN"],
  },
];

export function canTransition(
  currentStatus: ApplicationStatus,
  targetStatus: ApplicationStatus,
  userRole: string
): { allowed: boolean; reason?: string } {
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
      reason: `Peran ${userRole} tidak memiliki wwenangan untuk transisi ini`,
    };
  }

  return { allowed: true };
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
