"use client";

import React, { useState } from "react";
import SectionContainer from "@/src/components/SectionContainer";

export default function Classes() {
  const information = [
    {
      room: 204,
      subject: "Internship",
      section: "41A1",
      teacher: "Dante Ador",
      course: "BSIS",
      gradeLevel: "4th Year",
    },
    {
      room: 204,
      subject: "Capstone Project",
      section: "41A1",
      teacher: "Risty Francisco Siena",
      course: "BSIS",
      gradeLevel: "4th Year",
    },
    {
      room: 204,
      subject: "Deployment, Service, and Maintenance",
      section: "41A1",
      teacher: "Risty Siena",
      course: "BSIS",
      gradeLevel: "4th Year",
    },
    {
      room: 204,
      subject: "Cyber Security",
      section: "41A1",
      teacher: "Robert Cooper Olivares",
      course: "BSIS",
      gradeLevel: "4th Year",
    },
    {
      room: 204,
      subject: "Arts, Men, and Society",
      section: "41A1",
      teacher: "Ryan Congresso",
      course: "BSIS",
      gradeLevel: "4th Year",
    },
    {
      room: 204,
      subject: "History With Governance And Politics",
      section: "41A1",
      teacher: "Lawrence Noleal",
      course: "BSIS",
      gradeLevel: "4th Year",
    },
  ];

  // STATES
  const [searchTeacher, setSearchTeacher] = useState("");
  const [course, setCourse] = useState("");
  const [section, setSection] = useState("");

  // FILTERING
  const filteredData = information.filter((item) => {
    const matchesTeacher = item.teacher
      .toLowerCase()
      .includes(searchTeacher.toLowerCase());
    const matchesCourse = course ? item.course === course : true;
    const matchesSection = section ? item.section === section : true;

    return matchesTeacher && matchesCourse && matchesSection;
  });

  return (
    <SectionContainer background="mt-12">
      {/* SEARCH & DROPDOWNS */}
      <div className="flex justify-between gap-4 w-full sticky top-0 bg-white shadow-style rounded-lg p-4 z-10">
        {/* SEARCH TEACHER */}
        <div className="relative w-[364px]">
          <img
            src="/icons/search-icon.svg"
            alt="Icon"
            width={21}
            className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer"
          />
          <input
            type="text"
            placeholder="Teacher Name"
            value={searchTeacher}
            onChange={(e) => setSearchTeacher(e.target.value)}
            className="rounded-lg bg-white border shadow p-2 w-full focus:outline-none focus:ring-1"
          />
        </div>

        {/* COURSE + SECTION */}
        <div className="flex justify-between gap-4">
          {/* COURSE DROPDOWN */}
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
                  className="cursor-pointer text-primary hover:bg-gray-200 p-1 rounded"
                  onClick={() => setCourse("")}
                >
                  Clear
                </li>
              </ul>
            </details>
          </div>

          {/* SECTION DROPDOWN */}
          <div className="relative w-[132px]">
            <details className="group">
              <summary className="bg-white p-2 border rounded-md cursor-pointer">
                {section || "Section"}
              </summary>
              <ul className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-md p-2 z-20">
                {[...new Set(information.map((i) => i.section))].map((s) => (
                  <li
                    key={s}
                    className="cursor-pointer hover:bg-secondary/50 p-1 rounded"
                    onClick={() => setSection(s)}
                  >
                    {s}
                  </li>
                ))}
                <li
                  className="cursor-pointer text-primary hover:bg-secondary/50 p-1 rounded"
                  onClick={() => setSection("")}
                >
                  Clear
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto mt-6 scroll-smooth bg-white p-4 shadow-style rounded-lg">
        <table className="min-w-full border-white body-text text-textWhite text-center">
          <thead>
            <tr className="bg-primary">
              <th className="table-style">ROOM</th>
              <th className="table-style">SUBJECT</th>
              <th className="table-style">SECTION</th>
              <th className="table-style">TEACHER</th>
              <th className="table-style">COURSE</th>
              <th className="table-style">GRADE LEVEL</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((list, index) => (
                <tr key={index} className="text-dark odd:bg-[#2f5215]/30">
                  <td className="table-style">{list.room}</td>
                  <td className="table-style">{list.subject}</td>
                  <td className="table-style">{list.section}</td>
                  <td className="table-style">{list.teacher}</td>
                  <td className="table-style">{list.course}</td>
                  <td className="table-style">{list.gradeLevel}</td>
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
    </SectionContainer>
  );
}
