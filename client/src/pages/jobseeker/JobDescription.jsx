import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const JobDescription = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`/job/${jobId}`);
        setJobDetails(response.data.data);
      } catch (error) {
        setError("Error fetching job details. Please try again later.");
        console.error("Error fetching job details:", error.message);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const applyForJob = async () => {
    try {
      const response = await axios.post(`/apply/applied-jobs/${jobId}`);
      toast.success(response.data.message); // Display success message
      navigate("/dashboard/appliedJob");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400 || status === 404) {
          toast.error(error.response.data.message); // Display error message from backend
        } else {
          toast.error("Server Error"); // Display generic error message for other errors
        }
      } else {
        toast.error("Network Error"); // Display error message for network errors
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-8">
          {error && <div className="text-red-500">{error}</div>}
          {jobDetails && (
            <>
              <div className="flex flex-col md:flex-row items-center justify-between mb-6 border-b pb-4">
                <div className="flex items-center mb-4 md:mb-0">
                  <img
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    src={jobDetails.company.picture}
                    alt={jobDetails.company.name}
                  />
                  <div>
                    <h1 className="text-2xl font-semibold">
                      {jobDetails.company.name}
                    </h1>
                    <p className="text-gray-600">
                      {jobDetails.company.mission}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate(`/view-company/${jobDetails.company._id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
                >
                  View Company
                </button>
              </div>

              <h2 className="text-3xl font-bold mb-4">{jobDetails.title}</h2>
              <p className="text-gray-700 mb-6">{jobDetails.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <strong className="text-gray-800">Location:</strong>{" "}
                  <span className="text-gray-600">{jobDetails.location}</span>
                </div>
                <div>
                  <strong className="text-gray-800">Salary:</strong>{" "}
                  <span className="text-gray-600">Rs.{jobDetails.salary}</span>
                </div>
                <div>
                  <strong className="text-gray-800">Skills:</strong>
                  <div className="flex flex-wrap">
                    {jobDetails.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-200 text-gray-800 font-semibold px-2 py-1 rounded-full mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong className="text-gray-800">
                    Qualification Highest:
                  </strong>
                  <ul className="list-disc list-inside text-gray-600">
                    {jobDetails.qualificationHighest.map((qualification) => (
                      <li key={qualification}>{qualification}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="text-gray-800">
                    Experience Required:
                  </strong>{" "}
                  <span className="text-gray-600">
                    {jobDetails.experienceYears} years
                  </span>
                </div>
                <div>
                  <strong className="text-gray-800">No of Opening:</strong>{" "}
                  <span className="text-gray-600">
                    {jobDetails.requireEmployee} Candidates
                  </span>
                </div>
                <div>
                  <strong className="text-gray-800">Job Type:</strong>{" "}
                  <span className="text-gray-600">{jobDetails.jobType}</span>
                </div>
                <div>
                  <strong className="text-gray-800">Date Posted:</strong>{" "}
                  <span className="text-gray-600">
                    {new Date(jobDetails.datePosted).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-800">Deadline:</strong>{" "}
                  <span className="text-gray-600">
                    {new Date(jobDetails.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <strong className="text-gray-800 block mb-2">
                  About the Job:
                </strong>
                <p className="text-gray-600">{jobDetails.aboutJob}</p>
              </div>

              <div className="mt-6">
                <strong className="text-gray-800 block mb-2">
                  Responsibilities:
                </strong>
                <ul className="list-disc list-inside text-gray-600">
                  {jobDetails.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </div>

              {jobDetails.preferredQualifications && (
                <div className="mt-6">
                  <strong className="text-gray-800 block mb-2">
                    Preferred Qualifications:
                  </strong>
                  <ul className="list-disc list-inside text-gray-600">
                    {jobDetails.preferredQualifications.map(
                      (prefQualification) => (
                        <li key={prefQualification}>{prefQualification}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {jobDetails.additionalInformation && (
                <div className="mt-6">
                  <strong className="text-gray-800 block mb-2">
                    Additional Information:
                  </strong>
                  <ul className="list-disc list-inside text-gray-600">
                    {jobDetails.additionalInformation.map((info) => (
                      <li key={info}>{info}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <strong className="text-gray-800 block mb-2">
                  How to Apply:
                </strong>
                <p className="text-gray-600">{jobDetails.howToApply}</p>
              </div>

              {jobDetails.note && (
                <div className="mt-6">
                  <strong className="text-gray-800 block mb-2">Note:</strong>
                  <p className="text-gray-600">{jobDetails.note}</p>
                </div>
              )}

              {userRole === "admin" ? null : (
                <button
                  onClick={applyForJob}
                  className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 block w-full md:w-auto"
                >
                  Apply Now
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
