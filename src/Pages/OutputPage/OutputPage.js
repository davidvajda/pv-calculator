import React, { useState, useContext, useEffect } from "react";

import {
  AppStateContext,
  MaterialStateContext,
  OutputContext,
} from "../../ContextProvider/ContextProvider";
import { getSuitableInvertorAndStrings } from "../../Utilities/invertorFunctions";
import { getMountingMaterialAmounts } from "../../Utilities/materialFunctions";
import { getProtectionDevices } from "../../Utilities/getProtectionDevices";

import InvertorCard from "../../Components/InvertorCard/InvertorCard";
import ItemCard from "../../Components/ItemCard/ItemCard";

import Button from "@mui/material/Button";

const renderInvertor = (invertor) => {
  return <InvertorCard data={invertor.invertor} selected={true} />;
};

const renderCards = (data) => {
  const cards = [];
  for (let i = 0; i < data.orderNumbers.length; i++) {
    if (data.amounts[i] <= 0) {
      continue;
    }

    cards.push(
      <ItemCard
        key={i}
        orderNumber={data.orderNumbers[i]}
        description={data.descriptions[i]}
        amount={data.amounts[i]}
      />
    );
  }
  return cards;
};

const OutputPage = () => {
  const { appState } = useContext(AppStateContext);
  const { materialState } = useContext(MaterialStateContext);
  const { outputState } = useContext(OutputContext);

  const mountingMaterial = getMountingMaterialAmounts(
    appState.roofType,
    appState.hookRuster,
    materialState.panelWidth,
    materialState.railLength,
    materialState.bracketWidth,
    outputState.panelLayout,
    appState.snowLoad,
    appState.windLoad
  );

  const protectionDevices = getProtectionDevices(
    outputState.invertors.stringDivisions
  );

  const countPanels = (panels) => {
    let count = 0;
    for (let amount of panels) {
      count += amount;
    }
    return count;
  };

  const defaultPanel = {
    orderNumbers: ["PVM44150-S"],
    amounts: [countPanels(outputState.panelLayout.panels)],
    descriptions: ["Fotovoltický panel EXE solar 415W, mono"],
  };

  return (
    <div className="page-wrapper">
      <div className="output-page">
        <div className="output-component-items">
          {renderInvertor(outputState.invertors)}
          {renderCards(defaultPanel)}
          {renderCards(protectionDevices)}
        </div>
        <div className="output-component-items">
          {renderCards(mountingMaterial)}
        </div>
      </div>{" "}
      <Button className="download-button" variant="outlined">
        Stiahnuť zoznam materiálu do .csv
      </Button>
    </div>
  );
};

export default OutputPage;
