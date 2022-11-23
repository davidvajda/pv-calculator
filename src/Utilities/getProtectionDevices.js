const protectionMaterial = require("../resources/protectionDevices.json");

export const getProtectionDevices = (stringDivisions) => {
  if (!stringDivisions) {
    return;
  }

  const strings = stringDivisions.length;

  const FUSE_ORDER_NUMBER = protectionMaterial.fuse[0];

  const spdSimpleAmount = strings % 2;
  const spdDoubleAmount = strings / 2;
  const fuseHolderAMount = strings;
  const fuseAmount = strings * 2;

  return {
    amounts: [1, strings], // todo return the amounts and ONs // TODO: correct this
    orderNumbers: [
      "PVP10001--",
      "BM015216--",
    ],
    descriptions: [
      "Prepäťová skrinka BC pre " + strings + "MPPT",
      "Istič DC C16/2 10kA, charakteristika C, 16A, 2‑pólový",
    ],
  };
};
