import React, { useEffect, useContext } from "react";

import {
  AppStateContext,
  MaterialStateContext,
  APP_ACTIONS,
} from "../../ContextProvider/ContextProvider";
import { TextInput } from "../../Components/TextInput/TextInput";
import { SelectInput } from "../../Components/SelectInput/SelectInput";
import { CheckboxInput } from "../../Components/CheckboxInput/CheckboxInput";
import { RadioButtonInput } from "../../Components/RadioButtonInput/RadioButtonInput";

const FormPage = () => {
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
    <div className="page-wrapper">
      <div className="text-input-container">
        <SelectInput
          label={"Tvar strechy"}
          itemLabels={roofShapeOptions.labels}
          values={roofShapeOptions.values}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.ROOF_SHAPE}
          defaultValue={appState.roofShape}
          description={`Tvar plochy, na ktorej majú byť panely umiestnené.`}
        />
        <SelectInput
          label={"Typ strešnej krytiny"}
          itemLabels={roofTypeOptions.labels}
          values={roofTypeOptions.values}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.ROOF_TYPE}
          defaultValue={appState.roofType}
          description={`Typ krytitiny, ktorá je použitá na ploche umiestnenia panelov.`}
        />
        <TextInput
          label={"Rozteč trámov, falcov [mm]"}
          value={appState.hookRuster}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.HOOK_RUSTER}
          type={"number"}
          description={`Montážne háky/držiaky sa používajú na každý tám, 
          preto je pre vyrátanie správneho počtu držiakov dôležité určiť rozteč trámov.
          Rozmer sa zadáva v milimetroch kvôli lepšej presnosti výpočtu.`}
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
            description={`Šírka vrchnej hrany strechy v milimetroch.`}
          />
        ) : null}

        <TextInput
          label={"Šírka strechy [mm]"}
          value={appState.roofWidthBottom}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.ROOF_WIDTH}
          type={"number"}
          description={`Šírka strechy v milimetroch.`}
        />
        <TextInput
          label={"Výška strechy [mm]"}
          value={appState.roofHeight}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.ROOF_HEIGHT}
          type={"number"}
          description={`Výška strehcy v milimetroch. Výškou je myslená dĺžka povrchu, na ktorej budú panely umiestnené.`}
        />
        <TextInput
          label={"Max. povolený výkon [Wp]"}
          value={appState.maxPlantPower}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.MAX_POWER}
          type={"number"}
          description={`Ak je zadaná hodnota (vo Wp), vyráta sa počet panelov neprekračujúci zadanú hodnotu. 
          Ak hodnota zadaná nie je, výpočet prebehne bez obomedzenia.`}
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
          description={`Od indexu záťaže sa odvíja použitý montážny materiál.`}
        />
        <RadioButtonInput
          label={"Index predpokladanej záťaže snehom"}
          radioLabels={loadIndexOptions.labels}
          values={loadIndexOptions.values}
          defaultValue={appState.snowLoad}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.SNOW_LOAD}
          description={`Od indexu záťaže sa odvíja použitý montážny materiál.`}
        />
      </div>
      <div className="text-input-container">
        <CheckboxInput
          label={"Použiť výkonovú rezervu striedača"}
          value={appState.allowPowerReserve}
          appDispatch={appDispatch}
          appDispatchAction={APP_ACTIONS.POWER_RESERVE}
          description={`Na striedač je možné pripojiť až o 50% viac výkonu než dokáže spracovať.
          Je to kvôli tomu, že fotovoltické panely väčšinu času nepracujú na svojom max. výkone.`}
        />
      </div>
    </div>
  );
};

export default FormPage;
