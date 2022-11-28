import React from "react";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import InfoTooltip from "../InfoTooltip/InfoTooltip"

export const SelectInput = ({
  label,
  itemLabels,
  values,
  appDispatch,
  appDispatchAction,
  defaultValue,
  description,
  url
}) => {
  const menuItems = [];
  for (let i = 0; i < values.length; i++) {
    menuItems.push(
      <MenuItem key={i} value={values[i]}>
        {itemLabels[i]}
      </MenuItem>
    );
  }

  const labelId = React.useId();

  return (
    <InfoTooltip description={description} url={url}>
      <div className="input">
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          fullWidth={true}
          value={defaultValue}
          onChange={(e) =>
            appDispatch({
              type: appDispatchAction,
              payload: { value: e.target.value },
            })
          }
        >
          {menuItems}
        </Select>
      </div>
    </InfoTooltip>
  );
};
