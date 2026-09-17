import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <DashboardSidebar />
      <div className="lg:pl-64 transition-all duration-300">
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl">{children}</main>
      </div>
    </div>
  );
}
