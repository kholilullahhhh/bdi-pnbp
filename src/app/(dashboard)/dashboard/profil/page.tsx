export const dynamic = "force-dynamic";

import { User, Mail, Phone, Building2, Calendar, Shield, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate, getInitials } from "@/lib/utils";

export default async function ProfilPage() {
  const session = await auth();
  const userId = (session?.user as unknown as { id: string })?.id;
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true },
  });
  if (!user) return null;

  const profileFields = [
    { icon: User, label: "Nama Lengkap", value: user.name },
    { icon: Mail, label: "Email", value: user.email },
    { icon: Phone, label: "Telepon", value: user.phone || "-" },
    { icon: Building2, label: "Instansi", value: user.profile?.instansi || user.instansi || "-" },
    { icon: Calendar, label: "Tanggal Daftar", value: formatDate(user.createdAt) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profil Saya</h1>
        <p className="text-muted-foreground mt-1">Informasi akun dan pengaturan profil</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="h-24 bg-gradient-to-br from-blue-600 to-blue-700 relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          </div>
          <div className="px-6 pb-6 text-center -mt-10">
            <Avatar size="xl" fallback={getInitials(user.name)} className="mx-auto ring-4 ring-white" />
            <h2 className="text-xl font-bold text-foreground mt-3">{user.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
            <Badge className="mt-3"><Shield className="h-3 w-3 mr-1" />{user.role}</Badge>
            <div className="mt-5">
              <Button variant="outline" className="w-full">
                <Edit className="mr-1.5 h-4 w-4" />
                Edit Profil
              </Button>
            </div>
          </div>
        </div>

        {/* Detail Card */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-base font-bold text-foreground">Detail Akun</h3>
          </div>
          <div className="p-6">
            <div className="space-y-0">
              {profileFields.map((field, i) => (
                <div key={field.label}>
                  <div className="flex items-center gap-4 py-3.5">
                    <div className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center flex-shrink-0">
                      <field.icon className="h-4.5 w-4.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{field.label}</p>
                      <p className="text-sm font-medium text-foreground mt-0.5">{field.value}</p>
                    </div>
                  </div>
                  {i < profileFields.length - 1 && <div className="border-b border-border/60" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
