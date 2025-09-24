"use client";

import React, { useState } from "react";
import SectionContainer from "@/components/SectionContainer";
import { useRouter } from "next/navigation";

const Enrollment = () => {
  const router = useRouter();
  const data = [
    {
      id: 2200048,
      student: "Mariel Krisjean Alaan",
      course: "BSIS",
      year: "4th Year",
      status: "Active",
      gender: "Female",
    },
    {
      id: 2200049,
      student: "Joshua Colobong Paet",
      course: "BSIS",
      year: "4th Year",
      status: "Active",
      gender: "Male",
    },
    {
      id: 2200050,
      student: "Jaylord Sogulon",
      course: "BSIS",
      year: "4th Year",
      status: "Active",
      gender: "Male",
    },
    {
      id: 2200051,
      student: "Jenelyn Manalo",
      course: "BSIS",
      year: "4th Year",
      status: "Active",
      gender: "Female",
    },
    {
      id: 2200052,
      student: "Ian Joseph Belgica",
      course: "BSIS",
      year: "4th Year",
      status: "Active",
      gender: "Male",
    },
  ];

  const handleAdd = () => {
    router.push("/admin/registration");
  };

  // STATES
  const [searchStudent, setSearchStudent] = useState("");
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");

  // FILTERING
  const filterData = data.filter((item) => {
    const matchesStudent = item.student
      .toLowerCase()
      .includes(searchStudent.toLowerCase());
    const matchesYear = year ? item.year === year : true;
    const matchesStatus = status ? item.status === status : true;
    const matchesCourse = course ? item.course === course : true;

    return matchesStudent && matchesStatus && matchesYear && matchesCourse;
  });

  return (
    <SectionContainer background="mt-12">
      <div className="container bg-white w-full py-4 rounded-lg px-2 shadow-lg">
        <p className="sub-heading">COLLEGE STUDENT LIST</p>
        <div className="mt-4 flex justify-between gap-2 w-full">
          <div className="relative w-[355px]">
            <input
              type="text"
              placeholder="Student's Name"
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
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
            {/* COURSE */}
            <div className="relative w-[132px]">
              <details className="group">
                <summary className="bg-background p-2 border rounded-md cursor-pointer">
                  {course || "Course"}
                </summary>
                <ul className="absolute left-0 mt-1 w-full bg-background border rounded-md shadow-md p-2 z-20">
                  {["BSIS", "BSA", "BSAIS", "BSTM", "BSCRIM", "BTVTED"].map(
                    (c) => (
                      <li
                        key={c}
                        className="cursor-pointer hover:bg-secondary/50 p-1 rounded"
                        onClick={() => setCourse(c)}
                      >
                        {c}
                      </li>
                    )
                  )}
                  <li
                    className="cursor-pointer text-primary hover:bg-secondary/50 p-1 rounded"
                    onClick={() => setCourse("")}
                  >
                    Clear
                  </li>
                </ul>
              </details>
            </div>

            {/* YEAR */}
            <div className="relative w-[132px]">
              <details className="group">
                <summary className="bg-background p-2 border rounded-md cursor-pointer">
                  {year || "Year Level"}
                </summary>
                <ul className="absolute left-0 mt-1 w-full bg-background border rounded-md shadow-md p-2 z-20">
                  {[...new Set(data.map((i) => i.year))].map((s) => (
                    <li
                      key={s}
                      className="cursor-pointer hover:bg-secondary/50 p-1 rounded"
                      onClick={() => setYear(s)}
                    >
                      {s}
                    </li>
                  ))}
                  <li
                    className="cursor-pointer text-primary hover:bg-secondary/50 p-1 rounded"
                    onClick={() => setYear("")}
                  >
                    Clear
                  </li>
                </ul>
              </details>
            </div>

            {/* STATUS */}
            <div className="relative w-[132px]">
              <details className="group">
                <summary className="bg-background p-2 border rounded-md cursor-pointer">
                  {status || "Status"}
                </summary>
                <ul className="absolute left-0 mt-1 w-full bg-background border rounded-md shadow-md p-2 z-20">
                  {["Active", "In-Active"].map((e) => (
                    <li
                      key={e}
                      className="cursor-pointer hover:bg-secondary/50 p-1 rounded"
                      onClick={() => setStatus(e)}
                    >
                      {e}
                    </li>
                  ))}
                  <li
                    className="cursor-pointer text-primary hover:bg-secondary/50 p-1 rounded"
                    onClick={() => setStatus("")}
                  >
                    Clear
                  </li>
                </ul>
              </details>
            </div>

            <button onClick={handleAdd} className="bg-[#2F5215] p-1 rounded-lg">
              <p className="text-background px-4 font-bold">+ Add</p>
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto mt-12">
          <table className="min-w-full border border-foreground body-text text-center">
            <thead>
              <tr className="bg-tertiary">
                <th className="table-style">ID Number</th>
                <th className="table-style">Fullname</th>
                <th className="table-style">Course</th>
                <th className="table-style">Year Level</th>
                <th className="table-style">Status</th>
                <th className="table-style">Gender</th>
              </tr>
            </thead>
            <tbody>
              {filterData.length > 0 ? (
                filterData.map((person) => (
                  <tr key={person.id} className="body-text odd:bg-secondary/30">
                    <td className="table-style">{person.id}</td>
                    <td className="table-style">{person.student}</td>
                    <td className="table-style">{person.course}</td>
                    <td className="table-style">{person.year}</td>
                    <td className="table-style">{person.status}</td>
                    <td className="table-style">{person.gender}</td>
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
    </SectionContainer>
  );
};

export default Enrollment;
