import React from "react";

const CurriculumHistory = () => {
  return (
    <>
      {/* ADD CURRICULUM SECTION */}
      <div className="flex justify-between mb-8">
        <p className="sub-heading font-bold">Curriculum List</p>
        <div className="py-2 px-4 rounded-e-full bg-secondary">
          <p className="body-text font-bold text-textWhite">+ ADD CURRICULUM</p>
        </div>
      </div>

      {/* ADD CURRICULUM TABLE */}
      <div className="overflow-x-auto rounded-t-xl">
        <table className="w-full border border-dark/25 text-sm">
          <thead className="bg-primary text-textWhite">
            <tr>
              <th className="table-style px-2 text-center">Curriculum Code</th>
              <th className="table-style px-2 text-center">Course Program</th>
              <th className="table-style px-2 text-center">Academic Year</th>
              <th className="table-style px-2 text-center">Total Units</th>
              <th className="table-style px-2 text-center">Lec. Hour</th>
              <th className="table-style px-2 text-center">Lab Hour</th>
            </tr>
          </thead>
          <tbody>
            <tr className="body-text odd:bg-secondary/30">
              <td className="table-style px-2 text-center">0001</td>
              <td className="table-style px-2 text-center">
                Bachelor of Science in Information System
              </td>
              <td className="table-style px-2 text-center">2025-2026</td>
              <td className="table-style px-2 text-center">156</td>
              <td className="table-style px-2 text-center">156</td>
              <td className="table-style px-2 text-center">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CurriculumHistory;
