import React from "react";
import SectionContainer from "../SectionContainer";

const CredentialSection = () => {
  return (
    <SectionContainer background="mt-12 px-4">
      <div className="p-9 w-full bg-white shadow-tb rounded-xl">
        {/* FULL NAME */}
        <div className="flex flex-col mb-4">
          <label className="body-text font-bold mb-2">Full Name</label>
          <div className="flex gap-2">
            {["Last Name", "First Name", "Middle Name"].map((ph) => (
              <input
                key={ph}
                type="text"
                placeholder={ph}
                className="flex-1 h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
              />
            ))}
          </div>
        </div>

        {/* TYPE & SECTION */}
        <div className="flex gap-2 mb-4">
          <div className="flex flex-col flex-1">
            <label className="body-text font-bold mb-2">Type</label>
            <input
              type="text"
              placeholder="New / Transfer / Return"
              className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="body-text font-bold mb-2">Year / Section</label>
            <input
              type="text"
              placeholder="1st Year 11A1"
              className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
          </div>
        </div>

        {/* COURSE / STATUS / STUDENT ID */}
        <div className="flex gap-2 mb-4">
          <div className="flex flex-col flex-1">
            <label className="body-text font-bold mb-2">Course</label>
            <select
              defaultValue=""
              className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            >
              <option value="" disabled>
                Select Course
              </option>
              <option>BSIS</option>
              <option>BSA</option>
              <option>BSAIS</option>
              <option>BSTM</option>
              <option>BSCRIM</option>
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label className="body-text font-bold mb-2">Status</label>
            <select
              defaultValue=""
              className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option>Regular</option>
              <option>Irregular</option>
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label className="body-text font-bold mb-2">Student ID</label>
            <input
              type="number"
              placeholder="2200000"
              className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
          </div>
        </div>

        {/* BIRTHDAY & MOBILE */}
        <div className="flex gap-2 mb-4">
          <div className="flex flex-col flex-1">
            <label className="body-text font-bold mb-2">Birthday</label>
            <input
              type="date"
              className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="body-text font-bold mb-2">Mobile</label>
            <input
              type="number"
              placeholder="09674555677"
              className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
          </div>
        </div>

        {/* GENDER & SCHOLARSHIP */}
        <div className="flex gap-2">
          <div className="flex flex-col flex-1">
            <label className="body-text font-bold mb-2">Gender</label>
            <select
              defaultValue=""
              className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="flex flex-col flex-1">
            <label className="body-text font-bold mb-2">Scholarship</label>
            <input
              type="text"
              placeholder="Yes"
              className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default CredentialSection;
