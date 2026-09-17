import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <DashboardSidebar />
      <div className="lg:pl-64 transition-all duration-300">
        <DashboardHeader />
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
