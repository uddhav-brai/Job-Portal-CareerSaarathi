import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";

const AppliedJob = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const { jobId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/apply/all-applied`);
      const applicantsData = response.data.data;
      const applicantsWithInterviewData = await Promise.all(
        applicantsData.map(async (applicant) => {
          try {
            const interviewResponse = await axios.get(
              `/apply/get-interview/${applicant._id}`
            );
            const interviewData = interviewResponse.data.data || {};
            return { ...applicant, interviewData };
          } catch (error) {
            console.error(
              `Interview Does not exist for applicant ${applicant._id}:`,
              error
            );
            return { ...applicant, interviewData: null };
          }
        })
      );
      setApplicants(applicantsWithInterviewData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [jobId]);

  const handleUnapply = async () => {
    try {
      await axios.delete(`/apply/applied-jobs/${selectedApplicant}`);
      setConfirmDialog(false); // Close the confirmation dialog after unapplying
      // Fetch data after unapplying
      fetchData();
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Error unapplying:", error);
    }
  };

  const handleViewInterview = (applicant) => {
    setSelectedApplicant(applicant);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedApplicant(null);
  };

  const handleViewDetails = (jobId) => {
    navigate(`/dashboard/job-description/${jobId}`);
  };

  const handleConfirmUnapply = (applicantId) => {
    setConfirmDialog(true);
    setSelectedApplicant(applicantId);
  };

  return (
    <>
      <div className="overflow-x-auto">
        {applicants.length === 0 ? (
          <p className="text-center">No applied jobs</p>
        ) : (
          <>
            <h1 class="text-3xl font-bold mb-3 mt-8">Applied Job</h1>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Company Name</th>
                  <th className="px-4 py-2 border">Job Title</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant, index) => (
                  <tr
                    key={applicant._id}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="px-4 py-2 border">
                      {applicant.company.name}
                    </td>
                    <td className="px-4 py-2 border">{applicant.job.title}</td>
                    <td className="px-4 py-2 border">
                      <p
                        className={`font-bold ${
                          applicant.status === "Pending"
                            ? "text-blue-500"
                            : applicant.status === "Rejected"
                            ? "text-red-500"
                            : applicant.status === "Accepted"
                            ? "text-green-500"
                            : "text-black"
                        }`}
                      >
                        {applicant.status || "Unknown"}
                      </p>
                    </td>
                    <td className="px-4 py-2 border">
                      {applicant.interviewData && (
                        <>
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 mb-2 md:mb-0 md:mr-2 transition-colors duration-300"
                            onClick={() => handleViewInterview(applicant)}
                          >
                            View Interview
                          </button>
                        </>
                      )}
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 mb-2 md:mb-0 md:mr-2 transition-colors duration-300"
                        onClick={() => handleViewDetails(applicant.job._id)}
                      >
                        View Details
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                        onClick={() => handleConfirmUnapply(applicant.job._id)}
                      >
                        Unapply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      {selectedApplicant && selectedApplicant.interviewData && showDialog && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg relative">
            <button
              className="absolute top-0 right-0 bg-transparent text-red-500 px-2 py-1 rounded-lg"
              onClick={handleCloseDialog}
            >
              <FaWindowClose />
            </button>
            <h3 className="text-lg font-semibold">Interview Details</h3>
            <p>Company Name: {selectedApplicant.interviewData.companyName}</p>
            <p>Date: {selectedApplicant.interviewData.Date}</p>
            <p>Time: {selectedApplicant.interviewData.Time}</p>
            <p>Interview Venue: {selectedApplicant.interviewData.Address}</p>
            <p>Company Phone: {selectedApplicant.interviewData.Phone}</p>
            <p>
              Interview Position: {selectedApplicant.interviewData.jobTitle}
            </p>
          </div>
        </div>
      )}
      {confirmDialog && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold">Confirmation</h3>
            <p>Are you sure you want to unapply for this job?</p>
            <div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={handleUnapply}
              >
                Yes
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setConfirmDialog(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppliedJob;
