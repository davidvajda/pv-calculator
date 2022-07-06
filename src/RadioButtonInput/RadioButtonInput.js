import React from "react";

import "./RadioButtonInput.css";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

export const RadioButtonInput = ({
  label,
  radioLabels,
  values,
  defaultValue,
  setValue,
}) => {
  const radioButtonId = React.useId();

  const radios = [];

  for (let i = 0; i < values.length; i++) {
    radios.push(
      <FormControlLabel
        key={i}
        value={values[i]}
        control={<Radio />}
        label={radioLabels[i]}
      />
    );
  }

  return (
    <div className="radio-button-input">
      <FormLabel id={radioButtonId}>{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby={radioButtonId}
        value={defaultValue}
        onChange={(e) => setValue(parseInt(e.target.value))}
      >
        {radios}
      </RadioGroup>
    </div>
  );
};
