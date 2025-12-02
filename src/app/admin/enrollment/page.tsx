"use client";

import React, { useState } from "react";
import SectionContainer from "@/src/components/SectionContainer";
import { useRouter } from "next/navigation";
import Button from "@/src/components/Button";

const Enrollment = () => {
  const router = useRouter();
  const data = [
    {
      id: 2200048,
      student: "Mariel Krisjean Alaan",
      course: "BSIS",
      year: "4th Year",
      type: "Old",
      gender: "Female",
      lrn: "132324657325",
    },
    {
      id: 2200049,
      student: "Joshua Colobong Paet",
      course: "BSIS",
      year: "4th Year",
      type: "Old",
      gender: "Male",
      lrn: "132324657325",
    },
    {
      id: 2200050,
      student: "Jaylord Sogulon",
      course: "BSIS",
      year: "4th Year",
      type: "Old",
      gender: "Male",
      lrn: "132324657325",
    },
    {
      id: 2200051,
      student: "Jenelyn Manalo",
      course: "BSIS",
      year: "4th Year",
      type: "Old",
      gender: "Female",
      lrn: "132324657325",
    },
    {
      id: 2200052,
      student: "Ian Joseph Belgica",
      course: "BSIS",
      year: "3rd Year",
      type: "Old",
      gender: "Male",
      lrn: "132324657325",
    },
  ];

  const handleAdd = () => {
    router.push(`/admin/registration?type=${studentType}`);
  };

  // STATES
  const [searchStudent, setSearchStudent] = useState("");
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [type, setType] = useState("");
  const [studentType, setStudentType] = useState("college");

  // FILTERING
  const filterData = data.filter((item) => {
    const matchesStudent = item.student
      .toLowerCase()
      .includes(searchStudent.toLowerCase());
    const matchesYear = year ? item.year === year : true;
    const matchesType = type ? item.type === type : true;
    const matchesCourse = course ? item.course === course : true;

    return matchesStudent && matchesType && matchesYear && matchesCourse;
  });

  return (
    <SectionContainer background="mt-12">
      <div className="py-8">
        <select
          className="heading text-left bg-transparent focus:outline-none cursor-pointer"
          defaultValue="College Student"
          onChange={(e) => setStudentType(e.target.value)}
        >
          <option value="college">College Student List</option>
          <option value="senior">Senior High Student List</option>
        </select>
      </div>

      {/* COMPONENT HEAD */}
      <div className="container bg-white w-full py-4 rounded-lg px-4 shadow-lg flex flex-col">
        <div className="flex justify-between gap-2 w-full">
          <div className="relative w-[355px]">
            <input
              type="text"
              placeholder="Student's Name"
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
            {/* COURSE */}
            <div className="relative w-[132px]">
              <details className="group">
                <summary className="bg-white p-2 border rounded-md cursor-pointer">
                  {course || "Course"}
                </summary>
                <ul className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-md p-2 z-20">
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
                    className="cursor-pointer text-primary hover:bg-primary/50 p-1 rounded"
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
                <summary className="bg-white p-2 border rounded-md cursor-pointer">
                  {year || "Year Level"}
                </summary>
                <ul className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-md p-2 z-20">
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
                    className="cursor-pointer text-primary hover:bg-primary/50 p-1 rounded"
                    onClick={() => setYear("")}
                  >
                    Clear
                  </li>
                </ul>
              </details>
            </div>

            {/* TYPE */}
            <div className="relative w-[132px]">
              <details className="group">
                <summary className="bg-white p-2 border rounded-md cursor-pointer">
                  {type || "Type"}
                </summary>
                <ul className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-md p-2 z-20">
                  {["Old", "New", "Transfer", "Return"].map((e) => (
                    <li
                      key={e}
                      className="cursor-pointer hover:bg-secondary/50 p-1 rounded"
                      onClick={() => setType(e)}
                    >
                      {e}
                    </li>
                  ))}
                  <li
                    className="cursor-pointer text-primary hover:bg-primary/50 p-1 rounded"
                    onClick={() => setType("")}
                  >
                    Clear
                  </li>
                </ul>
              </details>
            </div>

            {/* ADD BUTTON */}
            <Button onClick={handleAdd} variant="enroll">
              + Add
            </Button>

            {/* REFRESH BUTTON */}
            <img
              src="/icons/refresh.svg"
              alt="Refresh"
              className="w-[22px] h-[22px] cursor-pointer hover:rotate-180 transition-transform duration-300"
              onClick={() => {
                setSearchStudent("");
                setYear("");
                setCourse("");
                setType("");
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
                {studentType === "senior" && (
                  <th className="table-style">LRN</th>
                )}
                <th className="table-style">ID Number</th>
                <th className="table-style">Course</th>
                <th className="table-style">Year Level</th>
                <th className="table-style">Status</th>
                <th className="table-style">Gender</th>
              </tr>
            </thead>
            <tbody>
              {filterData.length > 0 ? (
                filterData.map((person) => (
                  <tr
                    key={person.id}
                    className="body-text even:bg-white odd:bg-secondary/30"
                  >
                    <td className="table-style">{person.student}</td>
                    {studentType === "senior" && (
                      <td className="table-style">{person.lrn}</td>
                    )}
                    <td className="table-style">{person.id}</td>
                    <td className="table-style">{person.course}</td>
                    <td className="table-style">{person.year}</td>
                    <td className="table-style">{person.type}</td>
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

      {/* </div> */}
    </SectionContainer>
  );
};

export default Enrollment;
