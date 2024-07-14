import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Navbar } from "../../components";
import "./css/forms.css";
import businessman from "../../Assets/images/form.png";
import axios from "axios";

const Register = () => {
  const [role, setRole] = useState("jobseeker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      role,
      email,
      password,
    };

    try {
      const response = await axios.post("/user/register", data);

      if (response.status === 201) {
        toast.success("Registration successful");
        // Redirect to login page
        // You may replace the following line with your own routing logic
        window.location.href = `/verify?email=${encodeURIComponent(email)}`;
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during registration");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col overflow-y-hidden">
        <Navbar />
        <div className="flex-grow flex flex-col lg:flex-row items-bottom justify-center bg-white overflow-hidden">
          {/* image container */}
          <div className="lg:w-1/2 flex flex-col justify-end items-ceneter lg:items-start pb-0 lg:pb-0">
            <div className="max-w-md mx-auto p-4 pb-0">
              <h2 className="text-3xl font-bold text-purple-800 text-center mb-4">
                Welcome
              </h2>
              <p className="text-lg text-gray-700 text-center mb-8">
                Move towards your goal. We're going to give you an opportunity.
              </p>
              <img
                src={businessman}
                alt="Businessman"
                className="mx-auto mt-4"
                style={{ maxWidth: "80%", height: "auto" }}
              />
            </div>
          </div>
          {/* Sign up container */}
          <div className="lg:w-1/2 p-4  flex justify-center items-center">
            <div className="max-w-md w-full mx-auto">
              <h2 className="text-3xl font-bold text-purple-800 text-center mb-4">
                Sign Up
              </h2>
              <h4 className="text-xl  text-purple-800 text-center mb-4">
                Select Your Role
              </h4>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                <div>
                  <button
                    onClick={() => handleRoleChange("jobseeker")}
                    disabled={role === "jobseeker"}
                    className={`px-4 py-2 rounded-md focus:outline-none ${
                      role === "jobseeker"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    Job Seeker
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleRoleChange("employer")}
                    disabled={role === "employer"}
                    className={`px-4 py-2 rounded-md focus:outline-none ${
                      role === "employer"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    Employer
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 rounded-md w-full focus:border-indigo-500"
                  placeholder="Enter your email"
                />

                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 rounded-md w-full focus:border-indigo-500"
                  placeholder="Enter your password"
                />

                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 rounded-md w-full focus:border-indigo-500"
                  placeholder="Confirm your password"
                />

                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white w-full"
                >
                  Sign Up
                </button>
              </form>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-purple-600 font-medium">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
