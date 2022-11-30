import React, { useContext } from "react";

import { PanelDimensions } from "../../Components/PanelDimension/PanelDimension";
import { TextInput } from "../../Components/TextInput/TextInput";
import { CheckboxInput } from "../../Components/CheckboxInput/CheckboxInput";

import { AppStateContext } from "../../ContextProvider/ContextProvider";
import { MaterialStateContext } from "../../ContextProvider/ContextProvider";
import { MATERIAL_ACTIONS } from "../../ContextProvider/ContextProvider";

const PanelPage = () => {
  const { materialState, materialDispatch } = useContext(MaterialStateContext);
  const { appState } = useContext(AppStateContext);

  return (
    <div className="page-wrapper">
      <div className="panel-dimensions">
        <PanelDimensions />
      </div>
      <CheckboxInput
        label={"Použiť odporúčaný panel"}
        value={materialState.useDefaultPanel}
        appDispatch={materialDispatch}
        appDispatchAction={MATERIAL_ACTIONS.USE_DEFAULT_PANEL}
      />
      <CheckboxInput
        label={"Otočiť panel"}
        value={false}
        appDispatch={materialDispatch}
        appDispatchAction={MATERIAL_ACTIONS.ROTATE_PANEL}
        description={
          "Po vybraní možnosti sú vzájomne zmenené hodnoty šírky a výšky panelu. Použite v prípade, že panely potrebujete na strechu položiť horizontálne."
        }
      />
      <TextInput
        label={"Šírka panelu [mm]"}
        value={materialState.panelWidth}
        type={"number"}
        disabled={materialState.useDefaultPanel}
        appDispatch={materialDispatch}
        appDispatchAction={MATERIAL_ACTIONS.PANEL_WIDTH}
        error={appState.inputErrors.includes("panelWidth")}
      />
      <TextInput
        label={"Výška panelu [mm]"}
        value={materialState.panelHeight}
        type={"number"}
        disabled={materialState.useDefaultPanel}
        appDispatch={materialDispatch}
        appDispatchAction={MATERIAL_ACTIONS.PANEL_HEIGHT}
        error={appState.inputErrors.includes("panelHeight")}
      />
      <TextInput
        label={"Napätie panelu [V]"}
        value={materialState.panelVoltage}
        type={"number"}
        disabled={materialState.useDefaultPanel}
        appDispatch={materialDispatch}
        appDispatchAction={MATERIAL_ACTIONS.PANEL_VOLTAGE}
        error={appState.inputErrors.includes("panelVoltage")}
      />
      <TextInput
        label={"Prúd panelu [A]"}
        value={materialState.panelCurrent}
        type={"number"}
        disabled={materialState.useDefaultPanel}
        appDispatch={materialDispatch}
        appDispatchAction={MATERIAL_ACTIONS.PANEL_CURRENT}
        error={appState.inputErrors.includes("panelCurrent")}
      />
      <TextInput
        label={"Výkon panelu [Wp]"}
        value={materialState.panelPower}
        type={"number"}
        disabled={materialState.useDefaultPanel}
        appDispatch={materialDispatch}
        appDispatchAction={MATERIAL_ACTIONS.PANEL_POWER}
        error={appState.inputErrors.includes("panelPower")}
      />
    </div>
  );
};

export default PanelPage;
