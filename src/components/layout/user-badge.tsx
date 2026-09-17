"use client";

import { useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

export function UserBadge({ className }: { className?: string }) {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) return null;

  return (
    <div className={`px-3 py-2 flex items-center gap-2.5 ${className || ""}`}>
      <Avatar
        size="sm"
        fallback={getInitials(user.name || "U")}
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-foreground truncate">
          {user.name}
        </p>
        <p className="text-[10px] text-muted-foreground truncate">
          {user.email}
        </p>
      </div>
    </div>
  );
}
