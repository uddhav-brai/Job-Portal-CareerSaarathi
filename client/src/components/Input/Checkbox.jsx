import React, { useState } from "react";
import "./Checkbox.css";

const Checkbox = ({ label, value }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="checkboxContainer">
      <div>
        <input
          type="checkbox"
          value={value}
          name="checkbox"
          onChange={handleCheckboxChange}
          checked={isChecked}
          className="checkboxName"
        />
      </div>
      <div className="checkboxLabel">{label}</div>
    </div>
  );
};

export default Checkbox;
