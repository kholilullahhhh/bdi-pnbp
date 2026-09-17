"use client";

import { User, Mail, Phone, Building2, Calendar, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const user = {
  name: "User Demo",
  email: "user@contoh.com",
  phone: "081234567890",
  instansi: "Universitas Hasanuddin",
  role: "USER",
  joinedAt: "2026-09-17",
};

export default function ProfilPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1><p className="text-gray-600">Informasi akun Anda</p></div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><User className="h-10 w-10 text-blue-600" /></div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{user.email}</p>
            <Badge className="mt-3">{user.role}</Badge>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Detail Akun</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { icon: User, label: "Nama Lengkap", value: user.name },
              { icon: Mail, label: "Email", value: user.email },
              { icon: Phone, label: "Telepon", value: user.phone },
              { icon: Building2, label: "Instansi", value: user.instansi },
              { icon: Calendar, label: "Tanggal Daftar", value: new Date(user.joinedAt).toLocaleDateString("id-ID") },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0">
                <item.icon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <div><p className="text-xs text-gray-500">{item.label}</p><p className="text-sm font-medium text-gray-900">{item.value}</p></div>
              </div>
            ))}
            <Button variant="outline">Edit Profil</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
