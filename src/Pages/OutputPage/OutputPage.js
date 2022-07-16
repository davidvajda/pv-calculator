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
  return <InvertorCard data={invertor} selected={true} />
}

const renderCards = (data) => {
  const cards = []
    for (let i = 0; i < data.orderNumbers.length; i++) {
      cards.push(<ItemCard key={i} orderNumber={data.orderNumbers[i]} description={data.descriptions[i]} amount={data.amounts[i]} />)
    }
  return cards;
}

const OutputPage = () => {
  const { appState } = useContext(AppStateContext);
  const { materialState } = useContext(MaterialStateContext);
  const { outputState } = useContext(OutputContext);

  const [selectedInvertor, setSelectedInvertor] = useState(() => null);

  const [suitableSpd, setSuitableSpd] = useState(() => null);

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

  // const getProtectionDevices = getProtectionDevices()

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
    <div className="page-wrapper output-page">
      <div className="output-component-items">
        {renderInvertor(outputState.invertors)}
        {renderCards(defaultPanel)}
      </div>
      <div className="output-component-items">

      </div>
      <div>
        <Button className="download-button" variant="outlined">
          Stiahnuť zoznam materiálu do .csv
        </Button>
      </div>
    </div>
  );
};

export default OutputPage;
