import SectionContainer from "@/src/components/SectionContainer";
import React from "react";
import Image from "next/image";

export default function Profile() {
  return (
    <SectionContainer background="mt-12">
      <div className="relative flex flex-col items-center">
        <div className="container bg-primary w-full h-[120px]" />
        <div className="absolute top-[50px] left-[44px] flex itmes-center justify-center w-[140px] h-[140px] bg-white rounded-full">
          <Image
            src="/images/profile-sample.svg"
            alt="Profile"
            className="rounded-full"
            width={132}
            height={132}
          />
        </div>
        <div className="container bg-white w-full h-[240px]" />
      </div>
    </SectionContainer>
  );
}
