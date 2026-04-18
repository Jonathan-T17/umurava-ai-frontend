import api from "./api";
import { Job } from "@/types/api";

// CREATE JOB
export const createJob = async (job: Job): Promise<Job> => {
  /*
  FUTURE BACKEND:
  const response = await api.post("/jobs", job);
  return response.data;
  */
  return Promise.resolve(job);
};

// UPDATE JOB
export const editJob = async (job: Job): Promise<Job> => {
  /*
  FUTURE BACKEND:
  const response = await api.put(`/jobs/${job.id}`, job);
  return response.data;
  */
  return Promise.resolve(job);
};

// DELETE JOB
export const deleteJob = async (id: string): Promise<string> => {
  /*
  FUTURE BACKEND:
  await api.delete(`/jobs/${id}`);
  */
  return Promise.resolve(id);
};