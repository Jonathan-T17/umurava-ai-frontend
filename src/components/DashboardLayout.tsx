// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div>
//       <Navbar />
//       <div className="flex">
//         <Sidebar />
//         <main className="flex-1 p-8 bg-gray-100 min-h-screen text-gray-900">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-1">
        {/* Sidebar slides in/out */}
        {isSidebarOpen && (
          <Sidebar />
        )}

        {/* Main content always fills space */}
        <main className="flex-1 p-8 bg-gray-100 min-h-screen text-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
