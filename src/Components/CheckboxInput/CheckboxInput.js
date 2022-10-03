import React from "react";

import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";

export const CheckboxInput = ({
  label,
  value,
  appDispatch,
  appDispatchAction,
  description,
}) => {
  return (
    <Tooltip title={description} followCursor enterDelay={300} leaveDelay={50} placement="left">
      <div
        className="checkbox-input"
        onClick={() => appDispatch({ type: appDispatchAction })}
      >
        <Checkbox checked={value} />
        <div className="checkbox-input-label">{label}</div>
      </div>
    </Tooltip>
  );
};
