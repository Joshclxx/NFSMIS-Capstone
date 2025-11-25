export type NAV_ITEMS = {
  title: string;
  path?: string;
  icon?: string;
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
      { title: "Academic Records", path: "/admin/academic-record" },
      { title: "Learning Modules", path: "/admin/learning-module" },
    ],
  },
  {
    title: "Faculty",
    path: "/admin/dashboard",
    icon: "/icons/faculty.svg",
  },
  {
    title: "Guidance",
    path: "/admin/dashboard",
    icon: "/icons/guidance.svg",
  },
  {
    title: "Schedule",
    path: "/admin/dashboard",
    icon: "/icons/schedule.svg",
  },
  {
    title: "Request",
    path: "/admin/dashboard",
    icon: "/icons/request.svg",
  },
  {
    title: "Accounts",
    path: "/admin/dashboard",
    icon: "/icons/accounts.svg",
    children: [{ title: "Users", path: "/admin/users" }],
  },
];

const STUDENT_NAV: NAV_ITEMS[] = [
  { title: "Schedule", path: "/student/schedule" },
  { title: "Portal", path: "/student/portal" },
];

export const NAV_BY_ROLE = {
  admin: ADMIN_NAV,
  student: STUDENT_NAV,
} as const;
