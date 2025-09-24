export type NAV_ITEMS = {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  children?: NAV_ITEMS[];
};

const ADMIN_NAV: NAV_ITEMS[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: "/icons/dashboardIcon.svg",
  },
  {
    title: "Students",
    icon: "/icons/studentManagement.svg",
    children: [
      { title: "Classes", path: "/admin/classes" },
      { title: "Enrollment", path: "/admin/enrollment" },
      { title: "Academic Records", path: "/studentAccount/records" },
      { title: "Learning Modules", path: "/admin/learning-module" },
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
