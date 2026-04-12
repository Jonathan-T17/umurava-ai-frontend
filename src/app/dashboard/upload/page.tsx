import DashboardLayout from "@/components/DashboardLayout";

export default function UploadPage() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Candidate Upload</h2>

      <div className="bg-white p-8 rounded-lg shadow-md text-center border-2 border-dashed border-gray-300">
        <p className="text-gray-500">
          Upload candidate resumes (CSV, Excel, PDF) — Coming Soon
        </p>
      </div>
    </DashboardLayout>
  );
}