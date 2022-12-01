// material with indices 0 to 4 according to snow,  and wind load 1-5
const HOOKS = require("../resources/hooks.json");
const RAILS = require("../resources/rails.json");
const OTHERS = require("../resources/others.json");

export const getMountingMaterialAmounts = (
  roofType,
  hookRuster,
  panelWidth,
  railLength,
  bracketWidth,
  panelLlayout,
  snowLoad,
  windLoad,
  HOOKS,
  RAILS,
  OTHERS
) => {
  let hookOrderNumber = null;

  const higherLoadValue = (snowLoad > windLoad ? snowLoad : windLoad) - 1; // -1 because of indexing

  const railConnector = OTHERS["railConnector"][higherLoadValue];
  const endClamp = OTHERS["endClamp"][higherLoadValue];
  const middleClamp = OTHERS["middleClamp"][higherLoadValue];

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

  const spareRails = [];

  // for one row of panels there are two rails rows needed, therefore ...length * 2 and i/2
  for (let i = 0; i < panelLlayout.panels.length * 2; i++) {
    const amount = panelLlayout.panels[Math.floor(i / 2)];
    if (amount <= 0) continue;

    const railWidthNeeded = amount * (panelWidth + bracketWidth) + bracketWidth;
    const lastRailLength = railWidthNeeded % railLength;
    const spareLength = railLength - lastRailLength - 100; // 100mm reserve
    let usedSpareRails = 0;

    // take length from spareRails or add spare lenght to spareRails
    for (let y = 0; y < spareRails.length; y++) {
      if (lastRailLength <= spareRails[y]) {
        // take the length out of spare rails and pop it if some small lenght is left
        spareRails[y] -= lastRailLength;
        usedSpareRails++;
      }
      if (spareRails[y] < 100) spareRails.splice(y, 1);
      if (usedSpareRails === 1) break;
    }

    // push new spare length to spareRails array
    if (usedSpareRails === 0) spareRails.push(spareLength);
    let railsInRow = Math.ceil(
      (amount * (panelWidth + bracketWidth)) / railLength
    );

    rails += railsInRow - usedSpareRails;
    railConnectors += railsInRow - 1;
    endClamps += 2;
    middleClamps += amount - 1;
    hooks += Math.ceil(
      (amount * (panelWidth + bracketWidth) + bracketWidth) / hookRuster
    );
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
