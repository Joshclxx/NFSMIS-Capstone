"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUserSession } from "@/hooks/useUserSession";
import toast from "react-hot-toast";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { loggedIn, userRole, setUser, logout } = useUserSession();

  useEffect(() => {
    if (loggedIn) {
      if (userRole === "admin") router.replace("/admin/dashboard");
      else router.replace("/student");
    }
  }, [loggedIn, userRole, router]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = email.endsWith("@iihc.edu") ? "admin" : "student";
    setUser(email, role, email, Date.now());
    if (role === "admin") router.replace("/admin/dashboard");
    else router.replace("/student");
  };

  return (
    <div className="px-4">
      <div className="w-full max-w-5xl bg-white flex flex-col md:flex-row shadow-style rounded-2xl overflow-hidden">
        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-8">Batang Ayah & Zian</p>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full p-3 rounded-[28px] focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-style"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full p-3 rounded-[28px] focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-style"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={logout}
                className="text-sm text-button mt-2 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              onClick={() => toast.success("Login Successful!")}
              type="submit"
              className="w-full py-3 bg-button text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google login */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50 transition"
            >
              <img
                src="/icons/google-login.svg"
                alt="Google Login Icon"
                className="w-5 h-5"
              />
              <span className="font-medium">Sign in with Google</span>
            </button>
          </form>
        </div>

        {/* RIGHT: Branding */}
        <div
          className="hidden md:flex w-1/2 text-white flex-col items-center justify-center"
          style={{ backgroundImage: "url('/images/login-image.svg')" }}
        >
          <img
            src="/icons/iihc-logo.svg"
            alt="Illustration"
            className="w-64 h-64 mb-4"
          />
          <p className="sub-heading text-center">
            Integrated Innovation and Hospitality Colleges, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
