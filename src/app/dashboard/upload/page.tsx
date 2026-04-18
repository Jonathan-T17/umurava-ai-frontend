"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

// 🟢 NEW: import service layer
import { uploadCandidates } from "@/services/uploadService";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeFile = (name: string) => {
    setFiles(files.filter((file) => file.name !== name));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  // 🟢 UPDATED: service-based upload
  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadMessage(null);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      // 🟢 SERVICE CALL ONLY
      const result = await uploadCandidates(formData);

      setUploadMessage(result.message);
      setFiles([]);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadMessage("Error connecting to server.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold mb-6">Candidate Upload</h2>

        {/* Drop Zone */}
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 p-10 rounded-lg text-center bg-white cursor-pointer hover:border-blue-500 transition w-full max-w-2xl"
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            Drag & drop resumes here, or click to select files
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Supports PDF, CSV, XLS, XLSX formats
          </p>
        </div>

        {/* File Preview List */}
        <div className="mt-6 w-full max-w-2xl space-y-4">
          {files.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-gray-500 text-center">
              Uploaded candidate resumes will appear here (CSV, Excel, PDF)
            </div>
          ) : (
            files.map((file, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center hover:shadow-lg transition"
              >
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>

                <button
                  onClick={() => removeFile(file.name)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Upload Trigger Button */}
        {files.length > 0 && (
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`mt-6 px-6 py-3 rounded-lg font-semibold w-full max-w-2xl ${
              isUploading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload Candidates"}
          </button>
        )}

        {/* Upload Status Message */}
        {uploadMessage && (
          <p className="mt-4 text-center text-sm text-gray-700 w-full max-w-2xl">
            {uploadMessage}
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}