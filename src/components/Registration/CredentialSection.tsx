import React from "react";
import SectionContainer from "../SectionContainer";

interface CredentialSectionProps {
  type: string;
  status: string;
  studentId: string;
  lrn: string;
  isSeniorHigh: boolean;
  hasIIHRecord: boolean;
  onTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onLrnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: (field: string) => boolean;
}

const CredentialSection: React.FC<CredentialSectionProps> = ({
  type,
  status,
  studentId,
  lrn,
  isSeniorHigh,
  hasIIHRecord,
  onTypeChange,
  onStatusChange,
  onLrnChange,
  isDisabled,
}) => {
  return (
    <SectionContainer background="mt-12">
      <div className="p-9 w-full bg-white shadow-tb rounded-xl">
        <p className="sub-heading font-semibold mb-6">Registration Form</p>

        {/* NAME */}
        <div className="flex flex-col mb-4 w-full">
          <label className="body-text font-bold mb-2 w-full">Name</label>
          <div className="flex gap-2 w-full">
            {["Last Name", "First Name", "Middle Name"].map((ph) => (
              <input
                key={ph}
                type="text"
                placeholder={ph}
                disabled={isDisabled("name")}
                className="flex-1 h-[42px] w-full p-2 border bg-white/80 rounded-lg 
                  disabled:opacity-50 focus:outline-none focus:ring-1 
                  focus:ring-primary/80 shadow-xl"
              />
            ))}
          </div>
        </div>

        {/* TYPE, YEAR & STATUS */}
        <div className="flex gap-2 mb-4 max-w-[968px]">
          <div className="flex flex-col w-[220px]">
            <label className="body-text font-bold mb-2">Type</label>
            <select
              value={type}
              onChange={onTypeChange}
              className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none 
                focus:ring-1 focus:ring-primary/80 shadow-xl"
            >
              <option value="">Select Type</option>
              <option>Old</option>
              <option>New</option>
              <option>Transfer</option>
              <option>Return</option>
            </select>
          </div>

          <div className="flex flex-col w-[360px]">
            <label className="body-text font-bold mb-2">Year & Section</label>
            <select
              disabled={isDisabled("year")}
              className="h-[42px] p-2 border bg-white/80 rounded-lg disabled:opacity-50 
                focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            >
              <option value="">Select Year Level</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>

          <div className="flex flex-col w-[180px]">
            <label className="body-text font-bold mb-2">Status</label>
            <select
              value={status}
              onChange={onStatusChange}
              className="h-[42px] p-2 border bg-white/80 rounded-lg focus:outline-none 
                focus:ring-1 focus:ring-primary/80 shadow-xl"
            >
              <option value="">Select Status</option>
              <option>Regular</option>
              <option>Irregular</option>
            </select>
          </div>
        </div>

        {/* COURSE, EMAIL, GENDER */}
        <div className="flex gap-2 mb-4 max-w-[968px]">
          <div className="flex flex-col w-[320px]">
            <label className="body-text font-bold mb-2">Course</label>
            <select
              disabled={isDisabled("course")}
              className="h-[42px] p-2 border bg-white/80 rounded-lg disabled:opacity-50 
                focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            >
              <option value="">Select Course</option>
              <option>BSIS</option>
              <option>BSA</option>
              <option>BSAIS</option>
              <option>BSTM</option>
              <option>BSCRIM</option>
            </select>
          </div>

          <div className="flex flex-col w-[340px]">
            <label className="body-text font-bold mb-2">Email</label>
            <input
              type="email"
              placeholder="juandelacruz@email.com"
              disabled={isDisabled("email")}
              className="h-[42px] p-2 border bg-white/80 rounded-lg disabled:opacity-50 
                focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
          </div>

          <div className="flex flex-col w-[180px]">
            <label className="body-text font-bold mb-2">Gender</label>
            <select
              disabled={isDisabled("gender")}
              className="h-[42px] p-2 border bg-white/80 rounded-lg disabled:opacity-50 
                focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>

        {/* STUDENT ID, SCHOLARSHIP, MODE OF PAYMENT */}
        <div className="flex gap-2 mb-4 max-w-[968px]">
          <div className="flex flex-col w-[280px]">
            <label className="body-text font-bold mb-2">Student ID</label>
            <input
              type="text"
              value={studentId}
              disabled={isDisabled("studentId")}
              placeholder="2200000"
              className="h-[42px] p-2 border bg-white/80 rounded-lg disabled:opacity-50 
                focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            />
          </div>

          {isSeniorHigh && (
            <div className="flex flex-col w-[164px]">
              <label className="body-text font-bold mb-2">LRN</label>
              <input
                type="text"
                value={lrn}
                onChange={onLrnChange}
                placeholder="Learning Reference Number"
                disabled={
                  !["New", "Transfer"].includes(type)
                    ? false
                    : hasIIHRecord
                    ? true
                    : false
                }
                className="h-[42px] p-2 border bg-white/80 rounded-lg disabled:opacity-50 
          focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
              />
            </div>
          )}

          <div className="flex flex-col w-[164px]">
            <label className="body-text font-bold mb-2">Scholarship</label>
            <select
              disabled={isDisabled("scholarship")}
              className="h-[42px] p-2 border bg-white/80 rounded-lg disabled:opacity-50 
                focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            >
              <option value="">Select Option</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="flex flex-col w-[260px]">
            <label className="body-text font-bold mb-2">Mode of Payment</label>
            <select
              disabled={isDisabled("mop")}
              className="h-[42px] p-2 border bg-white/80 rounded-lg disabled:opacity-50 
                focus:outline-none focus:ring-1 focus:ring-primary/80 shadow-xl"
            >
              <option value="">Select MOP</option>
              <option>Cash</option>
              <option>Installment</option>
            </select>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default CredentialSection;
