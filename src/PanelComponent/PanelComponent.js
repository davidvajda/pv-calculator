import React, { useContext } from "react";

import { MaterialStateContext } from "../ContextProvider/ContextProvider";
import { PanelDimensions } from "../PanelDimension/PanelDimension";
import { TextInput } from "../TextInput/TextInput";

import "./PanelComponent.css";

const PanelComponent = () => {
  const { materialState } = useContext(MaterialStateContext);
  return (
    <div className="panel-component">
      <div className="panel-dimensions">
        <PanelDimensions />
      </div>
      <div className="text-input-container">
        <TextInput
          label={"Šírka panelu [mm]"}
          value={materialState.panelWidth}
          type={"number"}
        />
        <TextInput
          label={"Výška panelu [mm]"}
          value={materialState.panelHeight}
          type={"number"}
        />
        <TextInput
          label={"Napätie panelu [V]"}
          value={materialState.panelVoltage}
          type={"number"}
        />
        <TextInput
          label={"Prúd panelu [A]"}
          value={materialState.panelCurrent}
          type={"number"}
        />
        <TextInput
          label={"Výkon panelu [Wp]"}
          value={materialState.panelPower}
          type={"number"}
        />
      </div>
    </div>
  );
};

export default PanelComponent;
