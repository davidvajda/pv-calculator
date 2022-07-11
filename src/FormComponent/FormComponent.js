import React, { useEffect, useContext } from "react";

import { APP_ACTIONS } from "../ContextProvider/ContextProvider";

import {
  AppStateContext,
  MaterialStateContext,
} from "../ContextProvider/ContextProvider";
import { TextInput } from "../TextInput/TextInput";
import { SelectInput } from "../SelectInput/SelectInput";
import { CheckboxInput } from "../CheckboxInput/CheckboxInput";
import { RadioButtonInput } from "../RadioButtonInput/RadioButtonInput";

import "./FormComponent.css";

const FormComponent = () => {
  const { appState, appDispatch } = useContext(AppStateContext);
  const { materialState } = useContext(MaterialStateContext);

  const roofShapeOptions = {
    labels: ["Obdĺžniková", "Trojuholníková", "Lichobežníková"],
    values: ["rectangle", "triangle", "trapezoid"],
  };

  const roofTypeOptions = {
    labels: [
      "Škridlová",
      "Bobrovka",
      "Trapézový plech",
      "Vlnitý eternit / plech",
      "Falcovaný plech",
    ],
    values: ["tile", "beaver", "trapez", "wave", "fold"],
  };

  const loadIndexOptions = {
    labels: ["1", "2", "3", "4", "5"],
    values: [1, 2, 3, 4, 5],
  };

  useEffect(() => {
    appDispatch({
      type: "hookRuster",
      payload: { value: materialState.hookRuster[appState.roofType] },
    });
  }, [appState.roofType]);

  return (
    <div className="form-component">
      <div className="text-input-container">
        <SelectInput
          label={"Tvar strechy"}
          itemLabels={roofShapeOptions.labels}
          values={roofShapeOptions.values}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.ROOF_SHAPE}
          defaultValue={appState.roofShape}
        />
        <SelectInput
          label={"Typ strešnej krytiny"}
          itemLabels={roofTypeOptions.labels}
          values={roofTypeOptions.values}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.ROOF_TYPE}
          defaultValue={appState.roofType}
        />
        <TextInput
          label={"Rozteč trámov, falcov [mm]"}
          value={appState.hookRuster}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.HOOK_RUSTER}
          type={"number"}
        />
      </div>
      <div className="text-input-container">
        {appState.roofShape === "trapezoid" ? (
          <TextInput
            label={"Šírka strechy vrch [mm]"}
            value={appState.roofWidthTop}
            appDispatch={appDispatch}
            appDispatchAction={APP_ACTIONS.ROOF_WIDTH_TOP}
            type={"number"}
          />
        ) : null}

        <TextInput
          label={"Šírka strechy [mm]"}
          value={appState.roofWidthBottom}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.ROOF_WIDTH}
          type={"number"}
        />
        <TextInput
          label={"Výška strechy [mm]"}
          value={appState.roofHeight}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.ROOF_HEIGHT}
          type={"number"}
        />
        <TextInput
          label={"Max. povolený výkon [Wp]"}
          value={appState.maxPlantPower}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.MAX_POWER}
          type={"number"}
        />
      </div>
      <div className="text-input-container">
        <RadioButtonInput
          label={"Index predpokladanej záťaže vetrom"}
          radioLabels={loadIndexOptions.labels}
          values={loadIndexOptions.values}
          defaultValue={appState.windLoad}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.WIND_LOAD}
        />
        <RadioButtonInput
          label={"Index predpokladanej záťaže snehom"}
          radioLabels={loadIndexOptions.labels}
          values={loadIndexOptions.values}
          defaultValue={appState.snowLoad}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.SNOW_LOAD}
        />
      </div>
      <div className="text-input-container">
        <CheckboxInput
          label={"Použiť výkonovú rezervu striedača"}
          value={appState.allowPowerReserve}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.POWER_RESERVE}
        />
      </div>
    </div>
  );
};

export default FormComponent;
