"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, User as UserIcon, Settings, ChevronDown } from "lucide-react";
import { useUserSession, useLogout } from "@/hooks/useUserSession";

export default function SideNavFooter() {
  const router = useRouter();
  const logout = useLogout();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const userEmail = useUserSession((s) => s.userEmail);
  const userRole = useUserSession((s) => s.userRole);

  if (!mounted) return null;

  const initials =
    (userEmail ?? "?").split("@")[0].slice(0, 2).toUpperCase() || "?";

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <div className="relative border-t border-white/20 p-3 text-white">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between rounded bg-white/10 hover:bg-white/15 px-2 py-2"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center text-sm font-semibold">
            <span>{initials}</span>
          </div>
          <div className="min-w-0 text-left">
            <div className="truncate text-sm font-medium max-w-[150px]">
              {userEmail ?? "Guest"}
            </div>
            <div className="truncate text-xs text-white/70 max-w-[150px]">
              {userRole ?? "signed out"}
            </div>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute bottom-14 left-3 w-[220px] bg-neutral-800 border border-white/20 rounded-md shadow-lg overflow-hidden z-50">
          <div className="px-3 py-2 border-b border-white/10">
            <div className="font-medium text-sm truncate">
              {userEmail ?? "Guest"}
            </div>
            <div className="text-xs text-white/60">
              {userRole ?? "signed out"}
            </div>
          </div>

          <button
            onClick={() => router.push("/account")}
            className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-white/10"
          >
            <UserIcon size={14} /> Profile
          </button>

          <button
            onClick={() => router.push("/settings")}
            className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-white/10"
          >
            <Settings size={14} /> Settings
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/10"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
