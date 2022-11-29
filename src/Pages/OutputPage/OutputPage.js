import React, { useContext } from "react";

import {
  AppStateContext,
  MaterialStateContext,
  OutputContext,
} from "../../ContextProvider/ContextProvider";

import { getMountingMaterialAmounts } from "../../Utilities/materialFunctions";
import { getProtectionDevices } from "../../Utilities/getProtectionDevices";
import { countPanels } from "../../Utilities/countPanels";

import InvertorCard from "../../Components/InvertorCard/InvertorCard";
import ItemCard from "../../Components/ItemCard/ItemCard";

import { CSVLink } from "react-csv";

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
    outputState.invertors.stringDivisions,
    appState.overvoltageDevice,
    appState.overcurrentDevice
  );
  const formatCsvData = (obj1, obj2, obj3, inv) => {
    const object3 =
      typeof obj3 === "undefined"
        ? {
            orderNumbers: [],
            amounts: [],
            descriptions: [],
          }
        : obj3;

    const invertor = inv
      ? inv
      : {
          orderNumber: null,
          description: null,
        };

    const orderNumbers = [
      ...obj1.orderNumbers,
      ...obj2.orderNumbers,
      ...object3.orderNumbers,
      ...[invertor.orderNumber],
    ];
    const amounts = [...obj1.amounts, ...obj2.amounts, ...object3.amounts, 1];
    const descriptions = [
      ...obj1.descriptions,
      ...obj2.descriptions,
      ...object3.descriptions,
      ...[invertor.description],
    ];

    const csvData = [
      ["Objednávacie číslo", "Množstvo", "Merná jednotka", "Názov  produktu"],
    ];

    for (let i = 0; i < orderNumbers.length; i++) {
      const orderNumber = orderNumbers[i];
      const description = descriptions[i];
      const amount = amounts[i];
      const unit = "ks";

      if (amount === 0) {
        continue;
      }

      csvData.push([orderNumber, amount, unit, description]);
    }

    return csvData;
  };

  const defaultPanel = require("../../resources/panel.json");
  const panelPower = materialState.panelPower;

  const panel =
    materialState.useDefaultPanel && defaultPanel
      ? defaultPanel
      : {
          orderNumbers: ["PANEL-----"],
          descriptions: [`Fotovoltický panel ${panelPower}Wp`],
        };
  panel.amounts = [countPanels(outputState.panelLayout.panels)];

  return (
    <div className="page-wrapper">
      <div className="output-page">
        <div className="output-component-items">
          {outputState.invertors.invertor
            ? renderInvertor(outputState.invertors.invertor)
            : null}
          {panel ? renderCards(panel) : null}
          {protectionDevices ? renderCards(protectionDevices) : null}
        </div>
        <div className="output-component-items">
          {mountingMaterial ? renderCards(mountingMaterial) : null}
        </div>
      </div>
      <div className="download-button-wrapper">
        <CSVLink
          data={formatCsvData(
            panel,
            mountingMaterial,
            protectionDevices,
            outputState.invertors.invertor
          )}
          className="download-button"
          download={"pv-calculator-material"}
        >
          Stiahnuť zoznam materiálu do .csv
        </CSVLink>
      </div>
    </div>
  );
};

export default OutputPage;
