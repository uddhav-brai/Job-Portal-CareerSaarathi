import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPage4 } from "react-icons/fa";

const JobApplicant = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const response = await axios.get("/job/job-applicant");
        setJobs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posted jobs:", error);
        setError("Error fetching posted jobs. Please try again later.");
        setLoading(false);
      }
    };

    fetchPostedJobs();
  }, []);

  const handleViewDetails = (jobId) => {
    navigate(`/admin/get-all-applicant/${jobId}`);
  };
  const handleJobDetails = (jobId) => {
    navigate(`/admin/job-description/${jobId}`);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Posted Jobs</h2>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && jobs.length === 0 && (
        <p className="text-gray-600">No posted jobs found.</p>
      )}
      {!loading && jobs.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Company</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Salary</th>
              <th className="border border-gray-300 px-4 py-2">Skills</th>
              <th className="border border-gray-300 px-4 py-2">Date Posted</th>
              <th className="border border-gray-300 px-4 py-2">Deadline</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={job._id}
                className={`${
                  index % 2 === 0 ? "bg-green-100" : "bg-yellow-100"
                } border border-gray-300`}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {job.company.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {job.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {job.location}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {job.salary}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {job.skills.join(", ")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(job.datePosted).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(job.deadline).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleViewDetails(job._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 relative mb-3"
                  >
                    <span className="flex items-center">
                      <FaPage4 className="mr-1" />
                    </span>
                    <span className="tooltip">View Applicants</span>
                  </button>

                  <button
                    onClick={() => handleJobDetails(job._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded relative"
                  >
                    <span className="flex items-center">
                      <FaEye className="mr-1" />
                    </span>
                    <span className="tooltip">View Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobApplicant;
