import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components";

const JobDashboardLayout = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row h-screen">
        {/* Sidebar */}
        <div className="w-full sm:w-64">
          <Sidebar />
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 m-5 overflow-y-auto">
          {/* Added sm:px-0 for responsive padding */}
          <Outlet style={{ padding: "20px" }} /> {/* Added padding */}
        </div>
      </div>
    </>
  );
};

export default JobDashboardLayout;
