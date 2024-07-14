import React, { useState, useEffect } from "react";
import { DashboardNav } from "../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const JobDashboard = () => {
  const pageTitle = "Dashboard";

  const [dashboardData, setDashboardData] = useState({
    totalAppliedJobs: 0,
    acceptedJobs: 0,
    rejectedJobs: 0,
  });
  const [jobs, setMatchingJobData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/apply/total-applied");
        if (response.status === 200) {
          const data = response.data;
          setDashboardData({
            totalAppliedJobs: data.totalAppliedJobs,
            acceptedJobs: data.acceptedJobs,
            rejectedJobs: data.rejectedJobs,
          });
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/job/matching-job/user");
        if (response.status === 200) {
          setMatchingJobData(response.data.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (jobId) => {
    navigate(`/dashboard/job-description/${jobId}`);
  };

  return (
    <>
      <div className=" px-4 sm:px-6 lg:px-8">
        <DashboardNav pageTitle={pageTitle} />
        <div>
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">
            Welcome to your Dashboard
          </h2>
          <p className="text-lg text-gray-600">
            Here's a summary of your Activity:
          </p>
        </div>
        <div className="flex flex-wrap justify-center lg:justify-start">
          <div className="w-full lg:w-auto lg:flex-grow lg:flex-shrink lg:flex-basis lg:mr-4 mb-4">
            <div className="bg-blue-100 border border-blue-200 shadow-md rounded-lg p-4 lg:p-6 flex-grow flex items-center justify-center">
              <div className="flex flex-col items-center mr-4">
                <FaClipboardList className="text-4xl lg:text-6xl text-blue-400 mb-2 lg:mb-4" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg lg:text-2xl font-semibold text-gray-800 mb-1 lg:mb-2">
                  Total Job Applied
                </p>
                <p className="text-xl lg:text-4xl font-semibold text-gray-900">
                  {dashboardData.totalAppliedJobs}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-auto lg:flex-grow lg:flex-shrink lg:flex-basis lg:mr-4 mb-4">
            <div className="bg-green-100 border border-green-200 shadow-md rounded-lg p-4 lg:p-6 flex-grow flex items-center justify-center">
              <div className="flex flex-col items-center mr-4">
                <FaCheckCircle className="text-4xl lg:text-6xl text-green-400 mb-2 lg:mb-4" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg lg:text-2xl font-semibold text-gray-800 mb-1 lg:mb-2">
                  Total Jobs Accepted
                </p>
                <p className="text-xl lg:text-4xl font-semibold text-gray-900">
                  {dashboardData.acceptedJobs}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-auto lg:flex-grow lg:flex-shrink lg:flex-basis mb-4">
            <div className="bg-red-100 border border-red-200 shadow-md rounded-lg p-4 lg:p-6 flex-grow flex items-center justify-center">
              <div className="flex flex-col items-center mr-4">
                <FaTimesCircle className="text-4xl lg:text-6xl text-red-400 mb-2 lg:mb-4" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg lg:text-2xl font-semibold text-gray-800 mb-1 lg:mb-2">
                  Rejected Jobs
                </p>
                <p className="text-xl lg:text-4xl font-semibold text-gray-900">
                  {dashboardData.rejectedJobs}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="matching-job">
          <h2 className="text-xl font-bold mb-4">Recommended Jobs</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Company</th>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Location</th>
                  <th className="px-4 py-2 border">Skills</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Use Tailwind's `className` instead of `class` */}
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr key={job._id}>
                      <td className="px-4 py-2 border">{job.company.name}</td>
                      <td className="px-4 py-2 border">{job.title}</td>
                      <td className="px-4 py-2 border">{job.location}</td>
                      <td className="px-4 py-2 border">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                          >
                            {skill}
                          </span>
                        ))}
                      </td>
                      <td className="px-4 py-2 border">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleViewDetails(job._id)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-2 border">
                      No jobs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDashboard;
