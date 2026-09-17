"use client";

import { Dialog, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  loading?: boolean;
}

export function DeleteConfirm({ open, onClose, onConfirm, title, description, loading }: DeleteConfirmProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader title={title} description={description} />
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Batal</Button>
        <Button variant="destructive" onClick={onConfirm} loading={loading}>
          Hapus
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
