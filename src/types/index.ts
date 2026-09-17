import type {
  User,
  Profile,
  ServiceCategory,
  Service,
  ServiceTariff,
  Application,
  ApplicationDocument,
  ApplicationStatusHistory,
  Invoice,
  InvoiceItem,
  Payment,
  PaymentEvent,
  PaymentProof,
  Notification,
  Announcement,
  FAQ,
  AuditLog,
  SystemSetting,
} from "@prisma/client";

export type {
  User,
  Profile,
  ServiceCategory,
  Service,
  ServiceTariff,
  Application,
  ApplicationDocument,
  ApplicationStatusHistory,
  Invoice,
  InvoiceItem,
  Payment,
  PaymentEvent,
  PaymentProof,
  Notification,
  Announcement,
  FAQ,
  AuditLog,
  SystemSetting,
};

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  completedApplications: number;
  totalRevenue: number;
  verifiedRevenue: number;
  monthlyTransactions: number;
}

export interface ServiceWithCategory extends Service {
  category: ServiceCategory;
  tariffs: ServiceTariff[];
}

export interface ApplicationWithDetails extends Application {
  service: Service;
  user: {
    name: string;
    email: string;
  };
  invoice?: {
    id: string;
    invoiceNumber: string;
    totalAmount: number;
    status: string;
  } | null;
}

export interface InvoiceWithDetails extends Invoice {
  application: {
    id: string;
    applicationNumber: string;
    serviceName: string;
    user: {
      name: string;
      email: string;
    };
  };
  items: InvoiceItem[];
  payments: Payment[];
}

export interface PaymentWithDetails extends Payment {
  invoice: {
    invoiceNumber: string;
    application: {
      applicationNumber: string;
      serviceName: string;
    };
  };
}

export interface ReportFilter {
  startDate?: string;
  endDate?: string;
  serviceId?: string;
  status?: string;
  month?: number;
  year?: number;
}

export interface ReportSummary {
  totalApplications: number;
  totalInvoices: number;
  totalBilled: number;
  totalPaid: number;
  totalFailed: number;
  totalRefunded: number;
  netRevenue: number;
}
