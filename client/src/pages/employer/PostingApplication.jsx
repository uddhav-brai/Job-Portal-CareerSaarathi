import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const PostingApplication = () => {
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: [""],
    qualificationHighest: [""],
    experienceYears: 0,
    requireEmployee: 1,
    jobType: "Full-Time",
    deadline: "",
    aboutJob: "",
    responsibilities: [""],
    preferredQualifications: [""],
    additionalInformation: [""],
    howToApply: "",
    note: "",
    submitted: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayInputChange = (e, index, field) => {
    const newArray = [...jobData[field]];
    newArray[index] = e.target.value;
    setJobData((prevData) => ({
      ...prevData,
      [field]: newArray,
    }));
  };

  const handleAddItem = (field) => {
    setJobData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], ""],
    }));
  };

  const handleRemoveItem = (index, field) => {
    const newArray = [...jobData[field]];
    newArray.splice(index, 1);
    setJobData((prevData) => ({
      ...prevData,
      [field]: newArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (Date.parse(jobData.deadline) <= Date.now()) {
        throw new Error("Deadline must be in the future.");
      }

      const response = await axios.post("/job/job", jobData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setJobData((prevData) => ({
        ...prevData,
        submitted: true,
      }));

      // Show success toast
      toast.success("Job posted successfully!");
    } catch (error) {
      console.error(error.message);
      // Show error toast
      toast.error(error.message);
    }
  };

  if (jobData.submitted) {
    navigate("/employer-dashboard/posted-application");
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Create Job Posting
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleInputChange}
              required
              autoComplete="title"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Location:</label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleInputChange}
              required
              autoComplete="location"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <label className="block text-gray-700">Description:</label>
        <textarea
          name="description"
          value={jobData.description}
          onChange={handleInputChange}
          required
          autoComplete="description"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        ></textarea>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Salary:</label>
            <input
              type="number"
              name="salary"
              value={jobData.salary}
              onChange={handleInputChange}
              required
              autoComplete="salary"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">
              Experience (in years):
            </label>
            <input
              type="number"
              name="experienceYears"
              value={jobData.experienceYears}
              onChange={handleInputChange}
              required
              autoComplete="experience"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <label className="block text-gray-700">Skills:</label>
        {jobData.skills.map((skill, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleArrayInputChange(e, index, "skills")}
              required
              autoComplete="skill"
              className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index, "skills")}
              className="text-red-600 hover:text-red-800 font-bold flex items-center"
            >
              <FaTrash classNameName="inline-block w-5 h-5 mr-1 " />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("skills")}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Skill
        </button>

        {/* Qualification Highest */}
        <label className="block text-gray-700">Qualification Highest:</label>
        {jobData.qualificationHighest.map((qualification, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={qualification}
              onChange={(e) =>
                handleArrayInputChange(e, index, "qualificationHighest")
              }
              required
              autoComplete="qualification"
              className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index, "qualificationHighest")}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              <FaTrash classNameName="inline-block w-5 h-5 mr-1 " />{" "}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("qualificationHighest")}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Qualification
        </button>

        {/* Responsibilities */}
        <label className="block text-gray-700">Responsibilities:</label>
        {jobData.responsibilities.map((responsibility, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={responsibility}
              onChange={(e) =>
                handleArrayInputChange(e, index, "responsibilities")
              }
              required
              autoComplete="responsibility"
              className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index, "responsibilities")}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              <FaTrash classNameName="inline-block w-5 h-5 mr-1 " />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("responsibilities")}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Responsibility
        </button>

        {/* Preferred Qualifications */}
        <label className="block text-gray-700">Preferred Qualifications:</label>
        {jobData.preferredQualifications.map((qualification, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={qualification}
              onChange={(e) =>
                handleArrayInputChange(e, index, "preferredQualifications")
              }
              required
              autoComplete="qualification"
              className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index, "preferredQualifications")}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              <FaTrash classNameName="inline-block w-5 h-5 mr-1 " />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("preferredQualifications")}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Preferred Qualification
        </button>

        {/* Additional Information */}
        <label className="block text-gray-700">Additional Information:</label>
        {jobData.additionalInformation.map((info, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={info}
              onChange={(e) =>
                handleArrayInputChange(e, index, "additionalInformation")
              }
              required
              autoComplete="additional-information"
              className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index, "additionalInformation")}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              <FaTrash classNameName="inline-block w-5 h-5 mr-1 " />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("additionalInformation")}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Additional Information
        </button>

        <label className="block text-gray-700">No of Opening:</label>
        <input
          type="number"
          name="requireEmployee"
          value={jobData.requireEmployee}
          onChange={handleInputChange}
          required
          autoComplete="requireEmployee"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        />

        <label className="block text-gray-700">Job Type:</label>
        <select
          name="jobType"
          value={jobData.jobType}
          onChange={handleInputChange}
          required
          autoComplete="job-type"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
          <option value="Internship">Internship</option>
          <option value="Temporary">Temporary</option>
        </select>

        <label className="block text-gray-700">Deadline:</label>
        <input
          type="date"
          name="deadline"
          value={jobData.deadline}
          onChange={handleInputChange}
          required
          autoComplete="deadline"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        />

        <label className="block text-gray-700">About the Job:</label>
        <textarea
          name="aboutJob"
          value={jobData.aboutJob}
          onChange={handleInputChange}
          required
          autoComplete="about-job"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        ></textarea>

        <label className="block text-gray-700">How to Apply:</label>
        <textarea
          name="howToApply"
          value={jobData.howToApply}
          onChange={handleInputChange}
          required
          autoComplete="how-to-apply"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        ></textarea>

        <label className="block text-gray-700">Note:</label>
        <textarea
          name="note"
          value={jobData.note}
          onChange={handleInputChange}
          autoComplete="note"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        ></textarea>

        <button
          type="submit"
          className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default PostingApplication;
