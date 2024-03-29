const divideIntoStrings = (invertor, panelCount, panelVoltage) => {
  const ratedVoltage =
    invertor.ratedVoltage + Math.round(invertor.ratedVoltage / 5); // + 5%
  const minimalVoltage = invertor.minVoltage;

  // in this version, I'm not counting with parallel connection of strings, just one string per MPPT
  // TODO: multiple strings in to one MPPT
  for (let mppts = 1; mppts <= invertor.mppt; mppts++) {
    const division = [];
    let panelsLeft = panelCount;

    for (let i = 0; i < mppts; i++) {
      const mpptPanelAmount = Math.floor(panelsLeft / (mppts - i));
      const mpptVoltage = mpptPanelAmount * panelVoltage;

      // string voltage with this amount of panels is between minimal and nominal voltage, push it into output list
      if (mpptVoltage > minimalVoltage && mpptVoltage < ratedVoltage) {
        division.push(mpptPanelAmount);
        panelsLeft -= mpptPanelAmount;
      }
      // try more MPPTS, since the voltage is either too hight or low, TODO: some other output when voltage is too low
      else {
        break;
      }
    }

    if (panelsLeft === 0) {
      return division;
    }
  }
  return [];
};

export const getSuitableInvertorAndStrings = (
  powerReserve,
  panelPower,
  panelVoltage,
  panelCurrent,
  panelLayout,
  invertors
) => {
  let panelCount = 0;

  for (let panelsInRow of panelLayout.panels) {
    panelCount += panelsInRow;
  }

  const plantPower = panelCount * panelPower;

  invertors.sort((a, b) => a.nominalPower - b.nominalPower);

  const bestFitInvertors = [];
  const stringDivisions = [];

  // find three invertors that fit the power requirement
  for (let i = 0; i < invertors.length; i++) {
    const invertor = invertors[i];

    if (invertor.nominalPower + (invertor.nominalPower * (powerReserve / 100)) >= plantPower) {
      const stringDivision = divideIntoStrings(
        invertor,
        panelCount,
        panelVoltage
      );

      if (stringDivision.length > 0 && stringDivision[0] !== 0) {
        stringDivisions.push(stringDivision);
        bestFitInvertors.push(invertor);
      }
    }
    if (bestFitInvertors.length > 2) {
      break;
    }
  }

  return {
    invertors: bestFitInvertors,
    stringDivisions: stringDivisions,
  };
};
