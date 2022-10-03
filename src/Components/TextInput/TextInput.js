import React from "react";

import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

export const TextInput = ({
  label,
  value,
  appDispatch,
  appDispatchAction,
  type,
  disabled,
  description,
}) => {
  const numberappDispatch = (value) => {
    const numericValue = parseInt(value);

    if (numericValue < 0 || value === "") {
      return appDispatch({
        type: appDispatchAction,
        payload: { value: 0 },
      });
    } else {
      return appDispatch({
        type: appDispatchAction,
        payload: { value: numericValue },
      });
    }
  };

  const textappDispatch = (value) => {
    return appDispatch({ type: appDispatchAction, payload: { value: value } });
  };

  return (
    <Tooltip title={description} followCursor enterDelay={300} leaveDelay={50} placement="left">
      <div className="input">
        <TextField
          disabled={disabled}
          fullWidth={true}
          label={label}
          value={value === 0 || value === "" ? "" : value}
          variant="standard"
          type={type}
          onChange={(e) => {
            type === "number"
              ? numberappDispatch(e.target.value)
              : textappDispatch(e.target.value);
          }}
        />
      </div>
    </Tooltip>
  );
};
