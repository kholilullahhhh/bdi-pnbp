"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UserManageProps {
  open: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
  };
}

const roles = [
  { value: "USER", label: "User" },
  { value: "OPERATOR", label: "Operator" },
  { value: "ADMIN", label: "Admin" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "LEADER", label: "Leader" },
  { value: "AUDITOR", label: "Auditor" },
];

export function UserManage({ open, onClose, user }: UserManageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(user.role);
  const [isActive, setIsActive] = useState(user.isActive);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, isActive }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal memperbarui");
        return;
      }

      toast.success(data.message || "Berhasil diperbarui");
      onClose();
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader
        title={`Kelola: ${user.name}`}
        description={user.email}
      />
      <div className="px-6 pb-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Status Akun</p>
            <p className="text-xs text-muted-foreground">
              {isActive ? "Akun aktif" : "Akun dinonaktifkan"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`w-10 h-6 rounded-full relative transition-colors ${
              isActive ? "bg-primary-600" : "bg-gray-300"
            }`}
            aria-label={isActive ? "Nonaktifkan" : "Aktifkan"}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                isActive ? "right-1" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Batal</Button>
        <Button onClick={handleUpdate} loading={loading}>Simpan</Button>
      </DialogFooter>
    </Dialog>
  );
}
