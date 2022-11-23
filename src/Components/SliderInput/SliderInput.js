import React from "react";

import Slider from "@mui/material/Slider";
import FormLabel from "@mui/material/FormLabel";
import Tooltip from "@mui/material/Tooltip";

export const SliderInput = ({
  label,
  values,
  value,
  step = 10,
  appDispatch,
  appDispatchAction,
  description,
}) => {
  const sliderId = React.useId();

  return (
    <Tooltip
      title={description}
      followCursor
      enterDelay={300}
      leaveDelay={50}
      placement="left"
    >
      <div className="input"> 
        <FormLabel id={sliderId}>{label}</FormLabel>
        <Slider
          aria-labelledby={sliderId}
          value={value}
          label={label}
          step={step}
          min={values[0].value}
          max={values[values.length - 1].value}
          marks={values}
          // TODO: optimise this, when holding slider it continuously changes state
          onChange={(e) =>
            appDispatch({
              type: appDispatchAction,
              payload: { value: e.target.value },
            })
          }
        />
      </div>
    </Tooltip>
  );
};
