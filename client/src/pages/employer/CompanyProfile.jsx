import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const CompanyProfile = () => {
  const [companyProfile, setCompanyProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await axios.get(`/company/profile/me`);
        setCompanyProfile(response.data.data);
      } catch (error) {
        console.error("Error fetching company profile:", error.response.data);
        // Optionally, show an error message to the user
      }
    };

    fetchCompanyProfile();
  }, []);

  const handleUpdate = () => {
    console.log("Navigating to update profile page...");
    navigate(`/employer-dashboard/update-profile`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {companyProfile ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <img
                  src={companyProfile.picture}
                  alt="Company Logo"
                  className="w-20 h-20 object-cover rounded-full mr-4 shadow-md"
                />
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-1">
                    {companyProfile.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {companyProfile.industry} | {companyProfile.size}
                  </p>
                  <p className="text-gray-700 mb-1">
                    {companyProfile.headquarters.city},{" "}
                    {companyProfile.headquarters.country}
                  </p>
                  <p className="text-gray-700 mb-4">
                    Founded: {companyProfile.foundedYear}
                  </p>
                  {Object.keys(companyProfile.socialMedia).length > 0 && (
                    <div className="flex space-x-4">
                      <a
                        href={companyProfile.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="text-blue-500" />
                      </a>
                      <a
                        href={companyProfile.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter className="text-blue-500" />
                      </a>
                      <a
                        href={companyProfile.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook className="text-blue-500" />
                      </a>
                      <a
                        href={companyProfile.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram className="text-blue-500" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleUpdate}
              >
                Update Profile
              </button>
            </div>
            <hr className="my-6 border-gray-300" />
            <div className="text-xl font-bold text-gray-800 mb-6">
              About {companyProfile.name}
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              {companyProfile.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-xl font-bold text-gray-800 mb-2">
                  Contact Information
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> {companyProfile.email}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> {companyProfile.phone}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Website:</strong>{" "}
                  <a
                    href={companyProfile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {companyProfile.website}
                  </a>
                </p>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800 mb-2">
                  Mission & Vision
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Mission:</strong> {companyProfile.mission}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Vision:</strong> {companyProfile.vision}
                </p>
              </div>
            </div>
            <div className="text-xl font-bold text-gray-800 mt-6 mb-2">
              Specialties
            </div>
            <div className="flex flex-wrap mb-6">
              {companyProfile.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                >
                  {specialty}
                </span>
              ))}
            </div>
            <div className="text-xl font-bold text-gray-800 mb-2">
              Positions
            </div>
            <div className="flex flex-wrap mb-6">
              {companyProfile.positions.map((position, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                >
                  {position}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xl text-gray-700 text-center">Loading...</p>
      )}
    </div>
  );
};

export default CompanyProfile;
