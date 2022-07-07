import React, { useContext } from "react";

import { MaterialStateContext } from "../ContextProvider/ContextProvider";
import { PanelDimensions } from "../PanelDimension/PanelDimension";
import { TextInput } from "../TextInput/TextInput";

import "./PanelComponent.css";

const PanelComponent = () => {
  const { materialState, setMaterialState } = useContext(MaterialStateContext);
  return (
    <div className="panel-component">
      <div className="panel-dimensions">
        <PanelDimensions />
      </div>
      <div className="text-input-container">
        <TextInput
          label={"Šírka panelu [mm]"}
          value={materialState.panelWidth}
          dispatch={null}
          dispatchAction={null}
          type={"number"}
        />
        <TextInput
          label={"Výška panelu [mm]"}
          value={materialState.panelHeight}
          dispatch={null}
          dispatchAction={null}
          type={"number"}
        />
        <TextInput
          label={"Napätie panelu [V]"}
          value={materialState.panelVoltage}
          dispatch={null}
          dispatchAction={null}
          type={"number"}
        />
        <TextInput
          label={"Prúd panelu [A]"}
          value={materialState.panelCurrent}
          dispatch={null}
          dispatchAction={null}
          type={"number"}
        />
        <TextInput
          label={"Výkon panelu [Wp]"}
          value={materialState.panelPower}
          dispatch={null}
          dispatchAction={null}
          type={"number"}
        />
      </div>
    </div>
  );
};

export default PanelComponent;
