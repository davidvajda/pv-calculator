import React from "react";

import "./CheckboxInput.css";

import Checkbox from "@mui/material/Checkbox";

export const CheckboxInput = ( {label, value, dispatch, dispatchAction }) => {
  return (
    <div className="checkbox-input" onClick={() => dispatch({type: dispatchAction})} >
      <Checkbox checked={value}  />
      <div className="checkbox-input-label">{label}</div>
    </div>
  );
};
