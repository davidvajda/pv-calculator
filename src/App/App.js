import React from "react";

import { ContextProvider } from "../ContextProvider/ContextProvider";

import FormPage from "../Pages/FormPage/FormPage";
import PanelPage from "../Pages/PanelPage/PanelPage";
import RoofPage from "../Pages/RoofPage/RoofPage";
import InvertorPage from "../Pages/InvertorPage/InvertorPage"
import OutputPage from "../Pages/OutputPage/OutputPage";
import Stepper from "../Components/Stepper/Stepper";

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
              "Výber striedača"
            ],
            components: [
              <FormPage />,
              <PanelPage />,
              <RoofPage />,
              <InvertorPage />,
              <OutputPage />,
            ],
          }}
        </Stepper>
      </div>
    </ContextProvider>
  );
};

export default App;
