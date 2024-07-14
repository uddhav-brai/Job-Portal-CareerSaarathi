import React, { useState } from "react";
import axios from "axios";

const UploadResume = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null); // State to store uploaded file info

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("pdfFile", file); // Append the file to the FormData object

    try {
      setUploading(true);
      const response = await axios.post("/resume/upload-pdf", formData); // Send the FormData object
      setMessage(response.data.message);
      setUploadedFile({
        name: file.name,
        url: response.data.url, // Assuming the server returns the URL of the uploaded file
      });
      setFile(null); // Reset file input
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-white rounded-lg p-6 max-w-lg w-full relative z-50 shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-600 hover:text-red-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Upload Resume
          </h1>
          {!uploadedFile && (
            <>
              <input
                type="file"
                name="pdfFile"
                accept=".pdf"
                onChange={handleFileChange}
                className="mb-4 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSubmit}
                disabled={!file || uploading}
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg w-full transition-all duration-200 ${
                  !file || uploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                {uploading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  "Upload"
                )}
              </button>
            </>
          )}
          {uploadedFile && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Uploaded File
              </h2>
              <p>
                <a
                  href={uploadedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {uploadedFile.name}
                </a>
              </p>
              {message && <p className="mt-4 text-gray-700">{message}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
