import DashboardLayout from "@/components/DashboardLayout";

export default function JobCreationPage() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Create Job</h2>

      <form className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-xl">
        <input
          type="text"
          placeholder="Job Title"
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          placeholder="Job Description"
          className="w-full border p-3 rounded-lg"
          rows={5}
        />

        <input
          type="text"
          placeholder="Required Skills"
          className="w-full border p-3 rounded-lg"
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Save Job
        </button>
      </form>
    </DashboardLayout>
  );
}