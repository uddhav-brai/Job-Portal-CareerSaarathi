import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = new URLSearchParams(location.search).get("email") || "";
  const inputRefs = useRef([]);

  const handleVerification = async () => {
    const code = verificationCode.join("");
    try {
      const response = await axios.post("/user/verify-email", {
        email,
        verificationCode: code,
      });

      if (response.status === 200) {
        toast.success("Email verified successfully");
        navigate("/login");
      } else {
        toast.error("Email verification failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during email verification");
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    if (!isNaN(value)) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      if (value && index < verificationCode.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      toast.error("Please enter only numeric characters");
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !verificationCode[index]) {
      inputRefs.current[index - 1].focus();
      handleInputChange(index - 1, "");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    if (
      /^\d*$/.test(pasteData) &&
      pasteData.length <= verificationCode.length
    ) {
      const newVerificationCode = [...verificationCode];
      pasteData.split("").forEach((char, index) => {
        newVerificationCode[index] = char;
      });
      setVerificationCode(newVerificationCode);
      inputRefs.current[verificationCode.length - 1].focus();
    } else {
      toast.error("Invalid input. Please paste only numeric characters.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-800 to-purple-600">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-purple-800 mb-6">
          Email Verification
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Enter the verification code sent to your email:
        </p>
        <div className="flex justify-center mb-6">
          {verificationCode.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="border border-gray-300 rounded text-center w-12 mr-2 focus:outline-none focus:border-purple-500"
            />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleVerification}
            className="bg-purple-600 text-white font-semibold py-3 px-6 rounded hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
          >
            Verify Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
