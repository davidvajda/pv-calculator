import React, { useReducer, createContext } from "react";

export const AppStateContext = createContext();
export const MaterialStateContext = createContext();
export const OutputContext = createContext();
export const StepsContext = createContext();

const defaultAppContext = require("../resources/appContext.json");
const defaultMaterialContext = require("../resources/materialContext.json");
const defaultOutputContext = require("../resources/outputContext.json");
const panel = require("../resources/panel.json");

[
  "panelWidth",
  "panelHeight",
  "panelVoltage",
  "panelCurrent",
  "panelPower",
].forEach(
  (attribute) => (defaultMaterialContext[attribute] = panel[attribute][0])
);

export const APP_ACTIONS = {
  MANUAL_PANEL_AMOUNTS: "manualPanelAmounts",
  POWER_RESERVE: "powerReserve",
  ROOF_HEIGHT: "roofHeight",
  ROOF_WIDTH: "roofWidth",
  ROOF_WIDTH_TOP: "roofWidthTop",
  HOOK_RUSTER: "hookRuster",
  SNOW_LOAD: "snowLoad",
  WIND_LOAD: "windLoad",
  ROOF_SHAPE: "roofShape",
  ROOF_TYPE: "roofType",
  MAX_POWER: "maxPlantPower",

  OVERVOLTAGE_DEVICE: "overvoltageDevice",
  OVERCURRENT_DEVICE: "overcurrentDevice",

  INPUT_ERRORS: "inputErrors",
  NEXT_SCREEN: "nextScreen",
  PREV_SCREEN: "prevScreen",
  RESET_FORM: "resetForm",

  FILL_ROOF_SIZE: "fillRoofSize",
};

export const OUTPUT_ACTIONS = {
  PANEL_LAYOUT: "panelLayout",
  MOUNTING_MATERIAL: "mountingMaterial",
  INVERTOR_MATERIAL: "invertorMaterial",
  DELETE_PANEL: "deletePanel",
  CHANGE_ROW_AMOUNT: "changeRowAmount",
  CHANGE_AMOUNT_IN_ROW: "changeAmountInRow",
  FILL_USABLE_WIDTHS: "fillUsableWidths",
};

export const MATERIAL_ACTIONS = {
  USE_DEFAULT_PANEL: "useDefaultPanel",
  PANEL_WIDTH: "panelWidth",
  PANEL_HEIGHT: "panelHeight",
  PANEL_VOLTAGE: "panelVoltage",
  PANEL_CURRENT: "panelCurrent",
  PANEL_POWER: "panelPower",
};

