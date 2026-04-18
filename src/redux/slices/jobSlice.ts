import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Job {
  id: string;
  title: string;
  description: string;
  skills: string;
}

interface JobState {
  jobs: Job[];
}

const initialState: JobState = {
  jobs: [],
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    // Add a new job
    addJob(state, action: PayloadAction<Job>) {
      state.jobs.push(action.payload);
    },
    // Update an existing job by id
    updateJob(state, action: PayloadAction<Job>) {
      const index = state.jobs.findIndex((job) => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    // Remove a job by id
    removeJob(state, action: PayloadAction<string>) {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
    // Clear all jobs
    clearJobs(state) {
      state.jobs = [];
    },
  },
});

export const { addJob, updateJob, removeJob, clearJobs } = jobSlice.actions;
export default jobSlice.reducer;
