import React, { useContext } from "react";

import { MaterialStateContext } from "../../ContextProvider/ContextProvider";
import { PanelDimensions } from "../../Components/PanelDimension/PanelDimension";
import { TextInput } from "../../Components/TextInput/TextInput";
import { CheckboxInput } from "../../Components/CheckboxInput/CheckboxInput";

const PanelPage = () => {
  const { materialState } = useContext(MaterialStateContext);
  return (
    <div className="page-wrapper">
      <div className="panel-dimensions">
        <PanelDimensions />
      </div>
      <CheckboxInput
        label={"Použiť odporúčaný panel"}
        value={materialState.useDefaultPanel}
      />
      <TextInput
        label={"Šírka panelu [mm]"}
        value={materialState.panelWidth}
        type={"number"}
        disabled={materialState.useDefaultPanel}
      />
      <TextInput
        label={"Výška panelu [mm]"}
        value={materialState.panelHeight}
        type={"number"}
        disabled={materialState.useDefaultPanel}
      />
      <TextInput
        label={"Napätie panelu [V]"}
        value={materialState.panelVoltage}
        type={"number"}
        disabled={materialState.useDefaultPanel}
      />
      <TextInput
        label={"Prúd panelu [A]"}
        value={materialState.panelCurrent}
        type={"number"}
        disabled={materialState.useDefaultPanel}
      />
      <TextInput
        label={"Výkon panelu [Wp]"}
        value={materialState.panelPower}
        type={"number"}
        disabled={materialState.useDefaultPanel}
      />
    </div>
  );
};

export default PanelPage;
