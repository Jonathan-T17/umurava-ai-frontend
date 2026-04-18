"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

// 🟢 NEW: import service layer
import { runShortlistAnalysis } from "@/services/shortlistService";
import { Candidate } from "@/types/api";

export default function ShortlistPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisRun, setAnalysisRun] = useState(false);

  // 🟢 UPDATED: service-based AI analysis
  const runAnalysis = async () => {
    setLoading(true);

    try {
      const analyzed = await runShortlistAnalysis();

      const shortlisted = analyzed
        .filter((c) => c.status === "shortlisted")
        .slice(0, 20);

      setCandidates(shortlisted);
      setAnalysisRun(true);
    } catch (error) {
      console.error("Error running AI analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (
    id: number,
    status: "shortlisted" | "rejected"
  ) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
    setSelectedCandidate(null);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold mb-6">Shortlisted Candidates</h2>

        {/* AI Trigger Button */}
        <button
          onClick={runAnalysis}
          disabled={loading}
          className={`mb-6 px-6 py-3 rounded-lg font-semibold w-full max-w-2xl ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Analyzing..." : "Run AI Analysis"}
        </button>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto w-full max-w-5xl">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Candidate</th>
                <th className="p-4">Score</th>
                <th className="p-4">Recommendation</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-4">
                      <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 w-40 bg-gray-200 animate-pulse rounded"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                    </td>
                  </tr>
                ))
              ) : !analysisRun ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    No analysis has been run yet.
                  </td>
                </tr>
              ) : candidates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    No shortlisted candidates found.
                  </td>
                </tr>
              ) : (
                candidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className={`border-t cursor-pointer ${
                      selectedCandidate?.id === candidate.id
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <td className="p-4">{candidate.rank ?? "-"}</td>
                    <td className="p-4">{candidate.name}</td>
                    <td className="p-4">{candidate.score ?? "-"}%</td>
                    <td className="p-4">
                      {candidate.recommendation ?? "-"}
                    </td>
                    <td className="p-4 capitalize">{candidate.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal remains unchanged */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative animate-fadeIn">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4">{selectedCandidate.name}</h3>

            <p className="mb-2">
              <strong>Match Score:</strong> {selectedCandidate.score}%
            </p>

            <p className="mb-2">
              <strong>Recommendation:</strong>{" "}
              {selectedCandidate.recommendation}
            </p>

            <div className="mb-4">
              <strong>Strengths:</strong>
              <ul className="list-disc ml-6 mt-2">
                {selectedCandidate.strengths?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <strong>Gaps / Risks:</strong>
              <ul className="list-disc ml-6 mt-2">
                {selectedCandidate.gaps?.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() =>
                  updateStatus(selectedCandidate.id, "shortlisted")
                }
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Shortlist
              </button>

              <button
                onClick={() =>
                  updateStatus(selectedCandidate.id, "rejected")
                }
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}