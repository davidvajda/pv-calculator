import React, { useState } from "react";

import { useLocalStorage } from "../useLocalStorage";

export const AppStateContext = React.createContext();
export const MaterialStateContext = React.createContext();
export const OutputContext = React.createContext();
export const StepsContext = React.createContext();

const defaultAppContext = {
  screen: 0,
  roofHeight: 0,
  roofWidthBottom: 0,
  roofWidthTop: 0,
  hookRuster: 0.8,
  snowLoad: 1,
  windLoad: 1,
  roofShape: "rectangle",
  roofType: "tile",
  maxPlantPower: 0,
  allowPowerReserve: true,
};

const defaultMaterialContext = {
  panelWidth: 1134,
  panelHeight: 1722,
  panelVoltage: 31.8,
  panelCurrent: 10.55,
  panelPower: 415,
  railLength: 4300,
  hookRuster: {
    tile: 0.8,
    beaver: 0.8,
    wave: 0.5,
    fold: 0.5,
    trapez: 0.8,
  },
  bracketWidth: 20,
};

const defaultOutputContext = {
  panelLayout: [],
  invertor: {
    suitableTypes: [],
    stringDivision: [],
    amounts: [],
  },
  mountingMaterial: {
    orderNumbers: [],
    descriptions: [],
    amounts: [],
  },
};

const steps = {
  labels: ["Informácie o streche", "Použitý panel", "Návrh strechy"],
  screens: ["roof", "panel", "canvas", "output"],
};

export const ContextProvider = ({ children }) => {
  const [appState, setAppState] = useState(() => defaultAppContext);
  const [materialState, setMaterialState] = useLocalStorage(
    "materialContext",
    defaultMaterialContext
  );
  const [outputState, setOutputState] = useState(() => defaultOutputContext);

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      <MaterialStateContext.Provider
        value={{ materialState, setMaterialState }}
      >
        <OutputContext.Provider value={{ outputState, setOutputState }}>
          <StepsContext.Provider value={{ steps }}>
            {children}
          </StepsContext.Provider>
        </OutputContext.Provider>
      </MaterialStateContext.Provider>
    </AppStateContext.Provider>
  );
};
