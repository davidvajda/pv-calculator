// material with indices 0 to 4 according to snow,  and wind load 1-5
const HOOKS = {
  tile: ["PVF31025-A", "PVF31025-A", "PVF31015-A", "PVF31015-A", null],
  beaver: ["PVF31050--", "PVF31050--", "PVF31050--", null, null],
  wave: ["PVF31065--", "PVF31065--", "PVF31085--", "PVF31085--", null],
  fold: ["PVF31090--", "PVF31090--", "PVF31090--", null, null],
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
      orderNumbers: [END_CLAMP, MIDDLE_CLAMP, hookOrderNumber],
      descriptions: [
        "Koncov?? ??chyty panelov",
        "Stredov?? ??chyty panelov",
        "Li??ta na trap??zov?? plech",
      ],
    };
  }

  return {
    amounts: [rails, railConnectors, endClamps, middleClamps, hooks],
    orderNumbers: [
      railOrderNumber,
      RAIL_CONNECTOR,
      END_CLAMP,
      MIDDLE_CLAMP,
      hookOrderNumber,
    ],
    descriptions: [
      "Mont????ne li??ty",
      "Spojky mont????nych l????t",
      "Koncov?? ??chyty panelov",
      "Stredov?? ??chyty panelov",
      "Mont????ny h??k",
    ],
  };
};
