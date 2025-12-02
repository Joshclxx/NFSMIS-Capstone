"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Switch } from "@/src/components/ui/switch";
import { User } from "@/src/app/admin/users/page";

interface AccountModalProps {
  show: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (u: User) => void;
}

export default function AccountModal({
  show,
  onClose,
  user,
  onSave,
}: AccountModalProps) {
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");
  const [locked, setLocked] = useState(user?.locked || false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    if (!user) return;

    onSave({
      ...user,
      email,
      role,
      locked,
      status: locked ? "Locked" : "Active",
      lastUpdated: new Date().toLocaleDateString(),
    });

    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[472px] rounded-xl shadow-xl p-12 relative">
        <p className="caption font-semibold mb-12">
          Update Account Information
        </p>

        {/* EMAIL */}
        <div className="flex items-center gap-4 mb-4">
          <label className="w-36 text-sm">Email:</label>
          <input
            type="text"
            className="w-full rounded-[18px] shadow-style p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* ROLE */}
        <div className="flex items-center gap-4 mb-4">
          <label className="w-36 text-sm">Role:</label>
          <input
            type="text"
            className="w-full rounded-[18px] shadow-style p-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="flex items-center gap-4 mb-4">
          <label className="w-36 text-sm">Password:</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-[18px] shadow-style p-2"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="flex items-center gap-4 mb-4">
          <label className="w-36 text-sm">Confirm Password:</label>
          <div className="relative w-full">
            <input
              type={showConfirm ? "text" : "password"}
              className="w-full rounded-[18px] shadow-style p-2"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* TOGGLE + BUTTONS */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-2">
            <span>Lock</span>
            <Switch
              checked={locked}
              onCheckedChange={(v: boolean) => setLocked(v)}
            />
          </div>

          <div className="flex gap-4">
            <button
              className="bg-primary text-white px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              CANCEL
            </button>
            <button
              onClick={handleSave}
              className="bg-secondary text-white px-4 py-2 rounded-lg"
            >
              CHANGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
