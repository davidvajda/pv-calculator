import React from "react";

import Checkbox from "@mui/material/Checkbox";
import InfoTooltip from "../InfoTooltip/InfoTooltip"

export const CheckboxInput = ({
  label,
  value,
  appDispatch,
  appDispatchAction,
  description,
  url
}) => {
  return (
    <InfoTooltip description={description} url={url}>
      <div
        className="checkbox-input"
        onClick={() => appDispatch({ type: appDispatchAction })}
      >
        <Checkbox checked={value} />
        <div className="checkbox-input-label">{label}</div>
      </div>
    </InfoTooltip>
  );
};
