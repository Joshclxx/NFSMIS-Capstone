import React from "react";
import SectionContainer from "../SectionContainer";

const Irregular = () => {
  return (
    <SectionContainer background="mt-12">
      <div className="p-9 w-full bg-white shadow-tb rounded-xl">
        <p className="sub-heading mb-6">Irregular Students</p>

        <div className="flex gap-4 mb-4 w-full">
          <div className="flex flex-col flex-1">
            <label className="body-text font-bold mb-2">Credited Subject</label>
            <input
              type="text"
              placeholder="Subject Code"
              className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none 
                focus:ring-1 focus:ring-primary/80 shadow-xl w-full"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="body-text font-bold mb-2">
              Additional Subject
            </label>
            <input
              type="text"
              placeholder="+"
              className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none 
                focus:ring-1 focus:ring-primary/80 shadow-xl w-full"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Irregular;
