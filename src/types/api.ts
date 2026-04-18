export type Job = {
  id: string;
  title: string;
  description: string;
  skills: string;
};

export type Candidate = {
  id: number;
  rank?: number;
  name: string;
  score?: number;
  recommendation?: string;
  strengths?: string[];
  gaps?: string[];
  status?: "shortlisted" | "rejected" | "pending";
};

export type UploadResponse = {
  success: boolean;
  count: number;
  message: string;
};