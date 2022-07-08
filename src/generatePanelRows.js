import React from "react";

import PanelRow from "./PanelRow/PanelRow"

export const generatePanelRows = (panelLayout) => {
  const panelRows = [];
  for (let i = 0; i < panelLayout.panels.length; i++) {
    const amount = panelLayout.panels[i];
    panelRows.push(<PanelRow key={i} indice={i} count={amount} />);
  }
  return panelRows;
};
