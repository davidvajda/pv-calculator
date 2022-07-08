import React, { useContext } from "react";
import {
  AppStateContext,
  MaterialStateContext,
  OutputContext,
} from "../ContextProvider/ContextProvider";

import { generatePanelRows } from "../generatePanelRows";
import { getConversion } from "../getConversion.js";
import { getTriangleData } from "../layoutFunctions";

import {
  CANVAS_SIZE,
  EDGE_SAFE_DISTANCE,
} from "../RoofComponent/RoofComponent";

import "./TrapezoidRoof.css"

const TrapezoidRoof = () => {
    const { appState } = useContext(AppStateContext);
    const { outputState } = useContext(OutputContext);
    const { materialState } = useContext(MaterialStateContext);
  
    const wBottom = appState.roofWidthBottom;
    const wTop = appState.roofWidthTop;
    const h = appState.roofHeight;
    const conversion = getConversion(wBottom, wTop, h, CANVAS_SIZE);
    const triangleData = getTriangleData(wBottom - wTop, h);  
  
    const panelDivHeight = outputState.panelLayout.panelsFromTop
      ? (outputState.panelLayout.panels.length * materialState.panelHeight +
          EDGE_SAFE_DISTANCE / 2) /
        conversion
      : (h - EDGE_SAFE_DISTANCE / 2) / conversion;
  
    const styles = {
      rectangle: {
        width: wBottom / conversion,
        height: h / conversion,
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
        transform: `rotate(${-triangleData.topAngle / 2}deg)`,
      },
      topWall: {
        width: (wBottom - (wBottom - wTop)) / conversion,
        left: triangleData.base / conversion / 2,
      },
      panels: {
        height: panelDivHeight,
      },
    };
  
    return (
      <div style={styles.rectangle} className="roof-base-trapezoid">
        <div style={styles.leftWall} className="wall"></div>
        <div style={styles.rightWall} className="wall"></div>
        <div style={styles.topWall} className="wall"></div>
        <div style={styles.panels} className="roof-panels-trapezoid">
          {generatePanelRows(outputState.panelLayout)}
        </div>
      </div>
    );
  };

  export default TrapezoidRoof;