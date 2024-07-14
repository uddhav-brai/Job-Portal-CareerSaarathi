import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Navbar } from "../../components";
import "./css/forms.css";
import axios from "axios";
import businessman from "../../Assets/images/form.png";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post("/user/login", data);

      if (response.status === 200) {
        const tokenData = response.data;
        const userRole = tokenData.role;

        toast.success("Login successful");

        const hasProfile = tokenData.profile;

        localStorage.setItem("hasProfile", hasProfile);
        localStorage.setItem("authToken", tokenData.token);
        localStorage.setItem("role", userRole);

        switch (userRole) {
          case "admin":
            window.location.href = "/admin";
            break;
          case "jobseeker":
            if (!hasProfile) {
              window.location.href = "/dashboard/myapplication";
            } else {
              window.location.href = "/dashboard";
            }
            break;
          case "employer":
            if (!hasProfile) {
              window.location.href = "/employer-dashboard/create-profile";
            } else {
              window.location.href = "/employer-dashboard";
            }
            break;
          default:
            window.location.href = "/default-dashboard";
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorData = error.response.data;
        if (errorData.isVerified === false) {
          window.location.href = `/verify?email=${encodeURIComponent(email)}`;
          return;
        }
      }

      if (error.response) {
        const errorData = error.response.data;
        toast.error(errorData?.message || "Login failed");
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error("An error occurred while processing your request");
      }
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col lg:flex-row items-bottom justify-center bg-white overflow-hidden">
          {/* image container */}
          <div className="lg:w-1/2 flex flex-col justify-end items-ceneter lg:items-start pb-0 lg:pb-0">
            <div className="max-w-md mx-auto p-4 pb-0">
              <h2 className="text-3xl font-bold text-purple-800 text-center mb-4">
                Welcome Back
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
          {/* Sign in container */}
          <div className="lg:w-1/2 p-4  flex justify-center items-center">
            <div className="max-w-md w-full mx-auto">
              <h2 className="text-3xl font-bold text-purple-800 text-center mb-4">
                Sign In
              </h2>
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
                  className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 rounded-md w-full 
             focus:border-indigo-500"
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
                  className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 rounded-md w-full 
             focus:border-indigo-500"
                  placeholder="Enter your password"
                />

                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white w-full"
                >
                  Login
                </button>
              </form>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-purple-600 font-medium">
                    Sign Up
                  </Link>
                </p>
                <p className="text-sm text-gray-600">
                  Forgot your password?{" "}
                  <Link
                    to="/forgot-password"
                    className="text-purple-600 font-medium"
                  >
                    Reset Password
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

export default LogIn;
