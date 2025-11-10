import React from "react";
import Image from "next/image";

const ComingSoon = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-[932px] p-6 overflow-hidden z-1">
      <div className="relative flex items-center justify-center text-center">
        {/* Background Image */}
        <Image
          src="/images/coming-soon.svg"
          alt="Coming Soon"
          className="w-full h-[1088px] object-contain"
          width={932}
          height={1132}
        />

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-primary p-4">
          <h1 className="text-[64px] font-extrabold mb-[32px] drop-shadow-lg">
            COMING SOON!
          </h1>
          <p className="text-[16px] mb-[32px] font-medium">
            Something amazing is coming, get ready for a new experience.
          </p>
          <p className="text-[16px] mb-[32px] font-medium">Stay updated!</p>
          <button className="px-6 py-3 bg-primary text-textWhite font-semibold rounded-md hover:bg-primary transition">
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
