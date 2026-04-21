"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Job Creation", href: "/dashboard/create-job" },
  { name: "Job List", href: "/dashboard/jobs/list" },
  { name: "Candidate Upload", href: "/dashboard/upload" },
  { name: "Applicants", href: "/dashboard/applicants" },
  { name: "Shortlist", href: "/dashboard/shortlist" },
];

export default function Sidebar({ closeSidebar }: { closeSidebar?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-lg h-full p-6 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Umurava AI</h2>

      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={closeSidebar}
            className={`px-4 py-2 rounded-lg transition font-medium ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </aside>
  );
}
