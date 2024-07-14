import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Spinner from "./components/Containers/Spinner";

const Protected = ({ role }) => {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(false); // State for page loading

  useEffect(() => {
    const authenticated = () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        navigate("/login");
      }
    };

    const authorizedRole = () => {
      const userRole = localStorage.getItem("role");
      if (userRole !== role) {
        navigate("/unauthorized");
      }
    };

    authenticated();
    authorizedRole();
  }, [role, navigate]);

  // Function to handle page loading
  const handlePageLoading = (loading) => {
    setPageLoading(loading);
  };

  // Render the Component with its children or spinner if loading
  return pageLoading ? (
    <Spinner />
  ) : (
    <Outlet onPageLoading={handlePageLoading} />
  );
};

export default Protected;
