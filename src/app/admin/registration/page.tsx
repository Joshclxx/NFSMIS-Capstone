"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SectionContainer from "@/components/SectionContainer";
import CredentialSection from "@/components/Registration/CredentialSection";
import Irregular from "@/components/Registration/Irregular";
import { useSearchParams } from "next/navigation";

export default function RegistrationForm() {
  const router = useRouter();

  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [studentId, setStudentId] = useState("");
  const [lrn, setLrn] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasOldRecord, setHasOldRecord] = useState<null | boolean>(null);

  const isIrregular = status === "Irregular";
  const isOld = type === "Old";
  const isTransfer = type === "Transfer";
  const isNew = type === "New";

  const searchParams = useSearchParams();
  const studentType = searchParams.get("type") || "college";

  const generateStudentId = () => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `24${random}`;
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setType(selected);

    if (selected === "Transfer") {
      setShowOverlay(true);
    } else if (selected === "New") {
      setStudentId(generateStudentId());
    } else {
      setHasOldRecord(null);
      setShowOverlay(false);
      setStudentId("");
    }
  };

  const handleOverlayAnswer = (answer: boolean) => {
    setHasOldRecord(answer);
    setShowOverlay(false);
    if (answer) {
      setStudentId("");
    } else {
      setStudentId(generateStudentId());
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleLrnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLrn(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      type,
      status,
      studentId,
      lrn,
      hasOldRecord,
      studentType,
    });
  };

  const handleCancel = () => {
    router.push("/admin/enrollment");
  };

  const isFieldDisabled = (field: string) => {
    if (field === "type" || field === "status") return false;
    if (isNew) return field === "studentId" ? true : false;
    if (isOld) return field !== "studentId";
    if (isTransfer && hasOldRecord === true) return field !== "studentId";
    if (isTransfer && hasOldRecord === false)
      return field === "studentId" ? true : false;
    return true;
  };

  return (
    <SectionContainer background="mt-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative">
        {/* OVERLAY */}
        {showOverlay && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg shadow-lg text-center max-w-sm border-1">
              <p className="font-semibold mb-4">
                Does the student have an old record in Integrated Innovation and
                Hospitality Colleges?
              </p>
              <div className="flex justify-center gap-6">
                <button
                  type="button"
                  onClick={() => handleOverlayAnswer(true)}
                  className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary/90"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleOverlayAnswer(false)}
                  className="bg-secondary text-white px-4 py-2 rounded-lg font-bold hover:bg-secondary/90"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Credential Section */}
        <CredentialSection
          type={type}
          status={status}
          lrn={lrn}
          isSeniorHigh={studentType === "senior"}
          hasIIHRecord={hasOldRecord === true}
          studentId={studentId}
          onTypeChange={handleTypeChange}
          onStatusChange={handleStatusChange}
          onLrnChange={handleLrnChange}
          isDisabled={isFieldDisabled}
        />

        {/* Irregular Section */}
        {isIrregular && <Irregular />}

        <div className="flex justify-end gap-8 self-end">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-primary text-white px-6 py-2 w-[142px] rounded-lg font-bold hover:bg-primary/95 mt-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-secondary text-white px-6 py-2 w-[142px] rounded-lg font-bold hover:bg-secondary/95 mt-4"
          >
            Save
          </button>
        </div>
      </form>
    </SectionContainer>
  );
}
