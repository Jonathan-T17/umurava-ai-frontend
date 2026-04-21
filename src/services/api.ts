// services/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// 🟢 Generic API handler
export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    });

    // 🟢 Handle non-200 responses
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));

      throw new Error(
        errorData.message || "Something went wrong. Please try again."
      );
    }

    return await res.json();
  } catch (error:Error|unknown) {
    console.error("API ERROR:", (error as Error).message);
    throw error;
  }
}