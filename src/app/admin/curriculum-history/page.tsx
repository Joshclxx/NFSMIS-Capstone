import CurriculumHistory from "@/src/components/curriculum/CurriculumHistory";
import SectionContainer from "@/src/components/SectionContainer";
import React from "react";

export default function Dashboard() {
  return (
    <SectionContainer background="mt-12 px-4">
      <div className="flex flex-col gap-2">
        {/* HEADER */}
        <div className="container bg-background p-4 rounded-lg border">
          <p className="heading">CURRICULUM MANAGEMENT</p>
          <p className="sub-heading">
            Manage and organize your academic curriculum with ease.
          </p>
        </div>

        <div className="flex gap-4">
          {/* Courses Dropdown */}
          <details className="group relative">
            <summary className="bg-background py-2 px-4 border rounded-md cursor-pointer">
              Courses
            </summary>
            <ul className="absolute left-0 mt-1 w-40 bg-background border rounded-md shadow-md p-2 z-20">
              <li className="cursor-pointer p-1 rounded">BSIS</li>
            </ul>
          </details>

          {/* Academic Year Dropdown */}
          <details className="group relative">
            <summary className="bg-background py-2 px-4 border rounded-md cursor-pointer">
              Academic Year
            </summary>
            <ul className="absolute left-0 mt-1 w-40 bg-background border rounded-md shadow-md p-2 z-20">
              <li className="cursor-pointer p-1 rounded">2025–2026</li>
            </ul>
          </details>
        </div>
      </div>

      <div className="mt-9">
        <CurriculumHistory />
      </div>
    </SectionContainer>
  );
}
