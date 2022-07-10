import React, { useContext } from "react";

import "./PanelRow.css";

import {
  AppStateContext,
  MaterialStateContext,
  OutputContext,
} from "../ContextProvider/ContextProvider";

import { getConversion } from "../getConversion";

import { CANVAS_SIZE } from "../RoofComponent/RoofComponent";
import { OUTPUT_ACTIONS } from "../ContextProvider/ContextProvider";

const PanelRow = ({ indice, count }) => {
  const { appState } = useContext(AppStateContext);
  const { materialState } = useContext(MaterialStateContext);
  const { outputDispatch } = useContext(OutputContext);

  const conversion = getConversion(
    appState.roofWidthBottom,
    appState.roofWidthTop,
    appState.roofHeight,
    CANVAS_SIZE
  );

  const styles = {
    panel: {
      width: materialState.panelWidth / conversion - 2,
      height: materialState.panelHeight / conversion - 2,
      marginRight: materialState.bracketWidth / conversion,
    },
    panelRow: {
      height: materialState.panelHeight / conversion,
      width: ((materialState.panelWidth + materialState.bracketWidth) * count) / conversion
    },
  };

  const panels = [];

  for (let i = 0; i < count; i++) {
    panels.push(<div key={i} style={styles.panel} className="panel"></div>);
  }
  return (
    <div
      className="panel-row"
      style={styles.panelRow}
      onClick={() => {
        outputDispatch({
          type: OUTPUT_ACTIONS.DELETE_PANEL,
          payload: { value: indice },
        });
      }}
    >
      {panels}
    </div>
  );
};

export default PanelRow;
