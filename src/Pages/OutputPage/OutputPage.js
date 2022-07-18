import React, { useContext } from "react";

import {
  AppStateContext,
  MaterialStateContext,
  OutputContext,
} from "../../ContextProvider/ContextProvider";
import { getMountingMaterialAmounts } from "../../Utilities/materialFunctions";
import { getProtectionDevices } from "../../Utilities/getProtectionDevices";

import InvertorCard from "../../Components/InvertorCard/InvertorCard";
import ItemCard from "../../Components/ItemCard/ItemCard";

import Button from "@mui/material/Button";

const renderInvertor = (invertor) => {
  return <InvertorCard data={invertor} selected={true} />;
};

const renderCards = (data) => {
  const cards = [];
  for (let i = 0; i < data.orderNumbers.length; i++) {
    // Skip items with zero amount
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
          {outputState.invertors.invertor
            ? renderInvertor(outputState.invertors.invertor)
            : null}
          {defaultPanel ? renderCards(defaultPanel) : null}
          {protectionDevices ? renderCards(protectionDevices) : null}
        </div>
        <div className="output-component-items">
          {mountingMaterial ? renderCards(mountingMaterial) : null}
        </div>
      </div>
      <Button className="download-button" variant="outlined">
        Stiahnuť zoznam materiálu do .csv
      </Button>
    </div>
  );
};

export default OutputPage;
