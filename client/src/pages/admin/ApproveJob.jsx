import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";

const JobApplicant = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const response = await axios.get("/job/job");
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
    navigate(`/admin/job-description/${jobId}`);
  };

  const handleAction = async (jobId, action) => {
    try {
      const response = await axios.put(`/job/status/${jobId}`, {
        status: action,
      });
      const updatedJob = response.data.job;
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === jobId ? updatedJob : job))
      );
    } catch (error) {
      console.error(`Error ${action}ing job:`, error);
      setError(`Error ${action}ing job. Please try again later.`);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Posted Jobs</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && jobs.length === 0 && <p>No posted jobs found.</p>}
        {!loading && jobs.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Salary</th>
                  <th className="px-4 py-2">Skills</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Date Posted</th>
                  <th className="px-4 py-2">Deadline</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr
                    key={job._id}
                    className={
                      index % 2 === 0 ? "bg-green-100" : "bg-yellow-100"
                    }
                  >
                    <td className="border px-4 py-2">{job.title}</td>
                    <td className="border px-4 py-2">{job.location}</td>
                    <td className="border px-4 py-2">{job.salary}</td>
                    <td className="border px-4 py-2">
                      {job.skills.join(", ")}
                    </td>
                    <td className="border px-4 py-2">
                      {job.status !== undefined &&
                      job.status !== null &&
                      job.status !== ""
                        ? job.status
                        : "Not available"}
                    </td>
                    <td className="border px-4 py-2">
                      {job.datePosted
                        ? new Date(job.datePosted).toLocaleDateString()
                        : "Not available"}
                    </td>
                    <td className="border px-4 py-2">
                      {job.deadline
                        ? new Date(job.deadline).toLocaleDateString()
                        : "Not available"}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleViewDetails(job._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 relative"
                      >
                        <span className="flex items-center">
                          <FaEye className="mr-1" />
                        </span>
                        <span className="tooltip">View Details</span>
                      </button>
                      <button
                        onClick={() => handleAction(job._id, "Accepted")}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 relative"
                      >
                        <span className="flex items-center">
                          <FaCheck className="mr-1" />
                        </span>
                        <span className="tooltip">Approve</span>
                      </button>
                      <button
                        onClick={() => handleAction(job._id, "Rejected")}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded relative"
                      >
                        <span className="flex items-center">
                          <FaTimes className="mr-1" />
                        </span>
                        <span className="tooltip">Reject</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default JobApplicant;
