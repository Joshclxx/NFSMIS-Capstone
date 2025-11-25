"use client";

import React, { useState } from "react";
import SectionContainer from "@/src/components/SectionContainer";
import { useRouter } from "next/navigation";
import Button from "@/src/components/Button";
// import { Label } from "@/components/ui/label"
import { Switch } from "@/src/components/ui/switch";

const Enrollment = () => {
  const router = useRouter();
  const data = [
    {
      fullname: "Joshua Colobong",
      email: "joshuacolobong11@gmail.com",
      role: "Master Admin",
      status: "Active",
      creationDate: "Male",
      lastUpdated: "11/19/2025",
      lastLogin: "11/21/2025",
    },
  ];

  const handleAdd = () => {
    router.push("/admin/registration");
  };

  // STATES
  const [searchStudent, setSearchStudent] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [enabled, setEnabled] = useState(false);

  // FILTERING
  const filterData = data.filter((item) => {
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
              className="rounded-lg bg-white border shadow p-2 w-full focus:outline-none focus:ring-1"
            />
            <img
              src="/icons/search-icon.svg"
              alt="Icon"
              width={21}
              className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer"
            />
          </div>

          <div className="flex gap-4 items-center relative z-10">
            {/* ROLE */}
            <div className="relative w-[132px]">
              <details className="group">
                <summary className="bg-white p-2 border rounded-md cursor-pointer">
                  {role || "Role"}
                </summary>
                <ul className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-md p-2 z-20">
                  {["Student", "Registrar", "Principal", "Dean", "Teacher"].map(
                    (c) => (
                      <li
                        key={c}
                        className="cursor-pointer hover:bg-secondary/50 p-1 rounded"
                        onClick={() => setRole(c)}
                      >
                        {c}
                      </li>
                    )
                  )}
                  <li
                    className="cursor-pointer text-primary hover:bg-primary/50 p-1 rounded"
                    onClick={() => setRole("")}
                  >
                    Clear
                  </li>
                </ul>
              </details>
            </div>

            {/* YEAR */}
            <div className="relative w-[132px]">
              <details className="group">
                <summary className="bg-white p-2 border rounded-md cursor-pointer">
                  {status || "Status"}
                </summary>
                <ul className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-md p-2 z-20">
                  {[...new Set(data.map((i) => i.status))].map((s) => (
                    <li
                      key={s}
                      className="cursor-pointer hover:bg-secondary/50 p-1 rounded"
                      onClick={() => setStatus(s)}
                    >
                      {s}
                    </li>
                  ))}
                  <li
                    className="cursor-pointer text-primary hover:bg-primary/50 p-1 rounded"
                    onClick={() => setStatus("")}
                  >
                    Clear
                  </li>
                </ul>
              </details>
            </div>

            {/* ADD BUTTON */}
            <Button onClick={handleAdd} variant="enroll">
              + Create User
            </Button>

            {/* REFRESH BUTTON */}
            <img
              src="/icons/refresh.svg"
              alt="Refresh"
              className="w-[22px] h-[22px] cursor-pointer hover:rotate-180 transition-transform duration-300"
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
          <table className="min-w-full border border-foreground body-text text-center rounded-t-lg overflow-hidden">
            <thead className="bg-primary text-textWhite z-10">
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
                  <tr
                    key={person.fullname}
                    // even:bg-white odd:bg-secondary/30
                    className="body-text bg-textWhite"
                  >
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
                        alt="Manage"
                        className="w-5 h-5 mx-auto"
                        onClick={() => {
                          // setSelectedUser(person);
                          setShowModal(true);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-primary">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[430px] rounded-xl shadow-xl p-[24px] relative">
            <p className="caption font-semibold mb-4">
              Update account Information
            </p>

            {/* EMAIL */}
            <div className="mb-3">
              <label className="block text-sm mb-1">Email:</label>
              <input type="text" className="w-full border rounded-lg p-2" />
            </div>

            {/* ROLE */}
            <div className="mb-3">
              <label className="block text-sm mb-1">Role:</label>
              <input type="text" className="w-full border rounded-lg p-2" />
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label className="block text-sm mb-1">Password:</label>
              <input type="password" className="w-full border rounded-lg p-2" />
            </div>

            {/* TOGGLE */}
            {/* <div className="flex items-center gap-2 mb-4">
              <span>Status</span>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600"></div>
              </label>
            </div> */}

            <div className="flex items-center space-x-2">
              <div className="flex items-center gap-2 mb-4">
                <span>Status</span>
                <Switch />
              </div>
            </div>

            {/* <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div> */}

            <div className="flex gap-3 justify-center mt-6">
              <button
                className="bg-primary text-white px-4 py-2 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                CANCEL
              </button>

              <button className="bg-secondary text-white px-4 py-2 rounded-lg">
                CHANGE
              </button>
            </div>
          </div>
        </div>
      )}
    </SectionContainer>
  );
};

export default Enrollment;
