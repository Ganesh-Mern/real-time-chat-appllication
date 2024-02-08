import React from "react";

const GenderCheckBox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-controler">
        <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selectd":""}`}>
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-white"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>
      <div className="form-controler">
        <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selectd":""}`}>
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-white"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
