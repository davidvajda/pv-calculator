import React from "react";

import "./TextInput.css";

import TextField from "@mui/material/TextField";

export const TextInput = ({ label, value, dispatch, dispatchAction, type }) => {
  const numberDispatch = (value) => {
    const numericValue = parseInt(value);

    if (numericValue < 0 || value === "") {
      return dispatch({
        type: dispatchAction,
        payload: { value: 0 },
      });
    } else {
      return dispatch({
        type: dispatchAction,
        payload: { value: numericValue },
      });
    }
  };

  const textDispatch = (value) => {
    return dispatch({ type: dispatchAction, payload: { value: value } });
  };

  return (
    <div className="text-input">
      <TextField
        fullWidth={true}
        label={label}
        value={value}
        variant="standard"
        type={type}
        onChange={(e) => {
          type === "number"
            ? numberDispatch(e.target.value)
            : textDispatch(e.target.value);
        }}
      />
    </div>
  );
};
