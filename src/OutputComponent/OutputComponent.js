import React, { useState, useContext } from "react";

import {
  AppStateContext,
  MaterialStateContext,
  OutputContext,
} from "../ContextProvider/ContextProvider";
import { getSuitableInvertorAndStrings } from "../invertorFunctions";
import { getMountingMaterialAmounts } from "../materialFunctions";

import "./OutputComponent.css";

const getSchrackImageUrl = (orderNumber) => {
  return (
    "https://image.schrackcdn.com/340x380/f_" +
    orderNumber.toLowerCase() +
    ".jpg"
  );
};

const ItemCard = ({textUp, textDown, imageUrl}) => {
  return (
    <div className="item-card-container">
      <div className="item-card-text text-up">{textUp}</div>
      <img src={imageUrl} className="item-card-image"/>
      <div className="item-card-text text-down">{textDown}</div>
    </div>
  )
}

const renderItems = (items) => {
  const itemComponents = []

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    itemComponents.push(<ItemCard textUp={items.orderNumber} textDown={item.description} imageUrl={item.imageUrl} />)
  }
  
  return itemComponents
}

const OutputComponent = () => {
  const { appState } = useContext(AppStateContext);
  const { materialState } = useContext(MaterialStateContext);
  const { outputState } = useContext(OutputContext);

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
    <div>
      {renderItems(suitableInvertors.invertors)}
    </div>
  );
};

export default OutputComponent;
