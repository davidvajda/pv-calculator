import React, { useContext } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

import {
  AppStateContext,
  MaterialStateContext,
  APP_ACTIONS,
} from "../../ContextProvider/ContextProvider";

export default function HorizontalLinearStepper({ children }) {
  const { appState, appDispatch } = useContext(AppStateContext);
  const { materialState } = useContext(MaterialStateContext);

  const steps = children.labels;
  const components = children.components;

  const checkForUnfilledFields = (
    st,
    nonZeroValues = [],
    oneOfManyNonZeroValues = []
  ) => {
    const foundZeroValueKeys = [];
    for (let key of nonZeroValues)
      if (st[key] === 0)
        foundZeroValueKeys.push(key);

    for (let keyArray of oneOfManyNonZeroValues) {
      if (!keyArray.some((key) => st[key] !== 0))
        foundZeroValueKeys.push(...keyArray);
    }
    return foundZeroValueKeys;
  };
  const handleNext = () => {
    let foundZeroValueKeys = [];
    if (appState.screen === 0 && !appState.manualPanelAmounts) {
      foundZeroValueKeys = checkForUnfilledFields(
        appState,
        ["roofHeight", "hookRuster"],
        [["roofWidthBottom", "roofWidthTop"]]
      );
    }
    if (appState.screen === 1) {
      foundZeroValueKeys = checkForUnfilledFields(materialState, [
        "panelWidth",
        "panelHeight",
        "panelVoltage",
        "panelCurrent",
        "panelPower",
      ]);
    }

    appDispatch({
      type: APP_ACTIONS.INPUT_ERRORS,
      payload: { value: foundZeroValueKeys },
    });
    if (foundZeroValueKeys.length === 0)
      appDispatch({ type: APP_ACTIONS.NEXT_SCREEN });
  };

  const handleBack = () => {
    appDispatch({ type: APP_ACTIONS.PREV_SCREEN });
  };

  const handleReset = () => {
    appDispatch({ type: APP_ACTIONS.RESET_FORM });
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
          <div className="stepper-button-container">
            <Button
              className="button"
              variant="outlined"
              disabled={appState.screen === 0}
              onClick={handleBack}
            >
              Späť
            </Button>
            <Button className="button" variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </>
      ) : (
        <>
          {components[appState.screen]}
          <div className="stepper-button-container">
            <Button
              className="button"
              variant="outlined"
              disabled={appState.screen === 0}
              onClick={handleBack}
            >
              Späť
            </Button>
            <Button className="button" variant="outlined" onClick={handleNext}>
              Ďalej
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
