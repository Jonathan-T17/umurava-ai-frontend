import Link from "next/link";

// 🟢 NEW: centralized route config
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">
        Welcome to Umurava AI Screening Tool
      </h1>

      <p className="mb-6 text-gray-600">
        AI-powered recruitment screening made easy.
      </p>

      <Link
        href={ROUTES.JOBS}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Start Screening
      </Link>
    </div>
  );
}