"use client";

import { useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

export function UserBadge({ className }: { className?: string }) {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) return null;

  return (
    <div className={`px-3 py-2.5 flex items-center gap-3 rounded-lg hover:bg-white/5 transition-colors ${className || ""}`}>
      <Avatar
        size="sm"
        fallback={getInitials(user.name || "U")}
        className="ring-2 ring-white/10"
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-white truncate">
          {user.name}
        </p>
        <p className="text-[10px] text-slate-400 truncate">
          {user.email}
        </p>
      </div>
    </div>
  );
}
