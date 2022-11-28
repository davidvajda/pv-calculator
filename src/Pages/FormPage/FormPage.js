import React, { useEffect, useContext } from "react";

import {
  AppStateContext,
  OutputContext,
  MaterialStateContext,
  APP_ACTIONS,
  OUTPUT_ACTIONS,
} from "../../ContextProvider/ContextProvider";
import { TextInput } from "../../Components/TextInput/TextInput";
import { SelectInput } from "../../Components/SelectInput/SelectInput";
import { SliderInput } from "../../Components/SliderInput/SliderInput";
import { CheckboxInput } from "../../Components/CheckboxInput/CheckboxInput";
import { RadioButtonInput } from "../../Components/RadioButtonInput/RadioButtonInput";

const FormPage = () => {
  const { appState, appDispatch } = useContext(AppStateContext);
  const { outputState, outputDispatch } = useContext(OutputContext);
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


  const windLoadIndexOptions = {
    labels: ["24", "26", "30", "33"],
    values: [1, 2, 3, 4],
  };

  const snowLoadIndexOptions = {
    labels: ["1", "2", "3", "4", "5"],
    values: [1, 2, 3, 4, 5],
  };

  const powerReserveOptions = [];
  for (let i = 0; i <= 5; i++) {
    powerReserveOptions.push({
      value: i * 10,
      label: `${i * 10}%`,
    });
  }

  const renderRowInputs = (amount) => {
    const panelsInRows = [];
    for (let i = 0; i < amount; i++) {
      panelsInRows.push(
        <TextInput
          key={i}
          idx={i}
          label={`${i}. rad`}
          value={outputState.panelLayout.panels[i]}
          appDispatch={outputDispatch}
          appDispatchAction={OUTPUT_ACTIONS.CHANGE_AMOUNT_IN_ROW}
          type={"number"}
          size={"small"}
          withoutMargin={true}
          max={20}
        />
      );
    }
    return panelsInRows;
  };

  useEffect(() => {
    appDispatch({
      type: "hookRuster",
      payload: { value: materialState.hookRuster[appState.roofType] },
    });
  }, [appState.roofType, materialState.hookRuster]);

  return (
    <div className="page-wrapper">
      <CheckboxInput
        label={"Manuálne zadať počet panelov"}
        appDispatch={appDispatch}
        appDispatchAction={APP_ACTIONS.MANUAL_PANEL_AMOUNTS}
        value={appState.manualPanelAmounts}
        description={
          "Po vybraní možnosti je možné namiesto rozmerov strechy manuálne zadať počty panelov."
        }
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

      {appState.manualPanelAmounts ? (
        <>
          <TextInput
            label={"Počet radov panelov"}
            value={outputState.panelLayout.panels.length}
            appDispatch={outputDispatch}
            appDispatchAction={OUTPUT_ACTIONS.CHANGE_ROW_AMOUNT}
            type={"number"}
            description={`Počet radov panelov.`}
            max={20}
          />
          <div className="row-inputs">
            {renderRowInputs(outputState.panelLayout.panels.length)}
          </div>
        </>
      ) : (
        <>
          <SelectInput
            label={"Tvar strechy"}
            itemLabels={roofShapeOptions.labels}
            values={roofShapeOptions.values}
            appDispatch={appDispatch}
            appDispatchAction={APP_ACTIONS.ROOF_SHAPE}
            defaultValue={appState.roofShape}
            description={`Tvar plochy, na ktorej majú byť panely umiestnené.`}
          />
          {appState.roofShape === "trapezoid" ? (
            <TextInput
              label={"Šírka strechy vrch [m]"}
              value={appState.roofWidthTop / 1000}
              appDispatch={appDispatch}
              appDispatchAction={APP_ACTIONS.ROOF_WIDTH_TOP}
              type={"number"}
              max={100}
              ratio={[1, 1000]}
              description={`Šírka vrchnej hrany strechy v metroch.`}
            />
          ) : null}

          <TextInput
            label={"Šírka strechy [m]"}
            value={appState.roofWidthBottom / 1000}
            appDispatch={appDispatch}
            appDispatchAction={APP_ACTIONS.ROOF_WIDTH}
            type={"number"}
            max={100}
            ratio={[1, 1000]}
            description={`Šírka strechy v metroch.`}
          />
          <TextInput
            label={"Výška strechy [m]"}
            value={appState.roofHeight / 1000}
            appDispatch={appDispatch}
            appDispatchAction={APP_ACTIONS.ROOF_HEIGHT}
            type={"number"}
            max={100}
            ratio={[1, 1000]}
            description={`Výška strehcy v metroch. Výškou je myslená dĺžka povrchu, na ktorej budú panely umiestnené.`}
          />
        </>
      )}

      <TextInput
        label={"Max. povolený výkon [kWp]"}
        value={appState.maxPlantPower / 1000}
        appDispatch={appDispatch}
        appDispatchAction={APP_ACTIONS.MAX_POWER}
        type={"number"}
        max={100}
        ratio={[1, 1000]}
        description={`Ak je zadaná hodnota (v kWp), vyráta sa počet panelov neprekračujúci zadanú hodnotu. 
          Ak hodnota zadaná nie je, výpočet prebehne bez obomedzenia.`}
      />
      <TextInput
        label={"Rozteč trámov, falcov [m]"}
        value={appState.hookRuster / 1000}
        appDispatch={appDispatch}
        appDispatchAction={APP_ACTIONS.HOOK_RUSTER}
        type={"number"}
        ratio={[1, 1000]}
        max={3}
        description={`Montážne háky/držiaky sa používajú na každý tám, 
          preto je pre vyrátanie správneho počtu držiakov dôležité určiť rozteč trámov.
          Rozmer sa zadáva v metroch kvôli lepšej presnosti výpočtu.`}
      />

      <RadioButtonInput
        label={"Predpokladaná zátaž vetrom vb0 [m/s]"}
        radioLabels={windLoadIndexOptions.labels}
        values={windLoadIndexOptions.values}
        defaultValue={appState.windLoad}
        appDispatch={appDispatch}
        appDispatchAction={APP_ACTIONS.WIND_LOAD}
        description={`Od indexu záťaže sa odvíja použitý montážny materiál. Kliknutím sa dostanete na web, ktorý zdarma poskytuje informáciu o indexe zátaže na slovensku.`}
        url="https://www.dlubal.com/en/load-zones-for-snow-wind-earthquake/wind-stn-en-1991-1-4.html"
      />
      <RadioButtonInput
        label={"Index predpokladanej záťaže snehom"}
        radioLabels={snowLoadIndexOptions.labels}
        values={snowLoadIndexOptions.values}
        defaultValue={appState.snowLoad}
        appDispatch={appDispatch}
        appDispatchAction={APP_ACTIONS.SNOW_LOAD}
        description={`Od indexu záťaže sa odvíja použitý montážny materiál. Kliknutím sa dostanete na web, ktorý zdarma poskytuje informáciu o indexe zátaže na slovensku.`}
        url="https://www.dlubal.com/en/load-zones-for-snow-wind-earthquake/snow-stn-en-1991-1-3.html"
      />
      <SliderInput
        label={"Výkonová rezerva striedača"}
        values={powerReserveOptions}
        value={appState.powerReserve}
        appDispatch={appDispatch}
        appDispatchAction={APP_ACTIONS.POWER_RESERVE}
        description={
          "Na striedač je možné zapojiť väčší výkon panelov až o 50%. 0% znanená, že sa pre panely s výkonom 5kW vyberie 5kW striedač. 50% znamená, že sa pre 5kW panely vyberie 3,3kW striedač."
        }
      />
    </div>
  );
};

export default FormPage;
