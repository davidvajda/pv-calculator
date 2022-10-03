import React from "react";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Tooltip from "@mui/material/Tooltip";

export const SelectInput = ({
  label,
  itemLabels,
  values,
  appDispatch,
  appDispatchAction,
  defaultValue,
  description,
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
    <Tooltip title={description} followCursor enterDelay={300} leaveDelay={50} placement="left">
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
    </Tooltip>
  );
};
