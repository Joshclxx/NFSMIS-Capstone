"use client";

import React, { useState, useEffect } from "react";
import SectionContainer from "@/src/components/SectionContainer";
import { useRouter } from "next/navigation";
import Button from "@/src/components/Button";
import AccountModal from "@/src/components/account-modal/usersModal";
import { faker } from "@faker-js/faker";
import RoleModal from "@/src/components/account-modal/selectRoleModal";

export type User = {
  id: string;
  fullname: string;
  email: string;
  role: string;
  status: string;
  creationDate: string;
  lastUpdated: string;
  lastLogin: string;
  locked: boolean;
};

const generateFakeUsers = () =>
  Array.from({ length: 48 }).map(() => ({
    id: faker.string.uuid(),
    fullname: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement([
      "Student",
      "Teacher",
      "Registrar",
      "Principal",
      "Dean",
    ]),
    status: "Active",
    creationDate: faker.date.past().toLocaleDateString(),
    lastUpdated: faker.date.recent().toLocaleDateString(),
    lastLogin: faker.date.recent().toLocaleDateString(),
    locked: false,
  }));

const Users = () => {
  const router = useRouter();

  // USERS DATA
  const [users, setUsers] = useState<User[]>([]);

  // FAKER JS LOADING
  useEffect(() => {
    setUsers(generateFakeUsers());
  }, []);

  // STATES
  const [searchStudent, setSearchStudent] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectRoleModal, setSelectRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // UPDATE USER
  const updateUser = (updated: User) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  // FILTERING
  const filterData = users.filter((item) => {
    const matchesStudent = item.fullname
      .toLowerCase()
      .includes(searchStudent.toLowerCase());
    const matchesStatus = status ? item.status === status : true;
    const matchesRole = role ? item.role === role : true;

    return matchesStudent && matchesStatus && matchesRole;
  });

  return (
    <SectionContainer background="mt-12">
      <div className="py-8">
        <p className="heading">Account Manager</p>
      </div>

      {/* COMPONENT HEAD */}
      <div className="container bg-white w-full py-4 rounded-lg px-4 shadow-lg flex flex-col">
        <div className="flex justify-between gap-2 w-full">
          <div className="relative w-[355px]">
            <input
              type="text"
              placeholder="Name"
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              className="rounded-lg bg-white border shadow p-2 w-full"
            />
            <img
              src="/icons/search-icon.svg"
              width={21}
              className="absolute right-3 top-2.5"
            />
          </div>

          <div className="flex gap-4 items-center relative z-10">
            {/* ROLE */}
            <div className="relative w-[132px]">
              <details>
                <summary className="bg-white p-2 border rounded-md cursor-pointer">
                  {role || "Role"}
                </summary>
                <ul className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-md p-2 z-20">
                  {[...new Set(users.map((u) => u.role))].sort().map((c) => (
                    <li
                      key={c}
                      className="cursor-pointer hover:bg-secondary/50 p-1 rounded"
                      onClick={() => setRole(c)}
                    >
                      {c}
                    </li>
                  ))}
                  <li
                    className="cursor-pointer text-primary p-1 rounded"
                    onClick={() => setRole("")}
                  >
                    Clear
                  </li>
                </ul>
              </details>
            </div>

            {/* STATUS */}
            <div className="relative w-[132px]">
              <details>
                <summary className="bg-white p-2 border rounded-md cursor-pointer">
                  {status || "Status"}
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

            <Button
              onClick={() => {
                setSelectRoleModal(true);
              }}
              variant="enroll"
            >
              + Create User
            </Button>

            <img
              src="/icons/refresh.svg"
              className="w-[22px] h-[22px] cursor-pointer hover:rotate-180 transition"
              onClick={() => {
                setSearchStudent("");
                setStatus("");
                setRole("");
              }}
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 mt-4">
        <div className="overflow-y-auto max-h-[400px] min-h-[200px] rounded-lg">
          <table className="min-w-full border text-center rounded-t-lg overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th className="table-style">Fullname</th>
                <th className="table-style">Email</th>
                <th className="table-style">Role</th>
                <th className="table-style">Status</th>
                <th className="table-style">Creation Date</th>
                <th className="table-style">Last Updated</th>
                <th className="table-style">Last Login</th>
                <th className="table-style w-[50px]"></th>
              </tr>
            </thead>

            <tbody>
              {filterData.length > 0 ? (
                filterData.map((person) => (
                  <tr key={person.id} className="bg-textWhite">
                    <td className="table-style">{person.fullname}</td>
                    <td className="table-style">{person.email}</td>
                    <td className="table-style">{person.role}</td>
                    <td className="table-style">{person.status}</td>
                    <td className="table-style">{person.creationDate}</td>
                    <td className="table-style">{person.lastUpdated}</td>
                    <td className="table-style">{person.lastLogin}</td>
                    <td className="table-style cursor-pointer">
                      <img
                        src="/icons/userCog.svg"
                        className="w-5 h-5 mx-auto"
                        onClick={() => {
                          setSelectedUser(person);
                          setShowModal(true);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-4 text-primary">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AccountModal
        show={showModal}
        onClose={() => setShowModal(false)}
        user={selectedUser}
        onSave={updateUser}
      />

      <RoleModal
        show={selectRoleModal}
        onClose={() => setSelectRoleModal(false)}
        user={null}
        onSave={(newUser) => {
          setUsers((prev) => [newUser, ...prev]);
        }}
      />
    </SectionContainer>
  );
};

export default Users;
