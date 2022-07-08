import React, { useContext, useEffect, useState } from "react";

import RectangularRoof from "../RectangularRoof/RectangularRoof";
import TriangularRoof from "../TriangularRoof/TriangularRoof";
import TrapezoidRoof from "../TrapezoidRoof/TrapezoidRoof";

import {
  getPanelLayoutRectangle,
  getPanelLayoutTriangle,
  getPanelLayoutTrapezoid,
} from "../layoutFunctions";

import "./RoofComponent.css";

import {
  AppStateContext,
  MaterialStateContext,
  OutputContext,
} from "../ContextProvider/ContextProvider";

export const EDGE_SAFE_DISTANCE = 600;
export const CANVAS_SIZE = 600;

const countPanels = (panelLayout) => {
  let panels = 0;
  panelLayout.panels.forEach((rowAmount) => (panels += rowAmount));
  return panels;
};

const RoofComponent = () => {
  const { materialState } = useContext(MaterialStateContext);
  const { outputState, setOutputState } = useContext(OutputContext);
  const { appState } = useContext(AppStateContext);

  const [roofComponent, setRoofComponent] = useState(() => null);

  const styles = {
    roofComponent: {
      width: CANVAS_SIZE + 20,
      height: CANVAS_SIZE + 20,
    },
  };

  useEffect(() => {
    switch (appState.roofShape) {
      case "rectangle": {
        setRoofComponent(<RectangularRoof />);
        setOutputState((prev) => {
          return {
            ...prev,
            panelLayout: getPanelLayoutRectangle(
              appState.roofHeight,
              appState.roofWidthBottom,
              materialState.panelWidth,
              materialState.panelHeight,
              materialState.bracketWidth,
              materialState.panelPower,
              appState.maxPlantPower
            ),
          };
        });
      }
      case "triangle": {
        setRoofComponent(<TriangularRoof />);
        setOutputState((prev) => {
          return {
            ...prev,
            panelLayout: getPanelLayoutTriangle(
              appState.roofHeight,
              appState.roofWidthBottom,
              materialState.panelWidth,
              materialState.panelHeight,
              materialState.bracketWidth,
              materialState.panelPower,
              appState.maxPlantPower
            ),
          };
        });
      }
      case "trapezoid": {
        setRoofComponent(<TrapezoidRoof />);
        setOutputState((prev) => {
          return {
            ...prev,
            panelLayout: getPanelLayoutTrapezoid(
              appState.roofHeight,
              appState.roofWidthTop,
              appState.roofWidthBottom,
              materialState.panelWidth,
              materialState.panelHeight,
              materialState.bracketWidth,
              materialState.panelPower,
              appState.maxPlantPower
            ),
          };
        });
      }
    }
  }, []);

  return (
    <>
      <div className="roof-component" style={styles.roofComponent}>
        {roofComponent}
      </div>
      <div className="roof-info">
        Počet panelov: {countPanels(outputState.panelLayout)} s celkovým výkonom{" "}
        {countPanels(outputState.panelLayout) * materialState.panelPower}Wp
      </div>
    </>
  );
};

export default RoofComponent;
