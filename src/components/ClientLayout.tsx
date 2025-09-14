"use client";

import { usePathname } from "next/navigation";
import SideNav from "./SideNav";
import Header from "./Header";
import React, { useState } from "react";
import { useUserRole } from "@/hooks/useUserSession";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useUserRole();
  const [open, setOpen] = useState<Set<string>>(new Set());
  const pathname = usePathname();
  const hideSideNav = pathname === "/";
  const hideHeader = pathname === "/";

  if (hideSideNav && hideHeader) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {!hideSideNav && role && (
        <div className="w-72 h-screen sticky top-0">
          <SideNav role={role} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-5">
        {/* Optional Header */}
        {/* {!hideHeader && <Header />} */}

        {children}
      </div>
    </div>
  );
}

// "use client";

// import { usePathname } from "next/navigation";
// import SideNav from "./SideNav";
// import Header from "./Header";
// import React, { useState } from "react";
// import { useUserRole } from "@/hooks/useUserSession";

// export default function ClientLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const role = useUserRole();
//   const [open, setOpen] = useState<Set<string>>(new Set());
//   const pathname = usePathname();
//   const hideSideNav = pathname === "/";
//   const hideHeader = pathname === "/";

//   if (hideSideNav && hideHeader) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         {children}
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       {!hideSideNav && role && (
//         <aside className="w-60 fixed top-0 left-0 h-screen border-r bg-white">
//           <SideNav role={role} />
//         </aside>
//       )}

//       {/* Content */}
//       <main className="flex-1 ml-60 p-6 overflow-auto">
//         {/* Header would go here if you want to enable it */}
//         {/* {!hideHeader && <Header />} */}
//         {children}
//       </main>
//     </div>
//   );
// }
