import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminSetting = ({ userId }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdatePassword = async () => {
    try {
      const response = await axios.put("/user/update-user-password", {
        currentPassword,
        newPassword,
      });
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
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
      </div>
    </div>
  );
};

export default AdminSetting;
