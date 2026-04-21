"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { removeJob, updateJob } from "@/redux/slices/jobSlice";
import { useState } from "react";

// 🟢 service layer
import { editJob, deleteJob } from "@/services/jobService";

// 🟢 NEW: job context
import { setCurrentJob } from "@/redux/slices/jobContextSlice";
import toast from "react-hot-toast";

interface Job {
  id: string;
  title: string;
  description: string;
  skills: string;
}

export default function JobListPage() {
  const jobs = useAppSelector((state) => state.job.jobs);

  // 🟢 NEW: get current selected job
  const currentJobId = useAppSelector(
    (state) => state.jobContext.currentJobId
  );

  const dispatch = useAppDispatch();

  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editSkills, setEditSkills] = useState("");

  // 🟢 delete modal state
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  const startEditing = (job: Job) => {
    setEditingJobId(job.id);
    setEditTitle(job.title);
    setEditDescription(job.description);
    setEditSkills(job.skills);
  };

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
        toast.success("Job updated successfully!"); //new added
        setEditingJobId(null);
      } catch (error) {
        console.error("Error updating job:", error);
        toast.error("Failed to update job."); //new added
      }
    }
  };

  const confirmDelete = async () => {
    if (!jobToDelete) return;

    try {
      const deletedId = await deleteJob(jobToDelete);
      dispatch(removeJob(deletedId));
      toast.success("Job deleted successfully!"); //new added
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job."); //new added
    } finally {
      setJobToDelete(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold mb-6">
          Saved Jobs / Job List
        </h2>

        {/* 🟢 NEW: active job indicator */}
        {currentJobId && (
          <div className="mb-4 text-sm text-blue-600">
            Active Job Selected
          </div>
        )}

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
                  <tr
                    key={job.id}
                    className={`border-t ${
                      currentJobId === job.id
                        ? "bg-blue-50"
                        : ""
                    }`}
                  >
                    {editingJobId === job.id ? (
                      <>
                        <td className="p-4">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="setEditTitle"
                          />
                        </td>
                        <td className="p-4">
                          <textarea
                            value={editDescription}
                            onChange={(e) =>
                              setEditDescription(e.target.value)
                            }
                            className="w-full border p-2 rounded"
                            rows={3}
                            placeholder="setEditDescription"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="text"
                            value={editSkills}
                            onChange={(e) => setEditSkills(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="setEditSkills"
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
                        <td className="p-4 font-semibold">
                          {job.title}
                        </td>
                        <td className="p-4 text-gray-600">
                          {job.description}
                        </td>
                        <td className="p-4 text-blue-600">
                          {job.skills}
                        </td>
                        <td className="p-4 flex gap-2 flex-wrap">
                          {/* 🟢 NEW: SELECT JOB BUTTON */}
                          <button
                            onClick={() =>
                              dispatch(setCurrentJob(job.id))
                            }
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            Select
                          </button>

                          <button
                            onClick={() => startEditing(job)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => setJobToDelete(job.id)}
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

      {/* DELETE MODAL */}
      {jobToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h3 className="text-lg font-bold mb-4">
              Confirm Delete
            </h3>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this job?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Yes, Delete
              </button>

              <button
                onClick={() => setJobToDelete(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}