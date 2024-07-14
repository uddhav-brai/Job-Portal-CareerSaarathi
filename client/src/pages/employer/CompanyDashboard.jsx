import React, { useEffect, useState } from "react";
import { DashboardNav } from "../../components";
import { FaClipboardList, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";

const CompanyDashboard = () => {
  const pageTitle = "Dashboard";
  const [totalJobsPosted, setTotalJobsPosted] = useState(0);
  const [totalAcceptedJobs, setTotalAcceptedJobs] = useState(0);
  const [totalRejectedJobs, setTotalRejectedJobs] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get("/job/total-job");
      const { data } = response.data;
      setTotalJobsPosted(data.totalJobsPosted);
      setTotalAcceptedJobs(data.totalAcceptedJobs);
      setTotalRejectedJobs(data.totalRejectedJobs);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <>
      <DashboardNav pageTitle={pageTitle} />
      <div>
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Welcome to your Dashboard
        </h2>
        <p className="text-lg text-gray-600">
          Here's a summary of your job postings:
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
                Total Job Posted
              </p>
              <p className="text-xl lg:text-4xl font-semibold text-gray-900">
                {totalJobsPosted}
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
                {totalAcceptedJobs}
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
                {totalRejectedJobs}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDashboard;
