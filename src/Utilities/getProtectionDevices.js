export const getProtectionDevices = (
  stringDivisions,
  overvoltageDevice,
  overcurrentDevice,
  protectionMaterial
) => {
  if (!stringDivisions) return;

  const returnObject = {
    amounts: [],
    orderNumbers: [],
    descriptions: [],
  };

  const stringCount = stringDivisions.length;

  // Currently works only for one or two strings

  if (overcurrentDevice === "fuse") {
    returnObject.amounts.push(...[stringCount, stringCount * 2]);
    returnObject.orderNumbers.push(
      ...[protectionMaterial.fuseHolder[0], protectionMaterial.fuse[0]]
    );
    returnObject.descriptions.push(
      ...["Držiak poistiek pre FV", "Poistková vložka"]
    );
  } else {
    returnObject.amounts.push(stringCount);
    returnObject.orderNumbers.push(protectionMaterial.mcb[0]);
    returnObject.descriptions.push("DC istič");
  }

  if (overvoltageDevice === "box") {
    returnObject.amounts.push(stringCount % 2 === 0 ? stringCount / 2 : stringCount);
    returnObject.orderNumbers.push(protectionMaterial.box[stringCount % 2 === 0 ? 1 : 0]);
    returnObject.descriptions.push(
      stringCount % 2 === 0
        ? `Prepäťová skrinka, 2 stringy`
        : `Prepäťová skrinka, 1 string`
    );
  } else {
    returnObject.amounts.push(stringCount);
    returnObject.orderNumbers.push(protectionMaterial.spd[0]);
    returnObject.descriptions.push("Zvodič prepätia");
  }

  return returnObject;
};
