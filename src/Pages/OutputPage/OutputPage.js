import React, { useState, useContext } from "react";

import {
  AppStateContext,
  MaterialStateContext,
  OutputContext,
} from "../../ContextProvider/ContextProvider";
import { getSuitableInvertorAndStrings } from "../../Utilities/invertorFunctions";
import { getMountingMaterialAmounts } from "../../Utilities/materialFunctions";

import Button from "@mui/material/Button";

const getSchrackImageUrl = (orderNumber) => {
  return (
    "https://image.schrackcdn.com/340x380/f_" +
    orderNumber.toLowerCase() +
    ".jpg"
  );
};

const getScrachEshopUrl = (orderNumber) => {
  return "http://www.schrack.sk/eshop/sd/sd?a=" + orderNumber.toUpperCase();
};

const ItemCard = ({
  textUp,
  textDown,
  imageUrl,
  eshopUrl,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={
        selected
          ? "item-card-container-selected item-card-container"
          : "item-card-container"
      }
    >
      <div className="item-card-text">{textUp}</div>
      <img src={imageUrl} className="item-card-image" />

      <a href={eshopUrl} target="blank">
        <div className="item-card-text">{textDown}</div>
      </a>
    </div>
  );
};

const renderInvertors = (items, selectedInvertor, setSelectedInvertor) => {
  const itemComponents = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    itemComponents.push(
      <ItemCard
        key={i}
        onClick={() => {
          setSelectedInvertor(i);
        }}
        selected={selectedInvertor === i ? true : false}
        textUp={item.orderNumber}
        textDown={item.description}
        imageUrl={item.imageUrl}
        eshopUrl={item.eshopUrl}
      />
    );
  }

  return itemComponents;
};

const renderMountingMaterial = (mountingMaterial) => {
  const itemComponents = [];

  let i = 0;
  for (let key in mountingMaterial.orderNumbers) {

    const orderNumber = mountingMaterial.orderNumbers[key];
    const amount = [mountingMaterial.amounts[key]];
    const description = [mountingMaterial.descriptions[key]];


    itemComponents.push(
      <ItemCard
        key={i}
        textUp={amount + "x " + orderNumber}
        textDown={description}
        imageUrl={getSchrackImageUrl(orderNumber)}
        eshopUrl={getScrachEshopUrl(orderNumber)}
      />
    );
    i++;
  }
  return itemComponents;
};

const OutputPage = () => {
  const { appState } = useContext(AppStateContext);
  const { materialState } = useContext(MaterialStateContext);
  const { outputState } = useContext(OutputContext);

  const [selectedInvertor, setSelectedInvertor] = useState(() => null);

  const suitableInvertors = getSuitableInvertorAndStrings(
    appState.allowPowerReserve,
    materialState.panelPower,
    materialState.panelVoltage,
    materialState.panelCurrent,
    outputState.panelLayout
  );

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

  return (
    <div className="page-wrapper output-page">
      <div>Vhodné striedače:</div>
      <div className="output-component-items">
        {renderInvertors(
          suitableInvertors.invertors,
          selectedInvertor,
          setSelectedInvertor
        )}
      </div>
      <div>Typy a množstvá montážneho materiálu:</div>
      <div className="output-component-items">
        {renderMountingMaterial(mountingMaterial)}
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
