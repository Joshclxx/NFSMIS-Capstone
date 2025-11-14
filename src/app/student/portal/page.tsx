"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/hooks/useUserSession";
import { Toaster } from "react-hot-toast";

export default function Portal() {
  const router = useRouter();

  const loggedIn = useUserSession((s) => s.loggedIn);
  const userRole = useUserSession((s) => s.userRole);
  const userEmail = useUserSession((s) => s.userEmail);
  const logout = useUserSession((s) => s.logout);

  useEffect(() => {
    if (!loggedIn) router.replace("/");
    else if (userRole !== "Student") router.replace("/admin/dashboard");
  }, [loggedIn, userRole, router]);

  return (
    <>
      <Toaster position="top-center" />
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">STUDENT ACCOUNT</p>
        </div>
      </div>
    </>
  );
}