export const ContextProvider = ({ children }) => {
  const changeAppState = (appState, action) => {
    switch (action.type) {
      // inputs
      case APP_ACTIONS.MANUAL_PANEL_AMOUNTS:
        return {
          ...appState,
          manualPanelAmounts: !appState.manualPanelAmounts,
        };
      case APP_ACTIONS.POWER_RESERVE:
        return { ...appState, powerReserve: action.payload.value };
      case APP_ACTIONS.ROOF_HEIGHT:
        return { ...appState, roofHeight: action.payload.value };
      case APP_ACTIONS.ROOF_WIDTH:
        return { ...appState, roofWidthBottom: action.payload.value };
      case APP_ACTIONS.ROOF_WIDTH_TOP:
        return { ...appState, roofWidthTop: action.payload.value };
      case APP_ACTIONS.HOOK_RUSTER:
        return { ...appState, hookRuster: action.payload.value };
      case APP_ACTIONS.SNOW_LOAD:
        return { ...appState, snowLoad: action.payload.value };
      case APP_ACTIONS.WIND_LOAD:
        return { ...appState, windLoad: action.payload.value };
      case APP_ACTIONS.ROOF_SHAPE:
        return { ...appState, roofShape: action.payload.value };
      case APP_ACTIONS.ROOF_TYPE:
        return { ...appState, roofType: action.payload.value };
      case APP_ACTIONS.MAX_POWER:
        return { ...appState, maxPlantPower: action.payload.value };

      case APP_ACTIONS.OVERVOLTAGE_DEVICE:
        return { ...appState, overvoltageDevice: action.payload.value };
      case APP_ACTIONS.OVERCURRENT_DEVICE:
        return { ...appState, overcurrentDevice: action.payload.value };

      // screen handling
      case APP_ACTIONS.INPUT_ERRORS:
        return { ...appState, inputErrors: action.payload.value };
      case APP_ACTIONS.NEXT_SCREEN:
        return { ...appState, screen: appState.screen + 1 };
      case APP_ACTIONS.PREV_SCREEN:
        return { ...appState, screen: appState.screen - 1 };
      case APP_ACTIONS.RESET_FORM:
        return defaultAppContext;

      default:
        return appState;
    }
  };

  const changeOutputState = (outputState, action) => {
    const panelsReference = outputState.panelLayout.panels;

    switch (action.type) {
      case OUTPUT_ACTIONS.CHANGE_ROW_AMOUNT:
        const targetAmount = action.payload.value;
        const panelArray = Array(targetAmount)
          .fill(0)
          .map((_, i) => {
            if (i < panelsReference.length) {
              return panelsReference[i];
            }
            return 0;
          });
        return {
          ...outputState,
          panelLayout: { ...outputState.panelLayout, panels: [...panelArray] },
        };
      case OUTPUT_ACTIONS.CHANGE_AMOUNT_IN_ROW:
        const targetPanelAmount = action.payload.value;
        const idx = action.payload.idx;
        const panelArr = [...outputState.panelLayout.panels];
        panelArr[idx] = targetPanelAmount;
        return {
          ...outputState,
          panelLayout: { ...outputState.panelLayout, panels: [...panelArr] },
        };
      case OUTPUT_ACTIONS.FILL_USABLE_WIDTHS:
        let roofWidth = 600; // safe distance from left and right

        const widestPanelRow = Math.max(...panelsReference);
        const panelWidth = materialState.panelWidth;

        const newUsableWidths = Array(panelsReference.length).fill(
          roofWidth + widestPanelRow * panelWidth
        );

        return {
          ...outputState,
          panelLayout: {
            ...outputState.panelLayout,
            usableWidths: [...newUsableWidths],
          },
        };
      case OUTPUT_ACTIONS.PANEL_LAYOUT:
        return { ...outputState, panelLayout: action.payload.value };
      case OUTPUT_ACTIONS.MOUNTING_MATERIAL:
        return { ...outputState, mountingMaterial: action.payload.value };
      case OUTPUT_ACTIONS.INVERTOR_MATERIAL:
        return {
          ...outputState,
          invertors: {
            invertor: action.payload.invertor,
            stringDivisions: action.payload.stringDivisions,
          },
        };
      case OUTPUT_ACTIONS.DELETE_PANEL:
        const newPanels = outputState.panelLayout.panels.map((amount, idx) => {
          return idx === action.payload.value
            ? amount > 0
              ? amount - 1
              : 0
            : amount;
        });
        const newPanelLayout = {
          ...outputState.panelLayout,
          panels: newPanels,
        };
        return { ...outputState, panelLayout: newPanelLayout };
      default:
        return outputState;
    }
  };

  const changeMaterialState = (materialState, action) => {
    switch (action.type) {
      case MATERIAL_ACTIONS.USE_DEFAULT_PANEL:
        return materialState.useDefaultPanel
          ? {
              ...materialState,
              useDefaultPanel: false,
            }
          : {
              ...materialState,
              useDefaultPanel: true,
              panelWidth: defaultMaterialContext.panelWidth,
              panelHeight: defaultMaterialContext.panelHeight,
              panelVoltage: defaultMaterialContext.panelVoltage,
              panelCurrent: defaultMaterialContext.panelCurrent,
              panelPower: defaultMaterialContext.panelPower,
            };
      case MATERIAL_ACTIONS.ROTATE_PANEL:
        return {
          ...materialState,
          panelWidth: materialState.panelHeight,
          panelHeight: materialState.panelWidth,
        };
      case MATERIAL_ACTIONS.PANEL_WIDTH:
        return {
          ...materialState,
          panelWidth: action.payload.value,
        };
      case MATERIAL_ACTIONS.PANEL_HEIGHT:
        return {
          ...materialState,
          panelHeight: action.payload.value,
        };
      case MATERIAL_ACTIONS.PANEL_VOLTAGE:
        return {
          ...materialState,
          panelVoltage: action.payload.value,
        };
      case MATERIAL_ACTIONS.PANEL_CURRENT:
        return {
          ...materialState,
          panelCurrent: action.payload.value,
        };
      case MATERIAL_ACTIONS.PANEL_POWER:
        return {
          ...materialState,
          panelPower: action.payload.value,
        };

      default:
        return materialState;
    }
  };

  const [materialState, materialDispatch] = useReducer(
    changeMaterialState,
    defaultMaterialContext
  );

  const [outputState, outputDispatch] = useReducer(
    changeOutputState,
    defaultOutputContext
  );

  const [appState, appDispatch] = useReducer(changeAppState, defaultAppContext);

  return (
    <AppStateContext.Provider value={{ appState, appDispatch }}>
      <MaterialStateContext.Provider
        value={{ materialState, materialDispatch }}
      >
        <OutputContext.Provider value={{ outputState, outputDispatch }}>
          {children}
        </OutputContext.Provider>
      </MaterialStateContext.Provider>
    </AppStateContext.Provider>
  );
};
