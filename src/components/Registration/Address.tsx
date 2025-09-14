import React from "react";
import SectionContainer from "../SectionContainer";

const Address = () => {
  return (
    <SectionContainer background="mt-12 px-4">
      <div className="p-9 w-full bg-white shadow-tb rounded-xl">
        {/* ADDRESS */}
        <div className="flex flex-col mb-4">
          <label className="body-text font-bold mb-2">Address</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="House No."
              className="flex-1 h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
            <input
              type="text"
              placeholder="Street"
              className="flex-1 h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Barangay"
              className="flex-1 h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
            <input
              type="text"
              placeholder="City"
              className="flex-1 h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Address;
