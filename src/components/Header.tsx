"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LogOut,
  User as UserIcon,
  Settings,
  ChevronDown,
  Menu,
  PanelLeft,
} from "lucide-react";
import { useUserSession, useLogout } from "@/hooks/useUserSession";

type HeaderProps = {
  minimized: boolean;
  setMinimized: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ minimized, setMinimized }: HeaderProps) {
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
    <div className="flex items-center justify-center gap-2">
      <div className="container bg-white w-full p-4 shadow-style rounded-xl">
        <div className="flex justify-between gap-4 items-center relative">
          {/* Sidebar Toggle */}
          <button
            onClick={() => setMinimized((m) => !m)}
            className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/15"
          >
            {minimized ? <Menu size={20} /> : <PanelLeft size={20} />}
          </button>

          {/* Right Side */}
          <div className="flex items-center gap-4 relative">
            {/* Notifications */}
            <img
              src="/icons/notifications.svg"
              alt="Notification"
              width={32}
              height={32}
              className="rounded-full w-[34px] h-[34px] shadow-style shadow-dark"
            />

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full bg-primary/10 hover:bg-white/15 px-3 py-2"
              >
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold">
                  <span>{initials}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-[220px] bg-neutral-800 border border-white/20 rounded-md shadow-lg overflow-hidden z-50">
                  <div className="px-3 py-2 border-b border-white/10">
                    <div className="font-medium text-white text-sm truncate">
                      {userEmail ?? "Guest"}
                    </div>
                    <div className="text-xs text-white">
                      {userRole ?? "signed out"}
                    </div>
                  </div>

                  <button
                    onClick={() => router.push("/account")}
                    className="flex items-center gap-2 w-full text-white text-left px-3 py-2 text-sm hover:bg-white/10"
                  >
                    <UserIcon size={14} /> Profile
                  </button>

                  <button
                    onClick={() => router.push("/settings")}
                    className="flex items-center gap-2 w-full text-white text-left px-3 py-2 text-sm hover:bg-white/10"
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
          </div>
        </div>
      </div>
    </div>
  );
}
