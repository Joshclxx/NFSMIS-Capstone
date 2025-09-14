"use client";

import React from "react";
import SectionContainer from "@/components/SectionContainer";
import { useRouter } from "next/navigation";

const Enrollment = () => {
  const router = useRouter();
  const data = [
    {
      id: 2200048,
      name: "Mariel Krisjean Alaan",
      course: "BSIS",
      year: "4th Year",
      status: "Active",
      gender: "Female",
    },
    {
      id: 2200049,
      name: "Joshua Colobong Paet",
      course: "BSIS",
      year: "4th Year",
      status: "Active",
      gender: "Male",
    },
    {
      id: 2200050,
      name: "Jaylord Sogulon",
      course: "BSIS",
      year: "4th Year",
      status: "Active",
      gender: "Male",
    },
    {
      id: 2200051,
      name: "Jenelyn Manalo",
      course: "BSIS",
      year: "4th Year",
      status: "Active",
      gender: "Female",
    },
    {
      id: 2200052,
      name: "Ian Joseph Belgica",
      course: "BSIS",
      year: "4th Year",
      status: "Active",
      gender: "Male",
    },
  ];

  const handleAdd = () => {
    router.push("/admin/registration");
  };

  return (
    <SectionContainer background="mt-12 px-4">
      <div className="container bg-background w-full py-4 rounded-lg px-2 shadow-lg">
        <p className="sub-heading">COLLEGE STUDENT LIST</p>
        <div className="mt-4 flex justify-between gap-2 w-full">
          <div className="relative w-[355px]">
            <input
              type="text"
              placeholder="Student's Name"
              className="rounded-lg bg-background border shadow p-2 w-full focus:outline-none focus:ring-1"
            />
            <img
              src="/icons/search-icon.svg"
              alt="Icon"
              width={21}
              className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer"
            />
          </div>

          <div className="flex gap-4 relative z-10">
            <div className="relative w-[132px]">
              <details className="group">
                <summary className="bg-background p-2 border rounded-md cursor-pointer">
                  Course
                </summary>
                <ul className="absolute left-0 mt-1 w-full bg-background border rounded-md shadow-md p-2 z-20">
                  <li>BSIS</li>
                  <li>BSA</li>
                  <li>BSAIS</li>
                  <li>BSTM</li>
                  <li>BSCRIM</li>
                  <li>BTVTED</li>
                </ul>
              </details>
            </div>
            <div className="relative w-[132px]">
              <details className="group">
                <summary className="bg-background p-2 border rounded-md cursor-pointer">
                  Year Level
                </summary>
                <ul className="absolute left-0 mt-1 w-full bg-background border rounded-md shadow-md p-2 z-20">
                  <li>1st Year</li>
                  <li>2nd Year</li>
                  <li>3rd Year</li>
                  <li>4th Year</li>
                </ul>
              </details>
            </div>
            <div className="relative w-[132px]">
              <details className="group">
                <summary className="bg-background p-2 border rounded-md cursor-pointer">
                  Status
                </summary>
                <ul className="absolute left-0 mt-1 w-full bg-background border rounded-md shadow-md p-2 z-20">
                  <li>Active</li>
                  <li>In-Active</li>
                </ul>
              </details>
            </div>
            <button onClick={handleAdd} className="bg-[#2F5215] p-1 rounded-lg">
              <p className="text-background px-4 font-bold">+ Add</p>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto mt-12">
          <table className="min-w-full border border-foreground body-text text-center">
            <thead>
              <tr className="bg-tertiary">
                <th className="py-2 border-b">ID Number</th>
                <th className="py-2 border-b">Fullname</th>
                <th className="py-2 border-b">Course</th>
                <th className="py-2 border-b">Year Level</th>
                <th className="py-2 border-b">Status</th>
                <th className="py-2 border-b">Gender</th>
              </tr>
            </thead>
            <tbody>
              {data.map((person) => (
                <tr key={person.id} className="body-text odd:bg-[#2F5215]/30">
                  <td className="py-2 border-b">{person.id}</td>
                  <td className="py-2 border-b">{person.name}</td>
                  <td className="py-2 border-b">{person.course}</td>
                  <td className="py-2 border-b">{person.year}</td>
                  <td className="py-2 border-b">{person.status}</td>
                  <td className="py-2 border-b">{person.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Enrollment;
