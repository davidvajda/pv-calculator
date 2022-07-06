import React from "react";

import "./CheckboxInput.css";

import Checkbox from "@mui/material/Checkbox";

export const CheckboxInput = ( {label, value, setValue }) => {
  return (
    <div className="checkbox-input" onClick={() => setValue(prev => !prev)} >
      <Checkbox checked={value}  />
      <div className="checkbox-input-label">{label}</div>
    </div>
  );
};
