import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-400 h-screen p-6 shadow-md text-gray-900">
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard/jobs" className="text-gray-800 hover:text-blue-700 font-medium">
            Job Creation
          </Link>
        </li>
        <li>
          <Link href="/dashboard/jobs/list" className="text-gray-800 hover:text-blue-700 font-medium">
            Job List
          </Link>
        </li>
        <li>
          <Link href="/dashboard/upload" className="text-gray-800 hover:text-blue-700 font-medium">
            Candidate Upload
          </Link>
        </li>
        <li>
          <Link href="/dashboard/shortlist" className="text-gray-800 hover:text-blue-700 font-medium">
            Shortlist
          </Link>
        </li>

      </ul>
    </aside>
  );
}