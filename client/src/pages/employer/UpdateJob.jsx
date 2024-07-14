import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
 import { toast } from "react-toastify";

const UpdateJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: [],
    qualificationHighest: [],
    experienceYears: "",
    requireEmployee: "",
    jobType: "",
    deadline: "",
    aboutJob: "",
    responsibilities: [],
    preferredQualifications: [],
    additionalInformation: [],
    howToApply: "",
    note: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/job/${jobId}`);
        setJob(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Error fetching job. Please try again later.");
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleArrayInputChange = (e, field, index) => {
    const newValue = e.target.value;
    setJob((prevState) => {
      const newArray = prevState[field].map((item, i) => {
        if (i === index) {
          return newValue;
        }
        return item;
      });
      return {
        ...prevState,
        [field]: newArray,
      };
    });
  };

  const handleAddItem = (field) => {
    setJob((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], ""],
    }));
  };

  const handleRemoveItem = (index, field) => {
    setJob((prevState) => {
      const newArray = [...prevState[field]];
      newArray.splice(index, 1);
      return {
        ...prevState,
        [field]: newArray,
      };
    });
  };

 

 const handleSubmit = async (e) => {
   e.preventDefault();

   // Check if the deadline is in the future
   if (new Date(job.deadline) <= new Date()) {
     toast.error("Deadline must be in the future.");
     return;
   }

   try {
     await axios.put(`/job/job/${jobId}`, job);
     console.log("Job updated successfully");
     navigate("/employer-dashboard/posted-application");
   } catch (error) {
     console.error("Error updating job:", error);
     toast.error("Error updating job. Please try again later.");
   }
 };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Update Job</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">Title:</label>
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <label className="block">Description:</label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <label className="block">Location:</label>
          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <label className="block">Salary:</label>
          <input
            type="text"
            name="salary"
            value={job.salary}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <label className="block">Skills:</label>
          {job.skills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleArrayInputChange(e, "skills", index)}
                required
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(index, "skills")}
                className="text-red-600"
              >
                <FaTrash className="inline-block w-4 h-4 mr-1" />
                Remove
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
          <label className="block">Highest Qualification:</label>
          {job.qualificationHighest.map((qualification, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={qualification}
                onChange={(e) =>
                  handleArrayInputChange(e, "qualificationHighest", index)
                }
                required
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(index, "qualificationHighest")}
                className="text-red-600"
              >
                <FaTrash className="inline-block w-4 h-4 mr-1" />
                Remove
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
          <label className="block">Experience (Years):</label>
          <input
            type="text"
            name="experienceYears"
            value={job.experienceYears}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <label className="block">No of Opening (Number):</label>
          <input
            type="text"
            name="requireEmployee"
            value={job.requireEmployee}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <label className="block">Job Type:</label>
          <select
            name="jobType"
            value={job.jobType}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
            <option value="Temporary">Temporary</option>
          </select>
          <label className="block">Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={
              job.deadline
                ? new Date(job.deadline).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <label className="block">About the Job:</label>
          <textarea
            name="aboutJob"
            value={job.aboutJob}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <label className="block">Responsibilities:</label>
          {job.responsibilities.map((responsibility, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={responsibility}
                onChange={(e) =>
                  handleArrayInputChange(e, "responsibilities", index)
                }
                required
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(index, "responsibilities")}
                className="text-red-600"
              >
                <FaTrash className="inline-block w-4 h-4 mr-1" />
                Remove
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
          <label className="block">Preferred Qualifications:</label>
          {job.preferredQualifications.map((qualification, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={qualification}
                onChange={(e) =>
                  handleArrayInputChange(e, "preferredQualifications", index)
                }
                required
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() =>
                  handleRemoveItem(index, "preferredQualifications")
                }
                className="text-red-600"
              >
                <FaTrash className="inline-block w-4 h-4 mr-1" />
                Remove
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
          <label className="block">Additional Information:</label>
          {job.additionalInformation.map((info, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={info}
                onChange={(e) =>
                  handleArrayInputChange(e, "additionalInformation", index)
                }
                required
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(index, "additionalInformation")}
                className="text-red-600"
              >
                <FaTrash className="inline-block w-4 h-4 mr-1" />
                Remove
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
          <label className="block">How to Apply:</label>
          <textarea
            name="howToApply"
            value={job.howToApply}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <label className="block">Note:</label>
          <textarea
            name="note"
            value={job.note}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            class="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none"
          >
            Update Job
          </button>{" "}
        </form>
      </div>
    </>
  );
};

export default UpdateJob;
