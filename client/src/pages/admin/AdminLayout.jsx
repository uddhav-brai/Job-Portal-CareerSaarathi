import React from "react";

import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/Navbar/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row h-screen">
        {/* Sidebar */}
        <div className="w-full sm:w-64">
          <AdminSidebar />
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

export default AdminLayout;
