import React, {useState} from "react";

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
  const [checked, setChecked] = useState(() => value);
  return (
    <InfoTooltip description={description} url={url}>
      <div
        className="checkbox-input"
        onClick={() => {
          appDispatch({ type: appDispatchAction })
          setChecked(prev => !prev)
        }}
      >
        <Checkbox checked={checked} />
        <div className="checkbox-input-label">{label}</div>
      </div>
    </InfoTooltip>
  );
};
