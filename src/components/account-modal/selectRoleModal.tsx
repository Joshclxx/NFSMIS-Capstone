"use client";

import { useState, useEffect } from "react";
import { User } from "@/src/app/admin/users/page";
import { useRouter } from "next/navigation";

interface RoleModalProps {
  show: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (u: User) => void;
}

export default function RoleModal({
  show,
}: //   onClose,
//   user,
//   onSave,
RoleModalProps) {
  if (!show) return null;

  const router = useRouter();

  //   const isNew = !user;

  //   const [email, setEmail] = useState("");
  //   const [role, setRole] = useState("");
  //   const [locked, setLocked] = useState(false);

  //   useEffect(() => {
  //     if (!user) return;
  //     setEmail(user.email);
  //     setRole(user.role);
  //     setLocked(user.locked);
  //   }, [user]);

  //   const handleSave = () => {
  //     if (isNew) {
  //       onSave({
  //         id: crypto.randomUUID(),
  //         fullname: "",
  //         email,
  //         role,
  //         locked,
  //         status: locked ? "Locked" : "Active",
  //         creationDate: new Date().toLocaleDateString(),
  //         lastUpdated: new Date().toLocaleDateString(),
  //         lastLogin: "-",
  //       });
  //     } else {
  //       onSave({
  //         ...user!,
  //         email,
  //         role,
  //         locked,
  //         status: locked ? "Locked" : "Active",
  //         lastUpdated: new Date().toLocaleDateString(),
  //       });
  //     }

  //     onClose();
  //   };

  const handleReplace = () => {
    router.push("/admin/registration");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] rounded-2xl shadow-xl p-10 relative">
        {/* SELECT ROLE */}
        <button className="w-full shadow-style rounded-xl bg-white py-3 px-4 text-left sub-caption font-medium mb-8 flex justify-between items-center hover:cursor-pointer">
          <span>SELECT ROLE</span>
          <span className="text-xl">›</span>
        </button>

        {/* ROLE FIELDS */}
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <p className="sub-caption mb-1 font-semibold flex-shrink-0 w-32">
              Role Field:
            </p>
            <input className="w-full rounded-xl bg-white shadow-style p-3 outline-none" />
          </div>

          <div className="flex items-center gap-2">
            <p className="sub-caption mb-1 font-semibold flex-shrink-0 w-32">
              Role Field:
            </p>
            <input className="w-full rounded-xl bg-white shadow-style p-3 outline-none" />
          </div>

          <div className="flex items-center gap-2">
            <p className="sub-caption mb-1 font-semibold flex-shrink-0 w-32">
              Role Field:
            </p>
            <input className="w-full rounded-xl bg-white shadow-style p-3 outline-none" />
          </div>

          <div className="flex items-center gap-2">
            <p className="sub-caption mb-1 font-semibold flex-shrink-0 w-32">
              Role Field:
            </p>
            <input className="w-full rounded-xl bg-white shadow-style p-3 outline-none" />
          </div>

          <div className="flex items-center gap-2">
            <p className="sub-caption mb-1 font-semibold flex-shrink-0 w-32">
              Role Field:
            </p>
            <input className="w-full rounded-xl bg-white shadow-style p-3 outline-none" />
          </div>
        </div>

        {/* FOOTER BUTTON */}
        <button
          onClick={handleReplace}
          className="mt-10 w-full py-3 sub-caption rounded-xl border border-primary/45 text-center font-semibold hover:cursor-pointer"
        >
          STUDENT
        </button>

        {/* CANCEL BUTTON */}
        {/* <div className="flex justify-center items-center mt-8">
          <div className="flex gap-3">
            <button
              className="bg-primary text-white px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              CANCEL
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
