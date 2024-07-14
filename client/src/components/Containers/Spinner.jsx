import React from "react";

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <svg
        className="animate-spin h-16 w-16 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8.001 8.001 0 0112 4v4c-2.262 0-4.315.905-5.787 2.373L6 12h4v4H6z"
        ></path>
      </svg>
    </div>
  );
};

export default Spinner;
