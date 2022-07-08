// TODO:
// need to change state management
// move css into css file

import React, { useContext } from "react";

import "./PanelRow.css";

import {
  AppStateContext,
  MaterialStateContext,
} from "../ContextProvider/ContextProvider";

import { getConversion } from "../getConversion";

import { CANVAS_SIZE } from "../RoofComponent/RoofComponent";

const PanelRow = ({ indice, count }) => {
  const { appState } = useContext(AppStateContext);
  const { materialState } = useContext(MaterialStateContext);

  const conversion = getConversion(
    appState.roofWidthBottom,
    appState.roofWidthTop,
    appState.roofHeight,
    CANVAS_SIZE
  );

  const styles = {
    row: {
      display: "flex",
    },
    panel: {
      minWidth: materialState.panelWidth / conversion - 1,
      minHeight: materialState.panelHeight / conversion - 1,
      marginRight: materialState.bracketWidth / conversion,
    },
  };

  const panels = [];

  for (let i = 0; i < count; i++) {
    panels.push(<div key={i} style={styles.panel} className="panel"></div>);
  }
  return <div style={styles.row}>{panels}</div>;
};

export default PanelRow;
