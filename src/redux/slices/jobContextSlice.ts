import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JobContextState {
  currentJobId: string | null;
}

const initialState: JobContextState = {
  currentJobId: null,
};

const jobContextSlice = createSlice({
  name: "jobContext",
  initialState,
  reducers: {
    setCurrentJob: (state, action: PayloadAction<string>) => {
      state.currentJobId = action.payload;
    },
    clearCurrentJob: (state) => {
      state.currentJobId = null;
    },
  },
});

export const { setCurrentJob, clearCurrentJob } = jobContextSlice.actions;
export default jobContextSlice.reducer;