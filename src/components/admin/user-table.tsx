"use client";

import { useState } from "react";
import { Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { UserManage } from "@/components/admin/user-manage";
import { formatDateShort, getInitials } from "@/lib/utils";

const roleVariant: Record<string, "default" | "secondary" | "destructive" | "info"> = {
  ADMIN: "destructive",
  SUPER_ADMIN: "destructive",
  OPERATOR: "info",
  USER: "secondary",
};

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Date | string;
}

export function UserTable({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");
  const [manageUser, setManageUser] = useState<User | null>(null);

  const filtered = users.filter(
    (u) =>
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manajemen Pengguna</h1>
          <p className="text-muted-foreground mt-1">Kelola akun pengguna sistem</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Daftar Pengguna ({filtered.length})</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cari nama atau email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <EmptyState icon={<Users className="h-8 w-8" />} title="Tidak ada pengguna" description="Tidak ada pengguna yang terdaftar." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Pengguna</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Terdaftar</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors cursor-pointer"
                      onClick={() => setManageUser(u)}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm" fallback={getInitials(u.name)} />
                          <span className="font-medium text-foreground">{u.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">{u.email}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant={roleVariant[u.role] || "secondary"}>{u.role}</Badge>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={u.isActive ? "success" : "destructive"}>
                          {u.isActive ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">{formatDateShort(u.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {manageUser && (
        <UserManage
          open={!!manageUser}
          onClose={() => setManageUser(null)}
          user={manageUser}
        />
      )}
    </>
  );
}
