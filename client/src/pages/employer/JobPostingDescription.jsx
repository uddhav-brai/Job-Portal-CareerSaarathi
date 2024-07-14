import React from "react";
import { DashboardNav } from "../../components";
import { JobBox } from "../../components";
import "./css/JobDescription.css";
import { Checkbox } from "../../Assets/Icon/Icon";
const JobPostingDescription = () => {
  const pageTitle = "Job Description";
  const jobProps = {
    title: "Social Media Assistant",
    company: "Nvidia",
    location: "Kathmandu, Nepal",
    jobType: "Full Time",
    skills: ["Marketing", "Design"],
    button: "Apply",
  };
  return (
    <>
    <div className="jobDescription">
      <DashboardNav pageTitle={pageTitle} />
      <div className="jobTitle">
        <JobBox {...jobProps} />
      </div>

      <div className="jobDetails">
        <div className="details">
          <div className="description">
            <p className="titleName">Description</p>
            <p className="details">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Mollitia, vel fugiat. Totam dolore blanditiis quaerat nostrum
              expedita distinctio similique voluptas unde, eveniet consectetur
              repellendus facilis molestias a aliquam praesentium qui!
            </p>
          </div>
          <div className="qualification">
            <p className="titleName">Qualification</p>
            <div className="lists">
              <ul className="listof">
                <li>
                  <Checkbox />
                  Bachelor's degree or equivalent practical experience
                </li>
                <li>
                  <Checkbox />
                  Seven years of experience in technical editing, technical
                  writing or content management
                </li>
              </ul>
            </div>
          </div>
          <div className="responsibilities">
            <p className="titleName">Responsibilities</p>
            <div className="lists">
              <ul className="listof">
                <li>
                  <Checkbox />
                  Support content creators with guidance on appropriate format,
                  intended audience and best use of language
                </li>
                <li>
                  <Checkbox />
                  Defend user interests by ensuring accurate, consistent and
                  reliable content that meets customer needs
                </li>
                <li>
                  <Checkbox />
                  Improve and update templates and style guides for scalable
                  workflows and help define and implement an optimal editorial
                  workflow for given projects
                </li>
              </ul>
            </div>
          </div>
          <div className="aboutJob">
            <p className="titleName">About the Job</p>
            <p className="details">
              The Google Cloud Developer Experience team helps cloud developers
              succeed, one journey at a time. Within this organization, the
              Cloud Editorial team is responsible for defining and leading
              initiatives to improve the quality of all Google Cloud technical
              content, while providing editorial oversight for
              architecture-related content. from Google Cloud. As a Technical
              Writer, you will work with a team of writers who set quality
              standards, manage content updates, strengthen writing skills, and
              provide writing assistance. You will create connections and work
              with multiple teams. (British Columbia and Canada – telecommute
              only*) The base salary range in British Columbia for this
              full-time position is 118,000 - 141,000 CAD and also includes a
              bonus, stock and benefits. Our salary scales are established based
              on position, level and location. The scale displayed on each job
              posting reflects the minimum and maximum new hire salary targets
              for the position. Within the range, individual compensation is
              determined by location and other factors, including job-related
              skills, experience and relevant education or training.* Note:
              Disclosure required by law 13 Please note that compensation
              information shown in job postings in Canada reflects base salary
              only and does not include bonuses, stock or benefits. Learn more
              about Google benefits.
            </p>
          </div>
        </div>
        
        <div className="rightDetails">
          <div className="dateDetails">
            <div className="aboutRole">
              <div className="role-title">
                <p className="before-title">Apply Before</p>
              </div>
              <div className="role-date">
                <p className="after-date">July 31,2024</p>
              </div>
            </div>
            <div className="aboutRole">
              <div className="role-title">
                <p className="before-title">Apply Before</p>
              </div>
              <div className="role-date">
                <p className="after-date">July 31,2024</p>
              </div>
            </div>
            <div className="aboutRole">
              <div className="role-title">
                <p className="before-title">Apply Before</p>
              </div>
              <div className="role-date">
                <p className="after-date">July 31,2024</p>
              </div>
            </div>
            <div className="aboutRole">
              <div className="role-title">
                <p className="before-title">Apply Before</p>
              </div>
              <div className="role-date">
                <p className="after-date">July 31,2024</p>
              </div>
            </div>
          </div>
          <div className="categoryDetails">
            <div className="categories">
              <p className="name">Marketing</p>
            </div>
            <div className="categories">
              <p className="name">Design</p>
            </div>
          </div>
          <div className="skillsDetails">
            <p className="name">Require Skills</p>
            <div className="skills">
              <p className="skillsName">Project Mangement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default JobPostingDescription;
