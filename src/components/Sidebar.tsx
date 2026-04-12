import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-6 shadow-md">
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard/jobs" className="hover:text-blue-600">
            Job Creation
          </Link>
        </li>
        <li>
          <Link href="/dashboard/upload" className="hover:text-blue-600">
            Candidate Upload
          </Link>
        </li>
        <li>
          <Link href="/dashboard/shortlist" className="hover:text-blue-600">
            Shortlist
          </Link>
        </li>
      </ul>
    </aside>
  );
}