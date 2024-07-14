import React, { useState, useEffect } from "react";
import { FaBuilding, FaFileAlt } from "react-icons/fa";
import { DashboardNav } from "../../components";

const AdminDashboard = () => {
  const [totalCounts, setTotalCounts] = useState({
    totalCompanyProfiles: 0,
    totalResumes: 0,
  });
  const pageTitle = "Dashboard";

  useEffect(() => {
    fetchTotalCounts();
  }, []);

  const fetchTotalCounts = async () => {
    try {
      const response = await fetch("/company/get-information");
      if (response.ok) {
        const data = await response.json();
        setTotalCounts(data);
      } else {
        console.error("Failed to fetch total counts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching total counts:", error);
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
              <FaBuilding className="text-4xl lg:text-6xl text-blue-400 mb-2 lg:mb-4" />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg lg:text-2xl font-semibold text-gray-800 mb-1 lg:mb-2">
                Total Company
              </p>
              <p className="text-xl lg:text-4xl font-semibold text-gray-900">
                {totalCounts.totalCompanyProfiles}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-auto lg:flex-grow lg:flex-shrink lg:flex-basis lg:mr-4 mb-4">
          <div className="bg-green-100 border border-green-200 shadow-md rounded-lg p-4 lg:p-6 flex-grow flex items-center justify-center">
            <div className="flex flex-col items-center mr-4">
              <FaFileAlt className="text-4xl lg:text-6xl text-green-400 mb-2 lg:mb-4" />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg lg:text-2xl font-semibold text-gray-800 mb-1 lg:mb-2">
                Total Resume
              </p>
              <p className="text-xl lg:text-4xl font-semibold text-gray-900">
                {totalCounts.totalResumes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
