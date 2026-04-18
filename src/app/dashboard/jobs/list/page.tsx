"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { removeJob, updateJob } from "@/redux/slices/jobSlice";
import { useState } from "react";

// 🟢 NEW: import service layer
import { editJob, deleteJob } from "@/services/jobService";

interface Job {
  id: string;
  title: string;
  description: string;
  skills: string;
}

export default function JobListPage() {
  const jobs = useAppSelector((state) => state.job.jobs);
  const dispatch = useAppDispatch();

  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editSkills, setEditSkills] = useState("");

  const startEditing = (job: Job) => {
    setEditingJobId(job.id);
    setEditTitle(job.title);
    setEditDescription(job.description);
    setEditSkills(job.skills);
  };

  // 🟢 UPDATED: async save through service layer
  const saveEdit = async () => {
    if (editingJobId) {
      const updatedJob = {
        id: editingJobId,
        title: editTitle,
        description: editDescription,
        skills: editSkills,
      };

      try {
        const savedJob = await editJob(updatedJob);

        dispatch(updateJob(savedJob));
        setEditingJobId(null);
      } catch (error) {
        console.error("Error updating job:", error);
      }
    }
  };

  // 🟢 NEW: delete through service layer
  const handleDelete = async (id: string) => {
    try {
      const deletedId = await deleteJob(id);
      dispatch(removeJob(deletedId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold mb-6">Saved Jobs / Job List</h2>

        {jobs.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-500 text-center w-full max-w-2xl">
            No jobs created yet.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto w-full max-w-5xl">
            <table className="w-full text-left min-w-[700px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Skills</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-t">
                    {editingJobId === job.id ? (
                      <>
                        <td className="p-4">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="Job title"
                          />
                        </td>
                        <td className="p-4">
                          <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full border p-2 rounded"
                            rows={3}
                            placeholder="Job description"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="text"
                            value={editSkills}
                            onChange={(e) => setEditSkills(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="Required skills"
                          />
                        </td>
                        <td className="p-4 flex gap-2">
                          <button
                            onClick={saveEdit}
                            className="bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingJobId(null)}
                            className="bg-gray-400 text-white px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4 font-semibold">{job.title}</td>
                        <td className="p-4 text-gray-600">{job.description}</td>
                        <td className="p-4 text-blue-600">{job.skills}</td>
                        <td className="p-4 flex gap-2">
                          <button
                            onClick={() => startEditing(job)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}