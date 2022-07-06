import React from "react";

import { ContextProvider } from "../ContextProvider/ContextProvider";

import FormComponent from "../FormComponent/FormComponent";
import { PanelDimensions } from "../PanelDimension/PanelDimension";
import Stepper from "../Stepper/Stepper";
import "./App.css";

const App = () => {
  return (
    <ContextProvider>
      <div className="app-container">
        <Stepper>
          <FormComponent />
        </Stepper>
      </div>
    </ContextProvider>
  );
};

// <FormComponent/>
// <PanelComponent/>
// <RoofComponent/>
// <OutputComponent/>

export default App;
