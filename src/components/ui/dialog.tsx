"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={cn(
        "backdrop:bg-black/50 backdrop:backdrop-blur-sm rounded-xl border border-border shadow-lg p-0 w-full max-w-lg m-auto",
        className
      )}
    >
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-lg hover:bg-surface-alt text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Tutup"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </dialog>
  );
}

interface DialogHeaderProps {
  title: string;
  description?: string;
}

export function DialogHeader({ title, description }: DialogHeaderProps) {
  return (
    <div className="px-6 pt-6 pb-4">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
  return <div className={cn("px-6 pb-4", className)}>{children}</div>;
}

interface DialogFooterProps {
  children: React.ReactNode;
}

export function DialogFooter({ children }: DialogFooterProps) {
  return (
    <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-2">
      {children}
    </div>
  );
}
