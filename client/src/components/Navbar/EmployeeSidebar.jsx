import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaListAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import Logo from "./Logo";
import axios from "axios";

const EmployeeSidebar = () => {
  const [hasProfile, setHasProfile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hasProfileValue = localStorage.getItem("hasProfile");
    setHasProfile(hasProfileValue === "true");
  }, []);

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
              {hasProfile && (
                <>
                  <div className="logo mb-4">
                    {" "}
                    {/* Added margin bottom */}
                    <Logo />
                  </div>
                  <div className="part1">
                    {renderNavLink(
                      "/employer-dashboard",
                      <FaHome className="icon" />,
                      "Employer Dashboard"
                    )}
                    {renderNavLink(
                      "/employer-dashboard/posted-application",
                      <FaListAlt className="icon" />,
                      "Posted Application"
                    )}
                    {renderNavLink(
                      "/employer-dashboard/get-applicants",
                      <FaUser className="icon" />,
                      "All Applicants"
                    )}
                    {renderNavLink(
                      "/employer-dashboard/posting-application",
                      <FaListAlt className="icon" />,
                      "Posting Application"
                    )}
                    {renderNavLink(
                      "/employer-dashboard/company-profile",
                      <FaUser className="icon" />,
                      "Profile"
                    )}
                    {renderNavLink(
                      "/employer-dashboard/employer-setting",
                      <FaCog className="icon" />,
                      "Setting"
                    )}
                  </div>
                </>
              )}
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

export default EmployeeSidebar;
