import {
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  Shield,
  Edit,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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
    {
      icon: Calendar,
      label: "Tanggal Daftar",
      value: formatDate(user.createdAt),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profil Saya</h1>
        <p className="text-muted-foreground mt-1">
          Informasi akun dan pengaturan profil
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <Avatar size="xl" fallback={getInitials(user.name)} className="mx-auto" />
            <h2 className="text-xl font-bold text-foreground mt-4">
              {user.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
            <Badge className="mt-3">
              <Shield className="h-3 w-3 mr-1" />
              {user.role}
            </Badge>
            <Separator className="my-5" />
            <Button variant="outline" className="w-full">
              <Edit className="mr-1.5 h-4 w-4" />
              Edit Profil
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Detail Akun</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {profileFields.map((field, i) => (
                <div key={field.label}>
                  <div className="flex items-center gap-4 py-3.5">
                    <div className="w-9 h-9 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
                      <field.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {field.label}
                      </p>
                      <p className="text-sm font-medium text-foreground mt-0.5">
                        {field.value}
                      </p>
                    </div>
                  </div>
                  {i < profileFields.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
