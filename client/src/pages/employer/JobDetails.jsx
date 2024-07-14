import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { jobId } = useParams();
  console.log(jobId);
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <>
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Job Details</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {jobDetails && (
          <>
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16 2H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zM4 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1H4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {jobDetails.title}
                </h2>
                <p className="text-gray-600">{jobDetails.location}</p>
              </div>
            </div>
            <p className="mb-4">
              <span className="font-semibold">Description:</span>
              <br />
              {jobDetails.description}
            </p>
            <div className="grid grid-cols-2 gap-x-4 mb-4">
              <div>
                <p className="font-semibold">Salary:</p>
                <p>{jobDetails.salary}</p>
              </div>
              <div>
                <p className="font-semibold">Experience Required:</p>
                <p>{jobDetails.experienceYears} years</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 mb-4">
              <div>
                <p className="font-semibold">Job Type:</p>
                <p>{jobDetails.jobType}</p>
              </div>
              <div>
                <p className="font-semibold">No of Openings:</p>
                <p>{jobDetails.requireEmployee} Candidates</p>
              </div>
            </div>
            <p className="mb-4">
              <span className="font-semibold">Skills:</span>
              <br />
              {jobDetails.skills.join(", ")}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Qualification Highest:</span>
              <br />
              {jobDetails.qualificationHighest.join(", ")}
            </p>
            <div className="grid grid-cols-2 gap-x-4 mb-4">
              <div>
                <p className="font-semibold">Date Posted:</p>
                <p>
                  {new Date(jobDetails.datePosted).toISOString().split("T")[0]}
                </p>
              </div>
              <div>
                <p className="font-semibold">Deadline:</p>
                <p>
                  {new Date(jobDetails.deadline).toISOString().split("T")[0]}
                </p>
              </div>
            </div>
            <p className="mb-4">
              <span className="font-semibold">About the Job:</span>
              <br />
              {jobDetails.aboutJob}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Responsibilities:</span>
              <br />
              {jobDetails.responsibilities.join(", ")}
            </p>
            {jobDetails.preferredQualifications && (
              <p className="mb-4">
                <span className="font-semibold">Preferred Qualifications:</span>
                <br />
                {jobDetails.preferredQualifications.join(", ")}
              </p>
            )}
            {jobDetails.additionalInformation && (
              <p className="mb-4">
                <span className="font-semibold">Additional Information:</span>
                <br />
                {jobDetails.additionalInformation.join(", ")}
              </p>
            )}
            <p className="mb-4">
              <span className="font-semibold">How to Apply:</span>
              <br />
              {jobDetails.howToApply}
            </p>
            {jobDetails.note && (
              <p className="mb-4">
                <span className="font-semibold">Note:</span>
                <br />
                {jobDetails.note}
              </p>
            )}
            {jobDetails.apply && (
              <p className="mb-4">
                <span className="font-semibold">Apply with Resume:</span>
                <br />
                {jobDetails.apply}
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default JobDetails;
