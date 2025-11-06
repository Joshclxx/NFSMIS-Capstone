import React from "react";
import { useRouter } from "next/navigation";

const CurriculumHeader = () => {
  const router = useRouter();

  return (
    <>
      <div className="container bg-white flex justify-end gap-4 py-4 px-12 rounded-lg shadow-style">
        <img
          src="/icons/table-icon.svg"
          alt="table icon"
          width={29}
          height={32}
          onClick={() => router.push("/admin/curriculum-history")}
        />
      </div>
    </>
  );
};

export default CurriculumHeader;
