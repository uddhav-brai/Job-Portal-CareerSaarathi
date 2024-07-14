import React from "react";
import { Link } from "react-router-dom";
import "./JobBox.css";

const JobBox = (props) => {
  const { title, company, location, jobType, skills, button, link,image } = props;

  return (
    <>
    <div className="jobBox">
      <div className="companyProfile">
        <img src={image} alt="show" className="logoc" />
      </div>
      <div className="profileDetails">
        <div className="name">
          <p className="titleName">{title}</p>
        </div>
        <div className="subTitle">
          <p className="subTitle">
            {company}. {location}
          </p>
        </div>
        <div className="jobDetail">
          <div className="jobType">
            <p className="jobType1">{jobType}</p>
          </div>
          <div className="skillsName">
            {skills.map((skill, index) => (
              <div className="skills" key={index}>
                <p className="skillTitle">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Link to={link}>
        <div className="apply">
          <input type="button" value={button} className="applybtn" />
        </div>
      </Link>
    </div>
    </>
  );
};

export default JobBox;
