import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaBars,
  FaUser,
  FaClipboardList,
  FaBlog,
  FaNewspaper,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";
import Logo from "./Logo";
import axios from "axios";

const AdminSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("hasProfile");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    axios
      .get("/user/logout")
      .then((response) => {
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Logout request failed:", error);
        window.location.href = "/login";
      });
  };

  const renderNavLink = (to, icon, text) => (
    <NavLink
      to={to}
      className={`navlink flex items-center p-4 hover:bg-blue-200 ${
        location.pathname === to ? "bg-blue-100 text-gray-900" : "text-gray-800"
      }`}
      onClick={() => setShowSidebar(false)} // Close sidebar on NavLink click
    >
      <div className="flex items-center">
        {icon}
        <p className="elementname ml-2">{text}</p>
      </div>
    </NavLink>
  );

  return (
    <>
      <div className="relative">
        <div className="sm:hidden absolute top-0 right-0 mt-4 mr-4">
          <FaBars
            className="text-gray-800 cursor-pointer"
            onClick={() => setShowSidebar(!showSidebar)}
          />
        </div>
        <div
          className={`sm:flex flex-col sm:w-64 fixed left-0 bottom-0 bg-gray-200 text-gray-800 shadow-lg ${
            showSidebar ? "block" : "hidden"
          }`}
          style={{ height: "100vh" }}
        >
          {/* sidebar div */}
          <div>
            <div className="">
              <>
                <div className="logo mb-4">
                  <Logo />
                </div>
                {renderNavLink(
                  "/admin",
                  <FaUser className="icon" />,
                  "Dashboard"
                )}
                {renderNavLink(
                  "/admin/get-all-users",
                  <FaClipboardList className="icon" />,
                  "All Users"
                )}
                {renderNavLink(
                  "/admin/post-blog",
                  <FaBlog className="icon" />,
                  "Post Blog"
                )}
                {renderNavLink(
                  "/admin/all-blog",
                  <FaNewspaper className="icon" />,
                  "All Blog"
                )}
                {renderNavLink(
                  "/admin/job-applicant",
                  <FaFileAlt className="icon" />,
                  "Manage Job Applicant"
                )}
                {renderNavLink(
                  "/admin/approve-job",
                  <FaFileAlt className="icon" />,
                  "Select Job Posting"
                )}
                {renderNavLink(
                  "/admin/admin-setting",
                  <FaCog className="icon" />,
                  "Setting"
                )}
              </>
            </div>
          </div>
          {/* Logout button placed here */}
          <div className="flex item-center mt-auto">
            <div className="p-4">
              <button
                onClick={handleLogout}
                className="hover:bg-gray-300 bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                <FaSignOutAlt className="icon" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
