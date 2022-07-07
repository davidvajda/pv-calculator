import React, { useContext } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

import "./Stepper.css";
import { StepsContext } from "../ContextProvider/ContextProvider";

import { ACTIONS } from "../ContextProvider/ContextProvider";
import { AppStateContext } from "../ContextProvider/ContextProvider";

export default function HorizontalLinearStepper({ children }) {
  const { appState, dispatch } = useContext(AppStateContext);

  const steps = children.labels;
  const components = children.components;

  const handleNext = () => {
    dispatch({ type: ACTIONS.NEXT_SCREEN });
  };

  const handleBack = () => {
    dispatch({ type: ACTIONS.PREV_SCREEN });
  };

  const handleReset = () => {
    dispatch({ type: ACTIONS.RESET_FORM });
  };

  return (
    <div className="stepper">
      <Stepper activeStep={appState.screen} className="stepper-steps">
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {appState.screen === steps.length ? (
        <>
          {components[appState.screen]}
          <Button className="button" variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </>
      ) : (
        <>
          {components[appState.screen]}
          <div className="stepper-button-container">
            <Button
              className="button stepper-button"
              variant="outlined"
              disabled={appState.screen === 0}
              onClick={handleBack}
            >
              Späť
            </Button>
            <Button
              className="button stepper-button"
              variant="outlined"
              onClick={handleNext}
            >
              {appState.screen === steps.length - 1 ? "Dokončiť" : "Ďalej"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
