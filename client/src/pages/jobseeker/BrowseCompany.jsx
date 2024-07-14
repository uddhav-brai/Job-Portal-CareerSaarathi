import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BrowseCompany = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [companyProfiles, setCompanyProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyProfiles = async () => {
      try {
        const response = await axios.get("/company/company/all", {
          params: { search: searchQuery },
        });
        setCompanyProfiles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching company profiles:", error);
      }
    };

    fetchCompanyProfiles();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCompanyClick = (companyId) => {
    navigate(`/view-company/${companyId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Company Profiles</h1>
      <input
        type="text"
        placeholder="Search by company name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mb-4"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {companyProfiles.map((profile) => (
            <li key={profile._id} className="mb-4">
              <div
                className="bg-white rounded-md shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleCompanyClick(profile._id)}
                style={{ cursor: "pointer" }}
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2 hover:text-blue-800">
                  {profile.name}
                </h3>
                <p className="text-gray-600">{profile.industry}</p>
                <p className="text-gray-600">
                  {profile.headquarters.city}, {profile.headquarters.country}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BrowseCompany;
