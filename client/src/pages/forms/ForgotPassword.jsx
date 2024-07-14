import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [verificationCodeVerified, setVerificationCodeVerified] =
    useState(false);

  const isValidEmail = (email) => {
    // Regular expression for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendVerificationCode = async () => {
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("/user/forgot-password", { email });
      toast.success(response.data.message);
      setVerificationCodeSent(true);
    } catch (error) {
      toast.error("Failed to send verification code. Please try again.");
    }
  };

  const handleVerifyVerificationCode = async () => {
    const code = verificationCode.join("");
    try {
      const response = await axios.post("/user/verify-verification-code", {
        email,
        verificationCode: code,
      });
      toast.success(response.data.message);
      setVerificationCodeVerified(true);
    } catch (error) {
      toast.error("Failed to verify verification code. Please try again.");
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match. Please re-enter.");
      return;
    }

    try {
      const response = await axios.post("/user/update-forgot-password", {
        email,
        newPassword,
      });
      toast.success(response.data.message);
      navigate("/login"); // Navigate to /login upon successful password update
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
    }
  };

  const handleInputChange = (index, value) => {
    // Check if value is a number
    if (!isNaN(value)) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      // Move to the next input box if a number is entered
      if (value && index < verificationCode.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      toast.error("Please enter only numeric characters");
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !verificationCode[index]) {
      // Move to the previous input box and clear its content if backspace is pressed and the current box is empty
      inputRefs.current[index - 1].focus();
      handleInputChange(index - 1, "");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    if (
      /^\d+$/.test(pasteData) &&
      pasteData.length <= verificationCode.length
    ) {
      const newVerificationCode = [
        ...pasteData.split("").slice(0, verificationCode.length),
      ];
      setVerificationCode(newVerificationCode);
    } else {
      toast.error("Invalid input. Please paste only numeric characters.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md mx-auto">
        {verificationCodeVerified ? (
          <div>
            <label className="block mb-2">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 mb-3 focus:outline-none focus:border-purple-500"
            />
            <label className="block mb-2">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 mb-3 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={handleUpdatePassword}
              className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-purple-700"
            >
              Update Password
            </button>
          </div>
        ) : verificationCodeSent ? (
          <div>
            <label className="block mb-2">Verification Code:</label>
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
            <button
              onClick={handleVerifyVerificationCode}
              className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-purple-700"
            >
              Verify Code
            </button>
          </div>
        ) : (
          <div>
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 mb-3 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={handleSendVerificationCode}
              className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-purple-700"
            >
              Send Verification Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
