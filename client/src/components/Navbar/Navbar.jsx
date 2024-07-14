import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import Logo from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-white">
              <Logo />
            </Link>
          </div>
          <div className="hidden sm:block sm:ml-6 flex-grow">
            <div className="flex justify-center space-x-4">
              <a
                href="/readblogs"
                className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Blogs
              </a>
              <a
                href="/search-vacancy"
                className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Find Job
              </a>
            </div>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="bg-white text-purple-800 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-purple-700 focus:outline-none focus:bg-purple-700 focus:text-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } sm:hidden absolute top-0 right-0 h-full w-64 bg-purple-800 z-50`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-purple-700 focus:outline-none focus:bg-purple-700 focus:text-white"
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Close menu</span>
              <FaTimes className="block h-6 w-6" />
            </button>
          </div>
          <div className="px-4 py-2">
            <a
              href="/readblogs"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Blogs
            </a>
            <a
              href="#find-company"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Find Company
            </a>
            <Link
              to="/login"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
