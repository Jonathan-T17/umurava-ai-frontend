import { apiRequest } from "./api";
import { Candidate } from "@/types/api";

export const runShortlistAnalysis = async (): Promise<Candidate[]> => {
  return apiRequest<Candidate[]>("/analyze", {
    method: "POST",
  });
};
