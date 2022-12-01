import React, { setState, useEffect, useContext, useState } from "react";

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

import { getResource } from "../../Utilities/getResource";

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
  const [hooks, setHooks] = useState();
  const [rails, setRails] = useState();
  const [others, setOthers] = useState();
  const [protectionMaterial, setProtectionMaterial] = useState();
  const [defaultPanel, setDefaultPanel] = useState();

  const [mountingMaterial, setMountingMaterial] = useState();
  const [protectionDevices, setProtectinDevices] = useState();
  const [panel, setPanel] = useState();

  const { appState } = useContext(AppStateContext);
  const { materialState } = useContext(MaterialStateContext);
  const { outputState } = useContext(OutputContext);

  useEffect(() => {
    getResource(setHooks, "hooks.json");
    getResource(setRails, "rails.json");
    getResource(setOthers, "others.json");
    getResource(setProtectionMaterial, "protectionDevices.json");
    getResource(setDefaultPanel, "panel.json");
  }, []);

  useEffect(() => {
    if (hooks && rails && others)
      setMountingMaterial(
        getMountingMaterialAmounts(
          appState.roofType,
          appState.hookRuster,
          materialState.panelWidth,
          materialState.railLength,
          materialState.bracketWidth,
          outputState.panelLayout,
          appState.snowLoad,
          appState.windLoad,
          hooks,
          rails,
          others
        )
      );
  }, [hooks, rails, others]);

  useEffect(() => {
    if (protectionMaterial)
      setProtectinDevices(
        getProtectionDevices(
          outputState.invertors.stringDivisions,
          appState.overvoltageDevice,
          appState.overcurrentDevice,
          protectionMaterial
        )
      );
  }, [protectionMaterial]);

  useEffect(() => {
    if (defaultPanel)
      setPanel(
        materialState.useDefaultPanel && defaultPanel
          ? {
              ...defaultPanel,
              amounts: [countPanels(outputState.panelLayout.panels)],
            }
          : {
              orderNumbers: ["PANEL-----"],
              descriptions: [
                `Fotovoltický panel ${materialState.panelPower}Wp`,
              ],
              amounts: [countPanels(outputState.panelLayout.panels)],
            }
      );
  }, [defaultPanel]);

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

  return (
    <div className="page-wrapper">
      {mountingMaterial && protectionDevices && panel ? (
        <>
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
        </>
      ) : (
        <>loading</>
      )}
    </div>
  );
};

export default OutputPage;
