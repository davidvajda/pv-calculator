const EDGE_SAFE_DISTANCE = 600;
const RADIAN_CONVERSION = 180 / Math.PI;

export const getTriangleData = (w, h) => {
  // returns data needed for drawing triangles
  let c = h;
  let b = w / 2;
  let a = Math.sqrt(Math.pow(c, 2) + Math.pow(b, 2));

  const B = Math.asin(b / a) * RADIAN_CONVERSION * 2; // angle B in degrees
  const A = 180 - B / 2 - 90; // angle A in degrees

  return {
    base: w,
    height: h,
    arm: a,
    topAngle: B,
    sideAngle: A,
  };
};

export const getPanelLayoutRectangle = (
  roofHeight,
  roofWidth,
  panelWidth,
  panelHeight,
  bracketWidth,
  panelPower,
  maxPower
) => {
  let panelsHorizontally = Math.floor(
    (roofWidth - EDGE_SAFE_DISTANCE) / (panelWidth + bracketWidth)
  );
  let panelsVertically = Math.floor(
    (roofHeight - EDGE_SAFE_DISTANCE) / panelHeight
  );

  let panels = [];
  let usableWidths = [];

  let maxPanels = maxPower === 0 ? 255 : Math.floor(maxPower / panelPower);
  let panelCount = 0;

  for (let i = 0; i < panelsVertically; i++) {
    if (panelsHorizontally <= maxPanels - panelCount) {
      panels.push(panelsHorizontally);
      panelCount += panelsHorizontally;
    } else {
      panels.push(maxPanels - panelCount);
      panelCount += maxPanels - panelCount;
    }
    usableWidths.push(roofWidth - EDGE_SAFE_DISTANCE);
  }

  return {
    panels: panels,
    usableWidths: usableWidths,
    panelsFromTop: false,
  };
};

export const getPanelLayoutTriangle = (
  roofHeight,
  roofWidth,
  panelWidth,
  panelHeight,
  bracketWidth,
  panelPower,
  maxPower
) => {
  let c = roofHeight; // height
  let b = roofWidth / 2; // base
  let a = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2)); // the other arm

  // calculating angles in radians
  const B = Math.asin(b / a); // angle B in radians
  const A = (180 - (B * RADIAN_CONVERSION + 90)) / RADIAN_CONVERSION; // angle A in radians

  let panels = [];
  let usableWidths = [];

  let maxPanels = maxPower === 0 ? 255 : Math.floor(maxPower / panelPower);
  let panelCount = 0;

  c -= EDGE_SAFE_DISTANCE / 2; // safe distance from bottom

  while (c >= panelHeight) {
    // calculating roof width on upper edge of panels in the current row
    const roofWidthUpperEdge = parseInt(
      (c - panelHeight) * (Math.sin(B) / Math.sin(A)) * 2
    );
    // check how many panels fit in the roof when counting with upper edge of panels

    const upperEdgePanelCount = Math.floor(
      (roofWidthUpperEdge - EDGE_SAFE_DISTANCE) / (panelWidth + bracketWidth)
    );

    c -= panelHeight;
    b = roofWidthUpperEdge / 2;

    if (roofWidthUpperEdge < panelWidth) {
      break;
    }

    if (upperEdgePanelCount <= maxPanels - panelCount) {
      panels.push(upperEdgePanelCount);
      panelCount += upperEdgePanelCount;
    } else {
      panels.push(maxPanels - panelCount);
      panelCount += maxPanels - panelCount;
    }
    usableWidths.push(roofWidthUpperEdge);
  }

  return {
    panels: panels.reverse(),
    usableWidths: usableWidths.reverse(),
    panelsFromTop: false,
  };
};

export const getPanelLayoutTrapezoid = (
  roofHeight,
  topWidth,
  bottomWidth,
  panelWidth,
  panelHeight,
  bracketWidth,
  panelPower,
  maxPower
) => {
  const triangleWidth = Math.abs(bottomWidth - topWidth);

  const rectangleWidth =
    (topWidth > bottomWidth ? topWidth : bottomWidth) - triangleWidth;

  // in case there that top is longer than bottom, swap the top and bottom length
  // also send information that panels should be starting at the top of the roof
  const panelsStartingFromTop = topWidth > bottomWidth ? true : false;

  if (panelsStartingFromTop) {
    const tmp = bottomWidth;
    bottomWidth = topWidth;
    topWidth = tmp;
  }

  // calculating triangle sides
  let c = roofHeight;
  let b = triangleWidth / 2; // base of right triangle
  let a = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2)); // arm of the triangle

  // calculating angles in radians
  const B = Math.asin(b / a);
  const A = (180 - (B * RADIAN_CONVERSION + 90)) / RADIAN_CONVERSION;

  let panels = [];
  let usableWidths = [];

  let maxPanels = maxPower === 0 ? 255 : Math.floor(maxPower / panelPower);
  let panelCount = 0;

  c -= EDGE_SAFE_DISTANCE / 2; // safe distance from the bottom

  while (c - EDGE_SAFE_DISTANCE / 2 - panelHeight > 0) {
    // calculating roof width on upper edge of panels in the current row
    const roofWidthUpperEdge =
      parseInt((c - panelHeight) * (Math.sin(B) / Math.sin(A))) * 2 +
      rectangleWidth;

    // check how many panels fit in the roof
    const upperEdgePanelCount = Math.floor(
      (roofWidthUpperEdge - EDGE_SAFE_DISTANCE) / (panelWidth + bracketWidth)
    );

    // update c
    c -= panelHeight;

    if (upperEdgePanelCount < maxPanels - panelCount) {
      panels.push(upperEdgePanelCount);
      panelCount += upperEdgePanelCount;
    } else {
      panels.push(maxPanels - panelCount);
      panelCount += maxPanels - panelCount;
    }
    usableWidths.push(roofWidthUpperEdge);

    if (roofWidthUpperEdge < panelWidth) {
      break;
    }
  }

  if (!panelsStartingFromTop) {
    panels.reverse();
    usableWidths.reverse();
  }

  return {
    panels: panels,
    usableWidths: usableWidths,
    panelsFromTop: panelsStartingFromTop,
  };
};
