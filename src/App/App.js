import React from "react";

import { ContextProvider } from "../ContextProvider/ContextProvider";

import FormPage from "../Pages/FormPage/FormPage";
import PanelPage from "../Pages/PanelPage/PanelPage";
import RoofPage from "../Pages/RoofPage/RoofPage";
import InvertorPage from "../Pages/InvertorPage/InvertorPage";
import SetupPage from "../Pages/SetupPage/SetupPage";
import OutputPage from "../Pages/OutputPage/OutputPage";
import Stepper from "../Components/Stepper/Stepper";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const PvCalc = () => {
  return (
    <ContextProvider>
      <div className="app-container">
        <Stepper>
          {{
            labels: [
              "Vlastnosti strechy",
              "Vlastnosti panelu",
              "Náčrt strechy",
              "Výber striedača",
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
        <div className="developer-info">
          <p>
            App developed by{" "}
            <a href="https://github.com/davidvajda" target={"_blank"}>
              David Vajda
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </ContextProvider>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PvCalc />} />
        <Route path="/setup" element={<SetupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
