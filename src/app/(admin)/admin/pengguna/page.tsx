"use client";

import { useState } from "react";
import { Users, Search, Plus, Shield, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const users = [
  { id: "1", name: "Administrator", email: "admin@bdi-makassar.go.id", role: "ADMIN", isActive: true, joinedAt: "2026-01-01" },
  { id: "2", name: "Operator Layanan", email: "operator@bdi-makassar.go.id", role: "OPERATOR", isActive: true, joinedAt: "2026-01-01" },
  { id: "3", name: "User Demo", email: "user@contoh.com", role: "USER", isActive: true, joinedAt: "2026-09-17" },
];

const roleBadge: Record<string, string> = { ADMIN: "bg-red-100 text-red-800", OPERATOR: "bg-blue-100 text-blue-800", USER: "bg-gray-100 text-gray-800" };

export default function PenggunaPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna</h1><p className="text-gray-600">Kelola akun pengguna sistem</p></div>
        <Button><Plus className="h-4 w-4 mr-2" />Tambah Pengguna</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Pengguna</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Cari nama atau email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Nama</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Terdaftar</th>
              </tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium flex items-center gap-2"><div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"><Users className="h-4 w-4 text-blue-600" /></div>{u.name}</td>
                    <td className="py-3 px-4 text-gray-600">{u.email}</td>
                    <td className="py-3 px-4"><Badge className={roleBadge[u.role]}>{u.role}</Badge></td>
                    <td className="py-3 px-4"><Badge className={u.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>{u.isActive ? "Aktif" : "Nonaktif"}</Badge></td>
                    <td className="py-3 px-4 text-gray-600">{new Date(u.joinedAt).toLocaleDateString("id-ID")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
