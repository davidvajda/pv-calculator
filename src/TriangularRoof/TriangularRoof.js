import React, { useContext } from "react";
import {
  AppStateContext,
  OutputContext,
} from "../ContextProvider/ContextProvider";

import { generatePanelRows } from "../generatePanelRows";
import { getConversion } from "../getConversion.js";
import { getTriangleData } from "../layoutFunctions";

import {
  CANVAS_SIZE,
  EDGE_SAFE_DISTANCE,
} from "../RoofComponent/RoofComponent";

import "./TriangularRoof.css";

const TriangularRoof = () => {
  const { appState } = useContext(AppStateContext);
  const { outputState } = useContext(OutputContext);

  const w = appState.roofWidthBottom;
  const h = appState.roofHeight;
  const conversion = getConversion(w, 0, h, CANVAS_SIZE);

  const triangleData = getTriangleData(w, h);
  
  const styles = {
    base: {
      width: triangleData.base / conversion,
      height: triangleData.height / conversion,
    },
    leftWall: {
      left: triangleData.base / conversion / 4,
      bottom: -(triangleData.arm - triangleData.height) / conversion / 2,
      height: triangleData.arm / conversion,
      transform: `rotate(${triangleData.topAngle / 2}deg)`,
    },
    rightWall: {
      right: triangleData.base / conversion / 4,
      bottom: -(triangleData.arm - triangleData.height) / conversion / 2,
      height: triangleData.arm / conversion,
      transform: `rotate(-${triangleData.topAngle / 2}deg)`,
    },
    roofPanels: {
      height: (h - EDGE_SAFE_DISTANCE / 2) / conversion,
    },
  };

  return (
    <div style={styles.base} className="roof-base-triangle">
      <div style={styles.leftWall} className="wall"></div>
      <div style={styles.rightWall} className="wall"></div>
      <div style={styles.roofPanels} className="roof-panels">
        {generatePanelRows(outputState.panelLayout)}
      </div>
    </div>
  );
};

export default TriangularRoof;
