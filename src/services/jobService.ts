import { apiRequest } from "./api";
import { Job } from "@/types/api";

// CREATE JOB
export const createJob = async (job: Job): Promise<Job> => {
  return apiRequest("/jobs", {
    method: "POST",
    body: JSON.stringify(job),
  });
};

// UPDATE JOB
export const editJob = async (job: Job): Promise<Job> => {
  return apiRequest(`/jobs/${job.id}`, {
    method: "PUT",
    body: JSON.stringify(job),
  });
};

// DELETE JOB
export const deleteJob = async (id: string): Promise<string> => {
  await apiRequest(`/jobs/${id}`, {
    method: "DELETE",
  });
  return id;
};
