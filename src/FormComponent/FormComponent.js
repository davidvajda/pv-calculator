import React, { useState, useEffect, useContext, startTransition } from "react";

import "./FormComponent.css";

import {
  AppStateContext,
  MaterialStateContext,
} from "../ContextProvider/ContextProvider";

import { TextInput } from "../TextInput/TextInput";
import { SelectInput } from "../SelectInput/SelectInput";
import { CheckboxInput } from "../CheckboxInput/CheckboxInput";
import { RadioButtonInput } from "../RadioButtonInput/RadioButtonInput";

const FormComponent = () => {
  const { appState, setAppState } = useContext(AppStateContext);
  const { materialState } = useContext(MaterialStateContext);

  const [roofWidthTop, setRoofWidthTop] = useState(() => 0);
  const [roofWidthBottom, setRoofWidthBottom] = useState(() => 0);
  const [roofHeight, setRoofHeight] = useState(() => 0);
  const [maxPlantPower, setPaxPlantPower] = useState(() => 0);

  const [snowLoad, setSnowLoad] = useState(() => 1);
  const [windLoad, setWindLoad] = useState(() => 1);
  const [roofShape, setRoofShape] = useState(() => "rectangle");
  const [roofType, setRoofType] = useState(() => "tile");

  const [hookRuster, setHookRuster] = useState(() => 0.8);

  const [allowPowerReserve, setAllowPowerReserve] = useState(() => true);

  useEffect(() => {
    setRoofWidthTop(appState.roofWidthTop);
    setRoofWidthBottom(appState.roofWidthBottom);
    setRoofHeight(appState.roofHeight);
    setPaxPlantPower(appState.maxPlantPower);
    setSnowLoad(appState.snowLoad);
    setWindLoad(appState.windLoad);
    setRoofShape(appState.roofShape);
    setRoofType(appState.roofType);
    setAllowPowerReserve(appState.allowPowerReserve);
    setHookRuster(appState.hookRuster);
  }, []);

  useEffect(() => {
    setHookRuster(materialState.hookRuster[roofType]);
  }, [roofType]);

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

  return (
    <div className="form-component">
      <div className="text-input-container">
        <SelectInput
          label={"Tvar strechy"}
          itemLabels={roofShapeOptions.labels}
          values={roofShapeOptions.values}
          setValue={setRoofShape}
          defaultValue={roofShape}
        />
        <SelectInput
          label={"Typ strešnej krytiny"}
          itemLabels={roofTypeOptions.labels}
          values={roofTypeOptions.values}
          setValue={setRoofType}
          defaultValue={roofType}
        />
        <TextInput
          label={"Rozteč trámov, falcov"}
          value={hookRuster}
          setValue={setHookRuster}
          type={"number"}
        />
      </div>
      <div className="text-input-container">
        {roofShape === "trapezoid" ? (
          <TextInput
            label={"Šírka strechy vrch [mm]"}
            value={roofWidthTop}
            setValue={setRoofWidthTop}
            type={"number"}
          />
        ) : null}

        <TextInput
          label={"Šírka strechy [mm]"}
          value={roofWidthBottom}
          setValue={setRoofWidthBottom}
          type={"number"}
        />
        <TextInput
          label={"Výška strechy [mm]"}
          value={roofHeight}
          setValue={setRoofHeight}
          type={"number"}
        />
        <TextInput
          label={"Max. povolený výkon [Wp]"}
          value={maxPlantPower}
          setValue={setPaxPlantPower}
          type={"number"}
        />
      </div>
      <div className="text-input-container">
        <RadioButtonInput
          label={"Index predpokladanej záťaže vetrom"}
          radioLabels={loadIndexOptions.labels}
          values={loadIndexOptions.values}
          defaultValue={windLoad}
          setValue={setWindLoad}
        />
        <RadioButtonInput
          label={"Index predpokladanej záťaže snehom"}
          radioLabels={loadIndexOptions.labels}
          values={loadIndexOptions.values}
          defaultValue={snowLoad}
          setValue={setSnowLoad}
        />
      </div>
      <div className="text-input-container">
        <CheckboxInput
          label={"Použiť výkonovú rezervu striedača"}
          value={allowPowerReserve}
          setValue={setAllowPowerReserve}
        />
      </div>
    </div>
  );
};

export default FormComponent;
