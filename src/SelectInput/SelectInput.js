import React from "react";

import "./SelectInput.css";

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export const SelectInput = ({ label, itemLabels, values, setValue, defaultValue }) => {
  const menuItems = [];
  for (let i = 0; i < values.length; i++) {
    menuItems.push(<MenuItem key={i} value={values[i]}>{itemLabels[i]}</MenuItem>);
  }

  const labelId = React.useId()

  return (
    <div className="select-input">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        fullWidth={true}
        value={defaultValue}
        onChange={(e) => setValue(e.target.value)}
      >
        {menuItems}
      </Select>
    </div>
  );
};
