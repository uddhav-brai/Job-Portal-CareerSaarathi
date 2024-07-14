import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AllApplicant = () => {
  const [applicants, setApplicants] = useState([]);
  const [applicant, setApplicant] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hasAcceptedApplicant, setHasAcceptedApplicant] = useState(false); // New state

  const sendResume = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(`/apply/send-resumes/${jobId}`);
      setSuccessMessage(response.data.message);
    } catch (error) {
      setError("An error occurred while sending resumes.");
      console.error("Error sending resumes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/apply/get-applied-job/${jobId}`);
        const fetchedApplicants = response.data.data;
        setApplicants(fetchedApplicants);
        setHasAcceptedApplicant(
          fetchedApplicants.some((applicant) => applicant.status === "Accepted")
        ); // Check for accepted status
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [jobId]);

  const acceptStatus = async (applicantId) => {
    try {
      await axios.put(`/apply/accept-applied-job/${applicantId}`);
      const response = await axios.get(`/apply/get-applied-job/${jobId}`);
      const fetchedApplicants = response.data.data;
      setApplicants(fetchedApplicants);
      setHasAcceptedApplicant(
        fetchedApplicants.some((applicant) => applicant.status === "Accepted")
      ); // Check for accepted status
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const rejectStatus = async (applicantId) => {
    try {
      await axios.put(`/apply/reject-applied-job/${applicantId}`);
      const response = await axios.get(`/apply/get-applied-job/${jobId}`);
      const fetchedApplicants = response.data.data;
      setApplicants(fetchedApplicants);
      setHasAcceptedApplicant(
        fetchedApplicants.some((applicant) => applicant.status === "Accepted")
      ); // Check for accepted status
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const fetchInterviewData = async (applicantId) => {
    try {
      const response = await axios.get(`/apply/get-interview/${applicantId}`);
      setInterviewData(response.data.data);
      setApplicant(
        applicants.find((applicant) => applicant._id === applicantId)
      );
      setShowDialog(true);
    } catch (error) {
      console.error("Error fetching interview data:", error);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setApplicant(null);
    setInterviewData(null);
  };

  const handleViewDetails = (resumeId) => {
    navigate(`/admin/applicant-details/${resumeId}`);
  };

  return (
    <>
      <div className="container mx-auto">
        <div>
          <h2 className="text-2xl font-bold my-4">Applicants List</h2>
          <div>
            {hasAcceptedApplicant && (
              <button
                onClick={() => setShowConfirmation(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Send Resume through E-Mail
              </button>
            )}

            {showConfirmation && (
              <div className="fixed z-10 inset-0 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
                <div className="bg-white rounded-lg max-w-md w-full p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">
                      Are you sure you want to send the resumes?
                    </h3>
                    {error && <p>Error: {error}</p>}
                    {successMessage && <p>{successMessage}</p>}
                  </div>
                  <div className="mt-4 flex justify-center space-x-4">
                    <button
                      onClick={sendResume}
                      disabled={isLoading}
                      className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded ${
                        isLoading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-700"
                      }`}
                    >
                      {isLoading ? "Sending..." : "Yes, Send Resumes"}
                    </button>
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {applicants.length === 0 ? (
            <div className="text-center text-xl font-semibold">
              No applicants
            </div>
          ) : (
            applicants.map((applicant, index) => (
              <div key={index} className="my-6">
                <div className="max-w-md bg-white shadow-lg rounded-md overflow-hidden">
                  <div
                    className={`bg-blue-500 text-white px-4 py-2 ${
                      applicant.status === "Rejected"
                        ? "bg-red-500"
                        : applicant.status === "Accepted"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    <h5 className="text-lg font-bold">{`${applicant.resume.firstName} ${applicant.resume.lastName}`}</h5>
                  </div>
                  <div className="p-4">
                    <p className="text-base font-semibold">
                      Status:{" "}
                      <span
                        className={`${
                          applicant.status === "Rejected"
                            ? "text-red-500"
                            : applicant.status === "Accepted"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {applicant.status || "Pending"}
                      </span>
                    </p>
                    {applicant.resume.education &&
                      applicant.resume.education.length > 0 && (
                        <>
                          <p className="text-base font-semibold">Education:</p>
                          <p>{`${applicant.resume.education[0].degreeEarned} - ${applicant.resume.education[0].institutionName}`}</p>
                        </>
                      )}
                    <p className="text-base font-semibold">Skills:</p>
                    <div className="flex flex-wrap">
                      {applicant.resume.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2 mb-2"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                    <p>
                      Applied At:{" "}
                      {new Date(applicant.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 flex justify-between">
                    <button
                      onClick={() => acceptStatus(applicant._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectStatus(applicant._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
                    >
                      Reject
                    </button>
                  </div>
                  <div className="flex justify-between p-4">
                    <button
                      onClick={() => handleViewDetails(applicant._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
                    >
                      View Details
                    </button>
                    {applicant.isInterview && (
                      <button
                        onClick={() => fetchInterviewData(applicant._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
                      >
                        View Interview Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {showDialog && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md relative">
            <button
              onClick={handleCloseDialog}
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full"
            >
              Close
            </button>
            <h3 className="text-2xl font-bold mb-4">Interview Details</h3>
            {applicant && interviewData && (
              <>
                <p>Company Name: {interviewData.companyName}</p>
                {interviewData.Date && <p>Date: {interviewData.Date}</p>}
                {interviewData.Time && <p>Time: {interviewData.Time}</p>}
                {interviewData.Address && (
                  <p>Interview Venue: {interviewData.Address}</p>
                )}
                {interviewData.Phone && (
                  <p>Company Phone: {interviewData.Phone}</p>
                )}
                <p>Interview Position: {interviewData.jobTitle}</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AllApplicant;
