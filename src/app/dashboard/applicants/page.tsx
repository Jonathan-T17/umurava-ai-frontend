"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

// 🟢 service (future backend)
import { getApplicants } from "@/services/applicantService";

type Applicant = {
  id: string;
  name: string;
  email?: string;
  skills?: string[];
  experience?: number;
};

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const data = await getApplicants();
      setApplicants(data);
    } catch (error) {
        console.error("Failed to load applicants:", error);
      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold mb-6">Applicants</h2>

        {/* Load Button */}
        <button
          onClick={fetchApplicants}
          className="mb-6 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Load Applicants
        </button>

        {/* Content */}
        <div className="w-full max-w-5xl">
          {loading ? (
            <Loader />
          ) : applicants.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-gray-500 text-center">
              No applicants found. Upload candidates first.
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Skills</th>
                    <th className="p-4">Experience</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((applicant) => (
                    <tr key={applicant.id} className="border-t">
                      <td className="p-4 font-semibold">
                        {applicant.name}
                      </td>
                      <td className="p-4 text-gray-600">
                        {applicant.email || "-"}
                      </td>
                      <td className="p-4 text-blue-600">
                        {applicant.skills?.join(", ") || "-"}
                      </td>
                      <td className="p-4">
                        {applicant.experience
                          ? `${applicant.experience} yrs`
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}