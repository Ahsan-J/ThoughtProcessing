export const getNumberFromMeasuredUnit = (measurement: string): number => {
  const match = /(\d+)(\w*)/g.exec(measurement.replaceAll(" ", ""));
  if(match) {
    const [, num, unit] = match;
    switch(unit) {
      case "rem":
        return parseFloat(num) * 16;
      case "pt":
        return parseFloat(num) * 0.75;
      case "in":
        return parseFloat(num) * 96;
      case "pc":
        return parseFloat(num) * 0.0625;
      case "cm":
        return parseFloat(num) * 0.0265;
      case "mm":
        return parseFloat(num) * 0.2645833;
      // https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#lengths
      default:
        return parseFloat(num);
    }
  }
  return parseFloat(measurement);
}
