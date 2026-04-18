import api from "./api";
import { UploadResponse } from "@/types/api";

// UPLOAD CANDIDATE FILES
export const uploadCandidates = async (
  formData: FormData
): Promise<UploadResponse> => {
  /*
  FUTURE BACKEND:
  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
  */

  // TEMP MOCK MODE
  return Promise.resolve({
    success: true,
    count: formData.getAll("files").length,
    message: `Successfully uploaded ${
      formData.getAll("files").length
    } file(s)!`,
  });
};