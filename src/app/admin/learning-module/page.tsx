"use client";

import React from "react";
import SectionContainer from "@/components/SectionContainer";

export default function Portal() {
  const information = [
    {
      room: 204,
      subject: "Capstone Project",
      section: "41A1",
      teacher: "Dante Ador",
      course: "BSIS",
      grade: 1.25,
    },
  ];

  return (
    <SectionContainer background="mt-12 px-4">
      <div className="flex justify-between gap-4 w-full">
        {/* SEARCH & DROPDOWN */}
        <div className="relative w-[364px]">
          <img
            src="/icons/search-icon.svg"
            alt="Icon"
            width={21}
            className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer"
          />
          <input
            type="text"
            placeholder="Student Name"
            className="rounded-lg bg-background border shadow p-2 w-full focus:outline-none focus:ring-1"
          />
        </div>
        <div className="flex justify-between gap-4">
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
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto mt-12">
        <table className="min-w-full border-white body-text text-textWhite text-center">
          <thead>
            <tr className="bg-primary">
              <th className="py-2 border-b">ROOM</th>
              <th className="py-2 border-b">SUBJECT</th>
              <th className="py-2 border-b">SECTION</th>
              <th className="py-2 border-b">TEACHER</th>
              <th className="py-2 border-b">COURSE</th>
              <th className="py-2 border-b">GRADE</th>
            </tr>
          </thead>
          {/* <tbody>
            {information.map((list) => (
                <tr key={list.}>

                </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </SectionContainer>
  );
}
