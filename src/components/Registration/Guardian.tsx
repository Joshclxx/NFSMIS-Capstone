import React from "react";
import SectionContainer from "../SectionContainer";

const Guardian = () => {
  return (
    <SectionContainer background="mt-12 px-4">
      <div className="p-9 w-full bg-white shadow-tb rounded-xl">
        {/* PARENT / GUARDIAN NAME */}
        <div className="flex flex-col mb-4">
          <label className="body-text font-bold mb-2">Parent / Guardian</label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Last Name"
              className="flex-1 h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
            <input
              type="text"
              placeholder="First Name"
              className="flex-1 h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
            <input
              type="text"
              placeholder="Middle Name"
              className="flex-1 h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
          </div>

          {/* MOBILE NUMBER */}
          <div className="flex flex-col">
            <label className="body-text font-bold mb-2">Mobile</label>
            <input
              type="number"
              placeholder="09674555677"
              className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl w-1/2"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Guardian;
