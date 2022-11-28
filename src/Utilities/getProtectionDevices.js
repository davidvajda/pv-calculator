const protectionMaterial = require("../resources/protectionDevices.json");

export const getProtectionDevices = (
  stringDivisions,
  overvoltageDevice,
  overcurrentDevice
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
      ...["Držiak poistiek pre FV, 2 pólový", "Poistková vložka 16A"]
    );
  } else {
    returnObject.amounts.push(stringCount);
    returnObject.orderNumbers.push(protectionMaterial.mcb[0]);
    returnObject.descriptions.push("DC istič, 16A, char. C 2 pólový");
  }

  if (overvoltageDevice === "box") {
    returnObject.amounts.push(1);
    returnObject.orderNumbers.push(protectionMaterial.box[stringCount - 1]);
    returnObject.descriptions.push(
      stringCount % 2 === 0
        ? `Prepäťová skrinka, ${stringCount} stringy, B+C`
        : `Prepäťová skrinka, ${stringCount} string, B+C`
    );
  } else {
    returnObject.amounts.push(stringCount);
    returnObject.orderNumbers.push(protectionMaterial.spd[0]);
    returnObject.descriptions.push("Zvodič prepätia B+C");
  }

  return returnObject;
};
