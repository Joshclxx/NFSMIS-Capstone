import React from "react";

type Subject = {
  code: string;
  title: string;
  units: number;
  lec: number;
  lab: number;
  preReq: string;
};

type SubjectTableProps = {
  year: string;
  sem: string;
  subjects: Subject[];
};

const curriculum: Record<string, Record<string, Subject[]>> = {
  "1st Year": {
    "1st Sem": [
      {
        code: "ENG 1",
        title: "Communication Skills 1",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "FIL 1",
        title: "Sining Ng Pakikipagtalastasan",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "MATH 1",
        title: "College Algebra",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "SS 1",
        title: "General Psychology",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 111",
        title: "Fundamentals of Information Systems",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 112",
        title: "Fundamentals of Programming, Data, File & Object Structures",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 113",
        title: "Office Productivity",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "PE 1",
        title: "Physical Fitness",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "NSTP 1",
        title: "Civic Welfare and Training Services 1",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
    ],
    "2nd Sem": [
      {
        code: "ENG 2",
        title: "Communication Skills 2 (Speech and Oral Comm.)",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "FIL 2",
        title: "Pagbasa at Pagsulat sa Ibat Ibang Disiplina",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "MATH 2",
        title: "Trigonometry",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "SS 2",
        title: "Society and Culture with Family Planning",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 121",
        title: "Human Computer Interaction",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 122",
        title: "Network and Internet Technology",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 123",
        title: "Fundamentals of Management and Business Concepts",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "PE 2",
        title: "Rhythmic Activities",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "NSTP 2",
        title: "Civic Welfare and Training Services 2",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
    ],
  },
  "2nd Year": {
    "1st Sem": [
      {
        code: "ENG 3",
        title: "Communication: Business and Application",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "ETAR 1",
        title: "Economics with Taxation and Agrarian Reform",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "BUS 1",
        title: "Business Process and Analysis of Business Systems",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "ACCTG 1",
        title: "Fundamentals of Accounting",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "PE 3",
        title: "Individual/Dual Sports",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
    ],
    "2nd Sem": [
      {
        code: "MATH 120",
        title: "Probability and Statistics",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "HUM",
        title: "Philippine Literature",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "LOGIC",
        title: "Logic",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "NATSCI 1",
        title: "Physical Science",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 212",
        title: "Discrete Structure",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 213",
        title: "System Infrastructure and Integration",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "ACCTG 2",
        title: "Accounting and Financial System",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "PE 4",
        title: "Team Sports/Group Games",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
    ],
  },
  "3rd Year": {
    "1st Sem": [
      {
        code: "ENG 301",
        title: "Speech and Oral Communication",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "NATSCI 3",
        title: "Biology",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 311",
        title: "Systems Analysis and Design",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 312",
        title: "Evaluation of Business Performance",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 313",
        title: "Management of Technology",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS ELEC 1",
        title: "Elective 1 (Digital Media Development)",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
    ],
    "2nd Sem": [
      {
        code: "IS 321",
        title: "Applications Development",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 322",
        title: "Professional Ethics for IS",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS ELEC 2",
        title: "Elective 2 (Applied Operating Systems)",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS ELEC 3",
        title: "Elective 3 (Networks)",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS FREE ELEC 1",
        title: "Free Elective 1",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
    ],
  },
  "4th Year": {
    "1st Sem": [
      {
        code: "HISTOR",
        title: "Philippine History with Politics and Governance",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "HUM 2",
        title: "Art, Man and Society",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "CSPROJ 1",
        title: "Capstone Project",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 411",
        title: "Deployment, Maintenance and Services",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS ELEC 4",
        title: "Elective 4 (Computer Security)",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
    ],
    "2nd Sem": [
      {
        code: "RIZAL",
        title: "Life and Works of Rizal",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 421",
        title: "Information Systems Planning",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS 422",
        title: "Project Management and Quality Planning",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS FREE ELEC 2",
        title: "Free Elective 2",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
      {
        code: "IS FREE ELEC 3",
        title: "Free Elective 3",
        units: 3,
        lec: 3,
        lab: 0,
        preReq: "",
      },
    ],
  },
};

const SubjectTable: React.FC<SubjectTableProps> = ({ year, sem, subjects }) => {
  const totalUnits = subjects.reduce((sum, s) => sum + s.units, 0);
  const totalLec = subjects.reduce((sum, s) => sum + s.lec, 0);
  const totalLab = subjects.reduce((sum, s) => sum + s.lab, 0);

  // TABLE COMPONENT
  return (
    <div>
      <div className="flex justify-between mb-2">
        <p className="font-semibold">{year}</p>
        <p className="italic">{sem}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-dark/25 text-sm">
          <thead className="bg-primary text-textWhite">
            <tr>
              <th className="table-style px-2 text-center">Course Code</th>
              <th className="table-style px-2 text-center">Course Title</th>
              <th className="table-style px-2 text-center">Units</th>
              <th className="table-style px-2 text-center">Lec Hours</th>
              <th className="table-style px-2 text-center">Lab Hours</th>
              <th className="table-style px-2 text-center">
                Prerequisite <br />
                <span>(Co-Requisite)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s, i) => (
              <tr key={i}>
                <td className="table-style px-2 text-center">{s.code}</td>
                <td className="table-style px-2 text-center">{s.title}</td>
                <td className="table-style px-2 text-center">{s.units}</td>
                <td className="table-style px-2 text-center">{s.lec}</td>
                <td className="table-style px-2 text-center">{s.lab}</td>
                <td className="table-style px-2 text-center">{s.preReq}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold bg-background">
              <td colSpan={2} className="table-style px-2 text-center">
                Total
              </td>
              <td className="table-style px-2 text-center">{totalUnits}</td>
              <td className="table-style px-2 text-center">{totalLec}</td>
              <td className="table-style px-2 text-center">{totalLab}</td>
              <td className="table-style px-2 text-center"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

const CurriculumTable: React.FC = () => {
  return (
    <div className="w-full space-y-8">
      {Object.entries(curriculum).map(([year, sems]) => (
        <div key={year} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(sems).map(([sem, subjects]) => (
            <SubjectTable
              key={year + sem}
              year={year}
              sem={sem}
              subjects={subjects}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CurriculumTable;
