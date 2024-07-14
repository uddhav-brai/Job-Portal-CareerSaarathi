import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa"; // Import FontAwesome icons

const GetApplication = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const response = await axios.get("/job/job/user");
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
    navigate(`/employer-dashboard/all-applicants/${jobId}`);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      case "Pending":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatus = (deadline) => {
    return new Date(deadline) > new Date() ? "Live" : "Expired";
  };

  const getStatusColorByTime = (deadline) => {
    return new Date(deadline) > new Date() ? "text-green-500" : "text-red-500";
  };

  const getRowColor = (index) => {
    return index % 2 === 0 ? "#CDFADB" : "#DAFFFB";
  };

  return (
    <>
      <div className="mx-auto px-4 py-8">
        <div>
          <h2
            className="text-3xl font-bold text-center mb-8"
            style={{ color: "#1679AB" }}
          >
            View Applicants
          </h2>
        </div>
        <div>
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && jobs.length === 0 && (
            <p className="text-center">No posted jobs found.</p>
          )}
          {!loading && jobs.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full table-auto mx-auto bg-white border border-gray-200">
                <thead style={{ backgroundColor: "#074173" }}>
                  <tr className="text-white">
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Skills</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Date Posted</th>
                    <th className="px-4 py-2">Deadline</th>
                    <th className="px-4 py-2">Current Status</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, index) => (
                    <tr
                      key={job._id}
                      style={{ backgroundColor: getRowColor(index) }}
                    >
                      <td className="border px-4 py-2">{job.title}</td>

                      <td className="border px-4 py-2">{job.location}</td>
                      <td className="border px-4 py-2">
                        <div className="flex flex-wrap">
                          {job.skills.map((skill, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-200 text-gray-800 font-semibold px-2 py-1 rounded-full text-sm mr-2 mb-2"
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="border px-4 py-2">
                        <div
                          className={`text-white font-semibold px-2 py-1 rounded-full text-sm ${getStatusColor(
                            job.status
                          )}`}
                        >
                          {job.status}
                        </div>
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(job.datePosted).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(job.deadline).toLocaleDateString()}
                      </td>
                      <td
                        className={`border px-4 py-2 ${getStatusColorByTime(
                          job.deadline
                        )}`}
                      >
                        <div className="bg-yellow-100 font-bold text-center px-2 py-1 rounded-full text-sm mr-2 mb-2">
                          {getStatus(job.deadline)}
                        </div>
                      </td>
                      <td className="border px-4 py-2">
                        <div className=" flex justify-center items-center space-x-2">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleViewDetails(job._id)}
                              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2 relative"
                              title="View Details"
                            >
                              <FaEye className="mr-1" />
                              <span className="tooltip">View Applicants</span>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GetApplication;
