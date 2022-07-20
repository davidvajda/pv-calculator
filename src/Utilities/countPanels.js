export const countPanels = (panels) => {
    let count = 0;
    for (let amount of panels) {
      count += amount;
    }
    return count;
  };