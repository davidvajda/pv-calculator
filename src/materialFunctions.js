// material with indices 0 to 4 according to snow,  and wind load 1-5
const HOOKS = {
    tile: ["PVF31025-A", "PVF31025-A", "PVF31015-A", "PVF31015-A", null],
    bobrovka: ["PVF31050--", "PVF31050--", "PVF31050--", null, null],
    eternit: ["PVF31065--", "PVF31065--", "PVF31085--", "PVF31085--", null],
    sheet: ["PVF31090--", "PVF31090--", "PVF31090--", null, null],
    trapez: ["PVF31111--", "PVF31111--", "PVF31100--", "PVF31100--", null],
  };
  
  const RAILS = {
    withCable: ["PVF31140-A", "PVF31140-A", "PVF31140-A", "PVF31140-A", null],
    standard: ["PVF31115-A", "PVF31115-A", "PVF31125-A", "PVF31130-A", null],
    sheet: ["PVF31120-A", "PVF31120-A", "PVF31130-A", "PVF31130-A", null],
  };
  
  const RAIL_CONNECTOR = "PVF31150--";
  const END_CLAMP = "PVF31180--";
  const MIDDLE_CLAMP = "PVF31175-A";
  
  const snowLoad = 1;
  const windLoad = 1;
  
  const higherLoadValue = (snowLoad > windLoad ? snowLoad : windLoad) - 1; // -1 because of indexing
  
  export const getMountingMaterialAmounts = (appState, materialState, layout) => {
    const panelWidth = materialState.panelWidth;
    const railLength = materialState.railLength;
    const bracketWidth = materialState.bracketWidth;
  
    let hookRuster = 0.8;
    let hookOrderNumber = null;
    const roofType = appState.roofType;
  
    for (let key in materialState.hookRuster) {
      if (materialState.hookRuster.hasOwnProperty(key) && key === roofType) {
        hookRuster = materialState.hookRuster[key];
        break;
      }
    }
  
    for (let key in HOOKS) {
      if (HOOKS.hasOwnProperty(key) && key === roofType) {
        hookOrderNumber = HOOKS[key][higherLoadValue];
      }
    }
  
    let rails = 0;
    let railConnectors = 0;
    let endClamps = 0;
    let middleClamps = 0;
    let hooks = 0;
  
    for (let i = 0; i < layout.panels.length; i++) {
      const amount = layout.panels[i];
  
      let railsInRow = Math.ceil((amount * (panelWidth + bracketWidth)) / railLength);
  
      rails += railsInRow * 2;
      railConnectors += (railsInRow - 1) * 2;
      endClamps += 4;
      middleClamps += (amount - 1) * 2;
      hooks += Math.ceil(((amount * (panelWidth + bracketWidth)) / hookRuster) / 1000) * 2;
    }
  
    let railOrderNumber = RAILS.standard[higherLoadValue];
  
    if (roofType === "sheet") {
      railOrderNumber = RAILS.sheet[higherLoadValue]
    }
  
    if (roofType === "trapez") {
  
      return {
        amounts: {
          rails: 0,
          railConnectors: 0,
          endClamps: endClamps,
          middleClamps: middleClamps,
          hooks: endClamps + middleClamps,
        },
        orderNumbers: {
          rails: "Nie sú potrebné",
          railConnectors: "Nie sú potrebné",
          endClamps: END_CLAMP,
          middleClamps: MIDDLE_CLAMP,
          hooks: hookOrderNumber,
        },
      };
    }
  
    return {
      amounts: {
        rails: rails,
        railConnectors: railConnectors,
        endClamps: endClamps,
        middleClamps: middleClamps,
        hooks: hooks,
      },
      orderNumbers: {
        rails: railOrderNumber,
        railConnectors: RAIL_CONNECTOR,
        endClamps: END_CLAMP,
        middleClamps: MIDDLE_CLAMP,
        hooks: hookOrderNumber,
      },
    };
  };
  