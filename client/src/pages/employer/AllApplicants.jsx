import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

const AllApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [interview, setInterview] = useState({});
  const [showDialog, setShowDialog] = useState({});
  const { jobId } = useParams();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`/apply/get-application/${jobId}`);
      const applicantsData = response.data.data;

      const initialInterviewState = {};
      const initialShowDialogState = {};
      await Promise.all(
        applicantsData.map(async (applicant) => {
          try {
            const interviewResponse = await axios.get(
              `/apply/get-interview/${applicant._id}`
            );
            const interviewData = interviewResponse.data.data || {
              Date: "",
              Time: "",
            };
            initialInterviewState[applicant._id] = {
              Date: formatDate(interviewData.Date),
              Time: interviewData.Time || "",
            };
            initialShowDialogState[applicant._id] = false;
          } catch (error) {
            console.error(
              `Error fetching interview data for applicant ${applicant._id}:`,
              error
            );
          }
        })
      );
      setInterview(initialInterviewState);
      setShowDialog(initialShowDialogState);
      setApplicants(applicantsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [jobId]);

  useEffect(() => {
    fetchData();
  }, [jobId, fetchData]);

  const handleScheduleInterview = async (applicantId) => {
    try {
      const interviewDate = interview[applicantId].Date;
      const currentDate = new Date();
      if (new Date(interviewDate) <= currentDate) {
        throw new Error("Interview date should be in the future.");
      }

      await axios.post(`/apply/set-interview/${applicantId}`, {
        Date: interviewDate,
        Time: interview[applicantId].Time,
      });
      await fetchData();
      setShowDialog({ ...showDialog, [applicantId]: false });
    } catch (error) {
      console.error("Error scheduling interview:", error);
      toast.error(error.message); // Display error message using toast
    }
  };

  const handleChange = (e, applicantId) => {
    const { name, value } = e.target;
    setInterview((prevInterview) => ({
      ...prevInterview,
      [applicantId]: {
        ...prevInterview[applicantId],
        [name]: value,
      },
    }));
  };

  const handleViewDetails = (resumeId) => {
    navigate(`/employer-dashboard/jobseeker-details/${resumeId}`);
  };

  function formatDate(date) {
    if (!date) return "";
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  }
  const generatePDF = () => {
    const doc = new jsPDF();

    const tableColumn = [
      "Name",
      "Phone Number",
      "Email Address",
      "Date",
      "Time",
    ];
    const tableRows = [];

    applicants.forEach((applicant) => {
      if (interview[applicant._id]?.Date) {
        const applicantData = [
          `${applicant.resume.firstName} ${applicant.resume.lastName}`,
          applicant.resume.phoneNumber,
          applicant.resume.emailAddress,
          interview[applicant._id]?.Date,
          interview[applicant._id]?.Time,
        ];
        tableRows.push(applicantData);
      }
    });

    doc.setFontSize(18);
    doc.text("Interview Schedule", 14, 22);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30, // Ensure the table starts below the title
    });

    doc.save("interview_schedule.pdf");
  };

  const hasScheduledInterviews = applicants.some(
    (applicant) => interview[applicant._id]?.Date
  );

  return (
    <>
      <div className="text-2xl font-bold mb-4">Applicants List</div>
      {hasScheduledInterviews && (
        <div className="flex justify-center mb-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={generatePDF}
          >
            Download Interview Schedule
          </button>
        </div>
      )}
      {applicants.length === 0 ? (
        <div className="text-center text-gray-500 text-2xl font-bold">
          No applicants found.
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {applicants.map((applicant) => (
              <div className="mb-4" key={applicant._id}>
                <div className="bg-white shadow-md rounded-md p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                      <img
                        src={applicant.resume.picture}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <div className="text-lg font-semibold">{`${applicant.resume.firstName} ${applicant.resume.lastName}`}</div>
                    <div className="text-green-500 font-semibold mb-2">
                      {applicant.status || "Unknown"}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Education:</div>
                    <ul className="mb-2">
                      {applicant.resume.education.map((edu, index) => (
                        <li
                          key={index}
                        >{`${edu.degreeEarned} - ${edu.institutionName}`}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Skills:</div>
                    <div>{applicant.resume.skills.join(", ")}</div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                      onClick={() => handleViewDetails(applicant._id)}
                    >
                      View Details
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() =>
                        setShowDialog({
                          ...showDialog,
                          [applicant._id]: true,
                        })
                      }
                    >
                      {interview[applicant._id]?.Date
                        ? "Update Interview"
                        : "Schedule Interview"}
                    </button>
                  </div>
                  {showDialog[applicant._id] && (
                    <div className="mt-4">
                      <div className="mb-2">
                        <label className="block mb-2">Date:</label>
                        <input
                          type="date"
                          name="Date"
                          value={interview[applicant._id]?.Date}
                          onChange={(e) => handleChange(e, applicant._id)}
                          className="border border-gray-300 rounded-md p-2 w-full"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block mb-2">Time:</label>
                        <input
                          type="time"
                          name="Time"
                          value={interview[applicant._id]?.Time}
                          onChange={(e) => handleChange(e, applicant._id)}
                          className="border border-gray-300 rounded-md p-2 w-full"
                          required
                        />
                      </div>
                      <div className="flex justify-center">
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                          onClick={() => handleScheduleInterview(applicant._id)}
                        >
                          Confirm
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-md"
                          onClick={() =>
                            setShowDialog({
                              ...showDialog,
                              [applicant._id]: false,
                            })
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllApplicants;
