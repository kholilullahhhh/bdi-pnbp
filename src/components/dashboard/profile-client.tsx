"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Building2, Calendar, Shield, Edit, Lock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { formatDate, getInitials } from "@/lib/utils";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  instansi: string | null;
  role: string;
  createdAt: Date;
  profile: {
    instansi: string | null;
  } | null;
}

export function ProfileClient({ user }: { user: UserProfile }) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      toast.error("Nama tidak boleh kosong");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() || null }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal memperbarui profil");
        return;
      }
      toast.success("Profil berhasil diperbarui");
      setEditOpen(false);
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Semua field password wajib diisi");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password baru minimal 6 karakter");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Konfirmasi password tidak cocok");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal mengubah password");
        return;
      }
      toast.success("Password berhasil diubah");
      setPasswordOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

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
            <div className="mt-5 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setEditOpen(true)}>
                <Edit className="mr-1.5 h-4 w-4" />
                Edit Profil
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setPasswordOpen(true)}>
                <Lock className="mr-1.5 h-4 w-4" />
                Password
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

      {/* Edit Profile Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground">Edit Profil</h3>
          <div>
            <label className="text-sm font-medium text-foreground">Nama Lengkap</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
              placeholder="Nama lengkap"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Telepon</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
              placeholder="Nomor telepon"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setEditOpen(false)} disabled={loading}>
              Batal
            </Button>
            <Button onClick={handleSaveProfile} disabled={loading}>
              <Save className="mr-1.5 h-4 w-4" />
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={passwordOpen} onClose={() => setPasswordOpen(false)}>
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground">Ubah Password</h3>
          <div>
            <label className="text-sm font-medium text-foreground">Password Saat Ini</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1"
              placeholder="Masukkan password saat ini"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Password Baru</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1"
              placeholder="Minimal 6 karakter"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Konfirmasi Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1"
              placeholder="Ulangi password baru"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setPasswordOpen(false)} disabled={loading}>
              Batal
            </Button>
            <Button onClick={handleChangePassword} disabled={loading}>
              <Lock className="mr-1.5 h-4 w-4" />
              {loading ? "Menyimpan..." : "Ubah Password"}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
