const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const uploadCandidates = async (formData: FormData) => {
  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return res.json();
};