const surgeProtectionDevices = {
  // with contactor, class I [0] or II [1] for one or two strings [0] or [1]
  // TODO: implement this according to current norms/standards, for now, default is class I without contactor
  // TODO: return MCB according to the current of the string
  withContactor: [
    ["PVPF1001--", "PVPF1002--"],
    ["PVPF1501--", "PVPF1502--"],
  ],
  withoutContactor: [
    ["PVP10001--", "PVP10002--"],
    ["PVP15001--", "PVP15001--"],
  ],
};

export const getProtectionDevices = (stringDivisions) => {
  if (!stringDivisions) {
    return;
  }

  const strings = stringDivisions.length;

  if (strings === 0) {
    return;
  }

  return {
    amounts: [1, strings],
    orderNumbers: [
      surgeProtectionDevices.withoutContactor[0][strings - 1],
      "BM015216--",
    ],
    descriptions: [
      "Prepäťová skrinka BC pre " + strings + "MPPT",
      "Istič DC C16/2 10kA, charakteristika C, 16A, 2‑pólový",
    ],
  };
};
