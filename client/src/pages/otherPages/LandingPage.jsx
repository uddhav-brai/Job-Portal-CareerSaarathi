import React from "react";
import { Navbar } from "../../components";
import businessman from "../../Assets/images/form.png";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const LandingPage = () => {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden bg-gray-100">
        <Navbar />
        <div className="flex items-center justify-center h-full overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="sm:col-span-1">
                <div className="text-center sm:text-left">
                  <h2 className="text-4xl font-bold text-indigo-800 mb-6">
                    Empowering Companies and Job Seekers Alike
                  </h2>
                  <p className="text-gray-700 text-lg mb-6">
                    A platform designed to bridge the gap between companies and
                    job seekers, fostering growth and opportunity for both.
                  </p>
                  <p className="text-gray-700 text-lg mb-6">
                    Whether you're a company looking to expand your team or a
                    job seeker searching for new opportunities, our platform
                    provides the tools and resources you need to succeed.
                  </p>
                  {/* Updated button to Link component */}
                  <Link to="/register" className="text-white">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center sm:justify-end sm:col-span-1">
                <img
                  src={businessman}
                  alt="Businessman"
                  className="w-full sm:max-w-md rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
