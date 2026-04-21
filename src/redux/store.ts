import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";

// 🟢 NEW: import job context slice
import jobContextReducer from "./slices/jobContextSlice";

export const store = configureStore({
  reducer: {
    job: jobReducer,
    jobContext: jobContextReducer, // 🟢 ADDED (no impact on existing logic)
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;