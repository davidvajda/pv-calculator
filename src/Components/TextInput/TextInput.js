import React from "react";

import TextField from "@mui/material/TextField";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export const TextInput = ({
  idx = 0,
  label,
  value,
  appDispatch,
  appDispatchAction,
  type,
  size = "regular",
  disabled,
  description,
  url
}) => {
  const numberappDispatch = (value) => {
    const numericValue = parseInt(value);
    if (numericValue < 0 || value === "") {
      return appDispatch({
        type: appDispatchAction,
        payload: { value: 0, idx: idx },
      });
    } else {
      return appDispatch({
        type: appDispatchAction,
        payload: { value: numericValue, idx: idx },
      });
    }
  };

  const textappDispatch = (value) => {
    return appDispatch({ type: appDispatchAction, payload: { value: value } });
  };

  return (
    <>
      <InfoTooltip description={description} url={url} >
        <div className={size === "small" ? "small-input" : "input"}>
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
      </InfoTooltip>
    </>
  );
};
