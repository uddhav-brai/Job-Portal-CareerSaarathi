import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GetAllUsers = () => {
  const navigate = useNavigate();
  const [jobseekers, setJobseekers] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [activeTab, setActiveTab] = useState("jobseekers");
  const [userId, setUserId] = useState("");
  const [banReason, setBanReason] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserBanReason, setSelectedUserBanReason] = useState("");

  const fetchData = async () => {
    try {
      const jobseekerResponse = await axios.get("/admin/jobseekers");
      const employerResponse = await axios.get("/admin/employers");
      setJobseekers(jobseekerResponse.data);
      setEmployers(employerResponse.data);
    } catch (error) {
      console.error("Error fetching GetAllUsers:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedUserBanReason(""); // Clear selected user ban reason
  };

  const handleViewJobSeekerDetails = (resumeId) => {
    navigate(`/admin/view-jobseeker/${resumeId}`);
  };

  const handleViewCompanyDetails = (companyId) => {
    navigate(`/admin/view-company/${companyId}`);
  };

  const openBanDialog = (userId) => {
    setUserId(userId);
    setIsDialogOpen(true);
  };

  const closeBanDialog = () => {
    setIsDialogOpen(false);
    setSelectedUserBanReason(""); // Clear selected user ban reason
  };

  const banUser = async () => {
    try {
      if (!banReason.trim()) {
        // Add custom validation message or highlight the input field
        toast.error("Ban reason is required.");
        return;
      }
      await axios.post(`/admin/ban/${userId}`, { banReason });

      setIsDialogOpen(false);
      toast.success("User Banned Successfully");
      fetchData();
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const unbanUser = async (userId) => {
    try {
      await axios.post(`/admin/unban/${userId}`);
      toast.success("User Unbanned Successfully");
      fetchData();
    } catch (error) {
      console.error("Error unbanning user:", error);
    }
  };

  const viewBanReason = (reason) => {
    setSelectedUserBanReason(reason);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === "jobseekers"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => handleTabChange("jobseekers")}
        >
          Jobseekers
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "employers" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => handleTabChange("employers")}
        >
          Employers
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Last Logged In</th>
            <th className="border px-4 py-2">Role</th>
            {activeTab === "jobseekers" && (
              <th className="border px-4 py-2">Resume</th>
            )}
            {activeTab === "employers" && (
              <th className="border px-4 py-2">Company</th>
            )}
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {activeTab === "jobseekers" &&
            (jobseekers.length > 0 ? (
              jobseekers.map((user) => (
                <tr key={user.user._id}>
                  <td className="border px-4 py-2">
                    {user.resume &&
                      user.resume &&
                      `${user.resume.firstName} ${user.resume.lastName}`}
                  </td>
                  <td className="border px-4 py-2">{user.user.email}</td>
                  <td className="border px-4 py-2">
                    {user.user.updatedAt
                      ? new Date(user.user.updatedAt).toLocaleString()
                      : "Not Logged in yet"}
                  </td>
                  <td className="border px-4 py-2">{user.user.role}</td>
                  <td className="border px-4 py-2">
                    {user.resume ? (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() =>
                          handleViewJobSeekerDetails(user.resume._id)
                        }
                      >
                        View Details
                      </button>
                    ) : (
                      "No Resume"
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {!user.user.isBanned && (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => openBanDialog(user.user._id)}
                      >
                        Ban
                      </button>
                    )}
                    {user.user.isBanned && (
                      <button
                        className="bg-green-500 text-white px-4 py-2 mb-3 rounded"
                        onClick={() => unbanUser(user.user._id)}
                      >
                        Unban
                      </button>
                    )}
                    {user.user.isBanned && (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => viewBanReason(user.user.banReason)}
                      >
                        View Ban Reason
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2" colSpan="5">
                  No Jobseeker
                </td>
              </tr>
            ))}
          {activeTab === "employers" &&
            (employers.length > 0 ? (
              employers.map((user) => (
                <tr key={user.user._id}>
                  <td className="border px-4 py-2">
                    {user.companyProfile && user.companyProfile.name}
                  </td>
                  <td className="border px-4 py-2">{user.user.email}</td>
                  <td className="border px-4 py-2">
                    {user.user.updatedAt
                      ? new Date(user.user.updatedAt).toLocaleString()
                      : "Not Logged in yet"}
                  </td>

                  <td className="border px-4 py-2">{user.user.role}</td>
                  <td className="border px-4 py-2">
                    {user.companyProfile ? (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() =>
                          handleViewCompanyDetails(user.companyProfile._id)
                        }
                      >
                        View Details
                      </button>
                    ) : (
                      "No Company Profile"
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {!user.user.isBanned && (
                      <button
                        className="bg-red-500 text-white px-4 py-2 mb-3 rounded"
                        onClick={() => openBanDialog(user.user._id)}
                      >
                        Ban
                      </button>
                    )}
                    {user.user.isBanned && (
                      <button
                        className="bg-green-500 text-white px-4 mb-3 py-2 rounded"
                        onClick={() => unbanUser(user.user._id)}
                      >
                        Unban
                      </button>
                    )}
                    {user.user.isBanned && (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => viewBanReason(user.user.banReason)}
                      >
                        View Ban Reason
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2" colSpan="5">
                  No Employer
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className={`${isDialogOpen ? "block" : "hidden"}`}>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded">
          <button
            className="absolute top-0 right-0 p-2"
            onClick={closeBanDialog}
          >
            Close
          </button>
          <h3 className="mb-4">Ban Reason</h3>
          {selectedUserBanReason && <p>{selectedUserBanReason}</p>}
          {!selectedUserBanReason && (
            <div className="mt-4">
              <input
                type="text"
                className="border p-2 w-full mb-2"
                placeholder="Ban Reason"
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={banUser}
              >
                Confirm
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeBanDialog}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAllUsers;
