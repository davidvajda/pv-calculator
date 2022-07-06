import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

import "./Stepper.css";
import { StepsContext } from "../ContextProvider/ContextProvider";

export default function HorizontalLinearStepper({ children }) {
  const {steps} = React.useContext(StepsContext)

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="stepper">
      <Stepper activeStep={activeStep} className="stepper-steps">
        {steps.labels.map((label) => {
          return (
            <Step key={label} >
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.labels.length ? (
        <>
          finito
          <Button
            className="button"
            variant="outlined"
            onClick={handleReset}
          >
            Reset
          </Button>
        </>
      ) : (
        <>
          {children}
          <div className="stepper-button-container">
            <Button
              className="button stepper-button"
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Späť
            </Button>
            <Button
              className="button stepper-button"
              variant="outlined"
              onClick={handleNext}
            >
              {activeStep === steps.labels.length - 1 ? "Dokončiť" : "Ďalej"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
