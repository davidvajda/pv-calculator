// material with indices 0 to 4 according to snow,  and wind load 1-5
const HOOKS   =  require("../resources/hooks.json")
const RAILS   =  require("../resources/rails.json")
const OTHERS  =  require("../resources/others.json")

export const getMountingMaterialAmounts = (
  roofType,
  hookRuster,
  panelWidth,
  railLength,
  bracketWidth,
  panelLlayout,
  snowLoad,
  windLoad
  ) => {
    
    let hookOrderNumber = null;
    
    const higherLoadValue = (snowLoad > windLoad ? snowLoad : windLoad) - 1; // -1 because of indexing
    
    const railConnector   = OTHERS["railConnector"][higherLoadValue]
    const endClamp        = OTHERS["endClamp"][higherLoadValue]
    const middleClamp     = OTHERS["middleClamp"][higherLoadValue]

  for (let key in HOOKS) {
    if (HOOKS.hasOwnProperty(key) && key === roofType) {
      hookOrderNumber = HOOKS[key][higherLoadValue];
    }
  }

  let rails           = 0;
  let railConnectors  = 0;
  let endClamps       = 0;
  let middleClamps    = 0;
  let hooks           = 0;

  for (let i = 0; i < panelLlayout.panels.length; i++) {
    const amount = panelLlayout.panels[i];

    let railsInRow = Math.ceil(
      (amount * (panelWidth + bracketWidth)) / railLength
    );

    rails += railsInRow * 2;
    railConnectors += (railsInRow - 1) * 2;
    endClamps += 4;
    middleClamps += (amount - 1) * 2;
    hooks += Math.ceil((amount * (panelWidth + bracketWidth)) / hookRuster) * 2;
  }

  let railOrderNumber = RAILS.standard[higherLoadValue];

  if (roofType === "fold") {
    railOrderNumber = RAILS.sheet[higherLoadValue];
  }

  if (roofType === "trapez") {
    return {
      amounts: [endClamps, middleClamps, endClamps + middleClamps],
      orderNumbers: [endClamp, middleClamp, hookOrderNumber],
      descriptions: [
        "Koncové úchyty panelov",
        "Stredové úchyty panelov",
        "Lišta na trapézový plech",
      ],
    };
  }


  return {
    amounts: [rails, railConnectors, endClamps, middleClamps, hooks],
    orderNumbers: [
      railOrderNumber,
      railConnector,
      endClamp,
      middleClamp,
      hookOrderNumber,
    ],
    descriptions: [
      "Montážne lišty",
      "Spojky montážnych líšt",
      "Koncové úchyty panelov",
      "Stredové úchyty panelov",
      "Montážny hák",
    ],
  };
};
