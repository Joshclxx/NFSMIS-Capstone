"use client";

import React, { useState } from "react";
import SectionContainer from "@/src/components/SectionContainer";
import Button from "@/src/components/Button";
import CreateRole from "@/src/components/account-modal/createRoleModal";

export type User = {
  id: string;
  fullname: string; // Role Name
  email: string; // Role Field
  role: string; // Permissions
};

const Roles = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const [selectRoleModal, setSelectRoleModal] = useState(false);
  const [status, setStatus] = useState("");

  // Filter by Role Name
  const filteredRoles = users.filter((u) =>
    u.fullname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SectionContainer background="mt-12">
      <div className="py-8">
        <p className="heading">Role Table</p>
      </div>

      {/* HEADER */}
      <div className="container bg-white w-full py-4 rounded-lg px-4 shadow-lg flex justify-between items-center">
        {/* SEARCH */}
        <div className="relative w-[355px]">
          <input
            type="text"
            placeholder="Search Role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg bg-white border shadow p-2 w-full"
          />
          <img
            src="/icons/search-icon.svg"
            width={21}
            className="absolute right-3 top-2.5"
          />
        </div>

        <div className="flex gap-4 items-center">
          {/* PERMISSION FILTER */}
          <div className="relative w-[132px]">
            <details>
              <summary className="bg-white p-2 border rounded-md cursor-pointer">
                {status || "Permission"}
              </summary>
              <ul className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-md p-2 z-20">
                {["Active", "Locked"].map((s) => (
                  <li
                    key={s}
                    className="cursor-pointer hover:bg-secondary/50 p-1 rounded"
                    onClick={() => setStatus(s)}
                  >
                    {s}
                  </li>
                ))}
                <li
                  className="cursor-pointer text-primary p-1 rounded"
                  onClick={() => setStatus("")}
                >
                  Clear
                </li>
              </ul>
            </details>
          </div>

          {/* CREATE ROLE */}
          <Button onClick={() => setSelectRoleModal(true)} variant="enroll">
            + Create Role
          </Button>

          <img
            src="/icons/refresh.svg"
            className="w-[22px] h-[22px] cursor-pointer hover:rotate-180 transition"
            onClick={() => setStatus("")}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 mt-4">
        <div className="overflow-y-auto max-h-[400px] rounded-lg">
          <table className="min-w-full border text-center rounded-t-lg overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th className="table-style">Role Name</th>
                <th className="table-style">Role Field</th>
                <th className="table-style">Permissions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRoles.length > 0 ? (
                filteredRoles.map((item) => (
                  <tr key={item.id} className="bg-textWhite">
                    <td className="table-style">{item.fullname}</td>
                    <td className="table-style">{item.email}</td>
                    <td className="table-style">{item.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-4 text-primary">
                    No roles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE ROLE MODAL */}
      <CreateRole
        show={selectRoleModal}
        onClose={() => setSelectRoleModal(false)}
        onSave={(data) => {
          const newUser: User = {
            id: crypto.randomUUID(),
            fullname: data.roleName,
            email: data.fields
              .map((f: { value: string }) => f.value)
              .join(", "),
            role: data.permissions,
          };

          setUsers((prev) => [newUser, ...prev]);
          setSelectRoleModal(false);
        }}
      />
    </SectionContainer>
  );
};

export default Roles;
