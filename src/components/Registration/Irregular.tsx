import React from "react";
import SectionContainer from "../SectionContainer";

const Irregular = () => {
  return (
    <SectionContainer background="mt-12 px-4">
      <div className="p-9 w-full bg-white shadow-tb rounded-xl">
        {/* ADDRESS */}
        <div className="flex flex-col mb-4">
          <p className="sub-heading mb-6">Irregular Students</p>
          <label className="body-text font-bold mb-2">Credited Subject</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Subject Code"
              className="flex-1 h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
          </div>

          <div className="flex gap-2 mb-4">
            <div className="flex flex-col flex-1">
              <label className="body-text font-bold mb-2">
                Additional Subject
              </label>
              <input
                type="text"
                placeholder="+"
                className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="body-text font-bold mb-2">
                Mode of Payment
              </label>
              <select
                defaultValue=""
                className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
              >
                <option value="" disabled>
                  Select MOP
                </option>
                <option>Cash</option>
                <option>Installment</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Irregular;
