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
  url,
  withoutMargin,
  min = 0,
  max,
  step = 1,
  ratio = [1, 1],
}) => {
  const numberappDispatch = (value) => {
    let numericValue = parseFloat(value);
    let ratioMax = max;
    let ratioMin = min;

    if (ratio[0] !== ratio[1]) {
      numericValue = (numericValue / ratio[0]) * ratio[1];
      ratioMax = (max / ratio[0]) * ratio[1];
      ratioMin = (min / ratio[0]) * ratio[1];
    }

    const dispatchObject = {
      type: appDispatchAction,
      payload: { value: numericValue, idx: idx },
    };

    if (numericValue < ratioMin || value === "")
      dispatchObject.payload.value = ratioMin;
    else if (numericValue > ratioMax) dispatchObject.payload.value = ratioMax;

    return appDispatch(dispatchObject);
  };

  const textappDispatch = (value) => {
    return appDispatch({ type: appDispatchAction, payload: { value: value } });
  };

  return (
    <>
      <InfoTooltip
        description={description}
        url={url}
        withoutMargin={withoutMargin}
      >
        <div className={size === "small" ? "small-input" : "input"}>
          <TextField
            disabled={disabled}
            fullWidth={true}
            label={label}
            value={value === 0 || value === "" ? "" : value}
            variant="standard"
            type={type}
            inputProps={{ step: step }}
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
