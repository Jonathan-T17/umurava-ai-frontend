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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* NAVBAR always visible */}
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR only for mobile */}
        <div
          className={`fixed md:hidden z-40 h-full transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
        </div>

        {/* OVERLAY (mobile only) */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 md:hidden z-30"
          />
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 overflow-y-auto text-gray-900">
          <div className="w-full max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
