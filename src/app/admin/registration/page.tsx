"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SectionContainer from "@/components/SectionContainer";
import CredentialSection from "@/components/Registration/CredentialSection";
import Address from "@/components/Registration/Address";
import Guardian from "@/components/Registration/Guardian";
import Irregular from "@/components/Registration/Irregular";

export default function RegistrationForm() {
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log("Form submitted");
  };

  const handleCancel = () => {
    router.push("/admin/enrollment");
  };

  return (
    <SectionContainer background="mt-12">
      <p className="heading font-semibold mb-6">ENROLLMENT FORM</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <CredentialSection />
        <Address />
        <Guardian />
        <Irregular />

        <div className="flex justify-between gap-2 w-full self-end">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-primary text-white px-6 py-2 w-full rounded-lg font-bold hover:bg-[#264312] mt-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#2F5215] text-white px-6 py-2 w-full rounded-lg font-bold hover:bg-[#264312] mt-4"
          >
            Save
          </button>
        </div>
      </form>
    </SectionContainer>
  );
}
