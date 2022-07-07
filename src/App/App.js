import React from "react";

import { ContextProvider } from "../ContextProvider/ContextProvider";

import FormComponent from "../FormComponent/FormComponent";
import PanelComponent from "../PanelComponent/PanelComponent";
import RoofComponent from "../RoofComponent/RoofComponent";
import OutputComponent from "../OutputComponent/OutputComponent";
import Stepper from "../Stepper/Stepper";
import "./App.css";

const App = () => {
  return (
    <ContextProvider>
      <div className="app-container">
        <Stepper>
          {{
            labels: [
              "Vlastnosti strechy",
              "Vlastnosti panelu",
              "Náčrt strechy",
            ],
            components: [
              <FormComponent />,
              <PanelComponent />,
              <RoofComponent />,
              <OutputComponent />,
            ],
          }}
        </Stepper>
      </div>
    </ContextProvider>
  );
};

export default App;
