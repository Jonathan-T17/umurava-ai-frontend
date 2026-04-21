import { apiRequest } from "./api";
import { Applicant } from "@/types/api";

export const getApplicants = async (): Promise<Applicant[]> => {
  return apiRequest<Applicant[]>("/applicants", {
    method: "GET",
  });
};
