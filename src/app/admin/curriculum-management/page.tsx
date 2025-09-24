"use client";

import React from "react";
import SectionContainer from "../../../components/SectionContainer";
import { useRouter } from "next/navigation";
import CurriculumHeader from "@/components/Curriculum/CurriculumHeader";
import CurriculumTable from "@/components/Curriculum/CurriculumTable";

export default function Curriculum() {
  const router = useRouter();

  return (
    <SectionContainer background="mt-12 px-4">
      <div className="container bg-background shadow-lg w-full h-auto p-4">
        <p
          className="sub-heading cursor-pointer"
          onClick={() => router.push("/admin/learning-module")}
        >
          BACK
        </p>
        {/* HEADER TEXT */}
        <div className="flex flex-col items-center">
          <p className="sub-heading">
            BACHELOR OF SCIENCE IN INFORMATION SYSTEM (BSIS)
          </p>
          <p className="sub-heading">
            <em>Effective Academic Year 2025-2026</em>
          </p>
        </div>

        {/* HEADER */}
        <div className="mt-16">
          <CurriculumHeader />
        </div>

        {/* TABLE */}
        <div className="mt-9">
          <CurriculumTable />
        </div>
      </div>
    </SectionContainer>
  );
}
