"use client";

import { usePathname } from "next/navigation";
import SideNav from "./SideNav";
import Header from "./Header";
import React, { useState } from "react";
import { useUserRole } from "@/hooks/useUserSession";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useUserRole();
  const pathname = usePathname();
  const hideSideNav = pathname === "/";
  const hideHeader = pathname === "/";

  // Sidebar minimized state
  const [minimized, setMinimized] = useState(false);

  if (hideSideNav && hideHeader) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {!hideSideNav && role && (
        <div
          className={`${
            minimized ? "w-32" : "w-72"
          } h-screen sticky top-0 transition-all duration-300`}
        >
          <SideNav role={role} minimized={minimized} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-5">
        {!hideHeader && (
          <Header minimized={minimized} setMinimized={setMinimized} />
        )}
        {children}
      </div>
    </div>
  );
}
