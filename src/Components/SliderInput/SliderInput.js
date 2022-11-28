import React from "react";

import Slider from "@mui/material/Slider";
import FormLabel from "@mui/material/FormLabel";
import InfoTooltip from "../InfoTooltip/InfoTooltip"

export const SliderInput = ({
  label,
  values,
  value,
  step = 10,
  appDispatch,
  appDispatchAction,
  description,
  url
}) => {
  const sliderId = React.useId();

  return (
    <InfoTooltip description={description} url={url}>
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
    </InfoTooltip>
  );
};
