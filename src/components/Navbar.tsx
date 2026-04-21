"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const links = [
  { name: "Job Creation", href: "/dashboard/jobs" },
  { name: "Job List", href: "/dashboard/jobs/list" },
  { name: "Candidate Upload", href: "/dashboard/upload" },
  { name: "Applicants", href: "/dashboard/applicants" },
  { name: "Shortlist", href: "/dashboard/shortlist" },
];

type NavbarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  title?: string;
};

export default function Navbar({
  isSidebarOpen,
  toggleSidebar,
  title = "Umurava AI Recruiter",
}: NavbarProps) {
  return (
    <nav className="w-full bg-blue-700 text-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left: Title */}
      <h1 className="text-2xl font-bold truncate">{title}</h1>

      {/* Right: Navigation links on large screens */}
      <div className="hidden md:flex gap-6 items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-medium hover:text-gray-200"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Hamburger / Close toggle only on mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden w-8 h-8 flex items-center justify-center"
      >
        {isSidebarOpen ? (
          <XMarkIcon className="w-8 h-8 text-white" />
        ) : (
          <Bars3Icon className="w-8 h-8 text-white" />
        )}
      </button>
    </nav>
  );
}
