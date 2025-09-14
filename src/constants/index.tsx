export type NAV_ITEMS = {
  title: string;
  path?: string;
  children?: NAV_ITEMS[];
};

const ADMIN_NAV: NAV_ITEMS[] = [
  { title: "Dashboard", path: "/admin/dashboard" },
  {
    title: "Students",
    children: [
      { title: "Classes", path: "/studentAccount/students" },
      { title: "Enrollment", path: "/admin/enrollment" },
      { title: "Academic Records", path: "/studentAccount/records" },
      { title: "Learning Modules", path: "/studentAccount/modules" },
    ],
  },
];

const STUDENT_NAV: NAV_ITEMS[] = [
  { title: "Schedule", path: "student/student" },
  { title: "Portal", path: "/student/portal" },
];

export const NAV_BY_ROLE = {
  admin: ADMIN_NAV,
  student: STUDENT_NAV,
} as const;
