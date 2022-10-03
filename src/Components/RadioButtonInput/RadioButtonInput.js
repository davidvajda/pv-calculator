import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Tooltip from "@mui/material/Tooltip";

export const RadioButtonInput = ({
  label,
  radioLabels,
  values,
  defaultValue,
  appDispatch,
  appDispatchAction,
  description,
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
    <Tooltip title={description} followCursor enterDelay={300} leaveDelay={50} placement="left">
      <div className="input">
        <FormLabel id={radioButtonId}>{label}</FormLabel>
        <RadioGroup
          row
          aria-labelledby={radioButtonId}
          value={defaultValue}
          onChange={(e) =>
            appDispatch({
              type: appDispatchAction,
              payload: { value: parseInt(e.target.value) },
            })
          }
        >
          {radios}
        </RadioGroup>
      </div>
    </Tooltip>
  );
};
