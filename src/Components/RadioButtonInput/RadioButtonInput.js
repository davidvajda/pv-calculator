import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InfoTooltip from "../InfoTooltip/InfoTooltip"

export const RadioButtonInput = ({
  label,
  radioLabels,
  values,
  defaultValue,
  appDispatch,
  appDispatchAction,
  description,
  url
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
    <InfoTooltip description={description} url={url}>
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
    </InfoTooltip>
  );
};
