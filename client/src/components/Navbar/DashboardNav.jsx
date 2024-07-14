import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const DashboardNav = ({ pageTitle }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full h-20 px-4 mx-auto max-w-screen-xl lg:px-6 space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="tile">
        <p className="text-xl font-medium text-gray-800">{pageTitle}</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="backlink">
          <Link to="" className="text-blue-600 hover:text-blue-800">
            Back to Homepage
          </Link>
        </div>
        <div className="notification">
          <Link to="/notification">
            <FontAwesomeIcon icon={faBell} className="text-gray-600" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
