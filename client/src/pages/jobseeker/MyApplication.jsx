import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyApplication = () => {
  const navigate = useNavigate();
  const [resumeData, setResume] = useState({
    picture: "",
    summary: "",

    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    linkedInProfile: "",
    address: "",

    skills: [],
    hobbies: [],
    workExperience: [], // Initialize as empty array
    education: [], // Initialize as empty array
    certifications: [],
    projects: [], // Initialize as empty array
    awardsAndHonors: [],
    languages: [],
  });

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`/resume/resume/me`);
        setResume(response.data.data);
      } catch (error) {
        console.error("Error fetching resume:", error.response.data);
        // Optionally, show an error message to the user
      }
    };

    fetchResume();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setResume((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleArrayChange = (index, parent, value) => {
    setResume((prevState) => {
      const updatedParent = [...prevState[parent]];
      updatedParent[index] = value;
      return {
        ...prevState,
        [parent]: updatedParent,
      };
    });
  };

  const handleNestedChange = (e, index, parent) => {
    const { name, value } = e.target;
    setResume((prevState) => {
      const updatedParent = [...prevState[parent]];
      if (updatedParent[index]) {
        updatedParent[index] = {
          ...updatedParent[index],
          [name]: value,
        };
      }
      return {
        ...prevState,
        [parent]: updatedParent,
      };
    });
  };

  const handleNestedArrayChange = (
    parentIndex,
    childIndex,
    parent,
    child,
    value
  ) => {
    setResume((prevState) => {
      const updatedParent = [...prevState[parent]];
      if (updatedParent[parentIndex] && updatedParent[parentIndex][child]) {
        updatedParent[parentIndex][child][childIndex] = value;
      }
      return {
        ...prevState,
        [parent]: updatedParent,
      };
    });
  };

  const handleNestedAdd = (parentIndex, parent, child, initialValue = "") => {
    setResume((prevState) => {
      const updatedParent = [...prevState[parent]];
      if (updatedParent[parentIndex] && updatedParent[parentIndex][child]) {
        updatedParent[parentIndex][child].push(initialValue);
      }
      return {
        ...prevState,
        [parent]: updatedParent,
      };
    });
  };

  const handleNestedRemove = (parentIndex, childIndex, parent, child) => {
    setResume((prevState) => {
      const updatedParent = [...prevState[parent]];
      if (updatedParent[parentIndex] && updatedParent[parentIndex][child]) {
        updatedParent[parentIndex][child].splice(childIndex, 1);
      }
      return {
        ...prevState,
        [parent]: updatedParent,
      };
    });
  };

  const handleRemove = (index, parent) => {
    setResume((prevState) => {
      const updatedParent = Array.isArray(prevState[parent])
        ? [...prevState[parent]]
        : [];
      updatedParent.splice(index, 1); // Remove item at index
      return {
        ...prevState,
        [parent]: updatedParent,
      };
    });
  };

  const handleAdd = (parent, child = null, initialValue = "") => {
    setResume((prevState) => {
      let updatedParent;
      if (child !== null) {
        const parentArray = [...prevState[parent]];
        parentArray.push({
          [child]: [initialValue], // Initialize with an array containing the initial value
        });
        updatedParent = parentArray;
      } else {
        updatedParent = [...(prevState[parent] || []), ""];
      }
      return {
        ...prevState,
        [parent]: updatedParent,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the phone number has exactly 10 digits
    if (resumeData.phoneNumber.length !== 10) {
      // Show an error toast message
      toast.error("Phone number must be 10 digits long");
      return;
    }

    const currentDate = new Date();
    const errors = new Set(); // Use a Set to prevent duplicate errors

    // Validate work experience entries
    resumeData.workExperience.forEach((exp, index) => {
      const startDate = new Date(exp.startDate);
      const endDate = new Date(exp.endDate);

      if (startDate >= endDate) {
        errors.add(
          `Work experience ${index + 1}: Start date must be before end date.`
        );
      }

      if (endDate > currentDate) {
        errors.add(
          `Work experience ${index + 1}: End date cannot be in the future.`
        );
      }

      if (startDate > currentDate) {
        errors.add(
          `Work experience ${index + 1}: Start date cannot be in the future.`
        );
      }
    });

    // Validate education entries
    resumeData.education.forEach((edu, index) => {
      const startDate = new Date(edu.startDate);
      const graduationDate = new Date(edu.graduationDate);

      if (startDate >= graduationDate) {
        errors.add(
          `Education ${index + 1}: Start date must be before graduation date.`
        );
      }

      if (startDate > currentDate) {
        errors.add(
          `Education ${index + 1}: Start date cannot be in the future.`
        );
      }
    });

    // If there are errors, display them and prevent submission
    if (errors.size > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    const hasProfileValue = localStorage.getItem("hasProfile");
    const method = hasProfileValue ? "PUT" : "POST";
    const url = hasProfileValue ? "/resume/resume" : "/resume";

    // Send request to update or create resume data based on hasProfileValue
    axios({
      method: method,
      url: url,
      data: resumeData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Resume updated successfully:", response.data);
        // Set hasProfileValue to true after successful update or create
        localStorage.setItem("hasProfile", "true");

        // Show success toast message
        toast.success("Profile updated successfully");
        navigate(`/dashboard/myprofile`);
        window.location.reload(); // Reload the window

        // Optionally, you can redirect the user to a different page or show a success message
      })
      .catch((error) => {
        console.error("Error updating or creating resume:", error);
        toast.error("Failed to update profile. Please try again later.");
      });
  };

  function formatDate(dateString) {
    // Check if dateString is a valid date
    const isValidDate = (dateString) => !isNaN(new Date(dateString).getTime());

    if (!dateString || !isValidDate(dateString)) {
      // If dateString is empty or not a valid date, return an empty string or handle it differently based on your requirement
      return "";
    }

    // Create a Date object from the input string
    const date = new Date(dateString);

    // Format the date as YYYY-MM-DD (standard date format for HTML input type="date")
    const formattedDate = date.toISOString().slice(0, 10);

    return formattedDate;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Resume Form</h2>
      {/* Summary */}
      <div className="mb-4">
        <input
          type="file"
          name="picture"
          onChange={(e) =>
            setResume({ ...resumeData, picture: e.target.files[0] })
          }
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Summary</label>
        <textarea
          name="summary"
          value={resumeData.summary}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
          required
        ></textarea>
      </div>

      {/* Contact Information */}
      <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={resumeData.firstName}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={resumeData.lastName}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            value={resumeData.phoneNumber}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="text"
            name="emailAddress"
            value={resumeData.emailAddress}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">LinkedIn</label>
          <input
            type="text"
            name="linkedInProfile"
            value={resumeData.linkedInProfile}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={resumeData.address}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
      </div>

      {/* Skills */}
      <h3 className="text-lg font-semibold mb-2">Skills</h3>
      <div className="mb-4">
        {resumeData.skills &&
          resumeData.skills.map((skill, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) =>
                  handleArrayChange(index, "skills", e.target.value)
                }
                className="border rounded px-2 py-1 mr-2 w-full"
                required
              />
              <button
                type="button"
                onClick={() => handleRemove(index, "skills")}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        <button
          type="button"
          onClick={() => handleAdd("skills")}
          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        >
          Add Skill
        </button>
      </div>

      {/* Hobbies */}
      <h3 className="text-lg font-semibold mb-2">Hobbies</h3>
      <div className="mb-4">
        {resumeData.hobbies &&
          resumeData.hobbies.map((hobby, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={hobby}
                onChange={(e) =>
                  handleArrayChange(index, "hobbies", e.target.value)
                }
                className="border rounded px-2 py-1 mr-2 w-full"
                required
              />
              <button
                type="button"
                onClick={() => handleRemove(index, "hobbies")}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        <button
          type="button"
          onClick={() => handleAdd("hobbies")}
          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        >
          Add Hobby
        </button>
      </div>
      {/* Work Experience */}
      <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
      {resumeData.workExperience &&
        resumeData.workExperience.map((exp, expIndex) => (
          <div key={expIndex} className="mb-4">
            <label className="block mb-1">Company Name</label>
            <input
              type="text"
              value={exp.companyName}
              onChange={(e) =>
                handleNestedChange(e, expIndex, "workExperience")
              }
              name="companyName"
              className="border rounded px-2 py-1 w-full"
              required
            />
            <label className="block mb-1">Job Title</label>
            <input
              type="text"
              value={exp.jobTitle}
              onChange={(e) =>
                handleNestedChange(e, expIndex, "workExperience")
              }
              name="jobTitle"
              className="border rounded px-2 py-1 w-full"
              required
            />
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              value={formatDate(exp.startDate)}
              onChange={(e) =>
                handleNestedChange(e, expIndex, "workExperience")
              }
              name="startDate"
              className="border rounded px-2 py-1 w-full"
              required
            />
            <label className="block mb-1">End Date</label>
            <input
              type="date"
              value={formatDate(exp.endDate)}
              onChange={(e) =>
                handleNestedChange(e, expIndex, "workExperience")
              }
              name="endDate"
              className="border rounded px-2 py-1 w-full"
              required
            />
            {/* Responsibilities */}
            <h4 className="text-md font-semibold mb-1">Responsibilities</h4>
            {exp.responsibilities &&
              exp.responsibilities.map((responsibility, respIndex) => (
                <div key={respIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={responsibility}
                    onChange={(e) =>
                      handleNestedArrayChange(
                        expIndex,
                        respIndex,
                        "workExperience",
                        "responsibilities",
                        e.target.value
                      )
                    }
                    className="border rounded px-2 py-1 mr-2 w-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleNestedRemove(
                        expIndex,
                        respIndex,
                        "workExperience",
                        "responsibilities"
                      )
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            <button
              type="button"
              onClick={() =>
                handleNestedAdd(
                  expIndex,
                  "workExperience",
                  "responsibilities",
                  ""
                )
              }
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
            >
              Add Responsibility
            </button>
            <button
              type="button"
              onClick={() => handleRemove(expIndex, "workExperience")}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove Experience
            </button>
          </div>
        ))}
      <button
        type="button"
        onClick={() => handleAdd("workExperience", "responsibilities")}
        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
      >
        Add Experience
      </button>
      {/* Education */}
      <h3 className="text-lg font-semibold mb-2">Education</h3>
      {resumeData.education &&
        resumeData.education.map((edu, eduIndex) => (
          <div key={eduIndex} className="mb-4">
            <label className="block mb-1">Institution Name</label>
            <input
              type="text"
              value={edu.institutionName}
              onChange={(e) => handleNestedChange(e, eduIndex, "education")}
              name="institutionName"
              className="border rounded px-2 py-1 w-full"
              required
            />
            <label className="block mb-1">Degree Earned</label>
            <input
              type="text"
              value={edu.degreeEarned}
              onChange={(e) => handleNestedChange(e, eduIndex, "education")}
              name="degreeEarned"
              className="border rounded px-2 py-1 w-full"
              required
            />
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              value={formatDate(edu.startDate)}
              onChange={(e) => handleNestedChange(e, eduIndex, "education")}
              name="startDate"
              className="border rounded px-2 py-1 w-full"
              required
            />
            <label className="block mb-1">Expected Graduation Date</label>
            <input
              type="date"
              value={formatDate(edu.graduationDate)}
              onChange={(e) => handleNestedChange(e, eduIndex, "education")}
              name="graduationDate"
              className="border rounded px-2 py-1 w-full"
              required
            />
            {/* Academic Achievements */}
            <h4 className="text-md font-semibold mb-1">
              Academic Achievements
            </h4>
            {edu.academicAchievements &&
              edu.academicAchievements.map((achievement, achIndex) => (
                <div key={achIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) =>
                      handleNestedArrayChange(
                        eduIndex,
                        achIndex,
                        "education",
                        "academicAchievements",
                        e.target.value
                      )
                    }
                    className="border rounded px-2 py-1 mr-2 w-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleNestedRemove(
                        eduIndex,
                        achIndex,
                        "education",
                        "academicAchievements"
                      )
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            <button
              type="button"
              onClick={() =>
                handleNestedAdd(
                  eduIndex,
                  "education",
                  "academicAchievements",
                  ""
                )
              }
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
            >
              Add Achievement
            </button>
            <button
              type="button"
              onClick={() => handleRemove(eduIndex, "education")}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove Education
            </button>
          </div>
        ))}
      <button
        type="button"
        onClick={() => handleAdd("education", "academicAchievements")}
        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
      >
        Add Education
      </button>
      {/* Projects */}
      <h3 className="text-lg font-semibold mb-2">Projects</h3>
      {resumeData.projects &&
        resumeData.projects.map((project, projectIndex) => (
          <div key={projectIndex} className="mb-4">
            <label className="block mb-1">Project Name</label>
            <input
              type="text"
              value={project.projectName}
              onChange={(e) => handleNestedChange(e, projectIndex, "projects")}
              name="projectName"
              className="border rounded px-2 py-1 w-full"
              required
            />
            <label className="block mb-1">Role</label>
            <input
              type="text"
              value={project.role}
              onChange={(e) => handleNestedChange(e, projectIndex, "projects")}
              name="role"
              className="border rounded px-2 py-1 w-full"
              required
            />
            <label className="block mb-1">Project Objective</label>
            <input
              type="text"
              value={project.projectObjective}
              onChange={(e) => handleNestedChange(e, projectIndex, "projects")}
              name="projectObjective"
              className="border rounded px-2 py-1 w-full"
              required
            />
            {/* Outcomes */}
            <h4 className="text-md font-semibold mb-1">Outcomes</h4>
            {project.outcomes &&
              project.outcomes.map((outcome, outcomeIndex) => (
                <div key={outcomeIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={outcome}
                    onChange={(e) =>
                      handleNestedArrayChange(
                        projectIndex,
                        outcomeIndex,
                        "projects",
                        "outcomes",
                        e.target.value
                      )
                    }
                    className="border rounded px-2 py-1 mr-2 w-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleNestedRemove(
                        projectIndex,
                        outcomeIndex,
                        "projects",
                        "outcomes"
                      )
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            <button
              type="button"
              onClick={() =>
                handleNestedAdd(projectIndex, "projects", "outcomes", "")
              }
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
            >
              Add Outcome
            </button>
            <button
              type="button"
              onClick={() => handleRemove(projectIndex, "projects")}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove Project
            </button>
          </div>
        ))}
      <button
        type="button"
        onClick={() => handleAdd("projects", "outcomes")}
        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
      >
        Add Project
      </button>
      {/* Certifications */}
      <h3 className="text-lg font-semibold mb-2">Certifications</h3>
      {resumeData.certifications &&
        resumeData.certifications.map((cert, certIndex) => (
          <div key={certIndex} className="mb-4">
            <input
              type="text"
              value={cert}
              onChange={(e) =>
                handleArrayChange(certIndex, "certifications", e.target.value)
              }
              className="border rounded px-2 py-1 w-full"
              required
            />
            <button
              type="button"
              onClick={() => handleRemove(certIndex, "certifications")}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      <button
        type="button"
        onClick={() => handleAdd("certifications")}
        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
      >
        Add Certification
      </button>
      {/* Awards and Honors */}
      <h3 className="text-lg font-semibold mb-2">Awards and Honors</h3>
      {resumeData.awardsAndHonors &&
        resumeData.awardsAndHonors.map((award, awardIndex) => (
          <div key={awardIndex} className="mb-4">
            <input
              type="text"
              value={award}
              onChange={(e) =>
                handleArrayChange(awardIndex, "awardsAndHonors", e.target.value)
              }
              className="border rounded px-2 py-1 w-full"
              required
            />
            <button
              type="button"
              onClick={() => handleRemove(awardIndex, "awardsAndHonors")}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      <button
        type="button"
        onClick={() => handleAdd("awardsAndHonors")}
        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
      >
        Add Award/Honor
      </button>
      {/* Languages */}
      <h3 className="text-lg font-semibold mb-2">Languages</h3>
      {resumeData.languages &&
        resumeData.languages.map((language, langIndex) => (
          <div key={langIndex} className="mb-4">
            <input
              type="text"
              value={language}
              onChange={(e) =>
                handleArrayChange(langIndex, "languages", e.target.value)
              }
              className="border rounded px-2 py-1 w-full"
              required
            />
            <button
              type="button"
              onClick={() => handleRemove(langIndex, "languages")}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      <button
        type="button"
        onClick={() => handleAdd("languages")}
        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
      >
        Add Language
      </button>
      <div className="mt-4 flex justify-center">
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded align-middle"
          style={{ width: "200px" }}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default MyApplication;
