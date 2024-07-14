import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmployerSetting = ({ userId }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    try {
      if (newPassword.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return;
      }

      const response = await axios.put("/user/update-user-password", {
        currentPassword,
        newPassword,
      });

      toast.success(response.data.message);

      // Clear input fields upon successful password change
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const handleDeleteAccount = async () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`/user/employer`); // Assuming userId is required for the delete request
      if (response.status === 200) {
        toast.success(response.data.message);
        // Navigate to login after successful deletion
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Account Settings
        </h2>
        <p className="text-gray-600 text-sm">
          Manage your account settings here.
        </p>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-gray-600">Current Password:</label>
          <input
            type="password"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-gray-600">New Password:</label>
          <input
            type="password"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleUpdatePassword}
        >
          Update Password
        </button>
        <button
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to delete your account?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerSetting;
