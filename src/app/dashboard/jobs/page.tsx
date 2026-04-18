"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useAppDispatch } from "@/redux/hooks";
import { addJob } from "@/redux/slices/jobSlice";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

// 🟢 NEW: import service layer
import { createJob } from "@/services/jobService";

type JobFormData = {
  title: string;
  description: string;
  skills: string;
};

export default function JobCreationPage() {
  const dispatch = useAppDispatch();
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormData>();

  // 🟢 UPDATED: async service-based submission
  const onSubmit = async (data: JobFormData) => {
    const newJob = {
      id: uuidv4(),
      ...data,
    };

    try {
      // 🟢 SERVICE CALL ONLY
      const savedJob = await createJob(newJob);

      // Redux remains same
      dispatch(addJob(savedJob));

      setSuccessMessage("Job saved successfully!");
      reset();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error saving job:", error);
      setSuccessMessage("Failed to save job.");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold mb-6">Create Job</h2>

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 w-full max-w-xl text-center">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-xl"
        >
          <div>
            <input
              type="text"
              placeholder="Job Title"
              className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("title", { required: "Job title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Job Description"
              rows={5}
              className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Required Skills (comma separated)"
              className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("skills", { required: "Skills are required" })}
            />
            {errors.skills && (
              <p className="text-red-500 text-sm">{errors.skills.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold w-full"
          >
            Save Job
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}