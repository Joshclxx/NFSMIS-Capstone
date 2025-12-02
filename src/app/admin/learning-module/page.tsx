"use client";

import React from "react";
import Link from "next/link";
import SectionContainer from "@/src/components/SectionContainer";

export default function LearningModule() {
  // const information = [
  //   {
  //     room: 204,
  //     subject: "Capstone Project",
  //     section: "41A1",
  //     teacher: "Dante Ador",
  //     course: "BSIS",
  //     grade: 1.25,
  //   },
  // ];

  return (
    <SectionContainer background="mt-12">
      <div className="container bg-white w-full h-screen p-4 shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <p className="heading">LEARNING MODULE</p>
          <div className="bg-secondary py-2 px-8 rounded-lg hover:scale-105 transition-transform cursor-pointer">
            <p className="body-text font-bold text-white">COLLEGE</p>
          </div>
        </div>

        <div className="flex justify-start gap-4 mt-[72px]">
          <Link
            href="/admin/curriculum-management"
            className="flex flex-col gap-2"
          >
            <img
              src="/icons/folder.svg"
              alt="Folder"
              width={164}
              height={164}
              className="cursor-pointer hover:scale-105 transition-transform"
            />
            <p className="body-text text-center w-[164px]">
              Bachelor of Science in Information System
            </p>
          </Link>

          <div className="flex flex-col gap-2">
            <img
              src="/icons/create-folder.svg"
              alt="Folder"
              width={164}
              height={164}
              className="cursor-pointer hover:scale-105 transition-transform"
            />
            <p className="body-text text-center w-[164px]">Create Folder</p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
