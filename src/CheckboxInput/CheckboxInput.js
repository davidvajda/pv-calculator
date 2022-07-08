import React from "react";

import "./CheckboxInput.css";

import Checkbox from "@mui/material/Checkbox";

export const CheckboxInput = ( {label, value, appDispatch, appDispatchAction }) => {
  return (
    <div className="checkbox-input" onClick={() => appDispatch({type: appDispatchAction})} >
      <Checkbox checked={value}  />
      <div className="checkbox-input-label">{label}</div>
    </div>
  );
};
