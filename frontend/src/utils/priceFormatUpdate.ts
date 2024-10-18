export const priceFormatUpdate = (value: number) => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(3)}m`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(3)}k`;
  } else {
    return value.toString();
  }
};
