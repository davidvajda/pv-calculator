import React, { useState, useContext } from "react";

import { MaterialStateContext } from "../../ContextProvider/ContextProvider";

export const PanelDimensions = () => {
  const { materialState } = useContext(MaterialStateContext);

  let w = materialState.panelWidth;
  let h = materialState.panelHeight;

  let panelWidth = materialState.panelWidth / 8;
  let panelHeight = materialState.panelHeight / 8;

  const styles = {
    panel: {
      width: panelWidth,
      height: panelHeight,
    },

    widthDimension: {
      width: panelWidth,
      top: panelHeight + 20,
    },
    heightDimension: {
      width: panelHeight,
      left: panelWidth - panelHeight / 2 + 20,
      top: panelHeight / 2,
      transform: "rotate(-90deg)",
    },
  };

  return (
    <div style={styles.panel} className="dimension-panel">
      <div style={styles.widthDimension} className="dimension-panel-dimmension">
        {w} mm
      </div>
      <div
        style={styles.heightDimension}
        className="dimension-panel-dimmension"
      >
        {h} mm
      </div>
    </div>
  );
};
