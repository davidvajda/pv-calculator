export const getConversion = (width1, width2, height, canvasSize) => {
    return Math.max(width1, width2, height) / canvasSize;
  };