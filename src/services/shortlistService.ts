import api from "./api";
import { Candidate } from "@/types/api";

// RUN AI ANALYSIS
export const runShortlistAnalysis = async (): Promise<Candidate[]> => {
  /*
  FUTURE BACKEND:
  const response = await api.post("/analyze");
  return response.data;
  */

  // TEMP MOCK MODE
  return Promise.resolve([
    {
      id: 1,
      rank: 1,
      name: "Alice Johnson",
      score: 95,
      recommendation: "Excellent fit for role",
      strengths: ["Strong React skills", "5 years experience"],
      gaps: ["Limited leadership experience"],
      status: "shortlisted",
    },
    {
      id: 2,
      rank: 2,
      name: "Brian Smith",
      score: 88,
      recommendation: "Very strong candidate",
      strengths: ["Backend expertise", "Node.js certified"],
      gaps: ["Needs stronger frontend exposure"],
      status: "shortlisted",
    },
  ]);
};