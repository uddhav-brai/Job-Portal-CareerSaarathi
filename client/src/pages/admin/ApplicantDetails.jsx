import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaFilePdf, FaLinkedin, FaTimes } from "react-icons/fa";

const ApplicantDetails = () => {
  const { resumeId } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null); // State to store the PDF blob
  const [modalOpen, setModalOpen] = useState(false); // State to track modal visibility

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(
          `/apply/current-applicant/${resumeId}`
        );
        setApplicant(response.data.data);
      } catch (error) {
        console.error("Error fetching resume:", error.response.data);
        // Optionally, show an error message to the user
      }
    };

    fetchResume();
  }, [resumeId]);

  // Ensure that applicant is not null before accessing its properties
  if (!applicant) {
    return <div>Loading...</div>; // or any loading indicator
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  }

  const handlePdfClick = async (filename) => {
    try {
      const response = await fetch(`http://localhost:3001/${filename}`);
      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }
      const blob = await response.blob(); // Get the blob from the response
      setPdfBlob(blob); // Set the blob in the state
      setModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching PDF:", error);
      // Handle error
    }
  };

  const handleCloseModal = () => {
    setPdfBlob(null); // Clear the PDF blob
    setModalOpen(false); // Close the modal
  };

  return (
    <>
      <div className="lg:flex">
        {applicant.resume && (
          <>
            <div className="lg:w-1/4 p-8">
              {/* Profile */}
              <div className="mb-8">
                {/* Profile Picture */}
                <div className="mb-4 lg:mb-8">
                  <div className="rounded-full overflow-hidden w-32 h-32 lg:w-48 lg:h-48">
                    {applicant.resume.picture && (
                      <img
                        src={applicant.resume.picture}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                {/* Contact Information */}
                <div className="mb-4">
                  <p className="text-xl font-semibold">
                    {applicant.resume.firstName} {applicant.resume.lastName}
                  </p>
                  {applicant.resume.emailAddress && (
                    <p className="text-gray-600">
                      {applicant.resume.emailAddress}
                    </p>
                  )}
                  {applicant.resume.phoneNumber && (
                    <p className="text-gray-600">
                      {applicant.resume.phoneNumber}
                    </p>
                  )}
                  {applicant.resume.address && (
                    <p className="text-gray-600">{applicant.resume.address}</p>
                  )}
                </div>

                {/* Horizontal line above LinkedIn */}
                <hr className="my-4 border-t border-gray-300" />

                {/* LinkedIn Profile */}
                <div className="mb-4 mt-5">
                  {applicant.resume.linkedInProfile && (
                    <p>
                      <a
                        href={applicant.resume.linkedInProfile}
                        className="text-blue-500 flex items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="text-blue-500 mr-2" size={24} />
                        LinkedIn Profile
                      </a>
                    </p>
                  )}
                </div>

                {/* Horizontal line below LinkedIn */}
                <hr className="my-4 border-t border-gray-300" />

                {/* Summary */}
                <div>
                  <p className="text-lg font-semibold mb-2">Summary</p>
                  <p className="text-gray-700">{applicant.resume.summary}</p>
                </div>
                <hr className="my-4 border-t border-gray-300" />

                <div className="mt-3 w-full">
                  <div className="mb-4">
                    {applicant.resume.pdfFile && (
                      <button
                        onClick={() => handlePdfClick(applicant.resume.pdfFile)}
                        className="bg-blue-500 text-white py-2 px-9 rounded hover:bg-blue-600 flex items-center w-full"
                      >
                        <FaFilePdf className="text-black-500 mr-2" size={24} />
                        View Resume
                      </button>
                    )}
                    {modalOpen && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="relative bg-white rounded-lg shadow-xl max-w-screen-lg w-full h-full overflow-hidden">
                          <button
                            onClick={handleCloseModal}
                            className="absolute top-0 right-0 mt-2 mr-2 text-red-700 hover:text-gray-800 bg-white border-2 border-red-700 rounded-full p-1"
                          >
                            <FaTimes className="h-6 w-6" />
                          </button>
                          <div className="p-6 h-full overflow-auto">
                            {pdfBlob && (
                              <object
                                data={URL.createObjectURL(pdfBlob)}
                                type="application/pdf"
                                width="100%"
                                height="100%"
                              >
                                <p>
                                  PDF viewer is not available. You can download
                                  the PDF file{" "}
                                  <a href={URL.createObjectURL(pdfBlob)}>
                                    here
                                  </a>
                                  .
                                </p>
                              </object>
                            )}
                          </div>
                        </div>
                        <hr className="my-4 border-t border-gray-300" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-3/4 p-8">
              {/* Work Experience */}
              {applicant.resume.workExperience &&
                applicant.resume.workExperience.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
                    <div className="work-education">
                      {applicant.resume.workExperience.map(
                        (experience, index) => (
                          <div
                            key={index}
                            className="experience bg-white rounded-lg shadow-md p-6 mb-6"
                          >
                            <h3 className="text-xl font-semibold mb-2">
                              {experience.jobTitle} at {experience.companyName}
                            </h3>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <p className="mr-4 font-semibold">
                                {formatDate(experience.startDate)} -{" "}
                                {formatDate(experience.endDate)}
                              </p>
                            </div>
                            <p className="text-base text-gray-800 mb-4">
                              {experience.summary}
                            </p>
                            {experience.responsibilities &&
                              experience.responsibilities.length > 0 && (
                                <div>
                                  <p className="text-sm font-semibold mb-2">
                                    Responsibilities:
                                  </p>
                                  <ul className="list-disc pl-4">
                                    {experience.responsibilities.map(
                                      (responsibility, idx) => (
                                        <li key={idx} className="text-sm mb-1">
                                          {responsibility}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Education */}
              {applicant.resume.education &&
                applicant.resume.education.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Education</h2>
                    <div className="work-education">
                      {applicant.resume.education.map((education, index) => (
                        <div
                          key={index}
                          className="education bg-white rounded-lg shadow-md p-6 mb-6"
                        >
                          <h3 className="text-xl font-semibold mb-2">
                            {education.degreeEarned}
                          </h3>
                          <p className="text-lg font-light mb-2 text-gray-600">
                            {education.institutionName}
                          </p>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <p>Start Date: {formatDate(education.startDate)}</p>
                            <p className="mx-4">|</p>
                            <p>
                              Graduation Date:{" "}
                              {formatDate(education.graduationDate)}
                            </p>
                          </div>
                          {education.academicAchievements &&
                            education.academicAchievements.length > 0 && (
                              <div>
                                <p className="text-sm font-semibold mb-2">
                                  Achievements:
                                </p>
                                <ul className="list-disc pl-4">
                                  {education.academicAchievements.map(
                                    (achievement, idx) => (
                                      <li key={idx} className="text-sm mb-1">
                                        {achievement}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Projects */}
              {applicant.resume.projects &&
                applicant.resume.projects.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Projects</h2>
                    <div className="work-education">
                      {applicant.resume.projects.map((project, index) => (
                        <div
                          key={index}
                          className="project bg-white rounded-lg shadow-md p-6 mb-6"
                        >
                          <h3 className="text-xl font-semibold mb-2">
                            {project.projectName} - {project.role}
                          </h3>
                          <p className="text-sm font-semibold mb-2">
                            Objective:
                          </p>
                          <p className="text-base mb-4">
                            {project.projectObjective}
                          </p>
                          {project.outcomes && project.outcomes.length > 0 && (
                            <div>
                              <p className="text-sm font-semibold mb-2">
                                Outcomes:
                              </p>
                              <ul className="list-disc pl-4">
                                {project.outcomes.map((outcome, idx) => (
                                  <li key={idx} className="text-sm mb-1">
                                    {outcome}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Skills */}
                {applicant.resume.skills &&
                  applicant.resume.skills.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold mb-2">Skills</h2>
                      <div className="space-y-2">
                        {applicant.resume.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="inline-block bg-gray-200 rounded-lg px-2 py-1 mr-2 mb-2"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                {/* Hobbies */}
                {applicant.resume.hobbies &&
                  applicant.resume.hobbies.length > 0 && (
                    <div className="hobbies">
                      <h2 className="text-lg font-bold mb-2">Hobbies</h2>
                      <div className="space-y-2">
                        {applicant.resume.hobbies.map((hobby, index) => (
                          <div
                            key={index}
                            className="inline-block bg-gray-200 rounded-lg px-2 py-1 mr-2 mb-2"
                          >
                            {hobby}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                {/* Certifications */}
                {applicant.resume.certifications &&
                  applicant.resume.certifications.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">
                        Certifications
                      </h2>
                      <div className="space-x-2">
                        {applicant.resume.certifications.map(
                          (certification, index) => (
                            <div
                              key={index}
                              className="inline-block bg-gray-200 rounded-lg px-2 py-1 mb-2"
                            >
                              {certification}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                {/* Awards */}
                {applicant.resume.awardsAndHonors &&
                  applicant.resume.awardsAndHonors.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Awards</h2>
                      <div className="space-x-2">
                        {applicant.resume.awardsAndHonors.map(
                          (award, index) => (
                            <div
                              key={index}
                              className="inline-block bg-gray-200 rounded-lg px-2 py-1 mb-2"
                            >
                              {award}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
              {/* Languages */}
              {applicant.resume.languages &&
                applicant.resume.languages.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Languages</h2>
                    <div className="space-x-2">
                      {applicant.resume.languages.map((language, index) => (
                        <div
                          key={index}
                          className="inline-block bg-gray-200 rounded-lg px-2 py-1 mb-2"
                        >
                          {language}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ApplicantDetails;