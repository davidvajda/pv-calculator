import React, { useContext } from "react";
import {
  AppStateContext,
  OutputContext,
} from "../../ContextProvider/ContextProvider";

import { generatePanelRows } from "../../Utilities/generatePanelRows";
import { getConversion } from "../../Utilities/getConversion";

import {
  CANVAS_SIZE,
  EDGE_SAFE_DISTANCE,
} from "../../Pages/RoofPage/RoofPage";

const RectangularRoof = () => {
  const { appState } = useContext(AppStateContext);
  const { outputState } = useContext(OutputContext);

  const w = appState.roofWidthBottom;
  const h = appState.roofHeight;
  const conversion = getConversion(w, 0, h, CANVAS_SIZE);

  const styles = {
    roofBase: {
      width: w / conversion,
      height: h / conversion,
    },
    roofPanels: {
      height: (h - EDGE_SAFE_DISTANCE / 2) / conversion,
    },
  };

  return (
    <div style={styles.roofBase} className="roof-base-rectangle">
      <div style={styles.roofPanels} className="roof-panels-rectangle">
        {generatePanelRows(outputState.panelLayout)}
      </div>
    </div>
  );
};

export default RectangularRoof;
