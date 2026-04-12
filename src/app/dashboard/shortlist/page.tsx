import DashboardLayout from "@/components/DashboardLayout";

export default function ShortlistPage() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Shortlisted Candidates</h2>

      <div className="bg-white p-10 rounded-lg shadow-md text-center">
        <p className="text-gray-500 text-lg">
          No shortlisted candidates yet.
        </p>
        <p className="text-gray-400 mt-2">
          Run AI screening to generate rankings.
        </p>
      </div>
    </DashboardLayout>
  );
}