import React, { useState, useReducer, createContext } from "react";

import { useLocalStorage } from "../useLocalStorage";

export const AppStateContext = createContext();
export const MaterialStateContext = createContext();
export const OutputContext = createContext();
export const StepsContext = createContext();

const defaultAppContext = {
  screen: 0,
  roofHeight: 0,
  roofWidthBottom: 0,
  roofWidthTop: 0,
  hookRuster: 800,
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
    tile: 800,
    beaver: 800,
    wave: 500,
    fold: 500,
    trapez: 800,
  },
  bracketWidth: 20,
};

const defaultOutputContext = {
  panelLayout: {
    panels: [],
    usableWidths: [],
    panelsFromTop: false,
  },
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

export const ACTIONS = {
  POWER_RESERVE: "allowPowerReserve",
  ROOF_HEIGHT: "roofHeight",
  ROOF_WIDTH: "roofWidth",
  ROOF_WIDTH_TOP: "roofWidthTop",
  HOOK_RUSTER: "hookRuster",
  SNOW_LOAD: "snowLoad",
  WIND_LOAD: "windLoad",
  ROOF_SHAPE: "roofShape",
  ROOF_TYPE: "roofType",
  MAX_POWER: "maxPlantPower",

  NEXT_SCREEN: "nextScreen",
  PREV_SCREEN: "prevScreen",
  RESET_FORM: "resetForm",
};

export const ContextProvider = ({ children }) => {
  const changeState = (appState, action) => {
    switch (action.type) {
      // inputs
      case ACTIONS.POWER_RESERVE:
        return { ...appState, allowPowerReserve: !appState.allowPowerReserve };
      case ACTIONS.ROOF_HEIGHT:
        return { ...appState, roofHeight: action.payload.value };
      case ACTIONS.ROOF_WIDTH:
        return { ...appState, roofWidthBottom: action.payload.value };
      case ACTIONS.ROOF_WIDTH_TOP:
        return { ...appState, roofWidthTop: action.payload.value };
      case ACTIONS.HOOK_RUSTER:
        return { ...appState, hookRuster: action.payload.value };
      case ACTIONS.SNOW_LOAD:
        return { ...appState, snowLoad: action.payload.value };
      case ACTIONS.WIND_LOAD:
        return { ...appState, windLoad: action.payload.value };
      case ACTIONS.ROOF_SHAPE:
        return { ...appState, roofShape: action.payload.value };
      case ACTIONS.ROOF_TYPE:
        return { ...appState, roofType: action.payload.value };
      case ACTIONS.MAX_POWER:
        return { ...appState, maxPlantPower: action.payload.value };

      // screen handling
      case ACTIONS.NEXT_SCREEN:
        return { ...appState, screen: appState.screen + 1 };
      case ACTIONS.PREV_SCREEN:
        return { ...appState, screen: appState.screen - 1 };
      case ACTIONS.RESET_FORM:
        return defaultAppContext;
      default:
        return appState;
    }
  };

  const [materialState, setMaterialState] = useLocalStorage(
    "materialContext",
    defaultMaterialContext
  );
  const [outputState, setOutputState] = useState(() => defaultOutputContext);
  const [appState, dispatch] = useReducer(changeState, defaultAppContext);

  return (
    <AppStateContext.Provider value={{ appState, dispatch }}>
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
